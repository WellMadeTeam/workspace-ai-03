"""The board WebSocket endpoint: one call of `board_socket` per open socket."""

import asyncio

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from starlette.concurrency import run_in_threadpool

from realtime.hub import BoardFullError, hub
from realtime.utils.connection import ping_periodically, receive_frames
from realtime.utils.handshake import board_exists, origin_allowed, parse_uuid
from realtime.utils.protocol import CloseCode


router = APIRouter(tags=["realtime"])

CLOSE_TIMEOUT_S = 5


@router.websocket("/ws/boards/{board_id}")
async def board_socket(websocket: WebSocket, board_id: str, client_id: str | None = None):
    # Accept first: a browser cannot read why a handshake was refused, but it
    # can read the code and reason of a close frame.
    await websocket.accept()

    board_uuid = parse_uuid(board_id)
    client_uuid = parse_uuid(client_id)

    if not origin_allowed(websocket):
        await websocket.close(CloseCode.ORIGIN_REJECTED, "origin_rejected")
        return
    if client_uuid is None:
        await websocket.close(CloseCode.BAD_REQUEST, "bad_request")
        return
    if board_uuid is None or not await run_in_threadpool(board_exists, board_uuid):
        await websocket.close(CloseCode.BOARD_NOT_FOUND, "board_not_found")
        return

    try:
        member = hub.join(board_uuid, client_uuid, websocket)
    except BoardFullError:
        await websocket.close(CloseCode.BOARD_FULL, "board_full")
        return

    writer = asyncio.create_task(member.write())
    pinger = asyncio.create_task(ping_periodically(member))

    try:
        await receive_frames(websocket, member)
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
