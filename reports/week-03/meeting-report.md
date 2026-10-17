# Week 3 meeting report

## Metadata

- **Date:** 2026-10-15
- **Duration:** 44 minutes
- **Attended:** danmaninc, hrrrsss, Kamil116, Customer
- **Presented:** the preliminary Minimum Usable Product (MUP) prototype, user stories, and acceptance criteria
- **Recording:** permitted, linked from the Week 03 Moodle submission
- **Transcript publication:** permitted
- **Transcript shared privately:** not applicable
- **Transcript:** [meeting-transcript.md](meeting-transcript.md)
- **Script:** [meeting-script.md](meeting-script.md)

## Previous action points

| Action                                                                                                                                                                                          | Outcome                                                                                                      | Decision |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|----------|
| [`reports/week-02/meeting-report.md`](../week-02/meeting-report.md#action-points): "Rewrite the goal and the stakeholders in the product vision per DEC-008 and DEC-009"                        | Carried out: product vision updated to reflect the narrowed goal and primary persona.                        | None     |
| [`reports/week-02/meeting-report.md`](../week-02/meeting-report.md#action-points): "Re-prioritize the stories and the minimum usable product candidate per DEC-010 to DEC-012"                  | Carried out: stories and MUP candidate re-prioritized in the backlog.                                        | None     |
| [`reports/week-02/meeting-report.md`](../week-02/meeting-report.md#action-points): "Add a story for viewing the widgets connected as context, per DEC-014"                                      | Carried out: user story added to the backlog.                                                                | None     |
| [`reports/week-02/meeting-report.md`](../week-02/meeting-report.md#action-points): "Rework the prototype so the side panel takes the full right side and lists connected widgets"               | Carried out: demonstrated the preliminary MUP prototype with a functional side panel for AI queries.         | None     |
| [`reports/week-02/meeting-report.md`](../week-02/meeting-report.md#action-points): "Send the customer a UI design draft in Telegram for quick feedback"                                         | Carried out: feedback was gathered directly during the live prototype demonstration instead of via Telegram. | None     |
| [`reports/week-02/meeting-report.md`](../week-02/meeting-report.md#action-points): "Propose a session that runs the same task in Telegram and on the board, to measure how far the board helps" | Carried out: customer agreed to a future brainstorming session using the tool to validate its value.         | None     |

## Previous open questions

None.

## Summary

- The customer validated the preliminary MUP prototype, confirming that real-time shared board interaction with AI query widgets meets the core hypothesis.
- The team and customer agreed to keep the 10-connection hard limit to prevent system instability, but added a requirement to display a clear, user-friendly "board is full" message to the 11th user.
- It was decided that LLM failure errors should be visible to all users on the board with a meaningful, non-technical message, rather than personalized errors.
- User accounts and authentication remain deprioritized; the team will instead focus on implementing diagram rendering and automatic block titling/summarization for the next iteration.

## Decisions

- [DEC-017: Keep the 10-connection hard limit and display a clear message when reached](../../docs/decisions.md#dec-017)
- [DEC-018: Display meaningful LLM error messages to all users on the shared board](../../docs/decisions.md#dec-018)
- [DEC-019: Prioritize diagram rendering and automatic block titling over user authentication](../../docs/decisions.md#dec-019)
- [DEC-020: `US-01` is rejected because `AC-02` is not met, and its rework is scheduled into SPRINT-04](../../docs/decisions.md#dec-020)
- [DEC-021: `US-04` is rejected because `AC-02` is not met, and its rework is scheduled into SPRINT-04](../../docs/decisions.md#dec-021)

## Action points

| Action                                                                                                          | Owner     | Due           |
|-----------------------------------------------------------------------------------------------------------------|-----------|---------------|
| Update the acceptance criteria for the connection limit to include a user-facing "board is full" message        | danmaninc | End of Week 3 |
| Update the acceptance criteria for LLM failures to specify a meaningful error message visible to all users      | danmaninc | End of Week 3 |
| Add a user story for automatic block titling/summarization using the LLM                                        | Kamil116  | End of Week 4 |
| Prepare a specific brainstorming task to run with the customer in the next session to validate the tool's value | hrrrsss   | End of Week 4 |
| Confirm the verdicts on `US-01` and `US-04` in DEC-020 and DEC-021 with the customer                            | danmaninc | End of Week 4 |

## Open questions

| Question                                                                         | What it would change                                                                      | Follow-up                        |
|----------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|----------------------------------|
| Which specific brainstorming task should we use for the next validation session? | Determines the scope of features needed to make the next session successful and valuable. | hrrrsss, to be decided in Week 4 |

## Disagreements

| Your position                                                                       | Customer's position                                                                                                                     | What you changed                                                                                                   |
|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| The 10-connection limit should not be strictly enforced or treated as a hard limit. | A hard limit is necessary to prevent the application from breaking under unexpected load, but it must have a clear user-facing message. | Agreed to keep the hard limit and added a requirement to display a clear "board is full" message to the 11th user. |
| LLM errors should be shown only to the user who made the query to avoid clutter.    | It is easier and more transparent to show a meaningful, non-technical error message to all users on the board.                          | Agreed to show the error to all users with a non-technical description.                                            |
