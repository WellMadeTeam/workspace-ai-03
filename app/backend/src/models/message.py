import uuid
from datetime import datetime, timezone
from uuid import UUID

from sqlalchemy import (
    JSON,
    Boolean,
    DateTime,
    ForeignKey,
    Index,
    String,
    Text,
    Uuid,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.backend.src.database import Base


class Message(Base):
    __tablename__ = "messages"

    id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    widget_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True),
        ForeignKey("widgets.id"),
        nullable=False,
    )

    role: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    content: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    # Which connected widgets were passed to the AI for this reply (AI messages only).
    has_context: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    references: Mapped[list[dict] | None] = mapped_column(
        JSON,
        nullable=True,
    )

    # Set in Python because SQLite's now() has a one-second resolution, and a
    # failed query and its system message are often saved within one second.
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        server_default=func.now(),
        nullable=False,
    )

    __table_args__ = (
        Index(
            "ix_messages_widget_id_created_at",
            "widget_id",
            "created_at",
        ),
    )