"""The two loops that run while a member is connected: reading frames and pinging."""

import asyncio
import json
from uuid import uuid4

from fastapi import WebSocket

from app.backend.src.realtime.hub import hub
from app.backend.src.realtime.member import Member
from app.backend.src.realtime.utils.protocol import CloseCode


PING_INTERVAL_S = 25
# A client that sends nothing, not even a pong, for this long is treated as gone.
RECEIVE_TIMEOUT_S = 60
MAX_FRAME_BYTES = 4096


async def receive_frames(websocket: WebSocket, member: Member) -> None:
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


async def ping_periodically(member: Member) -> None:
    while True:
        await asyncio.sleep(PING_INTERVAL_S)
        hub.send(member, "ping", {"nonce": uuid4().hex})
