"""Board WebSocket: the handshake, the member limit and broadcasting to members.

Stage 0 of reports/week-04/ws-roadmap.md; the protocol is reports/week-04/websockets.md.
The hub lives in this process's memory, so the backend must run as one process.
"""

import asyncio
import json
import os
from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import IntEnum
from typing import Any
from urllib.parse import urlsplit
from uuid import UUID, uuid4

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from starlette.concurrency import run_in_threadpool

from database import SessionLocal
from models import Board


router = APIRouter(tags=["realtime"])

MAX_MEMBERS_PER_BOARD = 10
PING_INTERVAL_S = 25
# A client that sends nothing, not even a pong, for this long is treated as gone.
RECEIVE_TIMEOUT_S = 60
MAX_FRAME_BYTES = 4096
SEND_QUEUE_SIZE = 256
CLOSE_TIMEOUT_S = 5

# One color per member slot, so the 10 members of a board never share one.
MEMBER_COLORS = [
    "#e5484d", "#f76b15", "#ffc53d", "#46a758", "#12a594",
    "#0090ff", "#3e63dd", "#8e4ec6", "#d6409f", "#8d8d8d",
]

# Comma-separated origins allowed to open a socket; when unset, the Origin
# must match the Host the request was sent to.
ALLOWED_ORIGINS = {
    origin.strip().rstrip("/")
    for origin in os.getenv("WS_ALLOWED_ORIGINS", "").split(",")
    if origin.strip()
}


class CloseCode(IntEnum):
    BAD_REQUEST = 4400
    ORIGIN_REJECTED = 4403
    BOARD_NOT_FOUND = 4404
    HEARTBEAT_TIMEOUT = 4408
    REPLACED = 4409
    BOARD_FULL = 4429
    TOO_SLOW = 4430


class BoardFullError(Exception):
    pass


_CLOSE = object()


@dataclass(eq=False)
class Member:
    """One open socket on a board. Frames go through a queue so they keep their order."""

    board_id: UUID
    client_id: UUID
    slot: int
    websocket: WebSocket
    queue: asyncio.Queue = field(
        default_factory=lambda: asyncio.Queue(maxsize=SEND_QUEUE_SIZE)
    )
    close_code: int | None = None
    close_reason: str = ""

    @property
    def label(self) -> str:
        return f"Guest {self.slot + 1}"

    @property
    def color(self) -> str:
        return MEMBER_COLORS[self.slot % len(MEMBER_COLORS)]

    def public(self) -> dict[str, str]:
        return {
            "client_id": str(self.client_id),
            "label": self.label,
            "color": self.color,
        }

    def enqueue(self, frame: str) -> None:
        if self.close_code is not None:
            return
        try:
            self.queue.put_nowait(frame)
        except asyncio.QueueFull:
            # A client that cannot keep up would silently miss events, so it is
            # disconnected and resyncs when it reconnects.
            self.close(CloseCode.TOO_SLOW, "too_slow")

    def close(self, code: int, reason: str) -> None:
        """Closes the socket after dropping the frames still waiting to be sent."""
        if self.close_code is not None:
            return
        self.close_code = code
        self.close_reason = reason
        while not self.queue.empty():
            self.queue.get_nowait()
        self.queue.put_nowait(_CLOSE)

    async def write(self) -> None:
        try:
            while True:
                frame = await self.queue.get()
                if frame is _CLOSE:
                    await self.websocket.close(self.close_code, self.close_reason)
                    return
                await self.websocket.send_text(frame)
        except Exception:
            # The connection is already gone; the receiving side cleans up.
            return


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="milliseconds")


def _frame(board_id: UUID, event_type: str, data: dict[str, Any], seq: int | None, origin: UUID | None) -> str:
    return json.dumps({
        "type": event_type,
        "board_id": str(board_id),
        "seq": seq,
        "origin": str(origin) if origin else None,
        "sent_at": _now(),
        "data": data,
    })


