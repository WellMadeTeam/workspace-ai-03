from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.backend.src.database import get_db
from app.backend.src.models.board import Board
from app.backend.src.schemas.board import BoardCreate, BoardResponse


board_router = APIRouter(prefix="/boards", tags=["boards"])

@board_router.post("", response_model=BoardResponse, status_code=status.HTTP_201_CREATED)
def create_board(
    board_data: BoardCreate,
    db: Session = Depends(get_db),
):
    board = Board(title=board_data.title)

    db.add(board)
    db.commit()
    db.refresh(board)

    return board