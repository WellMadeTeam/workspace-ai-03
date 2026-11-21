# Configuration plan

**Reviewed:** 2026-11-21

This inventory records the repository's current files, settings, dependencies, and processes under the [configuration management rules](https://github.com/inno-itpd/itpd/blob/main/requirements/configuration-management-requirements.md).
The review read the root files, `.github/`, `docs/`, `reports/`, the product manifests and build files, and the repository's merge, active branch rules, and Pages settings through the GitHub API.
Runtime state on the university VM, private stores, and installed agent skills was not inspected; those entries describe the checked-in instructions and configuration shape, without claiming that the live installations match.
Owners below are maintenance roles, not new assignments to individual members.
Each item's target states what it must meet, not a verdict that it already meets it.

Update this inventory in the same pull request as a change that alters it, and advance the reviewed date only after reviewing it again.
An item's `Connections` field owns its edges: each names the other end, an allowed kind, and the concrete failure if the connection breaks.
Keep a removed item in its original group with `Status: Dropped` and an added `Dropped` field containing its removal date and reason; never reuse or renumber its identifier, and do not count or judge it as active.
No item has been dropped from this initial inventory.
A configuration that does not exist receives no identifier until it exists; name it in words in the evaluation's goal sections instead.
The separate [evaluation task #389](https://github.com/WellMadeTeam/workspace-ai-03/issues/389) owns `reports/week-08/cm-evaluation.md`, including missing configuration and proposals for change.
Private settings are named by role and location only, with no deployment address, dashboard address, credential, or secret value.

## Source control and release

### CFG-01

Repository merge settings and main branch rules.

- **Status:** Active
- **Type:** setting
- **Purpose:** Control how changes enter `main` and preserve its history; without these settings, review can be bypassed or published history rewritten.
- **Owner:** Repository administrators.
- **Where:** GitHub repository Settings, General, Pull Requests; Settings, Rules, Rulesets for `main`.
- **Connections:** `enforces` [CFG-02](#cfg-02): the active rules require a pull request, one approval, approval of the latest push, and resolved review threads; weakening them allows changes without that review.
  `enforces` [CFG-03](#cfg-03): deletion and non-fast-forward updates are blocked, and only merge commits are allowed; changing these rules can erase the history a release refers to.
- **What good looks like:** Changes reach `main` through reviewed pull requests and passing required checks under [Branch Protection](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#branch-protection).
  The inspected active rules contain no required status-check rule; running workflows alone does not make their success a merge requirement.

### CFG-02

Issue-to-pull-request review process.

- **Status:** Active
- **Type:** process
- **Purpose:** Connect each change to one task and its accountable reviewer; without it, acceptance criteria and responsibility cannot be traced to the delivered change.
- **Owner:** The task's responsible author and accountable reviewer.
- **Where:** [Pull request template](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/.github/pull_request_template.md), entered through the [contributing guide](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/CONTRIBUTING.md#how-a-change-gets-in).
- **Connections:** `reads` [CFG-16](#cfg-16): branch and commit conventions come from the contributing guide; ignoring it gives changes inconsistent names and issue links.
  `reads` [CFG-18](#cfg-18): the Definition of Done supplies the completion criteria; a stale link lets reviewers approve incomplete work.
  `reads` the task and story issue forms in `.github/ISSUE_TEMPLATE/`: losing their acceptance criteria leaves the review without a task-specific test of completion.
- **What good looks like:** Fill the template, close exactly one task, and obtain a member's approval under [Pull Request Requirements](https://github.com/inno-itpd/itpd/blob/main/requirements/pull-requests-requirements.md).

### CFG-03

Release and changelog process.

- **Status:** Active
- **Type:** process
- **Purpose:** Identify the delivered commit and explain its changes and upgrade steps; without it, a deployer cannot tell which code and instructions belong to a release.
- **Owner:** The member cutting the release.
- **Where:** [CHANGELOG.md](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/CHANGELOG.md), GitHub repository Releases and tags.
- **Connections:** `reads` [CFG-22](#cfg-22): release scope and quality-test evidence come from the project plan; ignoring them can publish a release with an unsupported verdict.
  `produces` the version tag and GitHub release read by [CFG-10](#cfg-10): a tag pointing at another commit makes the runbook deploy different code from the tested candidate.
  `reads` [CFG-02](#cfg-02): user-visible changes supply their Unreleased entries during review; missing entries leave the release notes incomplete.
- **What good looks like:** Keep Unreleased current, use Semantic Versioning, and publish a tag, matching changelog section, and deployer-facing release body under [Release Requirements](https://github.com/inno-itpd/itpd/blob/main/requirements/releases-requirements.md).

## Checks

### CFG-04

Markdown check.

- **Status:** Active
- **Type:** workflow
- **Purpose:** Check Markdown consistently before merge; without it, documentation formatting errors pass unnoticed.
- **Owner:** The member maintaining documentation checks.
- **Where:** [markdown.yml](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/.github/workflows/markdown.yml), configured by [.markdownlint-cli2.jsonc](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/.markdownlint-cli2.jsonc).
- **Connections:** `reads` the root Markdown configuration: changing local rules without this file makes local and CI results disagree.
  `enforces` [CFG-18](#cfg-18): the workflow checks repository Markdown on pull requests and pushes to `main`; a broken glob leaves maintained documentation unchecked.
- **What good looks like:** The documented local Markdown command and CI apply the same rules on every pull request and push to `main`, under [Continuous Integration](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#continuous-integration).

### CFG-05

Link check.

- **Status:** Active
- **Type:** workflow
- **Purpose:** Detect broken references across documentation and reports; without it, readers lose access to the evidence a claim cites.
- **Owner:** The member maintaining documentation checks.
- **Where:** [lychee.yml](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/.github/workflows/lychee.yml), with [.lycheeignore](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/.lycheeignore).
- **Connections:** `reads` `.lycheeignore`: an overbroad exclusion can hide a broken evidence link, while an undocumented access restriction produces unexplained failures.
  `enforces` [CFG-18](#cfg-18) and [CFG-26](#cfg-26): the Markdown glob covers maintained documents and weekly evidence; narrowing it leaves one set's links unchecked.
- **What good looks like:** Check Markdown links on pull requests and pushes to `main`, retaining a reason and manual-check date for excluded links under [Link Checking](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#link-checking).

### CFG-06

GitHub Actions syntax check.

- **Status:** Active
- **Type:** workflow
- **Purpose:** Catch workflow syntax and expression errors; without it, a broken delivery check may be discovered only when its workflow fails to start.
- **Owner:** The member maintaining GitHub Actions workflows.
- **Where:** [actionlint.yml](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/.github/workflows/actionlint.yml).
- **Connections:** `enforces` [CFG-04](#cfg-04), [CFG-05](#cfg-05), [CFG-07](#cfg-07), and [CFG-08](#cfg-08): actionlint checks workflow definitions; removing a workflow from its scope can leave that check or publication job unable to run.
  `reads` the pinned checkout and actionlint actions: an invalid revision prevents the syntax check itself from executing.
- **What good looks like:** Run actionlint on pull requests and pushes to `main`, with third-party actions pinned to full commit SHAs, under [Continuous Integration](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#continuous-integration) and [Pinning Third-Party Actions](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#pinning-third-party-actions).

### CFG-07

Product code checks.

- **Status:** Active
- **Type:** CI pipeline
- **Purpose:** Verify frontend code and the critical frontend and backend paths before delivery; without it, a change that breaks the query flow can reach `main` without an automated failure signal.
- **Owner:** The member maintaining product checks, with frontend and backend maintainers.
- **Where:** [product-code.yml](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/.github/workflows/product-code.yml).
- **Connections:** `reads` [CFG-12](#cfg-12): Node.js 22.18 and npm 11.9.0 install the lockfile and run lint, formatting, type checking, build, and tests; stale scripts or dependencies make the frontend job fail or omit a check.
  `reads` [CFG-13](#cfg-13): Python 3.14 installs the requirements and runs unittest discovery; a missing dependency prevents backend tests from importing.
  `enforces` the automated test portion of [CFG-20](#cfg-20): removing coverage of QR-02's critical modules removes its regression signal.
- **What good looks like:** Run the applicable product checks on every pull request and push to `main`, without an LLM service provider key, under [Continuous Integration](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#continuous-integration).
  This workflow exists even though older check descriptions in `AGENTS.md` and `docs/setup.md` omit it or say frontend CI is absent.

### CFG-08

Documentation build and publication.

- **Status:** Active
- **Type:** workflow
- **Purpose:** Turn maintained documentation into the public site; without it, readers of the site receive no newly merged documentation.
- **Owner:** The documentation maintainer and repository administrators.
- **Where:** [docs.yml](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/.github/workflows/docs.yml), [mkdocs.yml](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/mkdocs.yml), and GitHub repository Settings, Pages.
- **Connections:** `reads` [CFG-18](#cfg-18): MkDocs builds `docs/` using the navigation in `mkdocs.yml`; an omitted page has no navigation entry even if it builds.
  `produces` the GitHub Pages artifact: Pages is configured to publish through GitHub Actions; changing its publication source can stop the workflow's site from being served.
  `reads` the pinned checkout, Python setup, upload, and deploy actions: an invalid action revision stops publication.
- **What good looks like:** Publish maintained documentation through a successful MkDocs build on pushes to `main` under [Documentation Site](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#documentation-site).

## Environments and secrets

### CFG-09

Local setup and Compose entry point.

- **Status:** Active
- **Type:** document and build configuration
- **Purpose:** Bring a clean checkout to a usable shared board; without the guide and Compose definition, the customer must reconstruct startup and service routing.
- **Owner:** The member changing product startup or configuration.
- **Where:** [docs/setup.md](setup.md), with [app/docker-compose.yml](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/app/docker-compose.yml) as its executable entry point.
- **Connections:** `reads` [CFG-11](#cfg-11): the backend receives its environment file; a missing provider key prevents successful replies.
  `reads` [CFG-12](#cfg-12) and [CFG-13](#cfg-13): Compose builds both product images; a broken Dockerfile prevents startup.
  `reads` `app/nginx/nginx.conf`: nginx is the only public entry point; a changed API route can make the board load while queries fail.
- **What good looks like:** A member or customer follows one setup guide from a clean checkout to the core task, with no secret in git, under [Setup And Run Instructions](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#setup-and-run-instructions).

### CFG-10

Deployment runbook and environment separation.

- **Status:** Active
- **Type:** document and process
- **Purpose:** Redeploy, verify, and roll back staging and production independently; without separate directories, project names, and volumes, one deployment can replace the other's containers or data.
- **Owner:** The member deploying to the university VM.
- **Where:** [docs/deployment.md](deployment.md); university VM deployments and their Compose projects, named in the runbook.
- **Connections:** `cites` [CFG-09](#cfg-09): the runbook delegates local build and startup to the setup guide; a stale link leaves a new deployer without prerequisites.
  `reads` [CFG-11](#cfg-11): environment-specific keys, proxy users, project names, and ports separate the deployments; swapping them sends staging traffic or telemetry to production resources.
  `reads` [CFG-03](#cfg-03): the deployed commit must match the tested release; selecting another commit invalidates the staging evidence.
- **What good looks like:** Describe development, integration, staging, and production, then support a manual deploy, verification, and rollback without publishing private access details under [Environments And Deployment](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#environments-and-deployment).

### CFG-11

Environment configuration shape and secret handling.

- **Status:** Active
- **Type:** configuration files and process
- **Purpose:** Supply deployment-specific values while keeping credentials out of the public repository; without the templates, a deployer must guess required variables, and without secret handling, real credentials can enter history.
- **Owner:** Each environment's deploying member; repository administrators for incident response.
- **Where:** [app/.env.example](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/app/.env.example), [app/backend/.env.example](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/app/backend/.env.example), [.gitignore](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/.gitignore), and the team's password manager for real values.
- **Connections:** `produces` the untracked environment files read by [CFG-09](#cfg-09) and [CFG-10](#cfg-10): an absent or renamed variable can prevent replies, select the wrong project, or disable export.
  `enforces` secret exclusion through `.gitignore`: losing the environment-file exclusions allows real values to be added accidentally.
  `reads` the credential roles in [CFG-23](#cfg-23) and [CFG-24](#cfg-24): using the wrong analytics client or ingest credential mixes environments or drops telemetry.
- **What good looks like:** Commit placeholders and variable names only, keep actual values private, and rotate and remove exposed credentials under [Configuration And Sensitive Information](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#configuration-and-sensitive-information) and [Sensitive-Data Incident Response](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#sensitive-data-incident-response).

## Dependencies and builds

### CFG-12

Frontend dependency and build configuration.

- **Status:** Active
- **Type:** dependency and build configuration
- **Purpose:** Install the frontend's resolved dependency graph and compile the browser application; without its lockfile and tool configuration, local, CI, and container builds can resolve different packages or apply different checks.
- **Owner:** The frontend maintainer.
- **Where:** [app/frontend/package.json](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/app/frontend/package.json), with its npm lockfile, tool configuration, and [Dockerfile](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/app/frontend/Dockerfile).
- **Connections:** `reads` `app/frontend/package-lock.json`: `npm ci` uses its resolved versions; a manifest mismatch stops installation.
  `produces` the frontend image read by [CFG-09](#cfg-09): the current Dockerfile builds with `node:26-alpine` and serves through `nginx:1.31-alpine`; an incompatible base image prevents building or serving the board.
  `reads` the TypeScript, Vite, Vitest, oxlint, oxfmt, and Steiger configurations beside the manifest: removing one can change the build, test discovery, formatting, or FSD import checks.
- **What good looks like:** Install from the committed lockfile and keep documented builds repeatable under [Setup And Run Instructions](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#setup-and-run-instructions) and [Continuous Integration](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#continuous-integration).
  The container's Node.js major currently differs from CI's; this entry records both rather than assuming they match.

### CFG-13

Backend dependency and build configuration.

- **Status:** Active
- **Type:** dependency and build configuration
- **Purpose:** Install the backend's pinned Python packages and start the API with durable SQLite storage; without it, imports can fail or the database can be written outside the persistent volume.
- **Owner:** The backend maintainer.
- **Where:** [app/backend/requirements.txt](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/app/backend/requirements.txt) and [Dockerfile](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/app/backend/Dockerfile).
- **Connections:** `reads` the exact package versions in `requirements.txt`: a missing or incompatible package prevents backend startup or test collection.
  `produces` the backend image read by [CFG-09](#cfg-09): the current base is `python:3.15-alpine`, with the database under `/data` and API root path `/api`; changing these without Compose and nginx updates can lose persistence or break API documentation.
- **What good looks like:** Maintain installable dependencies and a documented build under [Setup And Run Instructions](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#setup-and-run-instructions).
  The container's Python major/minor currently differs from CI's Python 3.14; no successful container build is inferred from the CI configuration.

### CFG-14

Dependency update configuration and action pins.

- **Status:** Active
- **Type:** dependency update configuration
- **Purpose:** Propose dependency upgrades for review and keep workflow action revisions explicit; without it, dependencies and action pins require members to notice each upstream change manually.
- **Owner:** The member reviewing dependency updates.
- **Where:** [.github/dependabot.yml](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/.github/dependabot.yml), and the `uses` revisions in `.github/workflows/`.
- **Connections:** `triggers` [CFG-02](#cfg-02): Dependabot checks GitHub Actions, pip, npm, and both product Dockerfile directories weekly; an incorrect ecosystem path stops proposals for that dependency set.
  `produces` proposed updates to [CFG-12](#cfg-12), [CFG-13](#cfg-13), and workflow pins: merging without their checks can introduce an incompatible package or action.
- **What good looks like:** Review dependency updates, generate lockfile changes with their package tools, and pin third-party actions to full commit SHAs under [Pinning Third-Party Actions](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#pinning-third-party-actions).

## Agent context and artifacts

### CFG-15

Repository agent instructions.

- **Status:** Active
- **Type:** document
- **Purpose:** Route an agent to the right paths, checks, conventions, and edit boundaries; without it, an agent can change protected evidence or invent a competing documentation location.
- **Owner:** The member changing repository layout, checks, or conventions.
- **Where:** [AGENTS.md](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/AGENTS.md).
- **Connections:** `cites` [CFG-17](#cfg-17): the course router owns the requirements mapping; a broken URL leaves an agent guessing which rule applies.
  `cites` [CFG-16](#cfg-16): member conventions must agree with agent instructions; divergent copies yield conflicting branch or commit guidance.
  `cites` this configuration plan: losing the layout link hides the inventory from the next agent.
- **What good looks like:** Keep the four instruction sections accurate and link the course router and configuration plan under [What It States](https://github.com/inno-itpd/itpd/blob/main/requirements/agent-instructions-requirements.md#what-it-states).

### CFG-16

Member contributing guide.

- **Status:** Active
- **Type:** document
- **Purpose:** Give members one account of issue tracking, review, and naming conventions; without it, members and agents can follow different delivery processes.
- **Owner:** The member changing team repository conventions.
- **Where:** [CONTRIBUTING.md](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/CONTRIBUTING.md).
- **Connections:** `cites` [CFG-02](#cfg-02): the guide points to the issue forms and pull request template; a stale template reference omits required review information.
  `cites` [CFG-18](#cfg-18): the Definition of Done owns completion criteria; duplicating them here creates two versions to maintain.
  `cites` the team's GitHub project and sprint milestones: broken links disconnect the guide from the tracked backlog.
- **What good looks like:** Record repository conventions for members and keep them aligned with `AGENTS.md` under [Contributing](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#contributing).

### CFG-17

Upstream course requirements router.

- **Status:** Active
- **Type:** upstream skill reference
- **Purpose:** Find the authoritative course rule before editing a deliverable; without the router, remembered or copied rules can replace the current requirement.
- **Owner:** The team member maintaining the course reference; course maintainers own its contents.
- **Where:** The course repository's [SKILL.md](https://github.com/inno-itpd/itpd/blob/main/SKILL.md), referenced by the root instructions.
- **Connections:** `cites` the upstream course rules, requirements, assignments, and guides: a stale upstream reference can send an agent to the wrong artifact schema or week's deliverable.
  `produces` the requirements context read through [CFG-15](#cfg-15): removing the root reference breaks the repository's route to that context.
- **What good looks like:** Install and wire the course materials as an agent skill, read them without editing upstream content, and retain the GitHub router link under [The Course Materials As An Agent Skill](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#the-course-materials-as-an-agent-skill).
  This inventory verifies the repository reference, not an agent's local installation.

### CFG-18

Maintained documentation entry point.

- **Status:** Active
- **Type:** document index
- **Purpose:** Locate the maintained product direction, research, decisions, assumptions, risks, glossary, and completion rules; without the entry point, readers can mistake old weekly evidence for current guidance.
- **Owner:** The member changing a maintained artifact; the documentation maintainer keeps navigation current.
- **Where:** [docs/index.md](index.md).
- **Connections:** `cites` [CFG-22](#cfg-22) and this configuration plan: losing these project links hides the current delivery plan or configuration ownership.
  `cites` the maintained vision, research, decisions, assumptions, threshold, risks, glossary, and Definition of Done linked from the index: a broken reference hides the owner of a scope, terminology, or completion fact.
  `produces` the documentation entry page read by [CFG-08](#cfg-08): divergence between the index and MkDocs navigation makes discovery depend on which entry point a reader uses.
- **What good looks like:** Keep current documentation in `docs/`, preserve stable identifiers, and link to the owning artifact under [Where Artifacts Live In The Repository](https://github.com/inno-itpd/itpd/blob/main/requirements/general-requirements.md#where-artifacts-live-in-the-repository) and [Identifier Rules](https://github.com/inno-itpd/itpd/blob/main/requirements/general-requirements.md#identifier-rules).

### CFG-19

Functional requirements index.

- **Status:** Active
- **Type:** document index
- **Purpose:** Locate each required behavior and its acceptance criteria; without the index, implementers and reviewers can miss an existing requirement or create a duplicate identifier.
- **Owner:** The member changing a functional requirement.
- **Where:** [docs/functional-requirements/README.md](functional-requirements/README.md).
- **Connections:** `cites` the `FR-nnn` records in its `fr/` directory: a missing row or broken record link leaves the behavior outside the requirement catalogue.
  `produces` the functional driver set read by [CFG-21](#cfg-21): stale statuses make the architecture appear to serve behavior outside the current scope.
- **What good looks like:** Maintain the ordered index and per-requirement behavior and criteria under [Functional Requirements](https://github.com/inno-itpd/itpd/blob/main/requirements/functional-requirements-requirements.md).

### CFG-20

Quality requirements index and priority matrix.

- **Status:** Active
- **Type:** document index
- **Purpose:** Locate quality scenarios, priorities, and test definitions; without it, the team cannot consistently choose which quality risks to test before release.
- **Owner:** The member changing a quality requirement or its priority.
- **Where:** [docs/quality-requirements/README.md](quality-requirements/README.md).
- **Connections:** `cites` the `QR-nn` records in its `qr/` directory: a stale scenario or test link prevents a member from reproducing the stated check.
  `cites` [CFG-22](#cfg-22): the testing plan owns scheduled runs and verdicts; a broken link separates the priority matrix from release evidence.
  `produces` the quality driver set read by [CFG-21](#cfg-21): omitted high-priority scenarios leave architecture decisions without their actual constraints.
- **What good looks like:** Keep ISO/IEC 25010:2023 scenarios, priorities, and reproducible quality-test definitions under [Quality Requirements](https://github.com/inno-itpd/itpd/blob/main/requirements/quality-requirements-requirements.md).

### CFG-21

Architecture and architectural decision entry point.

- **Status:** Active
- **Type:** document index
- **Purpose:** Explain container responsibilities and the decisions behind them; without it, a maintainer must infer deployment and import boundaries from code alone.
- **Owner:** The member changing an architectural choice or its drivers.
- **Where:** [docs/architecture/README.md](architecture/README.md).
- **Connections:** `reads` [CFG-19](#cfg-19) and [CFG-20](#cfg-20): requirements supply the architecture drivers; stale links leave decisions justified by superseded behavior or quality targets.
  `cites` the ADR index and diagram sources under `docs/architecture/`: broken links hide the decision rationale or prevent updating its rendered view.
  `cites` [CFG-09](#cfg-09): the container view names the executable Compose split; a mismatch misleads a maintainer about service routing and persistence.
- **What good looks like:** Link the vision, drivers, container view, and ADR index under [Architecture Requirements](https://github.com/inno-itpd/itpd/blob/main/requirements/architecture-requirements.md).

### CFG-22

Project plan and testing schedule.

- **Status:** Active
- **Type:** document
- **Purpose:** Connect milestones, sprint work, releases, and quality-test evidence; without it, a release can be declared ready without knowing which planned checks ran.
- **Owner:** The sprint's planning and release members.
- **Where:** [docs/project-plan.md](project-plan.md).
- **Connections:** `cites` [CFG-20](#cfg-20): each testing-plan row points to its quality test; a broken target leaves a verdict without its criterion.
  `cites` [CFG-26](#cfg-26): weekly evidence supports recorded verdicts; a stale report link makes a release claim unverifiable.
  `cites` GitHub sprint milestones and the threshold of success: disconnected links leave scheduled work without its scope or intended outcome.
- **What good looks like:** Keep milestones, sprints, release blocks, and a testing plan with evidence under [Planning Requirements](https://github.com/inno-itpd/itpd/blob/main/requirements/planning-requirements.md).

### CFG-23

Analytics plan.

- **Status:** Active
- **Type:** document
- **Purpose:** Define product-use metrics, events, environment scopes, and dashboard queries; without it, collected events cannot substantiate whether members reuse earlier replies as context.
- **Owner:** The member maintaining product analytics.
- **Where:** [docs/analytics.md](analytics.md).
- **Connections:** `cites` [CFG-10](#cfg-10): the runbook owns OpenPanel installation and export setup; stale configuration instructions stop events reaching the intended project.
  `reads` the value proposition linked in the plan: losing that relationship turns the focus metric into activity without a stated customer value.
  `produces` the event contract read by [CFG-25](#cfg-25): changing event names or source filters without updating the test protocol prevents sessions being correlated with analytics.
- **What good looks like:** Define a value-linked focus metric, metric tree, events, privacy limits, and reproducible dashboard queries under [Product Analytics Requirements](https://github.com/inno-itpd/itpd/blob/main/requirements/analytics-requirements.md).

### CFG-24

Observability plan.

- **Status:** Active
- **Type:** document
- **Purpose:** Define operating signals, retention, and the SLI queries used to diagnose a failed query; without it, an operator cannot reproduce the documented duration or failure investigation.
- **Owner:** The member maintaining backend observability.
- **Where:** [docs/observability.md](observability.md).
- **Connections:** `cites` [CFG-10](#cfg-10): the runbook owns OpenObserve installation, environment separation, and export; a stale endpoint shape prevents signal ingestion.
  `produces` the signal and query contract read by [CFG-20](#cfg-20): changing fields or retention without QR-05's test being updated makes its investigation steps unreproducible.
- **What good looks like:** Define signals, retention, SLI sources, windows, and queries, with environment-specific dashboards under [Observability Requirements](https://github.com/inno-itpd/itpd/blob/main/requirements/observability-requirements.md).

### CFG-25

Usability test records and data-handling protocol.

- **Status:** Active
- **Type:** document index and process
- **Purpose:** Locate the test design, instruments, consent rules, sessions, and results; without the protocol, sessions cannot yield comparable measures or support the usability verdict.
- **Owner:** The test's facilitator and observer; the data custodian maintains private access.
- **Where:** [docs/usability-tests/README.md](usability-tests/README.md), the entry point to each `UT-nn` record.
- **Connections:** `cites` the UT-01 record, instruments, session instructions, and results: a missing or stale link makes the run or analysis use a different protocol from the planned one.
  `reads` [CFG-23](#cfg-23): session analytics use its event definitions and source property; incompatible filters mix smoke traffic with session events.
  `produces` sanitized results read by [CFG-22](#cfg-22): reporting an unrun session as evidence gives the usability verdict an unsupported basis.
  `reads` the private usability-data repository and team-owned recordings folder named by role in the protocol: missing granted access prevents team or instructor inspection of the raw evidence.
- **What good looks like:** Maintain the test record, consent, instruments, private data separation, sanitized results, and traceable findings under [Usability Testing Requirements](https://github.com/inno-itpd/itpd/blob/main/requirements/usability-testing-requirements.md).

### CFG-26

Weekly reporting and evidence process.

- **Status:** Active
- **Type:** process
- **Purpose:** Preserve each week's work, meeting evidence, retrospective, and AI disclosure as an indexed submission; without it, later readers cannot distinguish what was demonstrated from what was only planned.
- **Owner:** The member accountable for that week's report, with members supplying their evidence and AI disclosures.
- **Where:** `reports/week-NN/README.md` is each week's public entry point; the existing `reports/week-07/README.md` is an instance of this process.
- **Connections:** `reads` [CFG-22](#cfg-22): the report compares the sprint's intended scope with evidenced outcomes; losing that reference hides deferred work.
  `cites` maintained documents through [CFG-18](#cfg-18) and the week's supporting artifacts: missing evidence links leave reported completion unverifiable.
  `produces` the public evidence read by [CFG-03](#cfg-03): rewriting an ended week's report changes the historical basis for its release.
- **What good looks like:** Publish one indexed public weekly report, preserve historical evidence, disclose AI assistance, and separate private Moodle-only material under [Weekly Report Requirements](https://github.com/inno-itpd/itpd/blob/main/requirements/weekly-report-requirements.md).
