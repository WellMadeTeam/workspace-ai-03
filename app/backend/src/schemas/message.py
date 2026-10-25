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


class MessageListResponse(BaseModel):
    items: list[MessageResponse]


class MessageCreateResponse(BaseModel):
    user_message: MessageResponse
    ai_message: MessageResponse
    has_context: bool