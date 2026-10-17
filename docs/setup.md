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

1. Open `http://localhost` in a browser. A new board is created, and its id appears in the address bar, such as `http://localhost/?board=<id>`.
2. Copy that whole address and open it in a second browser window, as a second teammate. Opening `http://localhost` again without the `?board=` part creates another, empty board.
3. In the first window, add an AI block with the **AI** button of the toolbar at the bottom.
4. Click the AI block to open its messages panel on the right, type a query to the language model, and send it.
5. Wait for the response: it appears in the messages panel under the query.
6. In the second window, check that the same AI block appears within a few seconds, then click it and check that its panel shows the same query and response.

## Checks and tests

The product has no automated tests yet.

Every pull request and every push to `main` runs two checks, whose workflows are in `.github/workflows/`, and their results show on the pull request page:

- The link check (`lychee.yml`) fails on broken links in the Markdown files.
- The Markdown check (`markdown.yml`) runs `markdownlint-cli2` with the rules in `.markdownlint-cli2.jsonc`.

To run the same checks locally, from the repository root, with Node.js and [lychee](https://lychee.cli.rs/) installed:

```bash
npx markdownlint-cli2 "**/*.md"
lychee --no-progress './**/*.md'
```

To lint, type-check, and build the frontend locally, from the repository root, with Node.js 22 or later:

```bash
cd app/frontend
npm ci
npm run lint
npm run build
```
