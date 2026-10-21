"""One open socket on a board, and the queue its frames are sent through."""

import asyncio
from dataclasses import dataclass, field
from uuid import UUID

from fastapi import WebSocket

from realtime.utils.protocol import CloseCode


SEND_QUEUE_SIZE = 256

# One color per member slot, so the 10 members of a board never share one.
MEMBER_COLORS = [
    "#e5484d", "#f76b15", "#ffc53d", "#46a758", "#12a594",
    "#0090ff", "#3e63dd", "#8e4ec6", "#d6409f", "#8d8d8d",
]

# Put in the queue instead of a frame to make the writer close the socket.
_CLOSE = object()


@dataclass(eq=False)
class Member:
    """One open socket on a board.

    Frames are never sent directly: they are put in `queue`, and `write()`,
    which runs as its own task, is the only code that sends on the socket.
    That keeps the frames in order and stops a slow client from holding up
    whoever produced the frame.
    """

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
        """The member as other members see it in events."""
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
        """Sends the queued frames one by one until the socket is closed."""
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
