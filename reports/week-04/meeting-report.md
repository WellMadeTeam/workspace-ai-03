# Week 4 meeting report

## Metadata

- **Date:** 2026-10-22
- **Duration:** 30 minutes
- **Attended:** danmaninc, Customer
- **Presented:** the user stories implemented in the current sprint and their acceptance criteria, shown on the prototype running from the local branch, and the plan for the next sprint
- **Recording:** permitted
- **Transcript publication:** permitted, see [the transcript](meeting-transcript.md)
- **Transcript shared privately:** not applicable
- **Script:** [meeting-script.md](meeting-script.md)

## Previous action points

| Action                                                                                                                                                                                          | Outcome                                                                                                                                                                                                                                                         | Decision                                                                                   |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| [`reports/week-03/meeting-report.md`](../week-03/meeting-report.md#action-points): "Update the acceptance criteria for the connection limit to include a user-facing "board is full" message"   | Carried out: the acceptance criteria of the [story issues](https://github.com/WellMadeTeam/workspace-ai-03/issues?q=label%3Auser-story) now say that a member who opens a board that already has 10 members sees that the board is full, as the meeting showed. | None                                                                                       |
| [`reports/week-03/meeting-report.md`](../week-03/meeting-report.md#action-points): "Update the acceptance criteria for LLM failures to specify a meaningful error message visible to all users" | Carried out: the acceptance criteria of the [story issues](https://github.com/WellMadeTeam/workspace-ai-03/issues?q=label%3Auser-story) now say that the widget shows an error visible to all members when the LLM fails to answer, as the meeting showed.      | None                                                                                       |
| [`reports/week-03/meeting-report.md`](../week-03/meeting-report.md#action-points): "Confirm the verdicts on `US-01` and `US-04` in DEC-020 and DEC-021 with the customer"                       | Carried out: with both criteria now implemented, the customer accepted `US-01` and `US-04` at the meeting, which replaces the rejections in DEC-020 and DEC-021.                                                                                                | [`DEC-022`](../../docs/decisions.md#dec-022), [`DEC-023`](../../docs/decisions.md#dec-023) |

## Previous open questions

| Question                                                                                                                                                               | Answer                                                                                            | Decision |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|----------|
| [`reports/week-03/meeting-report.md`](../week-03/meeting-report.md#open-questions): "Which specific brainstorming task should we use for the next validation session?" | Still unanswered: the meeting did not get to it, so it reappears in this report's open questions. | None     |

## Summary

- The customer accepted `US-01`, `US-04` and the story for adding notes to the board; the "board is full" message and the LLM error shown to all members now meet their criteria, which replaces the rejections in DEC-020 and DEC-021.
- The customer asked for text blocks to open the same side panel as AI blocks, so that a long text can be edited there and used as context later; we took it on as a new feature.
- The customer found that deleting a block has no protection against accidents and that the "10 out of 10 members" wording of the full-board message carries no information; we agreed to fix both.
- The next sprint covers sharing diagrams on the board and highlighting a part of the board, and the architecture decisions are drafted this week as proposed and settled at the next meeting.

## Decisions

- [DEC-022: Accept `US-01` now that the "board is full" criterion is met](../../docs/decisions.md#dec-022)
- [DEC-023: Accept `US-04` now that the LLM error is visible to all members](../../docs/decisions.md#dec-023)
- [DEC-024: Accept the story for adding notes of my own to the board](../../docs/decisions.md#dec-024)
- [DEC-025: Open text blocks in the side panel like AI blocks, with Markdown support later](../../docs/decisions.md#dec-025)
- [DEC-026: Focus the next sprint on sharing diagrams and highlighting a part of the board](../../docs/decisions.md#dec-026)
- [DEC-027: Draft the architecture decisions in Week 4 and mark them as proposed](../../docs/decisions.md#dec-027)

## Action points

| Action                                                                                                                | Owner     | Due           |
|-----------------------------------------------------------------------------------------------------------------------|-----------|---------------|
| Reword the "board is full" message to say that the maximum of 10 members is reached, without the 10 out of 10 count   | danmaninc | End of Week 4 |
| Finish `US-05`, reusing LLM answers as context and seeing the context used for a query, and release the application   | danmaninc | End of Week 4 |
| Send the customer a link to the released board in Telegram so that he can verify the shared LLM error himself         | danmaninc | End of Week 4 |
| Draft the architecture decisions and compare them with the drivers, marked as proposed, to settle at the next meeting | danmaninc | End of Week 4 |
| Add a user story for editing text blocks in the side panel, like AI blocks                                            | danmaninc | End of Week 4 |
| Add a story that protects a block from accidental deletion                                                            | danmaninc | End of Week 5 |
| Remind the customer to post the meeting video and the transcript                                                      | danmaninc | End of Week 4 |

## Open questions

| Question                                                                                       | What it would change                                                                                                | Follow-up                          |
|------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|------------------------------------|
| Which specific brainstorming task should we use for the next validation session?               | Determines the scope of features needed to make the next session successful and valuable.                           | hrrrsss, to be decided in Week 4   |
| Should accidental deletion be handled by an undo, a confirmation, or a harder-to-reach button? | Decides the shape and size of the deletion-protection story; the customer called "are you sure" the weakest option. | danmaninc, to be decided in Week 5 |

## Disagreements

| Your position                                                                | Customer's position                                                                                                      | What you changed                                                                                  |
|------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| The full-board message may state "10 out of 10 members".                     | The count is always 10 out of 10, so the message should say that the maximum of 10 members is reached.                   | Agreed to reword the message, as an action point.                                                 |
| Text blocks are edited inside the block, while AI blocks open a side panel.  | Both should behave the same: text blocks open the panel, where a long document can be edited and Markdown added later.   | Agreed to unify them per DEC-025, and added a story for it as an action point.                    |
| Deleting a block removes it at once, with no protection.                     | A block deleted by mistake loses a whole conversation, so it needs an undo or a harder-to-reach button.                  | Agreed to protect against accidental deletion, as an action point; the form is an open question.  |
