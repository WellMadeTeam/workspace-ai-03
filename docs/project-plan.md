# Project plan

## Milestones

### MLS-03

- **Due:** 2026-10-17
- **Sprints:** [SPRINT-03](#sprint-03)
- **Advances:** [TOS-01](threshold-of-success.md#tos-01)

Several teammates on one board create LLM query widgets and all see the same queries and responses.
This is the MUP the customer accepted in [`DEC-012`](decisions.md#dec-012); invitations, joining by link and other text elements come later.

### MLS-05

- **Due:** 2026-10-30
- **Sprints:** [SPRINT-04](#sprint-04), [SPRINT-05](#sprint-05)
- **Advances:** [TOS-02](threshold-of-success.md#tos-02)

A teammate connects earlier answers to a new query as its context and sees which widgets that context came from, on a deployed product the customer can also self-host.
This is the shared-context idea of [`DEC-005`](decisions.md#dec-005) and [`DEC-014`](decisions.md#dec-014), the part of the product that tests whether a shared board beats sending answers through messengers.

### MLS-07

- **Due:** 2026-11-13
- **Sprints:** [SPRINT-06](#sprint-06), [SPRINT-07](#sprint-07)
- **Advances:** [TOS-03](threshold-of-success.md#tos-03)

Architects share LLM-generated diagrams on the board, rendered from code, and AI-generated images if time allows.
The order follows [`DEC-010`](decisions.md#dec-010); the increment ends in a usability test with real developers or architects.

### MLS-09

- **Due:** 2026-11-27
- **Sprints:** [SPRINT-08](#sprint-08), [SPRINT-09](#sprint-09)
- **Advances:** [TOS-04](threshold-of-success.md#tos-04)

The team states, with evidence from real use, whether and how well a shared LLM board solves the aggregation problem.
This is the project goal set in [`DEC-008`](decisions.md#dec-008); notes and highlighting land here only if they serve that answer.

## Sprints

### SPRINT-03

Teammates on one board send LLM queries from widgets and all see the same queries and answers, runnable from a clean checkout.

- **Due:** 2026-10-17

#### REL-03

### SPRINT-04

A teammate connects existing widgets to a new query and the answer uses them as context.

- **Due:** 2026-10-23

#### REL-04

### SPRINT-05

Provisional: the side panel shows a query's connected context, and the product runs in production and from the self-hosting instructions.

- **Due:** 2026-10-30

#### REL-05

### SPRINT-06

Provisional: a diagram an LLM returns as code renders on the board, and the product reports how teams use it.

- **Due:** 2026-11-06

#### REL-06

### SPRINT-07

Provisional: architects can share diagrams, and images if time allows, and the usability test is ready to run.

- **Due:** 2026-11-13

#### REL-07

### SPRINT-08

Provisional: usability findings are fixed, and the release process is reproducible from the repository.

- **Due:** 2026-11-20

#### REL-08

### SPRINT-09

Provisional: the final release is published with the evidence of whether the shared board solves the aggregation problem.

- **Due:** 2026-11-27

#### REL-09

## Progress Monitoring

- **Review:** the team's weekly review, <day> at <time>, before the customer meeting; it reviews [threshold-of-success.md](threshold-of-success.md) and [risks.md](risks.md).
- **Checked by:** the accountable member of each scheduled issue reports its state, and the team walks the sprint backlog against the sprint's goal.
- **Visible at:** the [project's table view](https://github.com/orgs/WellMadeTeam/projects/<number>) and the sprints' [GitHub milestones](https://github.com/WellMadeTeam/workspace-ai-03/milestones).
