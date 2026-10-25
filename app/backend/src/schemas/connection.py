from uuid import UUID

from pydantic import BaseModel, ConfigDict


class ConnectionCreate(BaseModel):
    source_widget_id: UUID
    target_widget_id: UUID


class ConnectionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    source_widget_id: UUID
    target_widget_id: UUID