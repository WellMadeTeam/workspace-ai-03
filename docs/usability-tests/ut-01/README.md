# UT-01: Brainstorm with an LLM on a shared board

- **Status:** Planned
- **Design sprint:** [SPRINT-07](../../project-plan.md#sprint-07)
- **Run sprint:** [SPRINT-08](../../project-plan.md#sprint-08)

## Goal

Verify whether, and to what degree, a shared board solves the problem of teams losing context when they share LLM queries and results.

## Research questions

1. How does using a shared board with context reuse affect the frequency of switching between tools during brainstorming compared with participants' existing workflow?
2. What difficulties, if any, do participants encounter when reusing existing queries and replies as context during a brainstorming task on a shared board?
3. Can participants complete the main task without help, and where do they need assistance?

## Requirement

The usability requirement is `QR-06`, being specified in [TODO: task #313](https://github.com/WellMadeTeam/workspace-ai-03/issues/313); link its requirement file here when that task is merged.

## Participant Profile

- **Role and task:** An adult who studies or works in software development or software architecture and has taken part in a team brainstorming task about a software problem.
- **Familiarity:** Has used a conversational LLM for a work or study task at least once in the past six months. The pre-test records how often the participant uses conversational LLMs and similar collaborative whiteboards; prior use of this product is not required.
- **Device:** A laptop or desktop computer with a keyboard and a current browser, used in person on the university network. A phone-only session does not match the profile.
- **Relation to the target user:** Directly represents a member of a software team who brainstorms with LLMs, as described by [VP-01](../../research/value-proposition.md#vp-01). A classmate outside the product team may qualify if they meet the same criteria.

### Recruitment target

Recruit five people as the design target and obtain at least three completed, counted sessions. Every counted participant must be 18 or older, match the profile, and be outside the product team; the customer, instructors, and course staff are excluded.

Invite eligible classmates outside the team and people in the team's software-development or software-architecture networks to volunteer. Screen volunteers against the profile with the pre-test before scheduling; do not publish names or contact details. A session that fails to meet the profile is exploratory and is not counted.

## The Tasks

Run the same usability test tasks in the same order in both study conditions.
One group uses the shared board.
The control group uses its usual tools.
The facilitator reads each scenario as written and does not tell participants which interface controls to use.
The facilitator may repeat the scenario but must not explain how to complete it.
Record any other help.

### Main usability test task: Brainstorm an architecture

- **Scenario:** Your team needs to plan a simple service for organizing university events.
  Brainstorm possible designs, then agree on one design to develop further.
- **Start state:** The team receives the same problem description and starts with an empty workspace.
- **Time limit:** 30 minutes.
  The team may finish earlier once it reaches the end state.
- **End state:** The team has recorded at least two different design ideas and selected one to develop further.
- **Success criterion:** `Unaided` if the team reaches the end state without facilitator help; `Assisted` if facilitator help is needed; `Failed` if the end state is not reached within the time limit.

### Secondary usability test task 1: Reuse another member's AI answer

- **Scenario:** Develop one additional idea using an earlier AI answer created by another team member.
- **Start state:** An earlier AI answer from the main task is available to the team.
- **Time limit:** 10 minutes.
- **End state:** The team has created and recorded one new idea that builds on the earlier answer.
- **Success criterion:** `Unaided` if the team reaches the end state without facilitator help; `Assisted` if facilitator help is needed; `Failed` if the end state is not reached within the time limit.

### Secondary usability test task 2: Create a diagram of the ideas

- **Scenario:** Create a diagram that summarizes the selected design and shows how its main parts relate to each other.
- **Start state:** The team's selected design and brainstormed ideas are available.
- **Time limit:** 10 minutes.
- **End state:** The team has created a diagram and made it available in its shared workspace.
- **Success criterion:** `Unaided` if the team reaches the end state without facilitator help; `Assisted` if facilitator help is needed; `Failed` if the end state is not reached within the time limit.

## Protocol

Prepare the staging board before the participant arrives.
Reset it to the initial empty state.
Use staging only.
Do not put staging credentials in this repository.

Run every session in person on the university network.
At least two team members take part in each session.
The same facilitator runs every counted session.

Follow these steps in order:

1. Welcome the participant and explain the purpose of the session.
2. Check that the participant has given consent and understands whether the session will be recorded.
3. Ask the pre-test questions in [surveys.md](surveys.md).
4. Ask the participant to think aloud while completing the tasks.
5. Read each task scenario exactly as written in **The Tasks**.
6. Let the participant work while the observer records task completion, time, difficulties, and any help given.
7. After each task, ask the participant to answer its SEQ question in [surveys.md](surveys.md).
8. After all tasks, ask the participant to complete the SUS and open-ended post-test in [surveys.md](surveys.md).
9. Debrief the participant and thank them.

The facilitator may clarify the scenario but must not explain the interface or solve a task.
The observer records what happened without directing the participant.
Stop the session if the participant asks to stop or the team observes a critical or security-sensitive problem.
Record the reason for stopping in the session note.
A session stopped before its data is complete is not recorded as completed.

Before the first counted session, verify that the test instrumentation works and sends data to the destination named in the test design.
Confirm that the participant/session link identifies the run and that analytics test events carry `source=usability-test`.
The teammate dry run is a rehearsal and is not a counted session.

## Measures

For each usability test task, record its outcome as `Unaided`, `Assisted`, or `Failed`, the time taken, and the help given.
The observer records the team's tool switches, difficulties, and relevant actions in the session sheet.
One tool switch is each move from one application or tool to another.
The observer counts tool switches for both study conditions because product analytics cannot record the control group's use of its usual tools.

After each task, every participant answers the SEQ question in [surveys.md](surveys.md).
The observer also records a separate ease rating for each task in [surveys.md](surveys.md).
After all three tasks, every participant completes the SUS and the open-ended post-test.

Compare the board group and the control group by task outcome, time, help, tool switches, participant SEQ, and observer ratings.
Report the SUS results separately for each condition.
Use descriptive results only; the small usability-test sample does not support claims about all users.

## Instrumentation

For sessions in the board condition, use the staging deployment and send analytics events to the staging OpenPanel project.
Set `source=usability-test` on every event generated for this study.
Use a dedicated staging board for each team session.
Keep a private mapping between the session code and its opaque `board_id`; do not send participant names or contact details to analytics.

- **Main usability test task:** Events: `board_opened`, `ai_block_created`, `query_submitted`, and `reply_received`.
  The observer records the three ideas, the selected idea, the outcome, time, help, tool switches, and difficulties.
- **Secondary usability test task 1:** Events: `context_reuse_query_submitted` and `context_reuse_reply_received`; record `query_failed` if the request fails.
  The observer records whether the earlier answer came from another team member, the new idea, the outcome, time, help, tool switches, and difficulties.
- **Secondary usability test task 2:** Events: `query_submitted` and `reply_received`.
  The observer records whether the diagram was rendered and shared, the outcome, time, help, tool switches, and difficulties.

The control group uses its usual tools and produces no product analytics events.
The observer records the same task outcomes, time, help, tool switches, and difficulties for both study conditions.
The current events do not record tool switches, task success, facilitator help, or whether a diagram was added to the shared workspace, so the observer records these measures.

Product metric queries must include only events with `source=web`.
Events with `source=usability-test` and `source=smoke` are excluded from product metrics.
No new analytics event is required for this study; the observer records the actions not covered by the existing events.
Before the first counted session, a team member must run and record a staging verification that confirms the participant/session link identifies the run, every analytics-pipeline test event carries `source=usability-test`, and no production data is written.
The verification is a prerequisite for counting sessions and has not yet been completed.

## Analysis Plan

TODO: The analysis plan is being prepared in [task #315](https://github.com/WellMadeTeam/workspace-ai-03/issues/315). No results or findings are claimed during the design week.

## Schedule

The team will invite and screen volunteers after the design review and once the consent and data-handling prerequisites are ready. Counted sessions are planned in person on the university network during SPRINT-08, 16–21 November 2026; exact appointments will be agreed with eligible volunteers. Results are due with Submission 8 on 21 November 2026.

Assign `P-01`, `P-02`, and subsequent codes in the order sessions are scheduled. Never reuse a code. If a participant withdraws or a session cannot count, retire that code and assign a replacement the next free code; the identity mapping stays private.

The SPRINT-07 teammate dry run is excluded from the recruitment count and results. Sessions cannot count until consent and capture are ready and the instrumentation verification above has passed.

## Roles

| Role | Team member | Responsibility |
| --- | --- | --- |
| Facilitator | `@danmaninc` | Welcomes the participant, reads each task, and follows the protocol. |
| Observer | `@Kamil116`, `@hrrrsss` | Records task completion, time, difficulties, and help given. |
| Data custodian | `@AntonChulakov` | Stores consent records, identity mapping, raw notes, and recordings in the private locations. |

## Environment

Run every counted session against the staging deployment from a machine on the university network, using `$STAGING_URL`; never send session traffic to production.
Start each session on a fresh staging board with the same empty synthetic seed, reset before the next session.
Make no real payment.

### Session-readiness check

Before each counted session, confirm all applicable checks:

- [ ] The staging deployment is reachable from a machine on the university network.
- [ ] The board has been reset to the same synthetic seed used for every session.
- [ ] The participant/session link works and identifies the session's run.
- [ ] Before the first counted session, a team-run verification confirms that every analytics-pipeline test event uses `source=usability-test` and that no production data is written.
- [ ] The required durable consent is ready.
- [ ] The capture method has been explained before the participant signs the durable consent.

Do not count a session until the capture and consent are ready and all applicable checks have passed.

## Consent And Data

Before every counted session, collect durable consent using the public [consent template](consent.md).
Consent to session capture and sanitized public results is required; consent to an anonymized quote is separate and optional.

Do not count a session without the required consent or capture, or one that is technically broken or withdrawn.
A participant who cannot complete a task still counts, because that outcome is evidence.
If a participant withdraws, remove their raw notes and captured data and retire their code.

Keep consent records, the identity mapping, raw notes, working analysis, and the test's filtered telemetry export in the [private usability-data repository](https://github.com/WellMadeTeam/workspace-ai-03-usability-data) (GitHub sign-in and granted team/instructor access required).
Keep session-capture data in the team-owned cloud folder shared with instructors.
The private repository, its history, captured data, and copies held by tools are deleted after the course is graded; the sanitized public record remains.
Publish only sanitized session notes and aggregate results; keep identities, access instructions, and private folder links out of this repository.

## Evidence Map

- The public repository contains this sanitized test design and, after the sessions, sanitized session notes and results.
- The [private usability-data repository](https://github.com/WellMadeTeam/workspace-ai-03-usability-data) holds consent records, identity mapping, raw notes, working analysis, and the filtered telemetry export; GitHub sign-in and granted team/instructor access are required.
- The team-owned cloud folder holds session-capture data and is shared with instructors; its link and access instructions stay in the private repository and Moodle submission.
- The public consent template is [`consent.md`](consent.md); completed consent records remain private.
- The Week 7 report links the public profile and session plan and claims no usability result.

## Results

Results and findings are due in SPRINT-08 and are not recorded during the design week.
The results will be recorded in [results.md](results.md).
