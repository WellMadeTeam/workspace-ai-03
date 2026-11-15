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

The test design follows [`DEC-046`](decisions.md#dec-046) and includes the participant and observer surveys, tasks and protocol, consent, private data repository, recordings folder, recruitment and session plan, usability quality requirement and manual test, and analysis plan.
Instrumentation is designed and implemented before the dry run; the dry run checks the wording, time limits, and instrumentation without counting as a participant session.
The draft must let another person run the test without asking the team to fill in missing instructions.
Basic Markdown support follows [`DEC-043`](decisions.md#dec-043), including numbered and unnumbered lists in blocks and conversation messages.
Reference documents are outside this sprint's scope; accounts and export remain behind the study and its analytics, per [`DEC-045`](decisions.md#dec-045).
The Week 7 handoff links the design and the scheduled execution work, with results, findings, triage, and the usability verdict due in SPRINT-08.

#### REL-07

### SPRINT-08

Provisional: representative participants complete the usability test on staging, and the team publishes sanitized evidence of the board's usability, the findings and their triage, the quality requirement verdict, and REL-08 with any fixes completed in the sprint.

- **Due:** 2026-11-21
- **Sprint Backlog:** [the issues scheduled into SPRINT-08](https://github.com/WellMadeTeam/workspace-ai-03/milestone/8)

Instrumentation verification runs after implementation and before the first counted session, confirming that a team-run record reaches the named store and can be linked to that run.
Verification is due before that session, rather than at the results deadline, and no later than the start of SPRINT-09.
Counted sessions are planned for SPRINT-08, the sprint of the last counted session; the Week 7 dry run is excluded.
The results and findings follow the analysis plan fixed before the first session, and significant findings produce task issues scheduled for this sprint when they can be completed before REL-08.
Future feature stories stay estimated in the product backlog without milestones, ownership values, or assignees until their sprint is planned.

#### REL-08

### SPRINT-09

Provisional: the final release is published with the evidence of whether the shared board solves the aggregation problem.

- **Due:** 2026-11-28

#### REL-09

## Quality Requirement Testing Plan

Each row is one test, in the order of [the quality requirements index](quality-requirements/README.md); the test itself is defined in its requirement's file.

| QR                                        | QRT                                                     | Status       | Checked                 | Planned for sprint      | Evidence                                                                                            |
| ----------------------------------------- | ------------------------------------------------------- | ------------ | ----------------------- | ----------------------- | --------------------------------------------------------------------------------------------------- |
| [QR-01](quality-requirements/qr/QR-01.md) | [QR-01 QRT-01](quality-requirements/qr/QR-01.md#qrt-01) | Fails        | [SPRINT-06](#sprint-06) | [SPRINT-07](#sprint-07) | the staging run in the Week 06 report                                                               |
| [QR-02](quality-requirements/qr/QR-02.md) | [QR-02 QRT-01](quality-requirements/qr/QR-02.md#qrt-01) | Passes       | [SPRINT-06](#sprint-06) | [SPRINT-05](#sprint-05) | [the CI run on `0d9eb66`](https://github.com/WellMadeTeam/workspace-ai-03/actions/runs/42679223070) |
| [QR-05](quality-requirements/qr/QR-05.md) | [QR-05 QRT-01](quality-requirements/qr/QR-05.md#qrt-01) | Not verified | None                    | [SPRINT-06](#sprint-06) | [partial log output][qr-05-log]                                                                     |
| [QR-04](quality-requirements/qr/QR-04.md) | [QR-04 QRT-01](quality-requirements/qr/QR-04.md#qrt-01) | Passes       | [SPRINT-06](#sprint-06) | [SPRINT-05](#sprint-05) | the scripted run in the Week 06 report                                                              |

[qr-05-log]: https://github.com/WellMadeTeam/workspace-ai-03/pull/283#issuecomment-6749240716

## Progress Monitoring

- **Review:** the team's weekly review, Tuesday at 19:30, before the customer meeting; it reviews [threshold-of-success.md](threshold-of-success.md) and [risks.md](risks.md).
- **Checked by:** the accountable member of each scheduled issue reports its state, and the team walks the sprint backlog against the sprint's goal.
- **Visible at:** the [project's table view](https://github.com/orgs/WellMadeTeam/projects/1/views/3) and the sprints' [GitHub milestones](https://github.com/WellMadeTeam/workspace-ai-03/milestones).
