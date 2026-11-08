import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent  # app/backend/
load_dotenv(BASE_DIR / ".env")

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

ANALYTICS_ENABLED = os.getenv("ANALYTICS_ENABLED", "false").lower() == "true"
OPENPANEL_API_URL = os.getenv("OPENPANEL_API_URL", "").rstrip("/")
OPENPANEL_CLIENT_ID = os.getenv("OPENPANEL_CLIENT_ID", "")
OPENPANEL_CLIENT_SECRET = os.getenv("OPENPANEL_CLIENT_SECRET", "")
