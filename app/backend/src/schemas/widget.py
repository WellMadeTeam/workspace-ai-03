from typing import Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

from app.backend.src.schemas.connection import ConnectionResponse


# An image widget shows a diagram, and its content is the Mermaid code.
WidgetType = Literal["text", "ai", "image"]


class WidgetCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    board_id: UUID
    widget_type: WidgetType
    content: str | None = None
    x: float
    y: float

    @model_validator(mode="after")
    def image_has_content(self) -> "WidgetCreate":
        # An image widget is added together with its diagram.
        if self.widget_type == "image" and not self.content:
            raise ValueError("An image widget needs content")
        return self


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


class WidgetCopyItem(BaseModel):
    source_widget_id: UUID
    x: float = Field(allow_inf_nan=False)
    y: float = Field(allow_inf_nan=False)


class WidgetCopy(BaseModel):
    board_id: UUID
    items: list[WidgetCopyItem] = Field(min_length=1)
    connection_ids: list[UUID] = Field(default_factory=list)

    @model_validator(mode="after")
    def unique_sources(self) -> "WidgetCopy":
        ids = [item.source_widget_id for item in self.items]
        if len(ids) != len(set(ids)):
            raise ValueError("Source widgets must be unique")
        if len(self.connection_ids) != len(set(self.connection_ids)):
            raise ValueError("Connections must be unique")
        return self


class WidgetCopyResponse(BaseModel):
    items: list[WidgetResponse]
    connections: list[ConnectionResponse]
