from typing import Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator


WidgetType = Literal["text", "ai"]


class WidgetCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    board_id: UUID
    widget_type: WidgetType
    x: float
    y: float


class WidgetUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=200)
    content: str | None = None
    x: float | None = None
    y: float | None = None

    @field_validator("x", "y")
    @classmethod
    def position_not_null(cls, value: float | None) -> float:
        if value is None:
            raise ValueError("Position cannot be null")
        return value


class WidgetResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    widget_type: WidgetType
    title: str | None
    content: str | None
    x: float
    y: float


class WidgetListResponse(BaseModel):
    items: list[WidgetResponse]