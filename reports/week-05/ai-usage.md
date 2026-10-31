# AI usage — Week 05

## Tools

Claude Code in the terminal.

## What we used them for

- Claude Code: reading Assignment 5 and the course requirements it cites from the course repository through `gh`, checking the repository's plan, quality requirements, workflows, and the Week 4 meeting report and retrospective, and proposing a split of the assignment into tasks before any change.
- Claude Code: creating the task issues #189 to #200 from the task form through `gh`, with acceptance criteria taken from the assignment's items, then adding them to the project, scheduling them into the `SPRINT-05` milestone, and setting their status to `Backlog`.
- Claude Code: drafting the two stories of the Week 4 action points, `US-14` (#201) for editing a text block in the side panel and `US-15` (#202) for a block deleted by mistake, from the Week 4 transcript and `DEC-025`, and creating them after our approval with their `MoSCoW`, `Story Points`, `Responsible`, and `Accountable` values set through the issue fields API.
- Claude Code: commenting on `US-15` that the Week 5 meeting should confirm the form of the protection, and adding `US-15` to the `Story` field of the soft-delete task #153.
- Claude Code: implementing #189: planning `SPRINT-05` in `docs/project-plan.md` with its goal and `**Planned Velocity:**`, checking the existing milestones against the Part 1 rules, adding the scope of `US-14` and `US-15` to `MLS-05`, `MLS-07`, and the provisional goal of `SPRINT-06`, and opening #203 from the template.
- Claude Code: GitHub housekeeping for #189 through `gh`: setting `Responsible`, `Accountable`, and assignees on `US-02`, `US-07`, and `US-08`, setting `Story Points` on `US-11` and `US-13` with a comment on each, and replacing the provisional description of the `SPRINT-05` milestone with the sprint's goal.
- Claude Code: reading #192, Part 3 of Assignment 5, the course's Environments And Deployment rules, and its deployment guide through `gh`, checking `app/docker-compose.yml`, `app/nginx/nginx.conf`, and the Dockerfiles, and proposing a plan of repository changes and of the steps for the member on campus.
- Claude Code: finding the cut-off `CMD` line of `app/backend/Dockerfile`, showing that the image built from `main` exits with a shell syntax error, and fixing it in #214.
- Claude Code: implementing #192 in #219: writing `docs/deployment.md` and `app/.env.example`, commenting `app/backend/.env.example`, linking the runbook from `docs/setup.md`, `mkdocs.yml`, and `AGENTS.md`, and running two copies of `app/` side by side to check that staging and production keep separate containers and data and that the backup and restore commands work.
- Claude Code: after the LLM service provider answered `403` to the VM, proposing a proxy for the backend's calls, checking with a local proxy that the backend's client goes through `HTTPS_PROXY` with a user and password, and documenting the proxy in the runbook.
- Claude Code: after the first staging deploy failed with `crypto.randomUUID is not a function` over plain HTTP, creating task #220 and replacing the call with a UUID function built on `crypto.getRandomValues`, with a test, in #221.
- Claude Code: explaining what a self-signed certificate and Certbot would take for the VM, without changing any file.
- Claude Code: writing `reports/week-05/deployment.md` from the deploy that danmaninc ran, and recording the two failures in the runbook's failed runs.
- Claude Code: reading #165, planning how to stop a query that is sent again after a failure from reaching the LLM twice, and implementing it in #225 with a `build_history` function in `message.py` and router tests for each acceptance criterion.
- Claude Code: reading #223, `FR-012`, `DEC-033`, and the Week 5 transcript, reviewing our proposal to decide on the frontend whether a reply holds a diagram, and planning a system prompt that asks for fenced Mermaid blocks, which the frontend alone renders.
- Claude Code: adding `AC-03`, opening a diagram in a modal, to #223 through `gh`.
- Claude Code: implementing #223 in #233: rendering Mermaid diagrams in AI replies with a Code tab, a copy button that also works over plain HTTP, a full-size modal, and the error for a diagram that cannot be rendered, raising the reply's token limit, and writing frontend and backend tests.
- Claude Code: checking #233 in headless Chrome against a scratch database in light and dark mode, which found that the modal's tabs came out empty inside the chat's tabs and that the modal had no trigger, both fixed before the pull request.
- Claude Code: reading the stored replies of a board where a diagram did not render, finding that the LLM escaped its line breaks twice, and restoring them in `ai_service.py` with tests.
- Claude Code: making the side panels of AI and text blocks resizable from their former width, with keyboard support and a test, and checking the drag in headless Chrome.
- Claude Code: planning #224 and implementing it on its branch: an image block that holds a diagram's Mermaid code, an "Add to board" button in the chat, the error on a block whose diagram cannot be rendered, the rule against AI to image connections, leaving image blocks out of the context, and tests, checked in headless Chrome with two members on one board.
- Claude Code: reading #213, `FR-007`, `US-05` (#41), `ADR-003`, and the context code, and finding that a connected AI block was left out of the context because its conversation is stored in its messages, not in the block's content.
- Claude Code: implementing #213 in #227: sending a connected AI block's conversation as context without the `system` messages, marking each piece of context as a text block or an AI conversation, and writing router tests for both criteria of `FR-007`.
- Claude Code: proposing to summarize a long conversation, checking Groq's published rate limits for `openai/gpt-oss-20b`, creating #226 from the task form through `gh`, and setting its type to Task.
- Claude Code: planning #226 and implementing it in #229, stacked on #227: summarizing a connected AI conversation longer than 6000 characters from its most recent 12000, caching the summary until the block gets a new message, sending the most recent messages with a note when the summary fails, and writing a test for each criterion.
- Claude Code: formatting meeting artifacts according to the requirements

## What we did with the output

- We asked to merge the tests and the CI checks into one task; the agent pointed out that `AGENTS.md` keeps workflow changes in their own pull request and that a task needing two pull requests is split, so they stay #190 and #191.
- We asked the agent to recheck every issue against the assignment's text and to add no requirement the assignment does not state.
- At our request, `US-14` keeps editing by typing in the block as well as in the side panel, so `FR-009` stays unchanged.
- At our request, the criteria of `US-15` stay neutral about undo, confirmation, or a harder-to-reach button until the customer decides.
- The planned velocity of `26` was checked by hand against the `Story Points` of the six stories in the `SPRINT-05` milestone.
- Every changed issue was read back through the API to confirm its milestone, assignees, and fields.
- danmaninc prepared the VM and the proxy server and ran the staging and production deploys and their verification from campus; the agent had no access to the VM, and the deployment record's date, member, commit, and result come from danmaninc.
- At our request, the `HTTPS_PROXY` line carries the proxy user and password, and the runbook gives staging and production their own proxy users.
- We kept the deployment on the university VM behind the proxy rather than moving it to another server, which would have been a deviation.
- We chose replacing `crypto.randomUUID` over a self-signed certificate, so the customer meets no certificate warning.
- At our request, the LLM history for #165 leaves out both the `system` messages and the failed `user` queries before them, and we approved the plan before the agent changed any file.
- We kept deciding on the frontend whether a reply holds a diagram, and the agent agreed after weighing a separate diagram field in the LLM's reply.
- At our request, the plan for #223 added the full-size modal, and `FR-012` stays unchanged although its `AC-01` still says the picture replaces the code.
- danmaninc ran the product with the LLM service provider and reported the diagram that did not render; the agent had no API key and never called the LLM itself.
- At our request, the side panels became resizable, with their former width as the minimum, the same for AI and text blocks.
- For #224, we read the plan before any change, and the agent's recommended choices were taken: the block stores the Mermaid code, AI to image connections are rejected, and a diagram is placed below its AI block.
- Changes for #213 and #226 were taken as is, as they satisfied the requirements and were checked manually by danmaninc.

## What was not used

- A separate task for writing the new functional requirements was offered and not taken.
- A new requirement for bringing back a deleted block was not written, because it would choose the form of the protection before the customer does.
- A self-signed certificate and a Certbot certificate were explained and not used: Certbot cannot validate an address reached only from the university network, and the course gives no domain name.
- Hosting the product on the alternative server was offered as a fallback and not taken.
- A separate diagram field in the LLM's reply was weighed for #223 and not used, because it needs a new column and separates a diagram from the text around it.
- Rendering diagrams in members' own messages was offered and not taken.
- Zooming and panning in the modal, and downloading a diagram as a file, were offered and left for later.
- Storing the rendered SVG in an image block was weighed for #224 and not used, because the board polls every block each second and the SVG is many times larger than the code.
- A sentence in `FR-007` saying that an AI block's content is its conversation was offered and not written, because the glossary's context already says so.
- Storing summaries in the database was weighed for #226 and not used, because the schema is created without migrations, so a new column would not reach the existing database.
- No generated text was submitted unchecked.
