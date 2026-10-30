# Week 5 meeting report

## Metadata

- **Date:** 2026-10-29
- **Duration:** 40 minutes
- **Attended:** danmaninc, AntonChulakov, hrrrsss, Customer
- **Presented:** the deployed product with the context links of AI answers, the AI-to-AI connection, the right-click menu and the share link, the acceptance criteria of the current sprint's stories, and our plan for diagrams, highlighting and deletion
- **Tests shown:** none; no test result was shown at this meeting
- **Recording:** permitted
- **Transcript publication:** permitted, see [the transcript](meeting-transcript.md)
- **Transcript shared privately:** not applicable
- **Script:** [meeting-script.md](meeting-script.md)

## Previous action points

| Action                                                                                                                                                                                                     | Outcome                                                                                                                                                                                                 | Decision                                                                                   |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| [`reports/week-04/meeting-report.md`](../week-04/meeting-report.md#action-points): "Reword the "board is full" message to say that the maximum of 10 members is reached, without the 10 out of 10 count"   | Not covered at the meeting, so it is not closed; it reappears in this report's action points.                                                                                                           | None                                                                                       |
| [`reports/week-04/meeting-report.md`](../week-04/meeting-report.md#action-points): "Finish `US-05`, reusing LLM answers as context and seeing the context used for a query, and release the application"   | Partly carried out: the deployed product shows the blocks an answer used, but a connected AI block does not yet use another AI block's conversation, so `US-05` was rejected and its rework stays open. | [`DEC-028`](../../docs/decisions.md#dec-028), [`DEC-029`](../../docs/decisions.md#dec-029) |
| [`reports/week-04/meeting-report.md`](../week-04/meeting-report.md#action-points): "Send the customer a link to the released board in Telegram so that he can verify the shared LLM error himself"         | Carried out: the customer opened the deployed board through a link sent in Telegram during the meeting and saw the highlight problem for himself.                                                       | None                                                                                       |
| [`reports/week-04/meeting-report.md`](../week-04/meeting-report.md#action-points): "Draft the architecture decisions and compare them with the drivers, marked as proposed, to settle at the next meeting" | Not covered at the meeting, so it is not closed; it reappears in this report's action points.                                                                                                           | None                                                                                       |
| [`reports/week-04/meeting-report.md`](../week-04/meeting-report.md#action-points): "Add a user story for editing text blocks in the side panel, like AI blocks"                                            | Carried out: the story for a long text block that works like an AI block is on the sprint list and in progress.                                                                                         | None                                                                                       |
| [`reports/week-04/meeting-report.md`](../week-04/meeting-report.md#action-points): "Add a story that protects a block from accidental deletion"                                                            | Partly carried out: deletion now sits in the right-click menu, and the meeting chose a confirmation as the protection.                                                                                  | [`DEC-036`](../../docs/decisions.md#dec-036), [`DEC-037`](../../docs/decisions.md#dec-037) |
| [`reports/week-04/meeting-report.md`](../week-04/meeting-report.md#action-points): "Remind the customer to post the meeting video and the transcript"                                                      | Not covered at the meeting, so it is not closed; it reappears in this report's action points.                                                                                                           | None                                                                                       |

## Previous open questions

| Question                                                                                                                                                                             | Answer                                                                                           | Decision                                                                                   |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| [`reports/week-04/meeting-report.md`](../week-04/meeting-report.md#open-questions): "Which specific brainstorming task should we use for the next validation session?"               | Still unanswered: the meeting did not reach it, so it reappears in this report's open questions. | None                                                                                       |
| [`reports/week-04/meeting-report.md`](../week-04/meeting-report.md#open-questions): "Should accidental deletion be handled by an undo, a confirmation, or a harder-to-reach button?" | A confirmation before deleting; an undo needs a trash bin and stays out of scope for now.        | [`DEC-036`](../../docs/decisions.md#dec-036), [`DEC-037`](../../docs/decisions.md#dec-037) |

## Summary

- The customer accepted the story about seeing which context a query used, once its acceptance criterion was reworded, and the story about joining a board through a share link; `US-05` was rejected because AI blocks do not yet reuse each other's conversations, and its rework stays open.
- Connected AI blocks will pass a summary of a long conversation rather than the whole of it, and the customer asked for a story to clear an AI block's context.
- Diagrams will render in the AI block next to their source text, which stays copyable and collapsible, and reach the board as images only.
- Highlighting goes into the right-click menu only, deleting asks for confirmation, and undoing a deletion is a later nice-to-have.

## Decisions

- [DEC-028: Accept `US-06`, seeing which blocks an answer used, with its acceptance criterion reworded](../../docs/decisions.md#dec-028)
- [DEC-029: `US-05` is rejected because a connected AI block does not yet use another AI block's conversation as context, and its rework stays open](../../docs/decisions.md#dec-029)
- [DEC-030: Accept the story for joining a teammate's board through a shared link](../../docs/decisions.md#dec-030)
- [DEC-031: Add a story for clearing the context of an AI block](../../docs/decisions.md#dec-031)
- [DEC-032: Pass a summary of a long AI conversation as context to a connected block](../../docs/decisions.md#dec-032)
- [DEC-033: Show a rendered diagram together with its copyable, collapsible source text in the AI block](../../docs/decisions.md#dec-033)
- [DEC-034: Put rendered diagrams on the board as images, without native diagram blocks](../../docs/decisions.md#dec-034)
- [DEC-035: Highlight a block from the right-click menu only, without member colors or a toolbar button](../../docs/decisions.md#dec-035)
- [DEC-036: Ask for confirmation before deleting a block](../../docs/decisions.md#dec-036)
- [DEC-037: Undoing a deletion is a nice-to-have outside the current scope](../../docs/decisions.md#dec-037)

## Action points

| Action                                                                                                                        | Owner         | Due           |
|-------------------------------------------------------------------------------------------------------------------------------|---------------|---------------|
| Comment on each story issue the meeting changed or accepted, citing its `DEC-nnn`                                             | danmaninc     | End of Week 5 |
| Reword the acceptance criterion of `US-06` and add the story for clearing the context of an AI block                          | danmaninc     | End of Week 5 |
| Rework `US-05` so a connected AI block passes a summary of a long conversation as context, and keep the story open until then | danmaninc     | End of Week 6 |
| Render diagrams in the AI block with the source text copyable and collapsible, and put them on the board as images            | danmaninc     | End of Week 6 |
| Add the highlight item to the right-click menu and a confirmation before deleting a block                                     | AntonChulakov | End of Week 6 |
| Choose the diagram kinds to support from the three the customer posts in the chat                                             | danmaninc     | End of Week 6 |
| Add a user story for automatic block titling/summarization using the LLM                                                      | Kamil116      | End of Week 6 |
| Prepare a specific brainstorming task to run with the customer to validate the tool's value                                   | hrrrsss       | End of Week 6 |
| Reword the "board is full" message to say that the maximum of 10 members is reached                                           | danmaninc     | End of Week 6 |
| Draft the architecture decisions as proposed, to settle with the customer                                                     | danmaninc     | End of Week 6 |
| Remind the customer to post the Week 4 video and transcript                                                                   | danmaninc     | End of Week 5 |

## Open questions

| Question                                                                    | What it would change                                                                 | Follow-up                                           |
|-----------------------------------------------------------------------------|--------------------------------------------------------------------------------------|-----------------------------------------------------|
| Which three kinds of diagrams does the customer use most?                   | Which diagram kinds we render and test first.                                        | danmaninc, after the customer posts them, in Week 6 |
| How many blocks stay highlighted at once, one or two?                       | How the highlight clears when another block is highlighted.                          | AntonChulakov, to be decided in Week 6              |
| Which specific brainstorming task should we use for the validation session? | Determines the scope of features needed to make the session successful and valuable. | hrrrsss, to be decided in Week 6                    |

## Disagreements

| Your position                                                                        | Customer's position                                                                                               | What you changed                                                                                                                                                              |
|--------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| A diagram renders in the AI block instead of its code, so the code is not displayed. | The source text must stay visible and copyable, because he edits it and re-renders; collapsing long code is fine. | Show both the rendered diagram and the collapsible source, per [`DEC-033`](../../docs/decisions.md#dec-033).                                                                  |
| A highlight button belongs on the toolbar as well as in the context menu.            | A toolbar button invites highlighting everything; the right-click menu is enough.                                 | Dropped the toolbar button, per [`DEC-035`](../../docs/decisions.md#dec-035).                                                                                                 |
| Deleting a block should be undoable, as the customer asked at the previous meeting.  | An undo needs a trash bin and synchronized history; a confirmation is enough for now.                             | Replaced the undo with a confirmation and kept the undo as a nice-to-have, per [`DEC-036`](../../docs/decisions.md#dec-036) and [`DEC-037`](../../docs/decisions.md#dec-037). |
