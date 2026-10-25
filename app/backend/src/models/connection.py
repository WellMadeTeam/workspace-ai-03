import uuid
from datetime import datetime
from uuid import UUID

from sqlalchemy import (
    DateTime,
    ForeignKey,
    UniqueConstraint,
    Uuid,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.backend.src.database import Base


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