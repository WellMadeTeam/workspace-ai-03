from typing import Literal
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy import delete, or_, select
from sqlalchemy.orm import Session

from database import get_db
from models import Board, Connection, Message, Widget


router = APIRouter(prefix="/widgets", tags=["widgets"])

WidgetType = Literal["text", "ai"]


class WidgetCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    board_id: UUID
    widget_type: WidgetType
    x: float
    y: float


class WidgetResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    widget_type: WidgetType
    title: str | None
    content: str | None
    x: float
    y: float


class WidgetListResponse(BaseModel):
    items: list[WidgetResponse]


def ensure_board_exists(db: Session, board_id: UUID) -> None:
    if db.get(Board, board_id) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Board not found")


@router.get("", response_model=WidgetListResponse)
def list_widgets(
    board_id: UUID = Query(alias="boardId"),
    db: Session = Depends(get_db),
):
    ensure_board_exists(db, board_id)

    widgets = db.scalars(
        select(Widget).where(Widget.board_id == board_id).order_by(Widget.created_at)
    ).all()

    return WidgetListResponse(items=widgets)


@router.post("", response_model=WidgetResponse, status_code=status.HTTP_201_CREATED)
def create_widget(
    widget_data: WidgetCreate,
    db: Session = Depends(get_db),
):
    ensure_board_exists(db, widget_data.board_id)

    widget = Widget(**widget_data.model_dump())

    db.add(widget)
    db.commit()
    db.refresh(widget)

    return widget


@router.delete("/{widget_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_widget(
    widget_id: UUID,
    db: Session = Depends(get_db),
):
    widget = db.get(Widget, widget_id)
    if widget is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Widget not found")

    # Remove rows that reference the widget so no orphans are left behind.
    db.execute(delete(Message).where(Message.widget_id == widget_id))
    db.execute(
        delete(Connection).where(
            or_(
                Connection.source_widget_id == widget_id,
                Connection.target_widget_id == widget_id,
            )
        )
    )
    db.delete(widget)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)
