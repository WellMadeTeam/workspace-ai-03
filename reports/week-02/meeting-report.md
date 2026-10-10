# Week 2 validation meeting report

## Metadata

- **Date:** 2026-10-08
- **Duration:** 60 minutes
- **Attended:** danmaninc, AntonChulakov, hrrrsss, Customer
- **Presented:** the product vision draft (goal, stakeholders, constraints, boundary), the user stories with their priorities and the minimum usable product candidate, and the [AI context reuse flow prototype](prototypes.md#ai-context-reuse-flow)
- **Recording:** permitted, linked from the Week 02 Moodle submission
- **Transcript publication:** permitted
- **Transcript shared privately:** not applicable
- **Transcript:** [meeting-transcript.md](meeting-transcript.md)
- **Script:** [meeting-script.md](meeting-script.md)

## Previous action points

| Action | Outcome | Decision |
| ------ | ------- | -------- |
| [`reports/week-01/meeting-report.md`](../week-01/meeting-report.md#action-points): "Research possible visualizations of the prompts in the board" | Carried out: each LLM query lives in its own widget, its chat opens in a side panel, and widgets are connected by lines to pass context, see [the prototype](prototypes.md#ai-context-reuse-flow), task [#24](https://github.com/WellMadeTeam/workspace-ai-03/issues/24). The customer accepted the flow at this meeting. | [`DEC-013`](../../docs/decisions.md#dec-013), [`DEC-014`](../../docs/decisions.md#dec-014) |
| [`reports/week-01/meeting-report.md`](../week-01/meeting-report.md#action-points): "Transcribe and fixate the decisions made by the Customer in team's workspace" | Carried out, late: the [kickoff transcript](../week-01/meeting-transcript.md) came in [PR #12](https://github.com/WellMadeTeam/workspace-ai-03/pull/12), and the kickoff decisions became `DEC-001` to `DEC-007` in [the decisions log](../../docs/decisions.md), task [#18](https://github.com/WellMadeTeam/workspace-ai-03/issues/18). | None |

## Previous open questions

None.

## Summary

- The goal changed from solving the aggregation problem to verifying whether, and how far, a shared LLM whiteboard solves it, since seven weeks are too short for a full solution.
- The minimum usable product shrank to one shared board where everyone sees each query widget, its prompt and the LLM response; invitations, accounts and roles are not needed for it.
- The customer accepted the context reuse prototype and asked for a full-height side panel that also shows which widgets feed the context.
- Diagram rendering and AI-generated images became should-haves, while account creation, granular roles and export dropped to the lowest priority.
- The primary persona narrowed to software developers and software architects.

## Decisions

- [DEC-008: The project goal is to verify whether, and to what degree, a shared LLM whiteboard solves the aggregation problem](../../docs/decisions.md#dec-008)
- [DEC-009: Software developers and software architects are the primary persona](../../docs/decisions.md#dec-009)
- [DEC-010: Rendering diagrams from code and AI-generated images are should-have features, in that order](../../docs/decisions.md#dec-010)
- [DEC-011: Account creation, granular roles and whiteboard export have the lowest priority; skills and reference documents come first among the could-haves](../../docs/decisions.md#dec-011)
- [DEC-012: Accept the minimum usable product candidate narrowed to a shared board with LLM query widgets, without invitations or joining by link](../../docs/decisions.md#dec-012)
- [DEC-013: The selected widget's content opens in a side panel that takes the full right side of the screen](../../docs/decisions.md#dec-013)
- [DEC-014: The side panel shows which widgets are connected to the selected widget as its context](../../docs/decisions.md#dec-014)
- [DEC-015: The team decides UI layout details; the customer reviews concepts, not buttons](../../docs/decisions.md#dec-015)

## Action points

| Action | Owner | Due |
| ------ | ----- | --- |
| Rewrite the goal and the stakeholders in the product vision per `DEC-008` and `DEC-009` | hrrrsss | End of Week 2 |
| Re-prioritize the stories and the minimum usable product candidate per `DEC-010` to `DEC-012` | Kamil116 | End of Week 2 |
| Add a story for viewing the widgets connected as context, per `DEC-014` | Kamil116 | End of Week 2 |
| Rework the prototype so the side panel takes the full right side and lists connected widgets | danmaninc | End of Week 3 |
| Send the customer a UI design draft in Telegram for quick feedback | AntonChulakov | End of Week 3 |
| Propose a session that runs the same task in Telegram and on the board, to measure how far the board helps | danmaninc | End of Week 3 |

## Open questions

None.

## Disagreements

| Your position | Customer's position | What you changed |
| ------------- | ------------------- | ---------------- |
| The goal is to solve the aggregation problem | Seven weeks only allow verifying whether the idea solves it and how well | Goal reworded per [`DEC-008`](../../docs/decisions.md#dec-008) |
| Stakeholders are any teams that brainstorm with LLMs | If a persona is needed, it is developers and architects, for whom copy-paste breaks down on diagrams | Persona narrowed per [`DEC-009`](../../docs/decisions.md#dec-009) |
| The minimum usable product holds seven must-have stories, invitations and joining by link among them | It only needs a shared board with query widgets and shared responses | Candidate reduced per [`DEC-012`](../../docs/decisions.md#dec-012) |
| AI-generated images are a could-have | They are a should-have right after diagram rendering, since they also draw diagrams | Priority raised per [`DEC-010`](../../docs/decisions.md#dec-010) |
| A list of user stories is how we show scope to the customer | Customers think in features; stories are the team's analysis tool | From Week 3 we present features and keep stories for tracking |
