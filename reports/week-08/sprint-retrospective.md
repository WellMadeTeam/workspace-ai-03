# Sprint 08 retrospective

Prepared for [#393](https://github.com/WellMadeTeam/workspace-ai-03/issues/393) from the team's feedback and published evidence.
The team reports that the usability test went well overall, with three attendees and useful points for improvement, and attributes the recruitment shortfall to low registration conversion.
Evidence was rechecked on 22 November against upstream `main`, including the eligibility and verdict update in [#410](https://github.com/WellMadeTeam/workspace-ai-03/pull/410) and the latency evidence in [#412](https://github.com/WellMadeTeam/workspace-ai-03/pull/412).
All three participant sessions now count following confirmation of the remaining eligibility checks; they represent one shared-board team run, not three independent team attempts.
UT-01 is `Completed`, QR-06 QRT-01 is `Fails` because the main task required assistance, and TOS-03 remains `Missed` because the required messenger-use answer was not collected.
REL-08 was published as [v0.5.1](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.5.1) on 22 November, after the planned sprint deadline, with documentation, evidence, and dependency updates but no intentional product feature or behavior change.
SPRINT-08's milestone closed on 22 November after its four remaining open tasks moved to SPRINT-09, preserving their ownership and priority.
Publication and closure of #392 do not establish the full results Sprint Review, which remains pending in [#391](https://github.com/WellMadeTeam/workspace-ai-03/issues/391) because testing followed the customer meeting.
The member confirmed that [#405](https://github.com/WellMadeTeam/workspace-ai-03/issues/405) was closed in error; it was reopened and carried over because implementation and the unaided staging recheck were unfinished at release.
[#393](https://github.com/WellMadeTeam/workspace-ai-03/issues/393) moved because the retrospective and actual-velocity changes still require review and merge; its pull request completes that closeout task.
[#394](https://github.com/WellMadeTeam/workspace-ai-03/issues/394) moved because the AI disclosure and Week 9 handoff remain unfinished after the release and retrospective; [PR #396](https://github.com/WellMadeTeam/workspace-ai-03/pull/396) is still open.

## What Went Well

| What went well |
| --- |
| Three participants tried the product together on 19 November and completed all three tasks with assistance, giving the team direct observations of using the shared board in the [T-01 task record](../../docs/usability-tests/ut-01/sessions/README.md#t-01-shared-task-record). |
| The team published eight findings and triaged the Major diagram-discovery finding into [#405](https://github.com/WellMadeTeam/workspace-ai-03/issues/405), while retaining the seven Minor recommendations for later review in [#406](https://github.com/WellMadeTeam/workspace-ai-03/pull/406). |
| The team confirmed all three participants' eligibility and published the completed study's results with missing measures and execution departures explicit in [#410](https://github.com/WellMadeTeam/workspace-ai-03/pull/410). |
| The sprint focused on learning from participants rather than adding features, consistent with its [task-sprint plan and zero planned story points](../../docs/project-plan.md#sprint-08). |
| The team published [v0.5.1](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.5.1) with the known synchronization limit disclosed and preserved the failed QR-01 and QR-06 results in [#412](https://github.com/WellMadeTeam/workspace-ai-03/pull/412). |

## What Did Not

| Problem | Root cause |
| --- | --- |
| Only three people attended, meeting the minimum but falling short of the five-person design target, and no control group was recruited. | The team reports low registration conversion; eligibility confirmation resolves the earlier counting shortfall but does not enlarge the sample or supply a comparison group. |
| QR-06 failed the unaided-completion bar, TOS-03 was missed, and the planned tool-switch comparison remains unavailable. | The team needed assistance, the messenger-use answer was not collected, and SEQ, task timings, tool-switch counts, and observer ratings were missing; [#410](https://github.com/WellMadeTeam/workspace-ai-03/pull/410) confirms a retained context-reuse board state but does not repair those gaps. |
| Closeout continued after the 21 November deadline, with the full results Sprint Review still pending. | Testing was planned after the customer meeting, so results were unavailable for review there; the plan [#395](https://github.com/WellMadeTeam/workspace-ai-03/pull/395) and evidence [#398](https://github.com/WellMadeTeam/workspace-ai-03/pull/398) and [#400](https://github.com/WellMadeTeam/workspace-ai-03/pull/400) arrived on the due date, and [#412](https://github.com/WellMadeTeam/workspace-ai-03/pull/412) records the subsequent latency check and release preparation without a completed results review. |

## Actions

| Action | Owner | Impact | Reason | Carried |
| --- | --- | --- | --- | --- |
| Open a pull request for each issue by Wednesday of the sprint week, even as a draft. | AntonChulakov | High | The plan and evidence pull requests again arrived on the due date; use the checkpoint for SPRINT-09 delivery work. | Yes |
| In `SPRINT-08`, run the full teammate protocol rehearsal in #339, then complete #340 on the same staging deployment, record the design and deployment revisions and coverage, and resolve blocking findings before any counted session; in SPRINT-09, reconcile the claimed completion with the public coverage gaps and require a complete rehearsal before any future study. | danmaninc | High | The original pre-session deadline cannot be recovered; reconcile the evidence without backdating it, and rehearse eligibility, surveys, timing, and telemetry together before another study. | Yes |
| During SPRINT-09 planning, review registration conversion and define an earlier eligibility-confirmation checkpoint and replacement recruitment plan for any future study. | AntonChulakov | High | Low registration conversion limited attendance to three; eligibility is now confirmed, but another study needs recruitment readiness and complete measurement capture before its session date. | Yes |
| Complete the full results Sprint Review in [#391](https://github.com/WellMadeTeam/workspace-ai-03/issues/391), then implement and verify the carried diagram-discovery fix [#405](https://github.com/WellMadeTeam/workspace-ai-03/issues/405) in SPRINT-09 against its acceptance criteria. | danmaninc | High | #405 was reopened after the member confirmed its closure was an error; the fix was not included in v0.5.1 and still needs implementation and an unaided staging recheck, with hrrrsss accountable. | Yes |

## Carried Actions

| Action | Outcome |
| --- | --- |
| [`reports/week-07/sprint-retrospective.md#actions`](../week-07/sprint-retrospective.md#actions): "Open a pull request for each issue by Wednesday of the sprint week, even as a draft." | Not done: #395, #398, and #400 opened on 21 November, after Wednesday, 18 November; retain the checkpoint for SPRINT-09. |
| [`reports/week-07/sprint-retrospective.md#actions`](../week-07/sprint-retrospective.md#actions): "A pull request that uses a new LLM provider parameter shows the output of one real call to the model we deploy in its \"What you checked\" section." | Dropped: proposed removal from sprint action tracking because SPRINT-08 selected no feature stories and SPRINT-09 has no selected provider-parameter work; this does not claim that a real-call check was performed. |
| [`reports/week-07/sprint-retrospective.md#actions`](../week-07/sprint-retrospective.md#actions): "Write the request and response of every new endpoint into the issue before the backend and frontend work is split between members." | Dropped: proposed removal from sprint action tracking because SPRINT-08 selected no feature stories and no new endpoint work is selected for SPRINT-09; this does not claim that an API-contract exercise was completed. |
| [`reports/week-07/sprint-retrospective.md#actions`](../week-07/sprint-retrospective.md#actions): "In `SPRINT-08`, run the full teammate protocol rehearsal in #339, then complete #340 on the same staging deployment, record the design and deployment revisions and coverage, and resolve blocking findings before any counted session." | Not done: the merged results in [#410](https://github.com/WellMadeTeam/workspace-ai-03/pull/410) confirm that full pre-session verification was not repeated in SPRINT-08 and events lacked `source=usability-test`; confirming eligibility and completing the study do not repair that missed prerequisite, so retain the follow-up. |
