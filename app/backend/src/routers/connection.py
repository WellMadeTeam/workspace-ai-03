from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.backend.src.database import get_db
from app.backend.src.models import Connection, Widget
from app.backend.src.schemas.connection import ConnectionCreate, ConnectionResponse

connection_router = APIRouter(prefix="/connections", tags=["connections"])


def _validate_connection(db: Session, source_id: UUID, target_id: UUID) -> None:
    source = db.get(Widget, source_id)
    if not source:
        raise HTTPException(status_code=404, detail="Source widget not found")

    target = db.get(Widget, target_id)
    if not target:
        raise HTTPException(status_code=404, detail="Target widget not found")

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


@connection_router.get("/{widget_id}/connections", response_model=list[ConnectionResponse])
def get_widget_connections(
    widget_id: UUID,
    db: Session = Depends(get_db),
):
    widget = db.get(Widget, widget_id)
    if not widget:
        raise HTTPException(status_code=404, detail="Widget not found")

    connections = db.scalars(
        select(Connection).where(Connection.source_widget_id == widget_id)
    ).all()

    return list(connections)