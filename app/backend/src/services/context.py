from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.backend.src.models import Connection, Widget


def get_context_for_ai(db: Session, ai_widget_id: UUID) -> list[str]:
    visited = set()
    queue = [ai_widget_id]
    context_parts = []

    while queue:
        current_id = queue.pop(0)
        if current_id in visited:
            continue
        visited.add(current_id)

        incoming = db.scalars(
            select(Connection).where(Connection.target_widget_id == current_id)
        ).all()

        for conn in incoming:
            source = db.get(Widget, conn.source_widget_id)
            if not source:
                continue

            if source.widget_type == "text" and source.content:
                context_parts.append(
                    f"[{source.title or 'Text Block'}]: {source.content}"
                )
            elif source.widget_type == "ai" and source.content:
                context_parts.append(
                    f"[{source.title or 'AI Block'}]: {source.content}"
                )
                queue.append(source.id)

    return context_parts