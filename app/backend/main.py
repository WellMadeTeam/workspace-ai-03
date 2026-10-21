import logging
from typing import Literal
from uuid import UUID

from fastapi import Depends, FastAPI, HTTPException, Query, status
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy import select
from sqlalchemy.orm import Session
from ai_service import generate_reply

from database import Base, engine, get_db
from models import Board, Message, Widget
from widgets import router as widgets_router


Base.metadata.create_all(bind=engine)

logger = logging.getLogger(__name__)

# Shown to every member of the board when the LLM fails to answer. It must not
# expose technical details, those go to the server log.
AI_FAILURE_MESSAGE = (
    "The AI couldn't answer this query. Please try again in a moment."
)

app = FastAPI(title="Workspace for AI Collaboration")

app.include_router(widgets_router)


class BoardCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)


class BoardResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID

class MessageCreate(BaseModel):
    widget_id: UUID
    content: str = Field(min_length=1)


class MessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    widget_id: UUID
    # "system" messages come from the application, not the AI, and are never
    # sent to the LLM.
    role: Literal["user", "ai", "system"]
    content: str


class MessageListResponse(BaseModel):
    items: list[MessageResponse]


class MessageCreateResponse(BaseModel):
    user_message: MessageResponse
    # The AI answer, or a "system" message if the LLM failed to answer.
    reply: MessageResponse


@app.post("/boards", response_model=BoardResponse, status_code=status.HTTP_201_CREATED)
def create_board(
    board_data: BoardCreate,
    db: Session = Depends(get_db),
):
    board = Board(title=board_data.title)

    db.add(board)
    db.commit()
    db.refresh(board)

    return BoardResponse(id=board.id)


@app.post(
    "/messages",
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


@app.get(
    "/messages",
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