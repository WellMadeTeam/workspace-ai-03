"""Board WebSocket: the handshake, the member limit and broadcasting to members.

The hub lives in this process's memory, so the backend must run as one process.

- router.py: the WebSocket endpoint, which ties the other modules together
- hub.py: who is connected to each board, and sending events to them
- member.py: one open socket and its send queue
- utils/handshake.py: the checks a new socket must pass
- utils/connection.py: reading client frames and the heartbeat
- utils/protocol.py: close codes and the event envelope
"""

from app.backend.src.realtime.router import router

__all__ = ["router"]
