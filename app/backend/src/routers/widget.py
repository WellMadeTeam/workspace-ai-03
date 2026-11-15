from datetime import timedelta
from uuid import UUID

from fastapi import (
    APIRouter,
    BackgroundTasks,
    Depends,
    Header,
    HTTPException,
    Query,
    Response,
    status,
)
from sqlalchemy import delete, or_, select
from sqlalchemy.orm import Session

from app.backend.src.database import get_db
from app.backend.src.models import Board, Connection, Message, Widget
from app.backend.src.schemas.widget import (
    WidgetCopy, WidgetCopyResponse, WidgetCreate, WidgetListResponse,
    WidgetResponse, WidgetUpdate,
)
from app.backend.src.services.analytics import AnalyticsSource, queue_event


widget_router = APIRouter(prefix="/widgets", tags=["widgets"])


def ensure_board_exists(db: Session, board_id: UUID) -> None:
    if db.get(Board, board_id) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Board not found")


@widget_router.get("", response_model=WidgetListResponse)
def list_widgets(
    board_id: UUID = Query(alias="boardId"),
    db: Session = Depends(get_db),
):
    ensure_board_exists(db, board_id)

    widgets = db.scalars(
        select(Widget).where(Widget.board_id == board_id).order_by(Widget.created_at)
    ).all()

    return WidgetListResponse(items=widgets)


@widget_router.post("", response_model=WidgetResponse, status_code=status.HTTP_201_CREATED)
def create_widget(
    widget_data: WidgetCreate,
    background_tasks: BackgroundTasks,
    source: AnalyticsSource = Header(default="web", alias="X-Analytics-Source"),
    db: Session = Depends(get_db),
):
    ensure_board_exists(db, widget_data.board_id)

    widget = Widget(**widget_data.model_dump())

    db.add(widget)
    db.commit()
    db.refresh(widget)

    if widget.widget_type == "ai":
        queue_event(
            background_tasks,
            "ai_block_created",
            {"board_id": str(widget.board_id), "widget_id": str(widget.id)},
            source,
        )

    return widget


@widget_router.post(
    "/copy", response_model=WidgetCopyResponse, status_code=status.HTTP_201_CREATED
)
def copy_widgets(
    data: WidgetCopy,
    background_tasks: BackgroundTasks,
    source: AnalyticsSource = Header(default="web", alias="X-Analytics-Source"),
    db: Session = Depends(get_db),
):
    ensure_board_exists(db, data.board_id)
    sources: dict[UUID, Widget] = {}
    for item in data.items:
        widget = db.get(Widget, item.source_widget_id)
        if widget is None:
            raise HTTPException(status_code=404, detail="Source widget not found")
        if widget.board_id != data.board_id:
            raise HTTPException(
                status_code=400, detail="Widgets must belong to the board"
            )
        sources[widget.id] = widget

    connections: list[Connection] = []
    for connection_id in data.connection_ids:
        connection = db.get(Connection, connection_id)
        if connection is None:
            raise HTTPException(status_code=404, detail="Connection not found")
        if (
            connection.source_widget_id not in sources
            or connection.target_widget_id not in sources
        ):
            raise HTTPException(
                status_code=400, detail="Both connection endpoints must be copied"
            )
        connections.append(connection)

    copies: dict[UUID, Widget] = {}
    for item in data.items:
        original = sources[item.source_widget_id]
        copy = Widget(
            board_id=data.board_id,
            widget_type=original.widget_type,
            title=original.title,
            content=original.content,
            x=item.x,
            y=item.y,
        )
        db.add(copy)
        copies[original.id] = copy
    db.flush()

    for original_id, copy in copies.items():
        if copy.widget_type != "ai":
            continue
        history = db.scalars(
            select(Message)
            .where(Message.widget_id == original_id)
            .order_by(Message.created_at, Message.id)
        ).all()
        previous_time = None
        for message in history:
            # New random IDs must not reorder messages with equal timestamps.
            created_at = message.created_at
            if previous_time is not None and created_at <= previous_time:
                created_at = previous_time + timedelta(microseconds=1)
            db.add(
                Message(
                    widget_id=copy.id,
                    role=message.role,
                    content=message.content,
                    has_context=message.has_context,
                    references=list(message.references),
                    created_at=created_at,
                )
            )
            previous_time = created_at

    copied_connections = [
        Connection(
            source_widget_id=copies[connection.source_widget_id].id,
            target_widget_id=copies[connection.target_widget_id].id,
        )
        for connection in connections
    ]
    db.add_all(copied_connections)
    db.commit()

    for copy in copies.values():
        if copy.widget_type == "ai":
            queue_event(
                background_tasks,
                "ai_block_created",
                {"board_id": str(copy.board_id), "widget_id": str(copy.id)},
                source,
            )
    for connection in copied_connections:
        queue_event(
            background_tasks,
            "connection_created",
            {
                "board_id": str(data.board_id),
                "source_widget_id": str(connection.source_widget_id),
                "target_widget_id": str(connection.target_widget_id),
            },
            source,
        )
    return WidgetCopyResponse(
        items=list(copies.values()), connections=copied_connections
    )


@widget_router.put("/{widget_id}", response_model=WidgetResponse)
def update_widget(
    widget_id: UUID,
    widget_data: WidgetUpdate,
    db: Session = Depends(get_db),
):
    widget = db.get(Widget, widget_id)
    if widget is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Widget not found")

    # Only apply fields the client sent, so position, title and content can be updated independently.
    for field, value in widget_data.model_dump(exclude_unset=True).items():
        setattr(widget, field, value)

    db.commit()
    db.refresh(widget)

    return widget


@widget_router.delete("/{widget_id}", status_code=status.HTTP_204_NO_CONTENT)
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


@widget_router.post("/{widget_id}/clear", status_code=status.HTTP_204_NO_CONTENT)
def clear_widget(widget_id: UUID, db: Session = Depends(get_db)):
    widget = db.get(Widget, widget_id)
    if widget is None:
        raise HTTPException(status_code=404, detail="Widget not found")
    if widget.widget_type == "ai":
        db.execute(delete(Message).where(Message.widget_id == widget_id))
    else:
        widget.content = ""
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
