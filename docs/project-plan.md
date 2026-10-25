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
Once the core flow works, members highlight part of the board and see the diagrams an LLM writes as code rendered as pictures, per [`DEC-006`](decisions.md#dec-006) and [`DEC-010`](decisions.md#dec-010); images from an LLM join this increment only if time allows.

### MLS-07

- **Due:** 2026-11-14
- **Sprints:** [SPRINT-06](#sprint-06), [SPRINT-07](#sprint-07)
- **Advances:** [TOS-02](threshold-of-success.md#tos-02)

Ten clients work on one board at once, per [`CON-03`](product-vision.md#con-03), with no update lost and every change visible to the others, shown by a repeatable test.
The increment also extends the core flow: the LLM takes the team's reference documents into account, and images from an LLM reach the board if they did not fit into the previous increment.
Accounts and export, per [`DEC-011`](decisions.md#dec-011) and [`DEC-007`](decisions.md#dec-007), come last and are the first to drop if time runs out, because they are not part of the threshold.

### MLS-08

- **Due:** 2026-11-21
- **Sprints:** [SPRINT-08](#sprint-08)
- **Advances:** [TOS-03](threshold-of-success.md#tos-03)

A team outside ours runs a brainstorming session on the board and reuses its responses as context for new queries.
The session is the evidence for the project goal of [`DEC-008`](decisions.md#dec-008): whether, and how well, a shared board replaces passing LLM results through messengers.

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

Provisional: members join a board by its link, highlight part of it, and see LLM diagrams rendered on it, with images from an LLM if time allows, on a product that runs in production and from the self-hosting instructions.

- **Due:** 2026-10-31
- **Sprint Backlog:** [the issues scheduled into SPRINT-05](https://github.com/WellMadeTeam/workspace-ai-03/milestone/5)

#### REL-05

### SPRINT-06

Provisional: real-time sync keeps every update for several clients on one board, the LLM takes the team's reference documents into account, images from an LLM appear on the board for every member, and the product reports how teams use it, with a brainstorming session held by an outside team if time allows.

- **Due:** 2026-11-07
- **Sprint Backlog:** [the issues scheduled into SPRINT-06](https://github.com/WellMadeTeam/workspace-ai-03/milestone/6)

#### REL-06

### SPRINT-07

Provisional: ten clients work on one board with no lost updates and every change visible to the others, shown by a test linked from the Week 7 report, an outside team's feedback on the board is presented, the product is improved and its bugs are fixed, and, if time allows, members keep their boards under their own accounts and export a board to a file.

- **Due:** 2026-11-14
- **Sprint Backlog:** [the issues scheduled into SPRINT-07](https://github.com/WellMadeTeam/workspace-ai-03/milestone/7)

#### REL-07

### SPRINT-08

Provisional: a team outside ours completes a brainstorming session on the board, recorded in the Week 8 report, on a product that is improved and has its bugs fixed.

- **Due:** 2026-11-21

#### REL-08

### SPRINT-09

Provisional: the final release is published with the evidence of whether the shared board solves the aggregation problem.

- **Due:** 2026-11-28

#### REL-09

## Progress Monitoring

- **Review:** the team's weekly review, Tuesday at 19:30, before the customer meeting; it reviews [threshold-of-success.md](threshold-of-success.md) and [risks.md](risks.md).
- **Checked by:** the accountable member of each scheduled issue reports its state, and the team walks the sprint backlog against the sprint's goal.
- **Visible at:** the [project's table view](https://github.com/orgs/WellMadeTeam/projects/1/views/3) and the sprints' [GitHub milestones](https://github.com/WellMadeTeam/workspace-ai-03/milestones).
