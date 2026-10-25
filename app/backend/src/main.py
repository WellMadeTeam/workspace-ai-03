from fastapi import FastAPI

from app.backend.src.database import Base, engine
from app.backend.src.realtime import router as realtime_router
from app.backend.src.routers.board import board_router
from app.backend.src.routers.message import message_router
from app.backend.src.routers.widget import widget_router
from app.backend.src.routers.connection import connection_router


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Workspace for AI Collaboration")


app.include_router(board_router)
app.include_router(message_router)
app.include_router(widget_router)
app.include_router(connection_router)
app.include_router(realtime_router)