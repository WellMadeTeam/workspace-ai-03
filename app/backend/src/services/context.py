from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.backend.src.models import Connection, Widget


def get_context_for_ai(db: Session, ai_widget_id: UUID) -> list[dict]:
    visited = set()
    added = set()
    queue = [ai_widget_id]
    documents = []

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

            # A widget reached by several paths is sent to the AI only once.
            if source.content and source.id not in added:
                added.add(source.id)
                documents.append({
                    "id": str(source.id),
                    "source": {
                        "text": source.content,
                        "type": "text",
                    },
                })

            if source.widget_type == "ai":
                queue.append(source.id)

    return documents
