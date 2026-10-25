from typing import Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class MessageCreate(BaseModel):
    widget_id: UUID
    content: str = Field(min_length=1)


class MessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    widget_id: UUID
    role: Literal["user", "ai"]
    content: str
    has_context: bool = False
    references: list[dict] | None = None


class MessageListResponse(BaseModel):
    items: list[MessageResponse]


class MessageCreateResponse(BaseModel):
    user_message: MessageResponse
    ai_message: MessageResponse
