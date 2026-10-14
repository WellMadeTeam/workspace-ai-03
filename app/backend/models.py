import uuid
from datetime import datetime
from uuid import UUID

from sqlalchemy import (
    DateTime,
    Float,
    ForeignKey,
    Index,
    String,
    Text,
    UniqueConstraint,
    Uuid,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class Board(Base):
    __tablename__ = "boards"

    id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    title: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )


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

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
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


class Connection(Base):
    __tablename__ = "connections"

    id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    source_widget_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True),
        ForeignKey("widgets.id"),
        nullable=False,
    )

    target_widget_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True),
        ForeignKey("widgets.id"),
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    __table_args__ = (
        UniqueConstraint(
            "source_widget_id",
            "target_widget_id",
            name="uq_connection_pair",
        ),
    )