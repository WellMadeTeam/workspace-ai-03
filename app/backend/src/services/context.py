import logging
from dataclasses import dataclass
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.backend.src.models import Connection, Message, Widget
from app.backend.src.services.ai_service import summarize_conversation


logger = logging.getLogger(__name__)

# The provider allows about 8K tokens a minute for the summary and the query
# together, and a token is about 4 characters. A longer conversation is
# summarized, and only its most recent part is given to the summary.
MAX_CONVERSATION_CHARS = 6000
MAX_SUMMARY_INPUT_CHARS = 12000

OMITTED_NOTE = "[Earlier messages omitted]"

# The latest summary of each AI widget, with the ids of its messages then, so
# a new or deleted message in the widget makes the summary stale.
summary_cache: dict[UUID, tuple[tuple[UUID, ...], str]] = {}


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
        return build_conversation_document(db, widget.id)

    if not widget.content:
        return None

    return ContextDocument(id=widget.id, kind="text", text=widget.content)


def build_conversation_document(
    db: Session,
    widget_id: UUID,
) -> ContextDocument | None:
    # System messages are added by the product, such as the failure text, so
    # they are not part of the conversation.
    statement = (
        select(Message)
        .where(Message.widget_id == widget_id, Message.role != "system")
        .order_by(Message.created_at.asc(), Message.id.asc())
    )
    messages = db.scalars(statement).all()

    if not messages:
        return None

    lines = [
        f"{'AI' if message.role == 'ai' else 'User'}: {message.content}"
        for message in messages
    ]
    text = "\n".join(lines)

    if len(text) <= MAX_CONVERSATION_CHARS:
        return ContextDocument(id=widget_id, kind="ai conversation", text=text)

    message_ids = tuple(message.id for message in messages)
    cached = summary_cache.get(widget_id)
    if cached and cached[0] == message_ids:
        return ContextDocument(
            id=widget_id,
            kind="ai conversation summary",
            text=cached[1],
        )

    try:
        summary = summarize_conversation(
            keep_recent(lines, MAX_SUMMARY_INPUT_CHARS)
        )
    except Exception:
        # The query is still answered, with the most recent part instead.
        logger.exception("The LLM failed to summarize a conversation")
        return ContextDocument(
            id=widget_id,
            kind="ai conversation",
            text=keep_recent(lines, MAX_CONVERSATION_CHARS),
        )

    summary_cache[widget_id] = (message_ids, summary)

    return ContextDocument(
        id=widget_id,
        kind="ai conversation summary",
        text=summary,
    )


def keep_recent(lines: list[str], limit: int) -> str:
    """The most recent lines that fit in limit, noting any that were left out."""
    text = "\n".join(lines)
    if len(text) <= limit:
        return text

    kept = []
    size = len(OMITTED_NOTE) + 1

    for line in reversed(lines):
        if size + len(line) + 1 > limit:
            break
        kept.append(line)
        size += len(line) + 1

    # The newest message alone is too long, so only its end is kept.
    if not kept:
        kept.append(lines[-1][-(limit - len(OMITTED_NOTE) - 1):])

    return "\n".join([OMITTED_NOTE, *reversed(kept)])


def build_system_prompt(documents: list[ContextDocument]) -> str:
    prompt = (
        "You are a helpful assistant in Workspace "
        "for AI Collaboration. Be clear and concise.\n\n"
        # The frontend renders only these fenced blocks as diagrams.
        "When a diagram helps, write it in Mermaid inside a fenced code "
        "block that opens with ```mermaid on its own line and closes with "
        "``` on its own line. Put one diagram in each block, and never draw "
        "a diagram in any other syntax."
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
