import uuid
from datetime import datetime
from uuid import UUID

from sqlalchemy import (
    DateTime,
    Float,
    ForeignKey,
    String,
    Text,
    Uuid,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.backend.src.database import Base


class Widget(Base):
    __tablename__ = "widgets"

    id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    board_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True),
        ForeignKey("boards.id"),
        nullable=False,
    )

    widget_type: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    title: Mapped[str | None] = mapped_column(
        String(200),
        nullable=True,
    )

    content: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    x: Mapped[float] = mapped_column(
        Float,
        default=0.0,
        nullable=False,
    )

    y: Mapped[float] = mapped_column(
        Float,
        default=0.0,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )