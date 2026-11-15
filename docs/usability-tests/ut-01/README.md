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
  Brainstorm possible designs, use LLM for assisting you during session, then agree on one design to develop further.
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

- **Scenario:** Create a diagram that summarizes the selected design and shows how its main parts relate to each other using LLM.
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

Write and freeze this analysis plan, including the QR-06 measure and pass bar, before the first counted session.
Do not change a measure or its scope after looking at participant data.

### Analysis units and conditions

The tasks are completed by teams, while each participant answers their own SEQ and SUS.
Assign an anonymous team-run key to each team's attempt of the three tasks and associate each `UT-01 P-nn` with that run and its condition in the private records.
Record team membership and condition before the run starts.
Record team outcome, help, elapsed time, and observer rating once per task per team run.
Do not turn one team's successful attempt into several independently successful participant attempts.

Report the shared-board and control conditions separately.
For every summary, state whether `n` counts team runs, participants, or observer ratings, and show missing and excluded counts separately.
Report team sizes and the number of distinct teams as well as the number of runs; repeated attempts by one team are not independent teams.
If there is only one team run in a condition, show its observed values and do not describe the contrast as a general effect of the product.
Participant questionnaires from the same team are also related observations.

### Source tables

Use one team-task row for each run and task, with condition, shared outcome, help, elapsed time, and a link to the sanitized session evidence.
Use one participant-task row for each participant and task, with the team-run key, condition, shared outcome and help referenced from the team-task row, individual SEQ, and that participant's tool-switch count and observation duration.
The shared outcome in the participant table describes the team's result, not an independently assessed individual success.
Calculate completion and time aggregates from the team-task table only.
Store one SUS score per participant after all tasks and one observer-rating row per observer, team run, and task.
Use the task names in [The Tasks](#the-tasks); never treat a missing value as zero or an unattempted task as a failure.

### Quantitative measures

Report these descriptive measures separately by condition:

- **Main task completion:** `(Unaided + Assisted) / N` and the corresponding count and percentage, where `N` is the number of eligible team runs that started the main task and have a recorded outcome.
- **Main task unaided completion:** `Unaided / N`, with the same denominator.
  A failed task remains in `N`; do not exclude it because the team did not finish.
  Report runs with missing outcomes separately, so a complete-case rate is never presented as the rate for all recruited runs.
- **Task time:** median elapsed minutes for each task across team runs with a valid duration, including failed attempts.
  Start timing when the facilitator finishes reading the scenario and invites the team to begin; stop at the defined end state, the team's decision to abandon the task, or its time limit, whichever comes first.
  An abandoned task is `Failed`; record the reason and elapsed time.
  Report completed and failed durations alongside the combined median so an early failure is not mistaken for efficient completion.
- **Task help:** counts of `Unaided`, `Assisted`, and `Failed` by task and condition, with help descriptions linked to the notes.
- **SEQ:** median valid participant score for each task, with the number of responses and contributing team runs.
  Accept only recorded values from 1 to 7; do not pool the three tasks into a single SEQ score.
- **SUS:** mean and median of valid participant scores, with participant and team-run counts.
  Use all ten answers and the formula in [surveys.md](surveys.md); an incomplete questionnaire has no calculated SUS score and is reported as missing.
- **Observer ease rating:** the frequency of each score from 1 to 7 by task and condition, with observer-rating and team-run counts.
  Identify the observer by team GitHub username; if multiple observers rate one run, retain their separate ratings rather than treating them as separate runs or participant SEQ responses.

For an even number of observations, the median is the mean of the two middle sorted values.
With no valid observations, report `Not available (n=0)` rather than a numeric result.
Round displayed percentages to whole numbers and durations to one decimal minute; keep unrounded values for calculations and any agreed QR comparison.

### Tool-switch analysis and condition comparison

For each participant and task, the observer counts each move from one application or tool to another, using the definition in Measures.
Observe the same task interval used for timing in both conditions and record its duration.
A participant's switch is counted once; do not multiply it by the number of teammates who see it.
For each team-task run, sum the participants' observed switch counts and their observed durations in minutes, then calculate switches per observed participant-minute as `total switches / total observed participant-minutes`.
Retain each participant's count and duration so the total can be checked.
If any participant's interval is incompletely observed, record a coverage gap and exclude that team-task run from the rate summary rather than treating unobserved switches as zero.
A zero or missing observation duration produces no rate.

Report each team-task total and rate, then the median total and median rate by task and condition with valid team-run counts.
The rate accounts for different task durations and team sizes; also show raw totals, completion outcomes, and durations so an early failure or a small team cannot appear beneficial solely through fewer switches.
For each task, report the descriptive difference `shared-board median rate - control median rate` only when both medians exist.
A negative difference means fewer observed switches per participant-minute in these runs; it does not establish causation or a population effect.
Show task outcome, time, help, SEQ, observer ratings, and SUS summaries side by side by condition; do not pool conditions or run significance tests on this small study.

### QR-06 decision before counted sessions

The following is a concrete proposal for team review, not an approved QR or permission to start counted sessions.
Accept or revise it in this PR before collecting participant data, then carry the agreed definition into QR-06/QRT-01 through [#313](https://github.com/WellMadeTeam/workspace-ai-03/issues/313).
The earlier 80% participant-completion proposal remains withdrawn.

| Item | Proposed definition |
| --- | --- |
| Characteristic | Interaction Capability / Operability: whether a team can reach the main task's end state without facilitator help. |
| Measure | Main-task unaided team completion, `U / N`, in the shared-board condition only. |
| Numerator `U` | Eligible team runs recorded as `Unaided`: at least two design ideas recorded and one selected within 30 minutes, without facilitator help. |
| Denominator `N` | All eligible shared-board team runs that start the main task; `Assisted`, `Failed`, and abandoned attempts remain in the denominator. |
| Usable evidence | At least three distinct representative participants in the shared-board condition, with required consent and recordings, and a recorded main-task outcome for every eligible started run. Missing outcomes prevent a verdict; they are not silently dropped. |
| Pass bar | `U / N = 100%`, with `N >= 1` and the usable-evidence rule met. Any observed assisted or failed run prevents passing. |
| Rationale | The essential flow should be achievable without coaching by every tested team. With the proposed single board team, the criterion is deliberately binary; a fractional percentage would imply more precision than the sample supports. This is a proposed acceptance target, not an empirical benchmark. |

Report `U`, `N`, the number of distinct participants, missing outcomes, and the unrounded proportion in the existing main-task aggregate table in [results.md](results.md).
If an otherwise eligible run has a missing outcome, report the QR statistic as unavailable until the evidence gap is resolved; retain the complete-case descriptive rate separately.
A run excluded for invalid consent, withdrawal, missing recording, or technical failure is disclosed with its reason and is not silently replaced by a successful attempt.
Task failure alone never makes a run ineligible.
Do not rerun a failed attempt to replace its outcome or recruit additional teams after inspecting outcomes to reach the bar.
The control condition and all other measures remain descriptive and do not determine this QR verdict.
With only one board team, passing means that this team completed the task unaided; it does not establish individual operability or a population success rate.

### Proposed recruitment and allocation for review

This proposal would replace the current five-person recruitment target with six representative participants: two teams of three, one shared-board team and one control team.
Each person participates in one condition only and completes all three tasks in the existing order, with individual pre-test, SEQ, SUS, and post-test records.
Retain a separate participant session record and code for each person, linked to the shared team-run record; six people do not become six independent task outcomes.

Before any task starts, form two teams of three using the pre-test familiarity answers to avoid concentrating all frequent LLM or collaborative-whiteboard users in one team where practical.
Record the allocation basis privately and summarize relevant group differences without identities in the results.
Assign the two formed teams to conditions by a coin toss and record the assignment before either run; no participant switches conditions or repeats the tasks in the other condition.
Use the same facilitator, task wording, limits, and observation method for both teams.
Schedule replacements before the affected run starts, using the same eligibility criteria and a new participant code.
If six eligible participants cannot be recruited, revise and review the design before counted sessions rather than silently using smaller groups.

This allocation provides three product users for the manual QR test and equally sized groups for a descriptive comparison, but only one independent team per condition.
Differences in team composition, prior familiarity, and group dynamics remain confounded with condition; no causal advantage of the product can be inferred.
The course defines individual participant outcomes, while the current team tasks supply shared outcomes; the team must confirm this adaptation with the customer/instructor and record any required deviation before treating the design as course-complete.

### Approval and freeze

The reviewer should explicitly accept or amend the six-person allocation, the team-level outcome adaptation, and the proposed QR scope and bar.
Once agreed, update Recruitment target and Protocol to the accepted allocation, synchronize QR-06/QRT-01 in #313, and record the accepted plan revision before the first counted session.
Until then, these sections remain proposals and #315 remains open.
No threshold or allocation may be changed after inspecting participant outcomes to obtain a passing result.

### Qualitative analysis and severity

Review sanitized observation notes and think-aloud evidence from all counted sessions.
Group recurring difficulties and observed benefits into a small set of themes, and list the participant codes that support each theme.
Do not present one participant's remark as a theme.
Keep direct quotes only when the participant separately consented to an anonymized quotation.

Assign each finding one severity and state the reason in `results.md`:

- **Critical:** the participant cannot safely continue or the product loses or exposes their work.
- **Major:** the participant cannot reach a task end state without substantial facilitator help or cannot use a central part of the product.
- **Minor:** the participant reaches the end state, but a difficulty, delay, or workaround makes the experience worse.

### Instrumentation comparison

For the board condition only, use the private mapping from the team-run key to opaque `board_id` and the task's recorded start/end timestamps to select staging OpenPanel events with `source=usability-test`.
Compare `board_opened`, `ai_block_created`, `query_submitted`, and `reply_received` with the main task notes; compare `context_reuse_query_submitted`, `context_reuse_reply_received`, and `query_failed` with secondary task 1; compare `query_submitted` and `reply_received` with secondary task 2.
Record the event coverage, supporting evidence, discrepancies, and missing records for each team run and task.
These events can corroborate product actions, but they do not establish task success, facilitator help, tool switches, or that a diagram was rendered and shared.
Use the observer's end-state evidence and timings for those measures; do not substitute request latency for task duration.

The control condition produces no product analytics events; compare its observation sheets with its session evidence and mark product-event coverage as not applicable.
Do not classify the absence of control telemetry as an export failure.
Exclude test events from product metrics and disclose all instrumentation coverage gaps.

### Limitations

In `results.md`, state participant counts, distinct team counts, run counts, team sizes, exclusions, and missing data in each condition, how participants relate to the target user, the in-person staging environment on the university network, and any task, measure, or event the team could not observe.
Report missing observations with their valid `n`; do not fill gaps with estimates.
Describe the findings as evidence from these sessions, not estimates for a wider population.

### Results, findings, and triage

`results.md` is the run-week record; leave its result fields empty until sessions have been analyzed.
Each finding uses the template below and a stable `#finding-n` anchor:

```markdown
### Finding 1

- **Severity:** Critical / Major / Minor — reason
- **Tasks:** task name; UT-01 P-nn codes
- **Evidence:** sanitized observation or aggregate measure, linked to its evidence
- **Recommendation:** proposed change or None
- **Task issue:** issue link or None
```

Triage every finding by recording its severity, whether it creates a task, and its planned sprint.
When significant findings exist, schedule at least one resulting task in SPRINT-08; record a reason and planned sprint for any deferred finding.
Do not invent a finding or task before seeing the session evidence.
Product tasks must link their story and acceptance criterion and name the relevant FR or ADR; a defect must not use `None: repository upkeep`.
If a finding becomes a task issue, link that issue from the finding and link the finding anchor from the issue.

The public and private artifact locations are defined in [Evidence Map](#evidence-map).

This draft records the analysis methods before the first counted session; the QR decision above remains open and no results or findings are claimed.

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
- The Moodle submission carries the private repository and recordings-folder access instructions and the private text-archive fallback if instructors cannot access GitHub.
- Never send participant identities, consent records, or raw notes to an external generative AI service.

## Results

Results and findings are due in SPRINT-08 and are not recorded during the design week.
The results will be recorded in [results.md](results.md).
