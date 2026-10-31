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

## What was not used

- A separate task for writing the new functional requirements was offered and not taken.
- A new requirement for bringing back a deleted block was not written, because it would choose the form of the protection before the customer does.
- A self-signed certificate and a Certbot certificate were explained and not used: Certbot cannot validate an address reached only from the university network, and the course gives no domain name.
- Hosting the product on the alternative server was offered as a fallback and not taken.
- No generated text was submitted unchecked.
