import logging
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.backend.src.database import get_db
from app.backend.src.schemas.message import MessageCreate, MessageCreateResponse, MessageListResponse
from app.backend.src.services.ai_service import generate_reply
from app.backend.src.models import Message, Widget


logger = logging.getLogger(__name__)

message_router = APIRouter(prefix="/messages", tags=["messages"])

# Shown to every member of the board when the LLM fails to answer. It must not
# expose technical details, those go to the server log.
AI_FAILURE_MESSAGE = (
    "The AI couldn't answer this query. Please try again in a moment."
)


@message_router.post(
    "",
    response_model=MessageCreateResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_message(
    message_data: MessageCreate,
    db: Session = Depends(get_db),
):
    widget = db.get(Widget, message_data.widget_id)

    if widget is None:
        raise HTTPException(
            status_code=404,
            detail="Widget not found",
        )

    if widget.widget_type != "ai":
        raise HTTPException(
            status_code=400,
            detail="Messages with AI are only supported for AI widgets",
        )

    user_message = Message(
        widget_id=message_data.widget_id,
        role="user",
        content=message_data.content,
    )

    db.add(user_message)
    db.commit()
    db.refresh(user_message)

    statement = (
        select(Message)
        .where(Message.widget_id == message_data.widget_id)
        .order_by(Message.created_at.asc(), Message.id.asc())
    )

    history = db.scalars(statement).all()

    ai_messages = [
        {
            "role": "system",
            "content": (
                "You are a helpful assistant in Workspace "
                "for AI Collaboration. Be clear and concise."
            ),
        }
    ]

    for message in history:
        if message.role == "system":
            continue

        ai_role = (
            "assistant"
            if message.role == "ai"
            else "user"
        )

        ai_messages.append({
            "role": ai_role,
            "content": message.content,
        })

    # The failure is saved as a message, so every member of the board sees it.
    try:
        reply = Message(
            widget_id=message_data.widget_id,
            role="ai",
            content=generate_reply(ai_messages),
        )
    except Exception:
        logger.exception("The LLM failed to answer a query")
        reply = Message(
            widget_id=message_data.widget_id,
            role="system",
            content=AI_FAILURE_MESSAGE,
        )

    db.add(reply)
    db.commit()
    db.refresh(reply)

    return {
        "user_message": user_message,
        "reply": reply,
    }


@message_router.get(
    "",
    response_model=MessageListResponse,
)
def get_messages(
    widget_id: UUID = Query(..., alias="widgetId"),
    db: Session = Depends(get_db),
):
    widget = db.get(Widget, widget_id)

    if widget is None:
        raise HTTPException(
            status_code=404,
            detail="Widget not found",
        )
    
    statement = (
        select(Message)
        .where(Message.widget_id == widget_id)
        .order_by(Message.created_at.asc())
    )

    messages = db.scalars(statement).all()

    return {"items": messages}