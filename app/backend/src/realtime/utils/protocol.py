"""What goes over the wire: close codes and the envelope of every event."""

import json
from datetime import datetime, timezone
from enum import IntEnum
from typing import Any
from uuid import UUID


class CloseCode(IntEnum):
    BAD_REQUEST = 4400
    ORIGIN_REJECTED = 4403
    BOARD_NOT_FOUND = 4404
    HEARTBEAT_TIMEOUT = 4408
    REPLACED = 4409
    BOARD_FULL = 4429
    TOO_SLOW = 4430


def build_frame(
    board_id: UUID,
    event_type: str,
    data: dict[str, Any],
    seq: int | None,
    origin: UUID | None,
) -> str:
    """Serializes an event into the envelope every server frame uses."""
    return json.dumps({
        "type": event_type,
        "board_id": str(board_id),
        "seq": seq,
        "origin": str(origin) if origin else None,
        "sent_at": datetime.now(timezone.utc).isoformat(timespec="milliseconds"),
        "data": data,
    })
