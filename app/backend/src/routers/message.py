from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.backend.src.database import get_db
from app.backend.src.schemas.message import MessageCreate, MessageCreateResponse, MessageListResponse
from app.backend.src.services.ai_service import generate_reply
from app.backend.src.models import Message, Widget
from app.backend.src.services.context import get_context_for_ai


message_router = APIRouter(prefix="/messages", tags=["messages"])


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
            "role": "user",
            "content": message_data.content,
        }
    ]

    for message in history:
        ai_role = (
            "assistant"
            if message.role == "ai"
            else "user"
        )

        ai_messages.append({
            "role": ai_role,
            "content": message.content,
        })

    documents = get_context_for_ai(db, message_data.widget_id)

    has_context = len(documents) > 0

    try:
        answer, references = generate_reply(ai_messages, documents=documents)
    except Exception as exc:
        raise HTTPException(
            status_code=502,
            detail=(
                "AI provider request failed. "
                "The user message was saved."
            ),
        ) from exc

    ai_message = Message(
        widget_id=message_data.widget_id,
        role="ai",
        content=answer,
    )

    db.add(ai_message)
    db.commit()
    db.refresh(ai_message)

    return {
        "user_message": user_message,
        "ai_message": ai_message,
        "has_context": has_context,
        "references": references,
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