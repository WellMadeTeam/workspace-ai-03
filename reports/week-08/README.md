# Week 08 report

Workspace for AI collaboration, team `workspace-ai-03` (WellMadeTeam).
This report covers SPRINT-08, due 21 November 2026, and its late closeout on 22 November, against repository revision `3571501984a35da7c4638ffe34639219cb9f7e7c`.
Teams of software developers and architects need a shared board to preserve and reuse LLM queries and replies instead of passing them through messengers.

## Summary

[UT-01](../../docs/usability-tests/ut-01/results.md) records three counted participant sessions in one shared-board team run on 19 November.
The main task was completed with assistance: 1/1 team runs completed and 0/1 completed unaided; both secondary tasks also required assistance.
SUS mean is 67.5 and median 72.5, with n=3 participants from one team; these are descriptive observations without independent team replication or a control comparison.
SEQ and task durations were not recorded.
The [sanitized sessions](../../docs/usability-tests/ut-01/sessions/README.md) support the outcomes; telemetry contains the expected event names but cannot establish task attribution or verified exclusion from product metrics.
[QR-06 QRT-01](../../docs/quality-requirements/qr/QR-06.md#qrt-01) fails the fixed 100% unaided bar.
The conclusion cannot establish reduced tool switching; the [triage](../../docs/usability-tests/ut-01/results.md#triage) selects the Major diagram-discovery finding for [#405](https://github.com/WellMadeTeam/workspace-ai-03/issues/405) and defers seven Minor recommendations for review.
The fix has no landed implementation or successful unaided recheck and has moved to SPRINT-09.
Raw study records and telemetry remain in the [private usability-data repository](https://github.com/WellMadeTeam/workspace-ai-03-usability-data), which requires sign-in and granted access and is therefore excluded from the link check.

The [configuration plan](../../docs/configuration-plan.md) inventories 26 Active items across five groups.
The [evaluation](cm-evaluation.md) judges seven local goals and proposes simplifying the repeated AGENTS check explanations into a named check index, keeping the required sections, edit boundaries, course router, setup guide, and workflow definitions.
Its main tradeoff is extra link navigation in return for fewer competing descriptions of the checks; it remains a recommendation.

[REL-08, v0.5.1](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.5.1), was published on 22 November with documentation, usability evidence, configuration records, and dependency updates, with no intentional product feature or behavior change.
The supplied [QR-01 QRT-01 run](qr-01-qrt-01.md) failed with 12 query-message reads above two seconds and no missed reads.
The [quality requirement testing plan](../../docs/project-plan.md#quality-requirement-testing-plan) owns the tests that are not `Passes`; neither failed requirement is claimed as release quality.
The [AI usage report](ai-usage.md) and [sprint retrospective](sprint-retrospective.md) were completed and merged during the late Week 08 closeout in [PR #396](https://github.com/WellMadeTeam/workspace-ai-03/pull/396) and [PR #417](https://github.com/WellMadeTeam/workspace-ai-03/pull/417), closing #394 and #393 in SPRINT-08.
The sprint's actual velocity is 0: this was a task sprint with no selected feature stories.
These artifacts and this report under [#418](https://github.com/WellMadeTeam/workspace-ai-03/issues/418) are Week 08 closeout work, not Week 9 carry-over.

The [meeting report](meeting-report.md#summary) records a demonstration of Markdown support under [US-19](https://github.com/WellMadeTeam/workspace-ai-03/issues/324), during which Customer found a rendering bug; acceptance was not confirmed.
The full results Sprint Review and its decision/action-point record were carried into SPRINT-09 under [#391](https://github.com/WellMadeTeam/workspace-ai-03/issues/391), because testing followed the meeting; no corresponding Week 08 `DEC-nnn` is recorded there.
The candidate remains the shared-board query-and-reply flow in [US-01](https://github.com/WellMadeTeam/workspace-ai-03/issues/37) and [US-04](https://github.com/WellMadeTeam/workspace-ai-03/issues/40), with the candidate verdict in [DEC-012](../../docs/decisions.md#dec-012); no candidate story is evidenced as moving out this week.

The [focus metric](../../docs/analytics.md#weekly-boards-completing-a-context-reuse-flow) has no new production value evidenced this week; it needs genuine product-use events outside team and study traffic.
Its query counts distinct boards receiving a context-reuse reply within seven days with `source=web`.
The last recorded staging demonstration computed `1`, as recorded in the [Week 06 report](../week-06/README.md#summary); this is team test traffic, not a new Week 08 value or evidence of product value.
[Analytics](../../docs/analytics.md) and [observability](../../docs/observability.md) own the metric queries, dashboards, and operating signals.
The study export's missing source and correlation fields prevent treating it as a production metric.

## Usability test

The [results](../../docs/usability-tests/ut-01/results.md) and sanitized [P-01](../../docs/usability-tests/ut-01/sessions/P-01.md), [P-02](../../docs/usability-tests/ut-01/sessions/P-02.md), and [P-03](../../docs/usability-tests/ut-01/sessions/P-03.md) records describe one three-person team on staging, in person on the university network.
All three participants' eligibility and prior consent are member-confirmed, with explained telemetry and observer capture, no video, and no withdrawals.
The minimum of three counted sessions is met and UT-01 is Completed; the five-person target was not met and no control group was recruited.

All three tasks were completed with assistance; main-task unaided completion is 0/1 team runs, not three independent attempts.
Diagram creation required a substantial discovery hint for every participant.
SUS mean is 67.5 and median 72.5 (n=3 participants, one team), with a shortened fourth statement limiting interpretation.
Median SEQ for each task and median main-task duration are unavailable (n=0 recorded responses or durations); tool-switch counts and observer ease ratings are also missing.
Missing values are not zero and cannot be reconstructed from telemetry.

The [instrumentation comparison](../../docs/usability-tests/ut-01/results.md#instrumentation-comparison) finds board, AI block, connection, query, reply, failure, and context-reuse event names in the selected staging window.
The events lacked the required study source label; retained fields lack board/query identifiers, and task timestamps are unavailable.
Event presence therefore supports activity at window level, without verifying task completion, query/reply pairing, or exclusion from product metrics.
Partial operating logs do not resolve these gaps; the assistance classifications come from the observations and member clarification.

The [eight findings and triage](../../docs/usability-tests/ut-01/results.md#findings) classify diagram discovery as Major and seven findings as Minor, with no Critical finding established.
[#405](https://github.com/WellMadeTeam/workspace-ai-03/issues/405) serves US-08 AC-01 and AC-03 through FR-012 and FR-020, requiring a visible diagram entry point, guidance, and a separate unaided staging recheck.
It was excluded from REL-08 and moved to SPRINT-09 because implementation and the successful recheck had not landed.
Triage of the seven Minor recommendations was completed this week; their scope review is carried into SPRINT-09 planning, without scheduled implementation.
None is recorded as a change the team would never make.

The [conclusion](../../docs/usability-tests/ut-01/results.md#conclusion) cannot answer whether the board reduces tool switching without control data or switch observations.
It identifies context/capability uncertainty and copying friction, and shows that the only main-task attempt needed help.
[QR-06](../../docs/quality-requirements/qr/QR-06.md) and its [QRT-01](../../docs/quality-requirements/qr/QR-06.md#qrt-01) therefore receive `Fails` in the testing plan, checked in SPRINT-08.
The selected diagram fix and unaided staging recheck are carried into SPRINT-09 under #405; the results review and acceptance follow-up are carried under #391.

## Configuration management

The [configuration plan](../../docs/configuration-plan.md), reviewed on 21 November, records 26 Active items in source control and release, checks, environments and secrets, dependencies and builds, and agent context and artifacts.
The [evaluation](cm-evaluation.md) reviews baseline [b9d30463a97b034e034738360e3aaed24586b3bf](https://github.com/WellMadeTeam/workspace-ai-03/commit/b9d30463a97b034e034738360e3aaed24586b3bf) through seven local goals: traceable product choices, trustworthy acceptance evidence, reproducible environments, delivery history, analytics and operating signals, comparable private-safe usability evidence, and trustworthy member and agent instructions.
Its [first change](cm-evaluation.md#the-first-change) replaces repeated AGENTS check explanations with a named index while retaining the required sections, local setup guide, executable workflows, course router, and edit boundaries.
The tradeoff is an extra link traversal for fewer contradictory accounts; the recommendation implements or schedules no change.
The evaluation's [limits](cm-evaluation.md#what-we-could-not-judge) remain there rather than being treated as assignment deviations.

## Threshold review

TOS-02 remains Open at this review; TOS-01 and TOS-03 are already recorded as Missed in the maintained threshold record.

| Goal | Current measure | New data can settle it | Proposal |
| ---- | --------------- | ---------------------- | -------- |
| [TOS-02](../../docs/threshold-of-success.md#tos-02) | A repeatable test or recorded session with 10 clients on one board for 30 minutes, zero lost updates and every change visible within 2 s, linked from the Week 7 report by the end of Week 7. | No: analytics events and request logs do not measure visibility at every other client; the supplied direct test is dated 22 November, after the Week 7 deadline. | — |

[TOS-02](../../docs/threshold-of-success.md#tos-02) remains Open after this review.
No replacement measure is proposed because the direct synchronization requirement should retain its original bar and deadline; the late [QR-01 run](qr-01-qrt-01.md) supplies failure evidence without establishing timely achievement.
Formal settlement of TOS-02 is carried into the SPRINT-09 threshold-outcome review under [#391](https://github.com/WellMadeTeam/workspace-ai-03/issues/391); the maintained record remains Open at this snapshot.

## Week 9 handoff

Use the [UT-01 results and conclusion](../../docs/usability-tests/ut-01/results.md#conclusion), [triage](../../docs/usability-tests/ut-01/results.md#triage), and sanitized session records as the usability evidence for the final reflection and 7-minute deck.
Use the [configuration plan](../../docs/configuration-plan.md), the [evaluation's seven goal sections](cm-evaluation.md), their tradeoffs, and its [first change](cm-evaluation.md#the-first-change) as the configuration evidence.
Do not interpret proposed changes as implemented work.

The [private usability-data repository](https://github.com/WellMadeTeam/workspace-ai-03-usability-data) holds consent, mapping, raw notes, and telemetry; it requires granted access.
The team-owned cloud recordings folder remains the separate capture destination named by the study; its private link and access instructions belong in Moodle.
The evaluation records member-confirmed baseline access; continued accessibility through grading is carried into Week 9 submission checks, rather than claimed as a new private-access test here.
The counted run used telemetry and observer capture without video, so no video recording is claimed.

[REL-08 is v0.5.1](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.5.1), published on 22 November; the [released changelog](../../CHANGELOG.md#051---2026-11-22) and [REL-08 block](../../docs/project-plan.md#rel-08) record it.
The current report baseline is `3571501984a35da7c4638ffe34639219cb9f7e7c`.
The final repository state and submission commit, REL-09, the 7-minute deck, and the reflection are carried into [SPRINT-09](../../docs/project-plan.md#sprint-09).
Their evidence is the assisted task outcomes, failed QR-06, missing messenger-use evidence for TOS-03, synchronization failure, configuration tradeoffs, and actual release scope.

The [AI usage report](ai-usage.md), [sprint retrospective](sprint-retrospective.md), and actual velocity of 0 were completed in Week 08 closeout through merged PRs #396 and #417, closing #394 and #393 in SPRINT-08.
Only [#391](https://github.com/WellMadeTeam/workspace-ai-03/issues/391) and [#405](https://github.com/WellMadeTeam/workspace-ai-03/issues/405) remain scheduled carry-over tasks in the [SPRINT-09 milestone](https://github.com/WellMadeTeam/workspace-ai-03/milestone/9).
Task #391 carries the full results Sprint Review, threshold-outcome review, unconfirmed Week 7 action points and open questions, decision recording, and receipt/publication of the permitted transcript; testing followed the original meeting, whose brief account could not establish those outcomes.
Task #405 carries diagram-discovery implementation and the unaided staging recheck, which did not finish for REL-08.
The [meeting action points](meeting-report.md#action-points) also carry the Markdown rendering fix into Week 9.
Review of the seven Minor findings, unselected feature stories, and the [retrospective actions](sprint-retrospective.md#actions) is carried into SPRINT-09 planning; this does not schedule speculative implementation.
Production focus-metric measurement and synchronization follow-up are carried into the Week 9 evidence review; this week's study and failed latency run establish neither a production value nor a repaired requirement.
Missing Week 08 measurements remain study limitations, not tasks to reconstruct in Week 9.

## Coverage

| Deliverable | Where |
| ----------- | ----- |
| Sprint plan | [docs/project-plan.md#sprint-08](../../docs/project-plan.md#sprint-08) |
| Usability results | [docs/usability-tests/ut-01/results.md](../../docs/usability-tests/ut-01/results.md) |
| Sanitized session notes | [docs/usability-tests/ut-01/sessions/README.md](../../docs/usability-tests/ut-01/sessions/README.md), [docs/usability-tests/ut-01/sessions/P-01.md](../../docs/usability-tests/ut-01/sessions/P-01.md), [docs/usability-tests/ut-01/sessions/P-02.md](../../docs/usability-tests/ut-01/sessions/P-02.md), [docs/usability-tests/ut-01/sessions/P-03.md](../../docs/usability-tests/ut-01/sessions/P-03.md) |
| QR-06 and its test | [docs/quality-requirements/qr/QR-06.md](../../docs/quality-requirements/qr/QR-06.md) and [docs/quality-requirements/qr/QR-06.md#qrt-01](../../docs/quality-requirements/qr/QR-06.md#qrt-01) |
| Findings and their issues | [docs/usability-tests/ut-01/results.md#findings](../../docs/usability-tests/ut-01/results.md#findings) and [fix task #405](https://github.com/WellMadeTeam/workspace-ai-03/issues/405) |
| Threshold review | [reports/week-08/README.md#threshold-review](#threshold-review) |
| Configuration management | [reports/week-08/README.md#configuration-management](#configuration-management) |
| Glossary | [docs/glossary.md](../../docs/glossary.md) |
| Risk register | [docs/risks.md](../../docs/risks.md) |
| REL-08 | [docs/project-plan.md#rel-08](../../docs/project-plan.md#rel-08), [v0.5.1 tag and release body](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.5.1), [CHANGELOG.md#051---2026-11-22](../../CHANGELOG.md#051---2026-11-22) |
| Sprint retrospective | [reports/week-08/sprint-retrospective.md](sprint-retrospective.md), merged with actual velocity 0 in [PR #417](https://github.com/WellMadeTeam/workspace-ai-03/pull/417), closing #393 during Week 08 closeout. |
| AI usage | [reports/week-08/ai-usage.md](ai-usage.md), merged in [PR #396](https://github.com/WellMadeTeam/workspace-ai-03/pull/396), closing #394 during Week 08 closeout; this PR adds disclosure of the report work. |
| Week 7 action points | [reports/week-08/meeting-report.md#previous-action-points](meeting-report.md#previous-action-points) |
| Week 7 open questions | [reports/week-08/meeting-report.md#previous-open-questions](meeting-report.md#previous-open-questions) |
| Sprint Review | [reports/week-08/meeting-report.md](meeting-report.md) was completed this week from the brief account; the full results review is carried into SPRINT-09 under #391. |
| Meeting script | [reports/week-08/meeting-script.md](meeting-script.md) |
| Meeting transcript | Receipt and publication of the permitted transcript are carried into SPRINT-09 under #391 because Customer had not supplied it; no `reports/week-08/meeting-transcript.md` is present. |
| Week 9 handoff | [reports/week-08/README.md#week-9-handoff](#week-9-handoff) |

## Contribution

| Member | Work evidenced in the repository |
| ------ | -------------------------------- |
| @danmaninc | Authored the [sprint plan #395](https://github.com/WellMadeTeam/workspace-ai-03/pull/395), [session records #398](https://github.com/WellMadeTeam/workspace-ai-03/pull/398), [results #400](https://github.com/WellMadeTeam/workspace-ai-03/pull/400), [findings #402](https://github.com/WellMadeTeam/workspace-ai-03/pull/402), [configuration evaluation #403](https://github.com/WellMadeTeam/workspace-ai-03/pull/403), [eligibility/verdict update #410](https://github.com/WellMadeTeam/workspace-ai-03/pull/410), and [release record #416](https://github.com/WellMadeTeam/workspace-ai-03/pull/416). |
| @Kamil116 | [Reviewed the session records #398](https://github.com/WellMadeTeam/workspace-ai-03/pull/398), reviewed [results #400](https://github.com/WellMadeTeam/workspace-ai-03/pull/400), and approved the [configuration plan #399](https://github.com/WellMadeTeam/workspace-ai-03/pull/399). |
| @hrrrsss | Approved the [configuration evaluation #403](https://github.com/WellMadeTeam/workspace-ai-03/pull/403). |
| @AntonChulakov | Attended the customer meeting, as recorded in [reports/week-08/meeting-report.md#metadata](meeting-report.md#metadata). |

## Repository evidence

Merged evidence includes [sessions #398](https://github.com/WellMadeTeam/workspace-ai-03/pull/398), [results #400](https://github.com/WellMadeTeam/workspace-ai-03/pull/400), [findings #402](https://github.com/WellMadeTeam/workspace-ai-03/pull/402), [triage #406](https://github.com/WellMadeTeam/workspace-ai-03/pull/406), and [counted-session confirmation #410](https://github.com/WellMadeTeam/workspace-ai-03/pull/410), which closed [task #409](https://github.com/WellMadeTeam/workspace-ai-03/issues/409).
The [configuration plan #399](https://github.com/WellMadeTeam/workspace-ai-03/pull/399) and [evaluation #403](https://github.com/WellMadeTeam/workspace-ai-03/pull/403) are merged; #403 closed [task #389](https://github.com/WellMadeTeam/workspace-ai-03/issues/389).
There is no merged diagram-fix PR or unaided recheck; [#405](https://github.com/WellMadeTeam/workspace-ai-03/issues/405) remains open.
[Latency evidence #412](https://github.com/WellMadeTeam/workspace-ai-03/pull/412), [the changelog #415](https://github.com/WellMadeTeam/workspace-ai-03/pull/415), and [REL-08 record #416](https://github.com/WellMadeTeam/workspace-ai-03/pull/416) establish the late release closeout.
The [SPRINT-08 milestone](https://github.com/WellMadeTeam/workspace-ai-03/milestone/8) is closed.
Four tasks initially moved out at closure, but #393 and #394 subsequently returned to SPRINT-08, where #418 also belongs.
Merged [PR #396](https://github.com/WellMadeTeam/workspace-ai-03/pull/396) completed the AI usage report and closed #394; merged [PR #417](https://github.com/WellMadeTeam/workspace-ai-03/pull/417) completed the retrospective and actual velocity of 0 and closed #393.
Only #391 and #405 remain scheduled in SPRINT-09.

The latest successful runs inspected on `main` at `3571501` are the [link check](https://github.com/WellMadeTeam/workspace-ai-03/actions/runs/45034664456), [Markdown check](https://github.com/WellMadeTeam/workspace-ai-03/actions/runs/45034664428), [actionlint](https://github.com/WellMadeTeam/workspace-ai-03/actions/runs/45034664440), and [product-code checks](https://github.com/WellMadeTeam/workspace-ai-03/actions/runs/45034664394).
They verify that baseline, rather than this new report before merge.
For this report, Markdown lint and offline link checking with fragments passed, and the whitespace check passed.
The full external-link check and a network-enabled retry for this report failed on connection errors, including GitHub URLs verified separately through the authenticated API; no successful local external-link check is claimed.

## Deviations

- The study met the three-session minimum but missed its five-person target and recruited no control group; it supplies one team run, without independent replication or a comparative product-benefit claim.
- SEQ, task durations, tool-switch observations, and observer ease ratings were not collected; SUS statement 4 used shortened wording, and some observations and eligibility checks were confirmed retrospectively.
- Full pre-session instrumentation verification was not repeated, the required study source label was missing, correlation fields and task timestamps were unavailable, and operating logs covered only part of the collection window.
  The [results limitations](../../docs/usability-tests/ut-01/results.md#limitations) retain these departures; telemetry cannot establish study exclusion from product metrics.
- The messenger-use answer required by TOS-03 was not collected; its maintained verdict is Missed, despite member-confirmed context-reuse board state.
- The full results Sprint Review was not held before release because the results followed the meeting; [#391](https://github.com/WellMadeTeam/workspace-ai-03/issues/391) moved to SPRINT-09 for that review and remaining action-point evidence.
  The meeting account has no verified date or duration, no corresponding new decision identifier, and only one post-Week-08 action point rather than the required two; evidence reconciliation and the unsupplied transcript are carried into SPRINT-09 under #391.
- The selected diagram-discovery fix [#405](https://github.com/WellMadeTeam/workspace-ai-03/issues/405) did not land or pass its unaided staging recheck, was excluded from REL-08, and moved to SPRINT-09 on 22 November.
- The QR-01 run and REL-08 publication occurred on 22 November after the 21 November deadline; QR-01 and QR-06 remain failed, and no new QR-02, QR-04, or QR-05 run is evidenced this week.
- Closeout continued after the deadline: the AI disclosure, retrospective, and actual velocity of 0 were completed and merged on 22 November in PRs #396 and #417.
  #393 and #394 are completed Week 08 work, and this report under #418 also belongs to Week 08 closeout; none is carried into Week 9.
- TOS-02 remains Open past its Week 7 deadline; formal settlement is carried into SPRINT-09's threshold-outcome review under #391.
- The report task [#418](https://github.com/WellMadeTeam/workspace-ai-03/issues/418) was created through the API using the Task form fields and explicit Task type because the Orca browser failed to load the required form with `ERR_INVALID_HANDLE`.
  It was initially scheduled in SPRINT-09, then reassigned to SPRINT-08 for this week's late report closeout; only #391 and #405 remain scheduled carry-over tasks.

## Privacy

No private-only material or participant identity was committed to the product repository for this report; supporting study artifacts linked here are the public sanitized records.
