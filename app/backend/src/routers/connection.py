from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from app.backend.src.database import get_db
from app.backend.src.models import Board, Connection, Widget
from app.backend.src.schemas.connection import ConnectionCreate, ConnectionResponse

connection_router = APIRouter(prefix="/connections", tags=["connections"])


def _validate_connection(db: Session, source_id: UUID, target_id: UUID) -> None:
    if source_id == target_id:
        raise HTTPException(
            status_code=400,
            detail="A widget cannot be connected to itself",
        )

    source = db.get(Widget, source_id)
    if not source:
        raise HTTPException(status_code=404, detail="Source widget not found")

    target = db.get(Widget, target_id)
    if not target:
        raise HTTPException(status_code=404, detail="Target widget not found")

    # The target's AI receives the source's content, so it must not leak across boards.
    if source.board_id != target.board_id:
        raise HTTPException(
            status_code=400,
            detail="Widgets must belong to the same board",
        )

    if source.widget_type == "ai" and target.widget_type == "text":
        raise HTTPException(
            status_code=400,
            detail="AI to Text connections are not allowed",
        )

    existing = db.scalar(
        select(Connection).where(
            Connection.source_widget_id == source_id,
            Connection.target_widget_id == target_id,
        )
    )
    if existing:
        raise HTTPException(status_code=409, detail="Connection already exists")


@connection_router.post("", response_model=ConnectionResponse, status_code=status.HTTP_201_CREATED)
def create_connection(
    data: ConnectionCreate,
    db: Session = Depends(get_db),
):
    _validate_connection(db, data.source_widget_id, data.target_widget_id)

    connection = Connection(
        source_widget_id=data.source_widget_id,
        target_widget_id=data.target_widget_id,
    )

    db.add(connection)
    db.commit()
    db.refresh(connection)

    return connection


@connection_router.delete("/{connection_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_connection(
    connection_id: UUID,
    db: Session = Depends(get_db),
):
    connection = db.get(Connection, connection_id)
    if not connection:
        raise HTTPException(status_code=404, detail="Connection not found")

    db.delete(connection)
    db.commit()


@connection_router.get("", response_model=list[ConnectionResponse])
def list_connections(
    board_id: UUID | None = Query(default=None, alias="boardId"),
    widget_id: UUID | None = Query(default=None, alias="widgetId"),
    db: Session = Depends(get_db),
):
    if (board_id is None) == (widget_id is None):
        raise HTTPException(
            status_code=400,
            detail="Exactly one of boardId or widgetId is required",
        )

    if board_id is not None:
        if db.get(Board, board_id) is None:
            raise HTTPException(status_code=404, detail="Board not found")

        # Both ends are on the same board, so filtering by the source is enough.
        statement = (
            select(Connection)
            .join(Widget, Connection.source_widget_id == Widget.id)
            .where(Widget.board_id == board_id)
        )
    else:
        if db.get(Widget, widget_id) is None:
            raise HTTPException(status_code=404, detail="Widget not found")

        statement = select(Connection).where(
            or_(
                Connection.source_widget_id == widget_id,
                Connection.target_widget_id == widget_id,
            )
        )

    return db.scalars(statement.order_by(Connection.created_at)).all()
