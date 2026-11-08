from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.backend.src.config import GROQ_API_KEY
from app.backend.src.database import Base, engine
from app.backend.src.observability import (
    configure_observability,
    observe_http_request,
    shutdown_observability,
)
from app.backend.src.realtime import router as realtime_router
from app.backend.src.routers.board import board_router
from app.backend.src.routers.connection import connection_router
from app.backend.src.routers.message import message_router
from app.backend.src.routers.widget import widget_router


Base.metadata.create_all(bind=engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    if not GROQ_API_KEY:
        raise RuntimeError("GROQ_API_KEY not found. Check backend/.env")

    telemetry = configure_observability()
    app.state.telemetry = telemetry

    try:
        yield
    finally:
        shutdown_observability(telemetry)


app = FastAPI(
    title="Workspace for AI Collaboration",
    lifespan=lifespan,
)

app.middleware("http")(observe_http_request)

app.include_router(board_router)
app.include_router(message_router)
app.include_router(widget_router)
app.include_router(connection_router)
app.include_router(realtime_router)