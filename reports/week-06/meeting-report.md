# Week 6 meeting report

## Metadata

- **Date:** 2026-11-05
- **Duration:** 61 minutes
- **Attended:** danmaninc, Kamil116, Customer
- **Presented:** the deployed product with highlighting, the context summary, rendered diagrams and long text blocks, and the architecture with its decisions
- **Dashboards and tests shown:** none; the analytics and observability dashboards, the observability `QRT-01` result and the optional runtime test's result were not ready
- **Threshold proposal:** not presented, so there is no decision on it
- **Recording:** permitted
- **Transcript publication:** permitted, see [the transcript](meeting-transcript.md)
- **Transcript shared privately:** not applicable
- **Script:** [meeting-script.md](meeting-script.md)

## Previous action points

| Action                                                                                                                                                                                                             | Outcome                                                                                                                                                                                                                | Decision                                                                                   |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| [`reports/week-05/meeting-report.md`](../week-05/meeting-report.md#action-points): "Comment on each story issue the meeting changed or accepted, citing its `DEC-nnn`"                                             | Not covered at the meeting, so it is not closed; it reappears in this report's action points.                                                                                                                          | None                                                                                       |
| [`reports/week-05/meeting-report.md`](../week-05/meeting-report.md#action-points): "Reword the acceptance criterion of `US-06` and add the story for clearing the context of an AI block"                          | Partly carried out: the clear action, with a confirmation, is in the deployed product and the customer used it; the reworded criterion was not covered at the meeting, so it reappears in this report's action points. | None                                                                                       |
| [`reports/week-05/meeting-report.md`](../week-05/meeting-report.md#action-points): "Rework `US-05` so a connected AI block passes a summary of a long conversation as context, and keep the story open until then" | Carried out: a connected AI block now receives a summary once a conversation passes 6,000 characters, and the customer accepted `US-05` after seeing it.                                                               | [`DEC-039`](../../docs/decisions.md#dec-039), [`DEC-042`](../../docs/decisions.md#dec-042) |
| [`reports/week-05/meeting-report.md`](../week-05/meeting-report.md#action-points): "Render diagrams in the AI block with the source text copyable and collapsible, and put them on the board as images"            | Carried out: a diagram renders in the conversation with its code copyable and collapsible, opens full screen, and a button adds it to the board as an image; the customer accepted the story.                          | [`DEC-040`](../../docs/decisions.md#dec-040)                                               |
| [`reports/week-05/meeting-report.md`](../week-05/meeting-report.md#action-points): "Add the highlight item to the right-click menu and a confirmation before deleting a block"                                     | Carried out: highlighting sits in the right-click menu and keeps one block highlighted for all members, and deleting a block or a message asks for confirmation; the customer accepted the highlighting story.         | [`DEC-038`](../../docs/decisions.md#dec-038)                                               |
| [`reports/week-05/meeting-report.md`](../week-05/meeting-report.md#action-points): "Choose the diagram kinds to support from the three the customer posts in the chat"                                             | Not covered at the meeting, so it is not closed; it reappears in this report's action points.                                                                                                                          | None                                                                                       |
| [`reports/week-05/meeting-report.md`](../week-05/meeting-report.md#action-points): "Add a user story for automatic block titling/summarization using the LLM"                                                      | Not covered at the meeting, so it is not closed; it reappears in this report's action points.                                                                                                                          | None                                                                                       |
| [`reports/week-05/meeting-report.md`](../week-05/meeting-report.md#action-points): "Prepare a specific brainstorming task to run with the customer to validate the tool's value"                                   | Replaced: we asked the customer which goal the session should pursue, and he defined it as a usability study with two groups, so the work becomes planning that study.                                                 | [`DEC-046`](../../docs/decisions.md#dec-046)                                               |
| [`reports/week-05/meeting-report.md`](../week-05/meeting-report.md#action-points): "Reword the "board is full" message to say that the maximum of 10 members is reached"                                           | Not covered at the meeting, so it is not closed; it reappears in this report's action points.                                                                                                                          | None                                                                                       |
| [`reports/week-05/meeting-report.md`](../week-05/meeting-report.md#action-points): "Draft the architecture decisions as proposed, to settle with the customer"                                                     | Partly carried out: we showed the architecture (frontend, Nginx gateway, backend, SQLite, LLM provider), and the customer asked for it in plain text; the decisions are not yet settled, so the action reappears.      | [`DEC-047`](../../docs/decisions.md#dec-047)                                               |

## Previous open questions

| Question                                                                                                                                                          | Answer                                                                                                                                                                       | Decision                                     |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------|
| [`reports/week-05/meeting-report.md`](../week-05/meeting-report.md#open-questions): "Which three kinds of diagrams does the customer use most?"                   | Not put to the customer, so it is still unanswered; it reappears in this report's open questions.                                                                            | None                                         |
| [`reports/week-05/meeting-report.md`](../week-05/meeting-report.md#open-questions): "How many blocks stay highlighted at once, one or two?"                       | One: the customer liked that a new highlight replaces the old one and wants it sold as a way to draw attention to one thing.                                                 | [`DEC-038`](../../docs/decisions.md#dec-038) |
| [`reports/week-05/meeting-report.md`](../week-05/meeting-report.md#open-questions): "Which specific brainstorming task should we use for the validation session?" | A usability study: one group brainstorms on an architectural problem with the board and a control group with its usual tools, with surveys for participants and an observer. | [`DEC-046`](../../docs/decisions.md#dec-046) |

## Summary

- The customer accepted the highlighting story, with one highlighted block at a time, `US-05`, sharing diagrams on the board, and the long text block story; the acceptance of `US-05` replaces its rejection in DEC-029.
- The customer asked that a user be told when a connected block gets a summary instead of a whole conversation, and that basic Markdown formatting come as its own story.
- The customer defined the validation session as a usability study with a control group, surveys and an observer, and put it and the analytics ahead of accounts and board export.
- The dashboards, `QRT-01` and the threshold proposal were not ready, so whether the telemetry answers the customer's questions stays open.

## Decisions

- [DEC-038: Accept the story for highlighting a block on the board, limited to one highlighted block at a time](../../docs/decisions.md#dec-038)
- [DEC-039: Accept `US-05`, using earlier answers as context](../../docs/decisions.md#dec-039)
- [DEC-040: Accept the story for sharing LLM diagrams on the board](../../docs/decisions.md#dec-040)
- [DEC-041: Accept the story for long text in a text block](../../docs/decisions.md#dec-041)
- [DEC-042: Tell the user when a connected block receives a summary instead of a whole conversation](../../docs/decisions.md#dec-042)
- [DEC-043: Support basic Markdown formatting in AI answers and text blocks, as a separate story](../../docs/decisions.md#dec-043)
- [DEC-044: Send only a diagram's code, not its image, as context, and only after the analytics and the usability study](../../docs/decisions.md#dec-044)
- [DEC-045: Put the usability study and the analytics ahead of accounts and board export](../../docs/decisions.md#dec-045)
- [DEC-046: Run the usability study as a comparison of a group using the board with a control group, with surveys and an observer](../../docs/decisions.md#dec-046)
- [DEC-047: Describe the architecture decisions in plain text, and use a diagram only where it has a purpose](../../docs/decisions.md#dec-047)

## Action points

| Action                                                                                                                                              | Owner     | Due           |
|-----------------------------------------------------------------------------------------------------------------------------------------------------|-----------|---------------|
| Plan the usability study: the two groups, an architectural task that produces a diagram, the participant and observer surveys and a usability score | hrrrsss   | End of Week 7 |
| Set up the analytics and observability dashboards, run the observability `QRT-01`, and prepare the threshold proposal for the next meeting          | danmaninc | End of Week 7 |
| Show the user when a connected block receives a summary instead of a whole conversation                                                             | danmaninc | End of Week 7 |
| Add a user story for basic Markdown formatting in AI answers and text blocks                                                                        | danmaninc | End of Week 7 |
| Write the architecture decisions as proposed in plain text, with a diagram only where it adds what words cannot                                     | danmaninc | End of Week 7 |
| Comment on each story issue changed or accepted in Weeks 5 and 6, citing its `DEC-nnn`, and confirm the reworded `US-06` criterion                  | danmaninc | End of Week 7 |
| Add a user story for automatic block titling/summarization using the LLM                                                                            | Kamil116  | End of Week 7 |
| Reword the "board is full" message to say that the maximum of 10 members is reached                                                                 | danmaninc | End of Week 7 |
| Choose the diagram kinds to support, from the kinds the customer names                                                                              | danmaninc | End of Week 7 |

## Open questions

| Question                                                                                                                                                                   | What it would change                                                                                          | Follow-up                                                                 |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| Which three kinds of diagrams does the customer use most?                                                                                                                  | Which diagram kinds we support and use in the usability study's task.                                         | danmaninc, to put to the customer in Week 7                               |
| Do the telemetry dashboards answer the questions the customer recognises, does the diagnosability requirement hold in staging, and what should the threshold measure next? | Whether we keep the current threshold or change it, and what the usability study can read from the telemetry. | danmaninc, at the next meeting once the dashboards and `QRT-01` are ready |

## Disagreements

| Your position                                                                         | Customer's position                                                                                | What you changed                                                                                                          |
|---------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| Next week's work includes accounts and board export, besides the usability study.     | The usability study matters more for the course, and accounts and permissions would take too long. | Moved accounts and export behind the usability study and the analytics, per [`DEC-045`](../../docs/decisions.md#dec-045). |
| The architecture is shown as a diagram.                                               | Write it in plain text, and use a diagram only where words fail and the picture has a purpose.     | Rewrite the architecture decisions in plain text, per [`DEC-047`](../../docs/decisions.md#dec-047).                       |
| A connected block receives a summary of a long conversation without telling the user. | The user will assume everything is sent, so the interface should signal it.                        | Added a signal in the interface, per [`DEC-042`](../../docs/decisions.md#dec-042).                                        |
