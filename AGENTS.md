# Agent Instructions

The course requirements are routed from [`SKILL.md`](https://github.com/inno-itpd/itpd/blob/main/SKILL.md); read the rule before you change anything it checks.
The project's words are fixed in [`docs/glossary.md`](docs/glossary.md): use them as defined there, and note that the code's `Widget` is the glossary's block.

## Layout

- `app/` is the product, started as a whole by `app/docker-compose.yml`, with `app/nginx/nginx.conf` as the only public entry point: `/api` goes to the backend, the rest to the frontend.
- `app/backend/` is the Python FastAPI backend with its SQLite database: `src/routers/` holds the API endpoints, `src/models/` the SQLAlchemy tables, `src/schemas/` the request and response shapes, and `src/services/` the calls to the LLM service provider.
- `app/frontend/` is the React, Vite, and React Flow frontend, organised by Feature-Sliced Design: `src/app/` is the entry point and router, `src/pages/` holds one slice per page, and `src/shared/` holds code no page owns.
  A new file goes into the layer and slice it belongs to, and imports a slice only through its `index.ts`.
- `app/frontend/src/app/main.tsx`, `app/backend/src/routers/message.py`, and `app/backend/src/services/ai_service.py` are the critical modules that [`QR-02`](docs/quality-requirements/qr/QR-02.md) names.
- `docs/` holds the maintained artifacts, published as the documentation site by `mkdocs.yml`: the vision, the plan, the decisions, the risks, the requirements under `docs/quality-requirements/` and `docs/functional-requirements/`, the architecture under `docs/architecture/`, the research under `docs/research/`, and the glossary.
  A new page in `docs/` also gets its line in the `nav` of `mkdocs.yml`.
- `docs/setup.md` is the only setup and run guide, and a change to how the product starts or is configured updates it.
- `reports/week-NN/` holds each week's evidence: the report, the meeting script, report, and transcript, the retrospective, and the AI usage.
- `.github/` holds the workflows, the issue forms, the pull request template, and the Dependabot configuration.

## Checks

Run these from the repository root before you push; CI runs the first two on every pull request and every push to `main`.

- `npx markdownlint-cli2 "**/*.md"` is the Markdown check, with the rules in `.markdownlint-cli2.jsonc`; CI runs it in `.github/workflows/markdown.yml`.
- `lychee --no-progress './**/*.md'` is the link check; it fetches external links, so it needs the network, and a site that blocks bots goes into `.lycheeignore` with the reason and the date it was checked by hand.
  CI runs it in `.github/workflows/lychee.yml`.
- `npm ci`, `npm run lint`, `npm run format:check`, and `npm run build`, run in `app/frontend/`, are the frontend checks: `oxlint`, the Feature-Sliced Design check by `steiger`, the `oxfmt` formatting, and the type check and build.
  CI does not run them yet, so run them yourself after a frontend change.
- `mkdocs build`, with `pip install mkdocs`, builds the documentation site; `.github/workflows/docs.yml` runs it on every push to `main` and publishes the site.
- `docker compose up --build`, run in `app/`, brings the whole product up, as `docs/setup.md` describes.
- The product has no automated tests yet.

## Conventions

- Commit messages and pull request titles follow Conventional Commits: `<type>(<optional scope>): <short description>`, where the type is one of `feat`, `fix`, `refactor`, `docs`, `chore`, and the description is lowercase, imperative, and without a trailing period.
- Branch names are `<issue-number>-<short-description>`, lowercase and hyphenated, such as `73-ai-block-messages-view`, with one task per branch.
  A branch name carries no member's nickname or username prefix: when a tool proposes one, such as `danmaninc/148-glossary-agents`, drop the prefix and push the branch as `148-glossary-agents`.
- A pull request fills in `.github/pull_request_template.md` and closes exactly one task issue with `Closes #<issue-number>`.
- TypeScript is formatted by `oxfmt` with four-space indentation and an 80-character line, and Python follows the existing style of `app/backend/src/`.
- Markdown puts one sentence on each line.
- The same rules are recorded for members in [`CONTRIBUTING.md`](CONTRIBUTING.md), and what done means is in [`docs/definition-of-done.md`](docs/definition-of-done.md).

## Do Not Edit

- `app/backend/.env` holds the LLM service provider's key; never create, read out, or commit it, and change `app/backend/.env.example` instead.
- `CHANGELOG.md` gets only a new line under `[Unreleased]` from a user-visible change; its released sections are rewritten only by the member who cuts the release.
- `docs/decisions.md` records what the customer and the team decided at a meeting or discussion; only the member who records that decision edits it.
- `reports/week-NN/` for a week that has ended is evidence that was submitted, and is not rewritten; only the member accountable for that week's report corrects it.
- `reports/week-NN/meeting-transcript.md` is what was said at the meeting, and is never edited beyond what the customer agreed to publish.
- `.github/workflows/` is edited only in its own pull request by a member, so a broken check cannot hide inside another change.
- `app/frontend/package-lock.json` and `app/backend/requirements.txt` change only through `npm` and through a dependency update, mostly from Dependabot, and never by hand.
