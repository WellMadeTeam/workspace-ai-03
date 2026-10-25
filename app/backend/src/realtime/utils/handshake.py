"""The checks a new socket must pass before it joins a board."""

import os
from urllib.parse import urlsplit
from uuid import UUID

from fastapi import WebSocket

from app.backend.src.database import SessionLocal
from app.backend.src.models import Board


# Comma-separated origins allowed to open a socket; when unset, the Origin
# must match the Host the request was sent to.
ALLOWED_ORIGINS = {
    origin.strip().rstrip("/")
    for origin in os.getenv("WS_ALLOWED_ORIGINS", "").split(",")
    if origin.strip()
}


def parse_uuid(value: str | None) -> UUID | None:
    try:
        return UUID(value) if value else None
    except ValueError:
        return None


def origin_allowed(websocket: WebSocket) -> bool:
    origin = websocket.headers.get("origin")
    # Only browsers send an Origin, and only browsers can be tricked into
    # connecting from another site; scripts and tests connect without one.
    if origin is None:
        return True
    if ALLOWED_ORIGINS:
        return origin.rstrip("/") in ALLOWED_ORIGINS
    return urlsplit(origin).netloc == websocket.headers.get("host")


def board_exists(board_id: UUID) -> bool:
    """Blocking database call; run it in the threadpool."""
    with SessionLocal() as db:
        return db.get(Board, board_id) is not None
