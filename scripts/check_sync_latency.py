"""Measures how long a change one member makes takes to reach the other members of a board.

The check of QR-01 QRT-01, run against the staging deployment from a machine on
the university network:

    python scripts/check_sync_latency.py "$STAGING_URL"

It creates a board, connects the members to it as the frontend does, and lets
them take turns adding a block, moving it, editing its text, and sending a
query from an AI block. The other members read the board the way the frontend
does, by polling, and the script times each change from the moment it is made
to the moment each other member reads it. It exits with 1 when any change took
longer than the threshold or never arrived.

It needs `httpx` and `websockets`, both in `app/backend/requirements.txt`.
"""

import argparse
import asyncio
import json
import random
import sys
import time
from dataclasses import dataclass, field
from typing import Any, Callable
from uuid import uuid4

import httpx
from websockets.asyncio.client import ClientConnection, connect


# The frontend's own timings, so a member here sees a change when a browser would:
# WIDGETS_POLL_S is POLL_INTERVAL_MS in app/frontend/src/pages/whiteboard/model/use-board-widgets.ts,
# MESSAGES_POLL_S is MESSAGES_POLL_INTERVAL_MS in .../model/use-widget-messages.ts, and
# TEXT_SAVE_DELAY_S is SAVE_CONTENT_DELAY_MS in .../ui/text-widget-node.tsx.
WIDGETS_POLL_S = 1.0
MESSAGES_POLL_S = 2.0
TEXT_SAVE_DELAY_S = 0.5

# A change no member has read after this long counts as missed.
MISSED_AFTER_S = 15.0

KINDS = ("add", "move", "edit", "query")


@dataclass
class Change:
    kind: str
    maker: int
    made_at: float
    # Tells whether a member's latest read of the board already shows the change.
    shown_in: Callable[[list[dict[str, Any]]], bool]
    # Member index -> seconds from made_at to the read that showed the change.
    seen_after: dict[int, float] = field(default_factory=dict)


@dataclass
class Run:
    api: str
    board_id: str
    members: int
    changes: list[Change] = field(default_factory=list)
    ai_widget_id: str | None = None
    socket_failures: list[str] = field(default_factory=list)
    request_failures: int = 0
    stopping: bool = False


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("base_url", help="the deployment's address, such as $STAGING_URL")
    parser.add_argument("--members", type=int, default=10, help="members on the board (default: 10)")
    parser.add_argument("--duration", type=float, default=1800, help="seconds of changes (default: 1800)")
    parser.add_argument("--interval", type=float, default=5, help="seconds between two changes (default: 5)")
    parser.add_argument("--query-every", type=int, default=12, help="every n-th change is a query (default: 12)")
    parser.add_argument("--threshold", type=float, default=2.0, help="seconds a change may take (default: 2)")
    return parser.parse_args()


def socket_url(base_url: str, board_id: str, client_id: str) -> str:
    scheme, rest = base_url.split("://", 1)
    ws_scheme = "wss" if scheme == "https" else "ws"
    return f"{ws_scheme}://{rest}/api/ws/boards/{board_id}?client_id={client_id}"


async def keep_socket_open(run: Run, base_url: str, index: int) -> None:
    """Holds the member's board socket open and answers the server's pings, as the frontend does."""
    url = socket_url(base_url, run.board_id, str(uuid4()))
    try:
        async with connect(url) as socket:
            await answer_pings(run, socket, index)
    except Exception as error:  # noqa: BLE001 - any drop fails the run
        if not run.stopping:
            run.socket_failures.append(f"member {index}: {error!r}")


async def answer_pings(run: Run, socket: ClientConnection, index: int) -> None:
    async for text in socket:
        frame = json.loads(text)
        if frame["type"] == "ping":
            await socket.send(json.dumps({"type": "pong", "data": frame["data"]}))
    if not run.stopping:
        run.socket_failures.append(
            f"member {index}: closed {socket.close_code} {socket.close_reason}"
        )


def record_reads(run: Run, index: int, read_at: float, items: list[dict[str, Any]], kinds: set[str]) -> None:
    for change in run.changes:
        if change.kind not in kinds or change.maker == index or index in change.seen_after:
            continue
        if read_at - change.made_at > MISSED_AFTER_S:
            continue
        if change.shown_in(items):
            change.seen_after[index] = read_at - change.made_at


async def poll_widgets(run: Run, client: httpx.AsyncClient, index: int) -> None:
    """Reads the board's blocks, waiting WIDGETS_POLL_S after each answer, as use-polling.ts does."""
    # Browsers open the board at different moments, so their polls are out of step.
    await asyncio.sleep(random.uniform(0, WIDGETS_POLL_S))
    while not run.stopping:
        try:
            response = await client.get(f"{run.api}/widgets", params={"boardId": run.board_id})
            response.raise_for_status()
            record_reads(run, index, time.monotonic(), response.json()["items"], {"add", "move", "edit"})
        except httpx.HTTPError:
            run.request_failures += 1
        await asyncio.sleep(WIDGETS_POLL_S)


async def poll_messages(run: Run, client: httpx.AsyncClient, index: int) -> None:
    """Reads the AI block's conversation, as an open messages panel does."""
    await asyncio.sleep(random.uniform(0, MESSAGES_POLL_S))
    while not run.stopping:
        if run.ai_widget_id is not None:
            try:
                response = await client.get(f"{run.api}/messages", params={"widgetId": run.ai_widget_id})
                response.raise_for_status()
                record_reads(run, index, time.monotonic(), response.json()["items"], {"query"})
            except httpx.HTTPError:
                run.request_failures += 1
        await asyncio.sleep(MESSAGES_POLL_S)


def widget_shown(predicate: Callable[[dict[str, Any]], bool]) -> Callable[[list[dict[str, Any]]], bool]:
    return lambda widgets: any(predicate(widget) for widget in widgets)


