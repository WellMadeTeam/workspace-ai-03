# Week 7 meeting report

## Metadata

- **Date:** 2026-11-12
- **Duration:** 78 minutes
- **Attended:** danmaninc, hrrrsss, Customer
- **Presented:** the analytics and observability dashboards, the usability study draft, and the status of remaining backlog items
- **Dashboards and tests shown:** yes; the OpenObserve logs, OpenPanel dashboards, and event filtering were demonstrated live
- **Threshold proposal:** not applicable; focus shifted to study design
- **Recording:** permitted
- **Transcript publication:** permitted, see [the transcript](meeting-transcript.md)
- **Transcript shared privately:** not applicable
- **Script:** [meeting-script.md](meeting-script.md)

## Previous action points

| Action                                                                                                                                                                                                                                                                               | Outcome                                                                                                                                                                                      | Decision                                                                                                                                 |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| [[reports/week-06/meeting-report.md](../week-06/meeting-report.md#action-points)](../week-06/meeting-report.md#action-points): "Plan the usability study: the two groups, an architectural task that produces a diagram, the participant and observer surveys and a usability score" | Carried out: a high-level draft was presented, discussing control groups, group sizes, and survey types. The customer provided feedback on structure and logistics.                          | [[DEC-048](../../docs/decisions.md#dec-048)], [[DEC-049](../../docs/decisions.md#dec-049)], [[DEC-050](../../docs/decisions.md#dec-050)] |
| [[reports/week-06/meeting-report.md](../week-06/meeting-report.md#action-points)](../week-06/meeting-report.md#action-points): "Set up the analytics and observability dashboards, run the observability QRT-01, and prepare the threshold proposal for the next meeting"            | Partly carried out: Dashboards and event tracking were set up and demonstrated. `QRT-01` was verified via logs. The threshold proposal was replaced by a discussion on analytical scenarios. | [[DEC-051](../../docs/decisions.md#dec-051)]                                                                                             |
| [[reports/week-06/meeting-report.md](../week-06/meeting-report.md#action-points)](../week-06/meeting-report.md#action-points): "Show the user when a connected block receives a summary instead of a whole conversation"                                                             | Not covered at the meeting; the focus was on analytics and study design. Reappears in this report's action points.                                                                           | None                                                                                                                                     |
| [[reports/week-06/meeting-report.md](../week-06/meeting-report.md#action-points)](../week-06/meeting-report.md#action-points): "Add a user story for basic Markdown formatting in AI answers and text blocks"                                                                        | Not covered at the meeting. Reappears in this report's action points.                                                                                                                        | None                                                                                                                                     |
| [[reports/week-06/meeting-report.md](../week-06/meeting-report.md#action-points)](../week-06/meeting-report.md#action-points): "Write the architecture decisions as proposed in plain text, with a diagram only where it adds what words cannot"                                     | Not covered at the meeting. Reappears in this report's action points.                                                                                                                        | None                                                                                                                                     |
| [[reports/week-06/meeting-report.md](../week-06/meeting-report.md#action-points)](../week-06/meeting-report.md#action-points): "Comment on each story issue changed or accepted in Weeks 5 and 6, citing its DEC-nnn, and confirm the reworded US-06 criterion"                      | Not covered at the meeting. Reappears in this report's action points.                                                                                                                        | None                                                                                                                                     |
| [[reports/week-06/meeting-report.md](../week-06/meeting-report.md#action-points)](../week-06/meeting-report.md#action-points): "Add a user story for automatic block titling/summarization using the LLM"                                                                            | Not covered at the meeting. Reappears in this report's action points.                                                                                                                        | None                                                                                                                                     |
| [[reports/week-06/meeting-report.md](../week-06/meeting-report.md#action-points)](../week-06/meeting-report.md#action-points): "Reword the 'board is full' message to say that the maximum of 10 members is reached"                                                                 | Not covered at the meeting. Reappears in this report's action points.                                                                                                                        | None                                                                                                                                     |
| [[reports/week-06/meeting-report.md](../week-06/meeting-report.md#action-points)](../week-06/meeting-report.md#action-points): "Choose the diagram kinds to support, from the kinds the customer names"                                                                              | Not covered at the meeting. Reappears in this report's action points.                                                                                                                        | None                                                                                                                                     |

## Previous open questions

| Question                                                                                                                                                                                                                                                                                                      | Answer                                                                                                                                                                        | Decision                                     |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------|
| [[reports/week-06/meeting-report.md](../week-06/meeting-report.md#open-questions)](../week-06/meeting-report.md#open-questions): "Which three kinds of diagrams does the customer use most?"                                                                                                                  | Not answered directly; the discussion moved to general diagram rendering support. Still open.                                                                                 | None                                         |
| [[reports/week-06/meeting-report.md](../week-06/meeting-report.md#open-questions)](../week-06/meeting-report.md#open-questions): "Do the telemetry dashboards answer the questions the customer recognises, does the diagnosability requirement hold in staging, and what should the threshold measure next?" | Answered partially: The customer validated the event logging but suggested focusing on specific analytical scenarios (e.g., unused AI blocks) rather than generic thresholds. | [[DEC-051](../../docs/decisions.md#dec-051)] |

## Summary

- The customer accepted the analytics and observability implementation, noting that event tracking is sufficient for initial insights but requires scenario-based dashboards for deeper analysis.
- The usability study design was refined: a post-test-only approach is preferred to avoid overwhelming participants, and group sizes of 4-5 are recommended for effective brainstorming dynamics.
- Features like Image Generation and Reference Documents were explicitly deprioritized to focus entirely on the usability study and core validation.
- The team agreed to avoid framing non-functional requirements as user stories to maintain clarity for the customer.

## Decisions

- [DEC-048: Adopt a post-test-only survey design for the usability study](../../docs/decisions.md#dec-048)
- [DEC-049: Target brainstorming groups of 4-5 participants per board](../../docs/decisions.md#dec-049)
- [DEC-050: Deprioritize Image Generation and Reference Documents in favor of the usability study](../../docs/decisions.md#dec-050)
- [DEC-051: Focus analytics on deriving specific insights from event logs rather than generic thresholds](../../docs/decisions.md#dec-051)
- [DEC-052: Avoid phrasing non-functional requirements as user stories](../../docs/decisions.md#dec-052)

## Action points

| Action                                                                                  | Owner     | Due           |
|-----------------------------------------------------------------------------------------|-----------|---------------|
| Finalize the usability study questionnaire and observer checklist                       | danmaninc | End of Week 8 |
| Create scenario-based dashboards for key analytical insights (e.g., AI adoption rate)   | danmaninc | End of Week 8 |
| Show the user when a connected block receives a summary instead of a whole conversation | danmaninc | End of Week 8 |
| Add a user story for basic Markdown formatting in AI answers and text blocks            | danmaninc | End of Week 8 |
| Write the architecture decisions as proposed in plain text                              | danmaninc | End of Week 8 |
| Comment on each story issue changed or accepted in Weeks 5-7                            | danmaninc | End of Week 8 |
| Add a user story for automatic block titling/summarization using the LLM                | Kamil116  | End of Week 8 |
| Reword the "board is full" message                                                      | danmaninc | End of Week 8 |
| Choose the diagram kinds to support                                                     | danmaninc | End of Week 8 |

## Open questions

| Question                                                             | What it would change                                                              | Follow-up                                   |
|----------------------------------------------------------------------|-----------------------------------------------------------------------------------|---------------------------------------------|
| Which three kinds of diagrams does the customer use most?            | Which diagram kinds we support and use in the usability study's task.             | danmaninc, to put to the customer in Week 8 |
| Should the control group be included if recruitment numbers are low? | The structure of the usability study and the statistical validity of the results. | danmaninc, during recruitment phase         |

## Disagreements

| Your position                                               | Customer's position                                                                        | What you changed                                                                                     |
|-------------------------------------------------------------|--------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| Pre-tests provide valuable baseline data.                   | Pre-tests overwhelm participants and are unnecessary for this exploratory study.           | Dropped pre-tests, adopted post-test-only design per [[DEC-048](../../docs/decisions.md#dec-048)].   |
| Screen recording captures detailed user behavior.           | Recording raises privacy concerns and creates liability; manual observation is sufficient. | Removed screen recording from the protocol per [[DEC-050](../../docs/decisions.md#dec-050)] context. |
| Non-functional requirements can be tracked as user stories. | NFRs confuse customers when framed as stories; they should be handled as quality checks.   | Agreed to rephrase NFRs separately per [[DEC-052](../../docs/decisions.md#dec-052)].                 |
