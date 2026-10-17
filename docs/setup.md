# Setup and run

This page takes a clean checkout to a running product. Follow it from top to bottom.

## Prerequisites

- Git
- Docker with Docker Compose (Docker Desktop includes both)
- A Groq API key, created in the Groq console
- Port 80 free on your machine, or another port set as described below

## Install

```bash
git clone https://github.com/WellMadeTeam/workspace-ai-03.git
cd workspace-ai-03/app
```

Nothing else needs installing: Docker builds the backend and the frontend.

## Configure

The backend reads its settings from `backend/.env`. Create it from the example:

```bash
cp backend/.env.example backend/.env
```

Open `backend/.env` and put your Groq API key in place of the placeholder:

```text
GROQ_API_KEY="your key"
```

Never commit `backend/.env`: it is ignored by git and holds your secret key.

The database path needs no configuration. The backend stores a SQLite database in a Docker volume, so the data survives restarts.

To use a port other than 80, set `HTTP_PORT` when you start the product, for example `HTTP_PORT=8080 docker compose up --build`.

## Run

```bash
docker compose up --build
```

The first start builds the images and takes a few minutes. When it finishes, open `http://localhost` in a browser (add the port if you changed it).

The only public entry point is nginx: it serves the frontend and passes everything under `/api` to the backend. The interactive API documentation is at `http://localhost/api/docs`.

To stop the product, press Ctrl+C, or run `docker compose down` in another terminal. To also delete the stored data, run `docker compose down -v`.

## Complete the core task

1. Open the board in two browser windows, as two teammates.
2. In the first window, create a widget and type a query to the language model.
3. Wait for the response: it appears in the widget.
4. In the second window, check that the same widget with the same query and response is visible.

## Checks and tests

The product has no automated tests yet.

Every pull request runs a link check that fails on broken links in the Markdown files. Its results show on the pull request page, and its workflow is in `.github/workflows/`.
