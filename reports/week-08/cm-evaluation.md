# CM Evaluation

**Baseline:** [b9d30463a97b034e034738360e3aaed24586b3bf](https://github.com/WellMadeTeam/workspace-ai-03/commit/b9d30463a97b034e034738360e3aaed24586b3bf), the configuration-plan commit from #388.

**Reviewed:** 2026-11-21

## Method

Codex prepared this AI-assisted evaluation on 2026-11-21 against the baseline above for the responsible member and accountable reviewer of [task #389](https://github.com/WellMadeTeam/workspace-ai-03/issues/389) to review.
The proposed local goals below cover each artifact family in the [configuration inventory](../../docs/configuration-plan.md), grouping artifacts by the purpose they serve rather than grading items individually.
The review read the inventory first, followed its connections into repository files and existing weekly evidence, inspected public-safe merge, active branch-rule, and Pages settings, then compared simpler artifact sets and their losses before choosing a first change.
Relative evidence links refer to files as they stood at the frozen baseline; later edits to maintained documents do not change this evaluation's judgement.
The review follows [the evaluation rules](https://github.com/inno-itpd/itpd/blob/main/requirements/configuration-management-requirements.md#the-evaluation); mandatory requirements remain obligations, not optional tradeoffs.
Direct inspection of live deployments, credentials, private usability data, local skill installations, new product test runs, and measurements of member effort was outside Codex's scope.
A team member subsequently confirmed the baseline's deployment and restore checks, environment separation, clean frontend and backend builds and operating checks, telemetry ingestion and queries, configured retention, private usability records and access, and Moodle submission completeness and access.
These confirmations describe the baseline configuration and are attributed to the member; they are not new test runs performed by Codex.
The recommendations schedule no work, create no backlog, and enact no configuration change.

## Keep product choices traceable to required behavior

The local goal is to let a member follow a proposed behavior back to its reason and forward to the architecture that supports it.

- **Today:** [CFG-18](../../docs/configuration-plan.md#cfg-18) locates the vision, research, decisions, assumptions, threshold, risks, glossary, and Definition of Done; [CFG-19](../../docs/configuration-plan.md#cfg-19) indexes functional requirements; [CFG-21](../../docs/configuration-plan.md#cfg-21) locates architecture and ADRs.
  The capability descriptions in [docs/features.md](../../docs/features.md) are named separately because the inventory has no separate item for that page.
  The CFG-21 `Connections` field reads the requirements indexes and cites the ADR index, retaining the route from driver to decision.
- **A more convenient way:** `Keep` the separate fact-owning records and their indexes, with capability summaries linking to requirements and ADRs instead of copying their criteria or rationale.
  Preserve the CFG-19 and CFG-21 `Connections` fields' index and driver edges; merging the records into one narrative would remove stable targets used by those edges.
- **Why:** [The architecture's drivers](../../docs/architecture/README.md#drivers) already link to the vision and requirement indexes, and [the features page](../../docs/features.md#reuse-connected-blocks-in-a-query) links context reuse to its behavior and decision.
  These are different questions with working paths between them, so merging them would save files while increasing the context a reader must scan and the chance of duplicating a fact.
- **Tradeoffs:** A reader follows several links to understand one capability, and the links need maintenance.
  That cost is preferable to losing the separately addressable behavior, rationale, and current scope; there is no repository evidence that a combined narrative would improve their use.

## Obtain trustworthy evidence before accepting a change

The local goal is to make the reviewer see reproducible failures and acceptance evidence without reconstructing which checks matter for the change.

- **Today:** [CFG-01](../../docs/configuration-plan.md#cfg-01) and [CFG-02](../../docs/configuration-plan.md#cfg-02) provide the branch rules and review process; [CFG-04](../../docs/configuration-plan.md#cfg-04), [CFG-05](../../docs/configuration-plan.md#cfg-05), [CFG-06](../../docs/configuration-plan.md#cfg-06), and [CFG-07](../../docs/configuration-plan.md#cfg-07) run Markdown, link, actionlint, and product checks; [CFG-20](../../docs/configuration-plan.md#cfg-20) locates quality scenarios and tests.
  The CFG-07 `Connections` field reads the product manifests and enforces the automated part of QR-02; the CFG-01 field currently enforces review rather than check completion.
  The inspected active rules contain no required status-check mapping; this missing configuration is named in words and receives no new `CFG-nn`.
- **A more convenient way:** `Keep` the separate check signals and quality-test definitions, and `Add` a required status-check mapping for the existing checks to the main branch rules.
  This would extend the CFG-01 `Connections` field with `enforces` edges to the existing checks, removing the reviewer’s manual dependency on noticing every result; it would not replace task-specific acceptance review.
- **Why:** [The Definition of Done](../../docs/definition-of-done.md#pull-request) already requires green checks, and [the Week 07 report](../week-07/README.md#repository-evidence) cites separate successful workflow runs as evidence.
  The rule inspection returned review and history rules without a required-check rule, so the current artifact set leaves that completion condition to a manual step.
  Retaining separate workflow results also preserves the distinction between a broken reference, malformed workflow, and failing product test.
- **Tradeoffs:** A required mapping adds a setting to maintain and can block a valid change when a check cannot report.
  Renaming a workflow or job would require updating the mapping; the gain is enforcing an existing completion rule without asking a reviewer to remember it on every change.
  This is a proposal, not evidence that a failing change has previously been merged.

## Reproduce the same product across test and deployment

The local goal is to build and run the tested revision in each environment without reconstructing dependencies or mixing environment-specific data.

- **Today:** [CFG-09](../../docs/configuration-plan.md#cfg-09) owns local startup, [CFG-10](../../docs/configuration-plan.md#cfg-10) owns deployment, [CFG-11](../../docs/configuration-plan.md#cfg-11) owns configuration shape and secret handling, [CFG-12](../../docs/configuration-plan.md#cfg-12) and [CFG-13](../../docs/configuration-plan.md#cfg-13) own dependency/build inputs, and [CFG-14](../../docs/configuration-plan.md#cfg-14) proposes dependency updates.
  The CFG-09 `Connections` field reads both build configurations and the environment shape; the CFG-10 field separates deployments while delegating startup to the setup guide.
  The member confirms that deployment, verification, and rollback needed no extra instructions, that backups were restored successfully, and that separate Compose projects, database volumes, environment files, and credentials are used with no real secrets tracked in git.
  The member also confirms clean frontend and backend image builds, a working deployed frontend, successful backend queries and replies, and database persistence after restart.
- **A more convenient way:** `Keep` the local/deployed guide boundary, lockfile, pinned Python packages, example environment files, and reviewed dependency updates.
  `Replace` independently chosen CI and container runtime versions with an agreed supported version for each language, used by both; preserve the CFG-09 build edges and the CFG-07 manifest edges.
- **Why:** At the baseline, [product CI](https://github.com/WellMadeTeam/workspace-ai-03/blob/b9d30463a97b034e034738360e3aaed24586b3bf/.github/workflows/product-code.yml) uses Node.js 22.18 and Python 3.14, while the [frontend Dockerfile](https://github.com/WellMadeTeam/workspace-ai-03/blob/b9d30463a97b034e034738360e3aaed24586b3bf/app/frontend/Dockerfile) uses Node.js 26 and the [backend Dockerfile](https://github.com/WellMadeTeam/workspace-ai-03/blob/b9d30463a97b034e034738360e3aaed24586b3bf/app/backend/Dockerfile) uses Python 3.15.
  Aligning those choices removes a compatibility difference that must otherwise be investigated when a CI result is used to justify a deploy; it does not claim that this difference has caused a failure.
  [The runbook](../../docs/deployment.md#configuration) already separates deployment values, so merging it with local setup would instead make a customer read VM-only steps.
- **Tradeoffs:** Aligning runtimes gives up the incidental coverage of two runtime versions and requires a dependency-compatibility decision before selecting versions.
  The confirmed builds and deployment checks support the current configuration; changing to a common runtime would still require compatibility checks for the selected versions.
  Separate guides and secret files retain some navigation and provisioning effort in return for keeping local startup usable and deployment data apart.

## Communicate delivery state without rewriting its history

The local goal is to tell a reader what is planned now, what a release delivers, and what evidence existed in its week.

- **Today:** [CFG-22](../../docs/configuration-plan.md#cfg-22) owns the current project plan and test schedule, [CFG-26](../../docs/configuration-plan.md#cfg-26) preserves weekly evidence, [CFG-03](../../docs/configuration-plan.md#cfg-03) identifies releases, and [CFG-08](../../docs/configuration-plan.md#cfg-08) publishes maintained documentation.
  The root README is another reader entry point, named in words because it has no separate inventory item.
  The CFG-22 `Connections` field cites weekly evidence, while the CFG-03 field connects tested scope to the release consumed by deployment.
  The member confirms that the private Moodle submission was checked for completeness and working instructor access to its materials and links.
- **A more convenient way:** `Keep` the maintained plan, frozen reports, changelog, and documentation site in their present roles.
  `Cut` the root README's manually advanced “Current week's report” alias and retain its existing all-reports entry point; preserve the CFG-22 evidence links and CFG-08 publication edges.
- **Why:** At the baseline, [the root README](https://github.com/WellMadeTeam/workspace-ai-03/blob/b9d30463a97b034e034738360e3aaed24586b3bf/README.md) labels Week 03 as current while [Week 07's report](../week-07/README.md) exists.
  Removing that extra alias removes one recurring update and one misleading claim, without deleting a report or moving weekly evidence into the documentation site.
  [The testing plan](../../docs/project-plan.md#quality-requirement-testing-plan) already points directly to the evidence needed for quality verdicts.
- **Tradeoffs:** A reader would select a week from the reports directory instead of reaching the current week in one click.
  That extra navigation is preferable to keeping a time-sensitive alias that has already drifted; existing report permalinks and historical release evidence remain available.

## Separate learning about use from diagnosing operation

The local goal is to distinguish evidence of context reuse from evidence that the backend processed requests reliably.

- **Today:** [CFG-23](../../docs/configuration-plan.md#cfg-23) defines analytics metrics, events, and queries, while [CFG-24](../../docs/configuration-plan.md#cfg-24) defines operating signals, retention, and SLIs.
  Both `Connections` fields cite the deployment runbook as the owner of installation and export configuration; the plans own interpretation rather than repeating provisioning steps.
  The member confirms separate staging and production event ingestion, expected analytics query results and source filters, separate observability ingestion, and working request-lookup and duration queries.
  The 30-day OpenObserve retention setting is confirmed; actual deletion of expired data remains unverified.
- **A more convenient way:** `Keep` the two plans and their distinct telemetry purposes, with installation instructions owned by CFG-10.
  Retain the CFG-23 event contract used by usability testing and the CFG-24 signal contract used by quality tests instead of merging them into one generic dashboard description.
- **Why:** [Analytics](../../docs/analytics.md#why-this-focus-metric) explicitly limits what a context-reuse event proves about customer value, whereas [observability](../../docs/observability.md#the-slis) defines request-duration windows and diagnostic queries.
  The artifact split makes that difference visible and avoids maintaining setup instructions in three places; combining the documents would not remove either contract or its consumers.
- **Tradeoffs:** There are two document entry points and two self-hosted backends to understand.
  The member reports that both backends run acceptably, but their resource use and maintenance effort have not been assessed; this review cannot establish that operating two backends is cheaper than a replacement.
  No tool consolidation is recommended without that operating-cost assessment.

## Collect comparable usability evidence without publishing private data

The local goal is to obtain repeatable session measures and traceable findings while keeping consent, identities, and raw capture private.

- **Today:** [CFG-25](../../docs/configuration-plan.md#cfg-25) indexes the test record, instruments, session instructions, and results, and connects them to analytics and private evidence stores.
  Its `Connections` field reads CFG-23's event contract and produces the sanitized results consumed by the project plan; observers supply measures that events cannot establish.
  The member confirms that completed sessions' consent records and raw evidence were checked in the designated private stores, including access for the intended team members and instructors.
- **A more convenient way:** `Keep` the shared protocol, separate instruments, session records, results, and private-store boundary.
  Keep the CFG-25 links from session evidence to analysis rather than replacing observer records with an analytics dashboard or merging completed notes into maintained instructions.
- **Why:** [The Week 07 retrospective](../week-07/sprint-retrospective.md#what-did-not) records a deferred full rehearsal and an instrumentation check that did not verify successful replies or context reuse.
  [The results file](../../docs/usability-tests/ut-01/results.md) is explicitly an empty template at this baseline, even though the member confirms that completed-session records exist privately.
  The reviewed public artifacts contain no analysis showing that a smaller instrument set would preserve the planned measures.
  Keeping the existing boundary avoids mistaking event coverage for observed unaided task completion.
- **Tradeoffs:** Facilitators and observers must follow multiple documents and keep session evidence correlated with private records.
  Removing that effort now would give up measures the analytics cannot supply and weaken consent traceability; the repository evidence does not justify the loss.
  This judgement concerns the protocol's structure; the confirmed private records and access do not by themselves establish a usability verdict.

## Keep member and agent instructions trustworthy

The local goal is to let the next member or agent find the applicable rule and run the right checks with minimal contradictory context.

- **Today:** [CFG-15](../../docs/configuration-plan.md#cfg-15) provides repository instructions, [CFG-16](../../docs/configuration-plan.md#cfg-16) provides member conventions, and [CFG-17](../../docs/configuration-plan.md#cfg-17) routes to upstream course rules.
  The CFG-15 `Connections` field cites the course router, contributing guide, and configuration plan; the setup guide separately owns local run and check instructions.
- **A more convenient way:** `Replace` the repeated command explanations in the AGENTS checks section with a short index naming each check and linking its local instructions or defining workflow.
  `Keep` all four AGENTS sections, edit boundaries, member conventions, and the course router; preserve CFG-15's existing `cites` edges and make its check references explicit rather than cutting access to a check.
  Required corrections to false statements remain necessary whichever presentation is chosen.
- **Why:** At the baseline, [AGENTS.md](https://github.com/WellMadeTeam/workspace-ai-03/blob/b9d30463a97b034e034738360e3aaed24586b3bf/AGENTS.md#checks) says frontend checks do not run in CI, [the setup guide](../../docs/setup.md#checks-and-tests) describes only two pull-request workflows, and [the product workflow](https://github.com/WellMadeTeam/workspace-ai-03/blob/b9d30463a97b034e034738360e3aaed24586b3bf/.github/workflows/product-code.yml) already runs frontend and backend checks.
  The review had to compare these sources to establish the current behavior; shortening the duplicate explanations removes a maintenance mechanism that has already allowed them to disagree.
  A named workflow still gives an agent the check definition, and the setup page retains runnable local instructions, as [the agent-instructions rule permits](https://github.com/inno-itpd/itpd/blob/main/requirements/agent-instructions-requirements.md#what-it-states).
- **Tradeoffs:** An agent must follow a link before running some checks, and the root instructions become more dependent on those destinations remaining accurate.
  That extra navigation is preferable to retaining competing descriptions; it preserves rule discovery without copying the course materials into team instructions.

## What We Could Not Judge

- [CFG-11](../../docs/configuration-plan.md#cfg-11): ownership of credential revocation and rotation, and replacement steps for each deployment, have not been checked.
  The risk is delay or an incorrect deployment change when a credential needs replacement.
- [CFG-23](../../docs/configuration-plan.md#cfg-23) and [CFG-24](../../docs/configuration-plan.md#cfg-24): the backends run acceptably according to the member, but VM resource use and ongoing maintenance effort have not been assessed.
  The risk is recommending retention or consolidation of both backends without understanding their operating cost.
- [CFG-24](../../docs/configuration-plan.md#cfg-24): the 30-day setting is confirmed, but actual deletion of expired data is unverified.
  The risk is assuming configured retention proves that older data is removed.
- [CFG-17](../../docs/configuration-plan.md#cfg-17): the upstream router link works, but member machines' installed skills and revisions remain unverified.
  A working reference does not prove installation; an agent could use an older rule set.
- [CFG-01](../../docs/configuration-plan.md#cfg-01): no bypasses are intended, but permissions allowing roles or apps to bypass the main-branch rules have not been checked.
  The risk is assuming the visible rules apply to every actor when an unintended exception may exist.

## The First Change

The proposed first change is to simplify the AGENTS checks section into the named check index described in “Keep member and agent instructions trustworthy,” keeping the required section, local setup guide, workflow definitions, course router, and edit boundaries while removing repeated explanations that already contradict the executable product checks.
This is a smaller review surface than changing runtimes or branch settings, and the baseline comparison supplies direct evidence of its maintenance benefit without requiring private data or a live deployment.
Its main tradeoff is one extra link traversal before some commands can be run, accepted in return for fewer competing accounts of the same checks.
It remains a recommendation for member review; the other goal sections remain unordered proposals, and this evaluation implements or schedules none of them.
