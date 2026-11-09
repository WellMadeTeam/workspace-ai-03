"""Send a core-task probe and find its failed-request log point in staging.

Run from the repository root on the university network:

    python scripts/check_sli.py "$STAGING_URL"

The script reads OpenObserve credentials from the environment and queries only
the `staging` organization. It prints the four fields used by QR-05, not the
query or the AI reply.
"""

import argparse
import json
import os
import re
import sys
import time
from uuid import uuid4

import httpx


LOG_WAIT_S = 5.0
LOG_STREAM = os.getenv("OPENOBSERVE_LOG_STREAM", "default")
REQUEST_ID_HEADER = "X-Request-ID"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "staging_url",
        nargs="?",
        default=os.getenv("STAGING_URL"),
        help="staging deployment URL (defaults to STAGING_URL)",
    )
    return parser.parse_args()


def required_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise ValueError(f"Set {name} in the environment")
    return value.rstrip("/")


def read_log_point(
    client: httpx.Client,
    openobserve_url: str,
    username: str,
    password: str,
    request_id: str,
    search_start_us: int,
) -> dict[str, object]:
    if not re.fullmatch(r"[A-Za-z0-9_-]+", LOG_STREAM):
        raise ValueError("OPENOBSERVE_LOG_STREAM must be a simple stream name")

    api_url = openobserve_url.rstrip("/")
    if not api_url.endswith("/api"):
        api_url = f"{api_url}/api"
    endpoint = f"{api_url}/staging/_search"
    sql = (
        'SELECT request_id, route, outcome, duration_ms '
        f'FROM "{LOG_STREAM}" WHERE request_id = \'{request_id}\' '
        "ORDER BY _timestamp DESC LIMIT 10"
    )
    deadline = time.monotonic() + LOG_WAIT_S

    while time.monotonic() < deadline:
        remaining_s = deadline - time.monotonic()
        if remaining_s <= 0:
            break
        end_us = time.time_ns() // 1_000
        response = client.post(
            endpoint,
            auth=(username, password),
            json={
                "query": {
                    "sql": sql,
                    "start_time": search_start_us,
                    "end_time": end_us,
                    "from": 0,
                    "size": 10,
                },
                "search_type": "other",
                "timeout": 2,
            },
            timeout=min(2.5, remaining_s),
        )
        response.raise_for_status()
        hits = response.json().get("hits", [])
        matching = [
            hit
            for hit in hits
            if hit.get("request_id") == request_id
            and hit.get("route") == "/messages"
            and hit.get("outcome") in {"client_error", "server_error"}
        ]

        if len(matching) > 1:
            raise RuntimeError(
                "OpenObserve returned duplicate log points for the request"
            )
        if matching and time.monotonic() <= deadline:
            return matching[0]

        time.sleep(min(0.25, max(0, deadline - time.monotonic())))

    raise TimeoutError("No matching staging log point arrived within five seconds")


def run(staging_url: str) -> dict[str, object]:
    openobserve_url = required_env("OPENOBSERVE_URL")
    username = required_env("OPENOBSERVE_USER")
    password = os.getenv("OPENOBSERVE_PASSWORD")
    if not password:
        raise ValueError("Set OPENOBSERVE_PASSWORD in the environment")

    headers = {"X-Analytics-Source": "smoke"}
    api_url = f"{staging_url.rstrip('/')}/api"

    with httpx.Client(headers=headers, timeout=30) as client:
        board_response = client.post(
            f"{api_url}/boards",
            json={"title": f"QR-05 diagnostics {uuid4().hex[:8]}"},
        )
        board_response.raise_for_status()
        board_id = board_response.json()["id"]

        widget_response = client.post(
            f"{api_url}/widgets",
            json={
                "title": "QR-05 diagnostics",
                "board_id": board_id,
                "widget_type": "ai",
                "x": 0,
                "y": 0,
            },
        )
        widget_response.raise_for_status()
        widget_id = widget_response.json()["id"]

        query_response = client.post(
            f"{api_url}/messages",
            json={
                "widget_id": widget_id,
                "content": "Reply with exactly the word READY.",
            },
        )
        query_response.raise_for_status()
        if query_response.json()["reply"]["role"] != "ai":
            raise RuntimeError(
                "The staging core-task query did not receive an AI reply"
            )
        print("core-task query: received an AI reply")

        request_id = str(uuid4())
        search_start_us = time.time_ns() // 1_000 - 1_000_000
        failure_response = client.post(
            f"{api_url}/messages",
            json={"widget_id": str(uuid4()), "content": "diagnostic probe"},
            headers={REQUEST_ID_HEADER: request_id},
        )
        if failure_response.status_code != 404:
            raise RuntimeError(
                "The controlled failure probe returned "
                f"HTTP {failure_response.status_code}, expected HTTP 404"
            )
        request_id = failure_response.headers.get(REQUEST_ID_HEADER, request_id)

        point = read_log_point(
            client,
            openobserve_url,
            username,
            password,
            request_id,
            search_start_us,
        )
        duration_ms = point.get("duration_ms")
        if isinstance(duration_ms, bool) or not isinstance(duration_ms, (int, float)):
            raise RuntimeError("The log point has no numeric duration_ms")

        result = {
            "request_id": point["request_id"],
            "route": point["route"],
            "outcome": point["outcome"],
            "duration_ms": duration_ms,
        }
        print(json.dumps(result, sort_keys=True))
        return result


def main() -> int:
    args = parse_args()
    if not args.staging_url:
        print("Set STAGING_URL or pass the staging URL as an argument", file=sys.stderr)
        return 2

    try:
        run(args.staging_url)
    except (httpx.HTTPError, KeyError, RuntimeError, TimeoutError, ValueError) as error:
        print(f"QR-05 check failed: {error}", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
