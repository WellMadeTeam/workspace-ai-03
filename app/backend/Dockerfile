FROM python:3.14-alpine

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DATABASE_URL=sqlite:////data/workspace.db

WORKDIR /srv

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# The code imports itself as app.backend.src, as from the repository root.
COPY src app/backend/src

# The database lives in /data, which docker-compose mounts as a volume.
RUN adduser -D -H app && mkdir /data && chown app /data
USER app

EXPOSE 8000

# nginx serves the API under /api, so the docs must request /api/openapi.json.
CMD ["uvicorn", "app.backend.src.main:app", "--host", "0.0.0.0", "--port", "8000", "--root-path", "/api"]

