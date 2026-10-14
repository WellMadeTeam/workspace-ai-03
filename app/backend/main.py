from datetime import datetime
from uuid import UUID

from fastapi import Depends, FastAPI, status
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import Board
from widgets import router as widgets_router


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Workspace for AI Collaboration")

app.include_router(widgets_router)


class BoardCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)


class BoardResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID


@app.post("/boards", response_model=BoardResponse, status_code=status.HTTP_201_CREATED)
def create_board(
    board_data: BoardCreate,
    db: Session = Depends(get_db),
):
    board = Board(title=board_data.title)

    db.add(board)
    db.commit()
    db.refresh(board)

    return BoardResponse(id=board.id)
