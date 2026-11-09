import logging
from typing import Literal

import httpx
from fastapi import BackgroundTasks

from app.backend.src.config import (
    ANALYTICS_ENABLED,
    OPENPANEL_API_URL,
    OPENPANEL_CLIENT_ID,
    OPENPANEL_CLIENT_SECRET,
)


logger = logging.getLogger(__name__)

AnalyticsSource = Literal["web", "usability-test", "smoke"]

_configuration_warning_logged = False


def queue_event(
    background_tasks: BackgroundTasks,
    name: str,
    properties: dict[str, str | bool],
    source: AnalyticsSource,
) -> None:
    """Send product events after the request without delaying its response."""
    if ANALYTICS_ENABLED:
        background_tasks.add_task(send_event, name, properties, source)


def send_event(
    name: str,
    properties: dict[str, str | bool],
    source: AnalyticsSource,
) -> None:
    global _configuration_warning_logged

    if not ANALYTICS_ENABLED:
        return

    if not all((OPENPANEL_API_URL, OPENPANEL_CLIENT_ID, OPENPANEL_CLIENT_SECRET)):
        if not _configuration_warning_logged:
            logger.warning(
                "Analytics is enabled but OpenPanel configuration is incomplete"
            )
            _configuration_warning_logged = True
        return

    payload: dict[str, object] = {
        "name": name,
        "properties": {**properties, "source": source},
    }
    # OpenPanel counts distinct groups but not distinct property values, so the
    # board is the event's group for the board-count metrics.
    board_id = properties.get("board_id")
    if isinstance(board_id, str) and board_id:
        payload["groups"] = [board_id]

    try:
        response = httpx.post(
            f"{OPENPANEL_API_URL}/track",
            headers={
                "openpanel-client-id": OPENPANEL_CLIENT_ID,
                "openpanel-client-secret": OPENPANEL_CLIENT_SECRET,
            },
            json={"type": "track", "payload": payload},
            timeout=2.0,
        )
        response.raise_for_status()
    except Exception:
        # Analytics is optional; a collector outage must not break the product.
        logger.warning("Could not send analytics event %s to OpenPanel", name)
