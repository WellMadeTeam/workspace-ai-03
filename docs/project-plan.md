# Project plan

## Milestones

### MLS-03

- **Due:** 2026-10-17
- **Sprints:** [SPRINT-03](#sprint-03)
- **Advances:** [TOS-01](threshold-of-success.md#tos-01)

Several teammates on one board create LLM query widgets and all see the same queries and responses.
This is the MUP the customer accepted in [`DEC-012`](decisions.md#dec-012); invitations, joining by link and other text elements come later.

### MLS-05

- **Due:** 2026-10-31
- **Sprints:** [SPRINT-04](#sprint-04), [SPRINT-05](#sprint-05)
- **Advances:** [TOS-01](threshold-of-success.md#tos-01)

A teammate who joined the board by its link sends a new query with responses selected from the board as its context, on a deployed product the customer can also self-host.
This completes the core flow of [`DEC-005`](decisions.md#dec-005), the part of the product that tests whether a shared board beats sending answers through messengers; around it, the side panel shows which widgets a query's context came from, per [`DEC-014`](decisions.md#dec-014), members add notes of their own, a full board turns away an eleventh member, per [`DEC-003`](decisions.md#dec-003), and a failed query shows its error to every member.
Once the core flow works, members highlight part of the board and see the diagrams an LLM writes as code rendered as pictures, per [`DEC-006`](decisions.md#dec-006) and [`DEC-010`](decisions.md#dec-010), and a text block opens in the side panel like an AI block, per [`DEC-025`](decisions.md#dec-025); images from an LLM join this increment only if time allows.

### MLS-07

- **Due:** 2026-11-15
- **Sprints:** [SPRINT-06](#sprint-06), [SPRINT-07](#sprint-07)
- **Advances:** [TOS-02](threshold-of-success.md#tos-02)

Ten clients work on one board at once, per [`CON-03`](product-vision.md#con-03), with no update lost and every change visible to the others, shown by a repeatable test.
The increment prepares a production-ready draft of the usability test, with images from the LLM service provider and basic Markdown rendering in text blocks and AI conversations available for the review.
The usability study and its analytics take priority over accounts and board export, per [`DEC-045`](decisions.md#dec-045).
Reference documents are outside the current scope, and deletion protection remains in the unscheduled product backlog.

### MLS-08

- **Due:** 2026-11-21
- **Sprints:** [SPRINT-08](#sprint-08)
- **Advances:** [TOS-03](threshold-of-success.md#tos-03)

At least three representative adults complete the usability sessions, with five as the design target, and the team publishes sanitized results, findings, and their triage.
The study follows [`DEC-046`](decisions.md#dec-046), comparing a group using the board with a control group using its usual tools, and provides evidence for the project goal of [`DEC-008`](decisions.md#dec-008): whether, and how well, a shared board replaces passing LLM results through messengers.

## Sprints

### SPRINT-03

Teammates on one board send LLM queries from widgets and all see the same queries and answers, runnable from a clean checkout.

- **Due:** 2026-10-17
- **Sprint Backlog:** [the issues scheduled into SPRINT-03](https://github.com/WellMadeTeam/workspace-ai-03/milestone/3)

#### REL-03

Released as [v0.1.0](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.1.0) on 2026-10-17.

### SPRINT-04

A teammate connects existing widgets to a new query and the answer uses them as context, the side panel shows which widgets those are, members add notes of their own, a full board turns away an eleventh member, and a failed query shows its error to every member.

- **Due:** 2026-10-25
- **Sprint Backlog:** [the issues scheduled into SPRINT-04](https://github.com/WellMadeTeam/workspace-ai-03/milestone/4)
- **Planned Velocity:** 26
- **Actual Velocity:** 15; `US-05` and `US-06` are finished but not yet accepted by the customer, so they moved to `SPRINT-05`.

#### REL-04

Released as [v0.2.0](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.2.0) on 2026-10-25.

### SPRINT-05

Members join a board by its link, highlight part of it, see LLM diagrams rendered on it, and work with a long text block in the side panel like an AI block, the customer accepts reusing earlier answers as context and seeing the context a query used, and the product runs in staging and production on the university VM.

- **Due:** 2026-10-31
- **Sprint Backlog:** [the issues scheduled into SPRINT-05](https://github.com/WellMadeTeam/workspace-ai-03/milestone/5)
- **Planned Velocity:** 26
- **Actual Velocity:** 5; `US-02`, `US-05`, `US-08`, and `US-14` were not accepted by the customer in this sprint, so they moved to `SPRINT-06`.

#### REL-05

- **Released:** [v0.3.0](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.3.0) on 2026-10-31.
- **Checked QRs:**
  - [QR-02](quality-requirements/qr/QR-02.md)
  - [QR-04](quality-requirements/qr/QR-04.md)

The result and the last check of each test are in the [Quality Requirement Testing Plan](#quality-requirement-testing-plan).

### SPRINT-06

The customer accepts highlighting, reusing earlier answers as context, sharing LLM diagrams, and working with a long text block like an AI block, and the product records how teams go through the core task and exposes its request signals, both shown on self-hosted analytics and observability dashboards in staging and production; images from an LLM and the team's reference documents reach the board if time allows.

- **Due:** 2026-11-08
- **Sprint Backlog:** [the issues scheduled into SPRINT-06](https://github.com/WellMadeTeam/workspace-ai-03/milestone/6)
- **Planned Velocity:** 47
- **Actual Velocity:** 21; `US-09`, `US-10`, `US-17`, and `US-18` were not completed or accepted by the customer in this sprint, so they moved to `SPRINT-07`.

#### REL-06

- **Released:** [v0.4.0](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.4.0) on 2026-11-09.
- **Checked QRs:**
  - [QR-01](quality-requirements/qr/QR-01.md)
  - [QR-02](quality-requirements/qr/QR-02.md)
  - [QR-04](quality-requirements/qr/QR-04.md)

The result and the last check of each test are in the [Quality Requirement Testing Plan](#quality-requirement-testing-plan).

### SPRINT-07

A production-ready draft of the usability test is ready for customer review and a teammate dry run, supported by working analytics and observability, with images from the LLM service provider and basic Markdown rendered in text blocks and AI conversation messages.

- **Due:** 2026-11-15
- **Sprint Backlog:** [the issues scheduled into SPRINT-07](https://github.com/WellMadeTeam/workspace-ai-03/milestone/7)
- **Planned Velocity:** 21
- **Actual Velocity:** 13 (`US-17`: 5 + `US-18`: 8); the two stories were completed and accepted at the Week 7 meeting.

The teammate dry run and customer acceptance of `US-19` move to `SPRINT-08`; image generation (`US-09`) returns to the unscheduled product backlog following [`DEC-050`](decisions.md#dec-050).

The test design follows [`DEC-046`](decisions.md#dec-046) and includes the participant and observer surveys, tasks and protocol, consent, private data repository, recordings folder, recruitment and session plan, usability quality requirement and manual test, and analysis plan.
Instrumentation is designed and implemented before the dry run; the dry run checks the wording, time limits, and instrumentation without counting as a participant session.
The draft must let another person run the test without asking the team to fill in missing instructions.
Basic Markdown support follows [`DEC-043`](decisions.md#dec-043), including numbered and unnumbered lists in blocks and conversation messages.
Reference documents are outside this sprint's scope; accounts and export remain behind the study and its analytics, per [`DEC-045`](decisions.md#dec-045).
The Week 7 handoff links the design and the scheduled execution work, with results, findings, triage, and the usability verdict due in SPRINT-08.

#### REL-07

- **Released:** [v0.5.0](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.5.0) on 2026-11-15.
- **Checked QRs:**
  - [QR-01](quality-requirements/qr/QR-01.md)
  - [QR-02](quality-requirements/qr/QR-02.md)
  - [QR-05](quality-requirements/qr/QR-05.md)
  - [QR-04](quality-requirements/qr/QR-04.md)

The result and the last check of each test are in the [Quality Requirement Testing Plan](#quality-requirement-testing-plan).

### SPRINT-08

The team establishes whether the shared board helps representative participants brainstorm with an LLM, supported by sanitized usability evidence and a configuration evaluation of the repository released as REL-08.

- **Due:** 2026-11-21
- **Sprint Backlog:** [the issues scheduled into SPRINT-08](https://github.com/WellMadeTeam/workspace-ai-03/milestone/8)
- **Planned Velocity:** 0

This is a task sprint: no feature user stories are selected, so the hand-computed total of selected stories' points is 0.
Markdown acceptance and image generation return to the unscheduled product backlog alongside the other refined feature stories, with their estimates retained and no milestone, ownership values, or assignees until a later sprint is planned.

Before the first counted session, review the teammate dry-run evidence and resolve its blocking findings, confirm the study's recruitment and condition allocation, and freeze the protocol, analysis plan, and QR-06 measure and pass bar.
The proposed two teams of three require review against the customer's group-size decision in [DEC-049](decisions.md#dec-049); planning does not approve a different study design.
Instrumentation verification on the exact staging deployment must confirm successful reply and context-reuse events, the named store, the session link, `source=usability-test`, exclusion from product metrics, and isolation from production.
A failed verification blocks counted sessions until corrected and rerun; it is due before participants start, not with the results.

Run at least three eligible adult participant sessions, with five as the current design target and the proposed six-person allocation subject to review, on staging in person on the university network before the results are written.
Require durable consent and capture before each counted session, reset the synthetic seed, keep raw text and filtered telemetry in the private usability-data repository and recordings in the team-owned cloud folder, and publish only sanitized session notes.
The usability sessions took place during SPRINT-08; the teammate dry run is excluded.
On 2026-11-22, the team confirmed the remaining eligibility checks: all three participant sessions count within one shared-board team run; the [session confirmation](usability-tests/ut-01/sessions/README.md#eligibility-consent-and-capture-confirmation) records this update.
The UT-01 record and index name SPRINT-08 as the run sprint, and the sanitized session notes must supply the session dates and evidence of the prerequisites above.

Analyze the sessions using the frozen analysis plan, publish the results and stable findings, and triage every finding.
When a Critical or Major finding exists, schedule at least one resulting fix task in SPRINT-08 with its finding, story and AC-nn, and FR-nnn or ADR-nnn links; this does not schedule a new feature story.
Include landed fixes in REL-08 and move unfinished fixes to SPRINT-09 at sprint close with the reason recorded in the report.
With fewer than three counted sessions, publish the qualitative record and declared shortfall without aggregate statistics, keep UT-01 Planned, and claim no usability result.
Evaluate QR-06 QRT-01 and TOS-03 from the recorded evidence; a failed requirement stays visible, and an incomplete test stays Not verified or moves to SPRINT-09 with its reason.

The configuration plan documents the current configuration, and its public evaluation judges the artifacts by the local goals they serve, including tradeoffs and the first proposed change.
Configuration implementation is not required by the evaluation.
Update the glossary and risks, review the usability evidence and next steps with the customer at the Sprint Review, apply same-week feedback, and run the testing-plan rows scheduled for this sprint or declare their reason for moving to SPRINT-09.
Publish REL-08 after the sprint's changes merge, then record actual velocity, the retrospective, AI usage, and the Week 9 handoff at sprint close.

The [UT-01 results](usability-tests/ut-01/results.md) record three counted participant sessions in one team run, with assisted main-task completion and the QR-06 QRT-01 verdict reflected in the testing plan.
The full Sprint Review remains pending: the results were not ready at the meeting because testing was planned to take place after it.
The existing [triage](usability-tests/ut-01/results.md#triage) from merged [PR #406](https://github.com/WellMadeTeam/workspace-ai-03/pull/406) selects [#405](https://github.com/WellMadeTeam/workspace-ai-03/issues/405) for SPRINT-08, serving US-08 AC-01 and AC-03 through FR-012 and FR-020, and defers the seven Minor recommendations.
No customer acceptance, completed fix, or release is claimed by this update.
Include #405 in REL-08 only after implementation and verification finish; otherwise move the unfinished task to SPRINT-09 at sprint close and record the actual reason in the weekly report.
The member supplied the [QR-01 QRT-01 closeout output](../reports/week-08/qr-01-qrt-01.md) from 2026-11-22: 12 query-message reads exceeded two seconds and none were missed.
The result is Fails; the member confirms tested revision `0fa12cffbe3018876a5e39821625ba00aed98083` and staging on the university VM from the university network.
The [release preparation](../reports/week-08/release-preparation.md) records the candidate scope and remaining tag/publication steps; no release is claimed.

#### REL-08

- **Released:** [v0.5.1](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.5.1) on 2026-11-22.
- **Checked QRs:**
  - [QR-01](quality-requirements/qr/QR-01.md)
  - [QR-06](quality-requirements/qr/QR-06.md)

The result and the last check of each test are in the [Quality Requirement Testing Plan](#quality-requirement-testing-plan).

### SPRINT-09

Provisional: the final repository state and REL-09, the 7-minute presentation deck, and the reflection explain whether the shared board solves the aggregation problem, using the usability results, configuration evaluation, and declared limitations.

- **Due:** 2026-11-28
- **Sprint Backlog:** [the SPRINT-09 milestone](https://github.com/WellMadeTeam/workspace-ai-03/milestone/9)

The existing milestone is linked for the handoff; no feature story is scheduled in advance.
Refined stories remain in the product backlog until SPRINT-09 planning selects them against the final-delivery work and any deferred usability fixes or unverified tests.

#### REL-09

## Quality Requirement Testing Plan

Each row is one test, in the order of [the quality requirements index](quality-requirements/README.md); the test itself is defined in its requirement's file.

| QR | QRT | Status | Checked | Planned for sprint | Evidence |
| -- | --- | ------ | ------- | ------------------ | -------- |
| [QR-01](quality-requirements/qr/QR-01.md) | [QR-01 QRT-01](quality-requirements/qr/QR-01.md#qrt-01) | Fails | [SPRINT-08](#sprint-08) | [SPRINT-08](#sprint-08) | [Week 08 supplied run](../reports/week-08/qr-01-qrt-01.md) |
| [QR-02](quality-requirements/qr/QR-02.md) | [QR-02 QRT-01](quality-requirements/qr/QR-02.md#qrt-01) | Passes | [SPRINT-07](#sprint-07) | [SPRINT-07](#sprint-07) | [Release-commit CI run](https://github.com/WellMadeTeam/workspace-ai-03/actions/runs/43754420082) and [scope of the recheck](../reports/week-07/README.md#qr-02-qrt-01-2026-11-15) |
| [QR-04](quality-requirements/qr/QR-04.md) | [QR-04 QRT-01](quality-requirements/qr/QR-04.md#qrt-01) | Passes | [SPRINT-07](#sprint-07) | [SPRINT-07](#sprint-07) | [Week 07 setup run on `0f9ccbb`](../reports/week-07/README.md#qr-04-qrt-01-2026-11-15) |
| [QR-05](quality-requirements/qr/QR-05.md) | [QR-05 QRT-01](quality-requirements/qr/QR-05.md#qrt-01) | Passes | [SPRINT-07](#sprint-07) | [SPRINT-07](#sprint-07) | [Week 07 log output and dashboard checks](../reports/week-07/README.md#qr-05-qrt-01-2026-11-15) |
| [QR-06](quality-requirements/qr/QR-06.md) | [QR-06 QRT-01](quality-requirements/qr/QR-06.md#qrt-01) | Fails | [SPRINT-08](#sprint-08) | [SPRINT-08](#sprint-08) | [UT-01 results](usability-tests/ut-01/results.md#team-task-results) |

QR-01 remains Fails after the supplied SPRINT-08 closeout run exceeded the two-second limit for 12 query-message reads.
Its evidence records member-confirmed provenance and the run after the planned sprint deadline; no later recheck or fix is claimed.
QR-03 has a [member-confirmed scenario check](../reports/week-07/README.md#qr-03-scenario-check-2026-11-15), but its requirement defines no QRT, so it has no test row here.

## Progress Monitoring

- **Review:** the team's weekly review, Tuesday at 19:30, before the customer meeting; it reviews [threshold-of-success.md](threshold-of-success.md) and [risks.md](risks.md).
- **Checked by:** the accountable member of each scheduled issue reports its state, and the team walks the sprint backlog against the sprint's goal.
- **Visible at:** the [project's table view](https://github.com/orgs/WellMadeTeam/projects/1/views/3) and the sprints' [GitHub milestones](https://github.com/WellMadeTeam/workspace-ai-03/milestones).
