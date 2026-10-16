FROM python:3.11-alpine

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DATABASE_URL=sqlite:////data/workspace.db

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# The database lives in /data, which docker-compose mounts as a volume.
RUN adduser -D -H app && mkdir /data && chown app /data
USER app

EXPOSE 8000

# nginx serves the API under /api, so the docs must request /api/openapi.json.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--root-path", "/api"]
