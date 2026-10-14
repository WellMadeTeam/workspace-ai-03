from fastapi import FastAPI

import models  # noqa: F401  registers tables on Base.metadata
from database import Base, engine
from widgets import router as widgets_router


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Workspace for AI Collaboration")

app.include_router(widgets_router)