async def make_changes(run: Run, client: httpx.AsyncClient, duration: float, interval: float, query_every: int) -> list[asyncio.Task]:
    """Lets the members take turns making a change, every `interval` seconds."""
    queries: list[asyncio.Task] = []
    text_widget_id: str | None = None
    number = 0
    end = time.monotonic() + duration

    while time.monotonic() < end:
        maker = number % run.members
        title = f"QR-01 block {number}"

        if number % query_every == query_every - 1 and run.ai_widget_id is not None:
            content = f"QR-01 query {number}: answer with one word."
            run.changes.append(Change(
                "query", maker, time.monotonic(),
                lambda messages, content=content: any(m["content"] == content for m in messages),
            ))
            # The request waits for the LLM's reply, which QR-01 does not time.
            queries.append(asyncio.create_task(
                client.post(f"{run.api}/messages", json={"widget_id": run.ai_widget_id, "content": content}, timeout=130)
            ))
        elif text_widget_id is None or number % 3 == 0:
            run.changes.append(Change(
                "add", maker, time.monotonic(),
                widget_shown(lambda widget, title=title: widget["title"] == title),
            ))
            response = await client.post(f"{run.api}/widgets", json={
                "board_id": run.board_id, "widget_type": "text", "title": title,
                "x": random.uniform(0, 1000), "y": random.uniform(0, 1000),
            })
            response.raise_for_status()
            text_widget_id = response.json()["id"]
        elif number % 3 == 1:
            x, y = number * 10 + 0.5, random.uniform(0, 1000)
            run.changes.append(Change(
                "move", maker, time.monotonic(),
                widget_shown(lambda widget, wid=text_widget_id, x=x: widget["id"] == wid and widget["x"] == x),
            ))
            response = await client.put(f"{run.api}/widgets/{text_widget_id}", json={"x": x, "y": y})
            response.raise_for_status()
        else:
            content = f"QR-01 edit {number}"
            run.changes.append(Change(
                "edit", maker, time.monotonic(),
                widget_shown(lambda widget, wid=text_widget_id, content=content: widget["id"] == wid and widget["content"] == content),
            ))
            # The member types, and the frontend saves the text after its delay.
            await asyncio.sleep(TEXT_SAVE_DELAY_S)
            response = await client.put(f"{run.api}/widgets/{text_widget_id}", json={"content": content})
            response.raise_for_status()

        number += 1
        await asyncio.sleep(interval)

    # Give the members time to read the last change.
    await asyncio.sleep(MISSED_AFTER_S)
    return queries


def percentile(values: list[float], share: float) -> float:
    ordered = sorted(values)
    return ordered[min(len(ordered) - 1, int(share * len(ordered)))]


def report(run: Run, threshold: float) -> bool:
    """Prints a row per kind of change and returns whether every change met the threshold."""
    print(f"{'kind':<6} {'changes':>7} {'reads':>6} {'p95 ms':>7} {'max ms':>7} {'over':>5} {'missed':>6}")
    total_over = total_missed = 0
    rows = [(kind, [c for c in run.changes if c.kind == kind]) for kind in KINDS] + [("all", run.changes)]

    for kind, changes in rows:
        latencies = [seconds for change in changes for seconds in change.seen_after.values()]
        missed = sum(run.members - 1 - len(change.seen_after) for change in changes)
        over = sum(seconds > threshold for seconds in latencies)
        p95 = f"{percentile(latencies, 0.95) * 1000:.0f}" if latencies else "-"
        worst = f"{max(latencies) * 1000:.0f}" if latencies else "-"
        print(f"{kind:<6} {len(changes):>7} {len(latencies):>6} {p95:>7} {worst:>7} {over:>5} {missed:>6}")
        if kind == "all":
            total_over, total_missed = over, missed

    print(f"failed reads: {run.request_failures}")
    print(f"socket failures: {len(run.socket_failures)}")
    for failure in run.socket_failures:
        print(f"  {failure}")

    passed = total_over == 0 and total_missed == 0 and not run.socket_failures
    print(f"result: {'PASS' if passed else 'FAIL'}: {total_over} reads over {threshold:g} s, {total_missed} missed")
    return passed


async def main() -> int:
    args = parse_args()
    base_url = args.base_url.rstrip("/")
    api = f"{base_url}/api"

    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.post(f"{api}/boards", json={"title": "QR-01 sync check"})
        response.raise_for_status()
        run = Run(api=api, board_id=response.json()["id"], members=args.members)

        response = await client.post(f"{api}/widgets", json={
            "board_id": run.board_id, "widget_type": "ai", "title": "QR-01 AI block", "x": 0, "y": 0,
        })
        response.raise_for_status()
        run.ai_widget_id = response.json()["id"]

        started = time.strftime("%Y-%m-%d %H:%M:%S %Z")
        print(f"board: {run.board_id}")
        print(f"started: {started}")
        print(f"members: {args.members}, duration: {args.duration:g} s, interval: {args.interval:g} s, threshold: {args.threshold:g} s")

        background = [asyncio.create_task(keep_socket_open(run, base_url, i)) for i in range(args.members)]
        # Let every member join before the first change.
        await asyncio.sleep(2)
        background += [asyncio.create_task(poll_widgets(run, client, i)) for i in range(args.members)]
        background += [asyncio.create_task(poll_messages(run, client, i)) for i in range(args.members)]

        try:
            queries = await make_changes(run, client, args.duration, args.interval, args.query_every)
        finally:
            run.stopping = True
            for task in background:
                task.cancel()
            await asyncio.gather(*background, return_exceptions=True)

        await asyncio.gather(*queries, return_exceptions=True)

    return 0 if report(run, args.threshold) else 1


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