class BoardHub:
    """Tracks who is connected to each board and sends events to them.

    Every method runs on the event loop and none of them awaits, so each call
    is atomic: two members joining at once can never both take the last slot.
    """

    def __init__(self, max_members: int = MAX_MEMBERS_PER_BOARD) -> None:
        self.max_members = max_members
        self._members: dict[UUID, dict[UUID, Member]] = {}
        self._seq: dict[UUID, int] = {}

    def members(self, board_id: UUID) -> list[Member]:
        return list(self._members.get(board_id, {}).values())

    def seq(self, board_id: UUID) -> int:
        return self._seq.get(board_id, 0)

    def join(self, board_id: UUID, client_id: UUID, websocket: WebSocket) -> Member:
        """Adds a member and sends it `connection.ready`, or raises BoardFullError.

        A socket with a `client_id` already on the board replaces the old one,
        which keeps its slot, so a fast reconnect is never turned away.
        """
        members = self._members.setdefault(board_id, {})
        previous = members.get(client_id)

        if previous is None and len(members) >= self.max_members:
            raise BoardFullError

        if previous is not None:
            slot = previous.slot
            previous.close(CloseCode.REPLACED, "replaced")
        else:
            taken = {member.slot for member in members.values()}
            slot = next(slot for slot in range(self.max_members) if slot not in taken)

        member = Member(board_id=board_id, client_id=client_id, slot=slot, websocket=websocket)
        members[client_id] = member

        if previous is None:
            self.publish(board_id, "member.joined", member.public(), origin=client_id, exclude=member)

        self.send(member, "connection.ready", {
            "seq": self.seq(board_id),
            "you": member.public(),
            "members": [other.public() for other in members.values()],
            # Filled by later stages: drag locks, editing presence, AI replies.
            "locks": [],
            "editing": [],
            "ai_replies": [],
        })

        return member

    def leave(self, member: Member) -> None:
        """Removes a member, unless a newer socket of the same client replaced it."""
        members = self._members.get(member.board_id, {})
        if members.get(member.client_id) is not member:
            return

        del members[member.client_id]

        if members:
            self.publish(member.board_id, "member.left", {"client_id": str(member.client_id)}, origin=member.client_id)
        else:
            # Nobody is left to notice a gap, so the board starts over.
            del self._members[member.board_id]
            self._seq.pop(member.board_id, None)

    def publish(
        self,
        board_id: UUID,
        event_type: str,
        data: dict[str, Any],
        origin: UUID | None = None,
        exclude: Member | None = None,
    ) -> None:
        """Sends a sequenced event to every member of the board."""
        seq = self._seq.get(board_id, 0) + 1
        self._seq[board_id] = seq
        frame = _frame(board_id, event_type, data, seq, origin)

        for member in self.members(board_id):
            if member is not exclude:
                member.enqueue(frame)

    def send(self, member: Member, event_type: str, data: dict[str, Any]) -> None:
        """Sends an unsequenced event to one member."""
        member.enqueue(_frame(member.board_id, event_type, data, None, None))


hub = BoardHub()


def _parse_uuid(value: str | None) -> UUID | None:
    try:
        return UUID(value) if value else None
    except ValueError:
        return None


def _origin_allowed(websocket: WebSocket) -> bool:
    origin = websocket.headers.get("origin")
    # Only browsers send an Origin, and only browsers can be tricked into
    # connecting from another site; scripts and tests connect without one.
    if origin is None:
        return True
    if ALLOWED_ORIGINS:
        return origin.rstrip("/") in ALLOWED_ORIGINS
    return urlsplit(origin).netloc == websocket.headers.get("host")


def _board_exists(board_id: UUID) -> bool:
    with SessionLocal() as db:
        return db.get(Board, board_id) is not None


async def _receive(websocket: WebSocket, member: Member) -> None:
    """Reads client frames until the client leaves or breaks the protocol."""
    while True:
        try:
            message = await asyncio.wait_for(websocket.receive(), RECEIVE_TIMEOUT_S)
        except asyncio.TimeoutError:
            member.close(CloseCode.HEARTBEAT_TIMEOUT, "heartbeat_timeout")
            return

        if message["type"] == "websocket.disconnect":
            return

        text = message.get("text")
        try:
            if text is None or len(text.encode()) > MAX_FRAME_BYTES:
                raise ValueError
            frame = json.loads(text)
            frame_type = frame["type"]
        except (ValueError, TypeError, KeyError):
            member.close(CloseCode.BAD_REQUEST, "bad_request")
            return

        # Clients send only pongs until drag and editing presence arrive.
        if frame_type != "pong":
            member.close(CloseCode.BAD_REQUEST, "bad_request")
            return


async def _ping(member: Member) -> None:
    while True:
        await asyncio.sleep(PING_INTERVAL_S)
        hub.send(member, "ping", {"nonce": uuid4().hex})


@router.websocket("/ws/boards/{board_id}")
async def board_socket(websocket: WebSocket, board_id: str, client_id: str | None = None):
    # Accept first: a browser cannot read why a handshake was refused, but it
    # can read the code and reason of a close frame.
    await websocket.accept()

    board_uuid = _parse_uuid(board_id)
    client_uuid = _parse_uuid(client_id)

    if not _origin_allowed(websocket):
        await websocket.close(CloseCode.ORIGIN_REJECTED, "origin_rejected")
        return
    if client_uuid is None:
        await websocket.close(CloseCode.BAD_REQUEST, "bad_request")
        return
    if board_uuid is None or not await run_in_threadpool(_board_exists, board_uuid):
        await websocket.close(CloseCode.BOARD_NOT_FOUND, "board_not_found")
        return

    try:
        member = hub.join(board_uuid, client_uuid, websocket)
    except BoardFullError:
        await websocket.close(CloseCode.BOARD_FULL, "board_full")
        return

    writer = asyncio.create_task(member.write())
    pinger = asyncio.create_task(_ping(member))

    try:
        await _receive(websocket, member)
    except WebSocketDisconnect:
        pass
    finally:
        pinger.cancel()
        hub.leave(member)

        if member.close_code is None:
            # The client closed the socket, so there is nothing left to send.
            writer.cancel()
        else:
            # Let the writer send the close frame; wait_for cancels it on timeout.
            try:
                await asyncio.wait_for(writer, CLOSE_TIMEOUT_S)
            except asyncio.TimeoutError:
                pass
