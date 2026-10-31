from dataclasses import dataclass
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.backend.src.models import Connection, Message, Widget


@dataclass
class ContextDocument:
    id: UUID
    kind: str
    text: str


def get_context_for_ai(db: Session, ai_widget_id: UUID) -> list[ContextDocument]:
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
            if source.id not in added:
                document = build_document(db, source)
                if document:
                    added.add(source.id)
                    documents.append(document)

            queue.append(source.id)

    return documents


def build_document(db: Session, widget: Widget) -> ContextDocument | None:
    if widget.widget_type == "ai":
        text = build_conversation(db, widget.id)
        kind = "ai conversation"
    else:
        text = widget.content
        kind = "text"

    if not text:
        return None

    return ContextDocument(id=widget.id, kind=kind, text=text)


def build_conversation(db: Session, widget_id: UUID) -> str:
    # System messages are added by the product, such as the failure text, so
    # they are not part of the conversation.
    statement = (
        select(Message)
        .where(Message.widget_id == widget_id, Message.role != "system")
        .order_by(Message.created_at.asc(), Message.id.asc())
    )

    return "\n".join(
        f"{'AI' if message.role == 'ai' else 'User'}: {message.content}"
        for message in db.scalars(statement).all()
    )


def build_system_prompt(documents: list[ContextDocument]) -> str:
    prompt = (
        "You are a helpful assistant in Workspace "
        "for AI Collaboration. Be clear and concise."
    )

    if not documents:
        return prompt

    context = "\n".join(
        f'<doc id="{document.id}" type="{document.kind}">{document.text}</doc>'
        for document in documents
    )

    return (
        f"{prompt}\n\n"
        "Context from the widgets connected to this one:\n"
        f"{context}\n\n"
        "If you use context from a connected widget, add its id "
        "to the references array."
    )
