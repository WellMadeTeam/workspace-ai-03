# Week 07 report

Workspace for AI collaboration, team `workspace-ai-03` (WellMadeTeam).
This report covers SPRINT-07, due 15 November 2026, against repository revision `b75d584`.
Teams of software developers and architects need a shared board to preserve and reuse LLM queries and replies instead of passing them through messengers.

## Summary

The team designed `UT-01` and planned recruitment for representative adults who study or work in software development or architecture, have brainstormed in a team, and have used a conversational LLM in the past six months.
The [test record](../../docs/usability-tests/ut-01/README.md) now proposes six participants in two teams of three, one using the shared board and one using its usual tools; this allocation still awaits review before counted sessions.
The [surveys](../../docs/usability-tests/ut-01/surveys.md), [consent template](../../docs/usability-tests/ut-01/consent.md), [session instructions](../../docs/usability-tests/ut-01/sessions/README.md), analysis plan, and [QR-06 QRT-01](../../docs/quality-requirements/qr/QR-06.md#qrt-01) prepare the execution week.
Raw notes, consent records, identity mapping, working analysis, and filtered telemetry belong in the [private usability-data repository](https://github.com/WellMadeTeam/workspace-ai-03-usability-data); session capture belongs in the team-owned cloud recordings folder whose link and access instructions belong in Moodle.
The team will arrange [in-person staging sessions in SPRINT-08](../../docs/usability-tests/ut-01/README.md#schedule), with results due on 21 November.
No counted session or usability result is claimed.

The [15 November instrumentation check](../../docs/usability-tests/ut-01/README.md#team-run-instrumentation-check) verified the inspected failure event's study tag and board mapping, with no matching failure event found in production.
Successful replies and context reuse remain unverified because the LLM service provider failed during that run.
The full protocol dry run is deferred to SPRINT-08, followed by completion of instrumentation verification before the first counted session.

[REL-07, v0.5.0](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.5.0), adds copying and pasting selected blocks and connections, basic Markdown in text blocks and AI conversations, and a fix for the caret moving while editing text.
The customer reviewed the study design and telemetry on 12 November, and the [design-review transcript](meeting-transcript.md) is published with permission.
The tests that are not `Passes` remain in the [quality requirement testing plan](../../docs/project-plan.md#quality-requirement-testing-plan); the supporting run records are below.

The [focus metric](../../docs/analytics.md#weekly-boards-completing-a-context-reuse-flow) has no new production value evidenced this week; it needs genuine product-use events from people outside the team.
Its query counts distinct boards receiving a context-reuse reply in seven days with `source=web`.
The last recorded staging demonstration computed `1`, as documented in the [Week 06 summary](../week-06/README.md#summary); this is team test traffic, not a product-value result or a new Week 07 measurement.
[Analytics](../../docs/analytics.md) and [observability](../../docs/observability.md) own the metric queries, dashboards, and operating signals; smoke and usability-test traffic are excluded from product metrics.

The [meeting report](meeting-report.md#summary) records acceptance of the analytics and observability implementation, with scenario-based dashboards still requested under [DEC-051](../../docs/decisions.md#dec-051).
It does not record separate acceptance verdicts for `US-17` and `US-18`, so this report does not claim those stories are closed.
The customer chose post-test-only surveys in [DEC-048](../../docs/decisions.md#dec-048), recommended groups of four to five in [DEC-049](../../docs/decisions.md#dec-049), and deprioritized image generation and reference documents in [DEC-050](../../docs/decisions.md#dec-050).
[DEC-052](../../docs/decisions.md#dec-052) keeps non-functional requirements separate from functional stories.
The [action points and open questions](meeting-report.md#action-points) carry the remaining follow-up into Week 08.

The candidate remains the shared board on which a member sends a query and every member sees the query and reply: [US-01](https://github.com/WellMadeTeam/workspace-ai-03/issues/37) and [US-04](https://github.com/WellMadeTeam/workspace-ai-03/issues/40).
The customer's candidate verdict is [DEC-012](../../docs/decisions.md#dec-012).

## Usability test

The design compares brainstorming on the shared board with a control team using its usual tools.
The [participant profile and recruitment proposal](../../docs/usability-tests/ut-01/README.md#participant-profile) require adults outside the product team, customer, instructors, and course staff, using a laptop or desktop in person on the university network.
The proposed six-person allocation awaits review; at least three distinct representative participants must complete counted sessions in the shared-board condition for QR-06 to receive a verdict.
The session plan schedules in-person sessions during 16–21 November, with appointments to be agreed with eligible volunteers.

The [tasks](../../docs/usability-tests/ut-01/README.md#the-tasks) run in a fixed order in both conditions: brainstorm and select a design for a university-events service within 30 minutes, develop another idea using another member's earlier AI answer within 10 minutes, then create and share a diagram within 10 minutes.
The [protocol and session template](../../docs/usability-tests/ut-01/sessions/README.md) define facilitation, observation, help and stop rules, and the synthetic seed reset.
The surveys collect post-task SEQ, all ten SUS responses after the tasks, and open-ended feedback; observers record outcomes, time, help, tool switches, and difficulties.
The pre-test omission is declared below.

The [instrumentation](../../docs/usability-tests/ut-01/README.md#instrumentation) reuses staging OpenPanel events with `source=usability-test` and a private session-to-board mapping.
The team-run check observed board opening, AI block creation, connection creation, query submission, and query failure.
Only the inspected failure event's source, board mapping, and absence of a matching production failure event were recorded as verified; the check did not establish complete event coverage or successful context reuse.
[Task #340](https://github.com/WellMadeTeam/workspace-ai-03/issues/340) must complete pre-session verification, including successful replies and context reuse, before any counted session.
Observers supply the measures analytics cannot establish, and control runs produce no product telemetry.

The [consent and data rules](../../docs/usability-tests/ut-01/README.md#consent-and-data) require durable consent and capture before a session can count.
The private repository requires GitHub sign-in and granted team/instructor access, which is why its URL is excluded in [.lycheeignore](../../.lycheeignore).
The team-owned cloud recordings folder holds session-capture data; its private link and access instructions belong in the private repository and Moodle wrapper.
This public report does not verify instructor access to either private store.

[QR-06](../../docs/quality-requirements/qr/QR-06.md) checks Interaction Capability / Operability through the manual `QRT-01`.
Its fixed bar is 100% unaided main-task completion among eligible primary shared-board team runs, with at least one such run, at least three distinct representative participants, and no missing main-task outcomes.
The [analysis plan](../../docs/usability-tests/ut-01/README.md#analysis-plan) fixes the measures, denominators, missing-data treatment, descriptive condition comparison, instrumentation comparison, findings, and triage before sessions.
The [results template](../../docs/usability-tests/ut-01/results.md) is empty, and the usability verdict is planned for SPRINT-08.

The Week 08 handoff is the design and session instructions, recruitment/allocation review, consent and private-store access checks, the deferred [dry run #339](https://github.com/WellMadeTeam/workspace-ai-03/issues/339), [verification #340](https://github.com/WellMadeTeam/workspace-ai-03/issues/340), [sessions #341](https://github.com/WellMadeTeam/workspace-ai-03/issues/341), [analysis #342](https://github.com/WellMadeTeam/workspace-ai-03/issues/342), [triage #343](https://github.com/WellMadeTeam/workspace-ai-03/issues/343), and [verdict and REL-08 #344](https://github.com/WellMadeTeam/workspace-ai-03/issues/344).
The dry run and readiness checks precede counted sessions; results, findings, triage, and the QR verdict are due with Submission 8 on 21 November 2026.

## Coverage

| Deliverable | Artifact |
| ----------- | -------- |
| Sprint plan | [docs/project-plan.md#sprint-07](../../docs/project-plan.md#sprint-07) |
| `UT-01` test record | [docs/usability-tests/ut-01/README.md](../../docs/usability-tests/ut-01/README.md) |
| Surveys and post-test | [docs/usability-tests/ut-01/surveys.md](../../docs/usability-tests/ut-01/surveys.md) |
| Tasks and protocol | [docs/usability-tests/ut-01/README.md#the-tasks](../../docs/usability-tests/ut-01/README.md#the-tasks) and [docs/usability-tests/ut-01/sessions/README.md](../../docs/usability-tests/ut-01/sessions/README.md) |
| Test instrumentation | [docs/usability-tests/ut-01/README.md#instrumentation](../../docs/usability-tests/ut-01/README.md#instrumentation) and [docs/analytics.md#the-events](../../docs/analytics.md#the-events) |
| Consent template | [docs/usability-tests/ut-01/consent.md](../../docs/usability-tests/ut-01/consent.md) |
| Private usability-data repository | Private, requires granted access; see [reports/week-07/README.md#usability-test](#usability-test) for the link and exclusion reason. |
| Recordings folder | Private team-owned cloud folder; link and access instructions belong in Moodle. |
| `QR-06` and its test | [docs/quality-requirements/qr/QR-06.md](../../docs/quality-requirements/qr/QR-06.md) and [docs/quality-requirements/qr/QR-06.md#qrt-01](../../docs/quality-requirements/qr/QR-06.md#qrt-01) |
| Recruitment target and session plan | [docs/usability-tests/ut-01/README.md#participant-profile](../../docs/usability-tests/ut-01/README.md#participant-profile) and [docs/usability-tests/ut-01/README.md#schedule](../../docs/usability-tests/ut-01/README.md#schedule) |
| Week 8 handoff | [reports/week-07/README.md#usability-test](#usability-test) |
| Glossary | [docs/glossary.md](../../docs/glossary.md) |
| Risk register | [docs/risks.md](../../docs/risks.md) |
| Week 6 action points | [reports/week-07/meeting-report.md#previous-action-points](meeting-report.md#previous-action-points) |
| Week 6 open questions | [reports/week-07/meeting-report.md#previous-open-questions](meeting-report.md#previous-open-questions) |
| Sprint Review | [reports/week-07/meeting-report.md](meeting-report.md) |
| Meeting script | [reports/week-07/meeting-script.md](meeting-script.md) |
| Meeting transcript | [reports/week-07/meeting-transcript.md](meeting-transcript.md), published with permission. |
| `REL-07` | [v0.5.0 release and upgrade note](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.5.0), [CHANGELOG.md](../../CHANGELOG.md#050---2026-11-15), and [docs/project-plan.md#rel-07](../../docs/project-plan.md#rel-07) |
| Sprint retrospective | Not yet present at this revision; tracked by [task #320](https://github.com/WellMadeTeam/workspace-ai-03/issues/320). |
| AI usage | Not yet present at this revision; tracked by [task #321](https://github.com/WellMadeTeam/workspace-ai-03/issues/321). The weekly disclosure remains pending. |

## Contribution

| Member | Work evidenced in the repository |
| ------ | -------------------------------- |
| @danmaninc | [Sprint planning #334](https://github.com/WellMadeTeam/workspace-ai-03/pull/334), [private data repository #357](https://github.com/WellMadeTeam/workspace-ai-03/pull/357), [caret fix #358](https://github.com/WellMadeTeam/workspace-ai-03/pull/358), [copy/paste #359](https://github.com/WellMadeTeam/workspace-ai-03/pull/359), [pre-test decision update #368](https://github.com/WellMadeTeam/workspace-ai-03/pull/368), and [release record #369](https://github.com/WellMadeTeam/workspace-ai-03/pull/369). |
| @Kamil116 | [Markdown support #335](https://github.com/WellMadeTeam/workspace-ai-03/pull/335), [recruitment plan #336](https://github.com/WellMadeTeam/workspace-ai-03/pull/336), [survey preparation #355](https://github.com/WellMadeTeam/workspace-ai-03/pull/355), [post-test #356](https://github.com/WellMadeTeam/workspace-ai-03/pull/356), [analysis plan #362](https://github.com/WellMadeTeam/workspace-ai-03/pull/362), and [QR-06 #365](https://github.com/WellMadeTeam/workspace-ai-03/pull/365). |
| @hrrrsss | [Protocol and session template #360](https://github.com/WellMadeTeam/workspace-ai-03/pull/360), [tasks and measures #361](https://github.com/WellMadeTeam/workspace-ai-03/pull/361), and [instrumentation check #363](https://github.com/WellMadeTeam/workspace-ai-03/pull/363). |
| @AntonChulakov | [Meeting artifacts #364](https://github.com/WellMadeTeam/workspace-ai-03/pull/364), [glossary #366](https://github.com/WellMadeTeam/workspace-ai-03/pull/366), and [usability risks #367](https://github.com/WellMadeTeam/workspace-ai-03/pull/367). |

## Repository evidence

[Merged PR #363](https://github.com/WellMadeTeam/workspace-ai-03/pull/363) closed [task #338](https://github.com/WellMadeTeam/workspace-ai-03/issues/338) and received approval from a member other than its author.
The latest successful runs checked for this report are on `main` at `b75d58492ddb7a59ebf0ff809cfa7f1efc86140c`: [link check](https://github.com/WellMadeTeam/workspace-ai-03/actions/runs/43757475352), [Markdown check](https://github.com/WellMadeTeam/workspace-ai-03/actions/runs/43757475484), [Actionlint](https://github.com/WellMadeTeam/workspace-ai-03/actions/runs/43757475270), and [product code checks](https://github.com/WellMadeTeam/workspace-ai-03/actions/runs/43757475412).
These runs verify that repository revision; the report change still needs its own checks and merge before submission.
The older research links excluded from checking in [.lycheeignore](../../.lycheeignore) are documented there as bot-blocked or returning HTTP 403; they provide no new Week 07 evidence.

The following records combine member-supplied test output and manual confirmations with the release commit's GitHub Actions results.
The [testing plan](../../docs/project-plan.md#quality-requirement-testing-plan) owns the verdicts and next planned checks.
QR-06 was not checked; its manual usability test remains scheduled for SPRINT-08.

### QR-01 QRT-01, 2026-11-15

The staging run started at 22:50:53 MSK on board `b82fb8c3-a250-439b-b124-3a476cde3945`, with 10 members for 1,800 seconds, a five-second change interval, and a two-second read threshold.
The deployed commit was not supplied with this output, so this record does not identify it as a run on the release commit.

```text
board: b82fb8c3-a250-439b-b124-3a476cde3945
started: 2026-11-15 22:50:53 MSK
members: 10, duration: 1800 s, interval: 5 s, threshold: 2 s
kind   changes  reads  p95 ms  max ms  over missed
add        114   1026    1075    1219     0      0
move       114   1026    1058    1154     0      0
edit        85    765    1572    1655     0      0
query       28    252    1956    2212     9      0
all        341   3069    1533    2212     9      0
failed reads: 0
socket failures: 0
result: FAIL: 9 reads over 2 s, 0 missed
```

There were no missed reads or socket failures, but nine query-message reads exceeded two seconds, with a maximum of 2,212 ms.
The criterion applies to every read, so a P95 below two seconds does not make the run pass.
The next check is deferred to SPRINT-08 because the latency criterion remains unmet.

### QR-02 QRT-01, 2026-11-15

The `v0.5.0` tag points to `0f9ccbb28fc67222d4859850707b0021b15d24c3`.
The [product-code CI run](https://github.com/WellMadeTeam/workspace-ai-03/actions/runs/43754420082), triggered by a push to `main` at that commit, passed both test steps:

| Step | Started (UTC) | Completed (UTC) | Duration | Result |
| ---- | ------------- | --------------- | -------- | ------ |
| Test frontend | 19:48:25 | 19:48:37 | 12 s | Success |
| Test backend | 19:48:13 | 19:48:17 | 4 s | Success |

Both steps completed within the two-minute limit.
The workflow sets `GROQ_API_KEY` to an empty value for backend tests, and the tests mock the LLM service provider.
The three critical modules remain covered by `main.test.tsx`, `test_message_router.py`, and `test_ai_service.py`.
The broken-branch half of QRT-01 was not repeated this week; its evidence remains the [Week 05 check](../week-05/README.md#qr-02-qrt-01-2026-10-31), including [draft PR #238](https://github.com/WellMadeTeam/workspace-ai-03/pull/238) and [its failed test run](https://github.com/WellMadeTeam/workspace-ai-03/actions/runs/41236961071).

### QR-03 scenario check, 2026-11-15

The member confirmed that all 10 forced provider failures met the scenario: every member saw the plain-language error within five seconds and could continue editing the board.
This is a manual confirmation; no per-failure timings, captured output, or deployed commit were supplied.
QR-03 currently defines no QRT, so this confirmation does not create a new test identifier or testing-plan row.

### QR-04 QRT-01, 2026-11-15

The supplied setup run used `main` at `0f9ccbb`, the release commit.
The relevant output is:

```text
branch: main
commit: 0f9ccbb
containers up after: 225 s
board opened after: 227 s
reply role: ai
query answered after: 228 s
changed tracked files: none
ignored files: app/backend/.env
result: PASS: answered in 228 s, under 600 s, editing only app/backend/.env
```

Docker reported the nginx image pulled and the frontend, backend, and nginx containers started.
The AI reply arrived within the 600-second limit, with no tracked file changed.

### QR-05 QRT-01, 2026-11-15

The core-task query received an AI reply.
Ten successive OpenObserve searches returned no matching hits; the next returned exactly one matching error log point, followed by the check script's final structured output:

```json
{
  "duration_ms": 4.004,
  "outcome": "client_error",
  "request_id": "79af72ac99044ace968126db2e16f0c0",
  "route": "/messages"
}
```

The successful search reported `total: 1` and `is_partial: false`.
The check script returns the final structured log point only when its lookup succeeds within the five-second deadline; the supplied final output is evidence of that log-lookup check.
The `duration_ms` value measures the failed HTTP request, not the delay before its log became searchable and not the dashboard P95.
The member separately confirmed that the staging dashboard showed a numeric `SLI-01` P95 for `client_error` within one minute and that production received no traffic from the run.
Those dashboard and isolation checks are manual confirmations; no screenshot or numeric P95 value was supplied.
The deployed commit was not supplied, so this record does not attribute the run to the release commit.

## Deviations

The full `UT-01` teammate dry run is deferred from SPRINT-07 to [SPRINT-08](../../docs/project-plan.md#sprint-08), as scheduled in [task #339](https://github.com/WellMadeTeam/workspace-ai-03/issues/339).
This departs from [Assignment 7, Part 3](https://github.com/inno-itpd/itpd/blob/main/assignments/assignment-7.md#part-3-write-the-surveys-the-task-protocol-and-the-instrumentation), which requires the rehearsal before the Week 07 handoff.
The 15 November instrumentation check was partial because the LLM service provider failed; the full protocol rehearsal remains pending under task #339 and must precede counted sessions.
The deferred dry run must check wording, all three time limits, consent and capture, surveys, the observer sheet, seed reset, instrumentation destination, and session linking, and resolve or assign any blocking issues.
It is excluded from recruitment counts, usability results, and the QR/QRT verdict, and does not replace verification task #340.
The test record and project plan still refer to a Week 07 dry run; those references describe the original plan, while this report records the deferral.

QR-01 remains failing after its Week 07 run and is planned again for SPRINT-08 because nine query-message reads exceeded two seconds.
QR-02 was rechecked on the release commit through CI; its deliberate broken-branch check was not repeated, and the Week 05 evidence is retained as described in the [run record](#qr-02-qrt-01-2026-11-15).

The `UT-01` pre-test questionnaire is omitted following the customer's [DEC-048](../../docs/decisions.md#dec-048), recorded at the [Week 7 design review](meeting-report.md#decisions).
This departs from [Assignment 7, Part 3](https://github.com/inno-itpd/itpd/blob/main/assignments/assignment-7.md#part-3-write-the-surveys-the-task-protocol-and-the-instrumentation) and the usability rules for [the protocol](https://github.com/inno-itpd/itpd/blob/main/requirements/usability-testing-requirements.md#the-protocol) and [the instruments](https://github.com/inno-itpd/itpd/blob/main/requirements/usability-testing-requirements.md#the-instruments), which require a pre-test and its record.
The customer considered the pre-test overwhelming for participants and of limited comparative value in this exploratory study.
The [revised protocol](../../docs/usability-tests/ut-01/README.md#protocol) retains think-aloud observation, task outcomes, assistance, time, post-task SEQ, observer ratings, and the SUS and open-ended post-test after all tasks.
The minimum [recruitment eligibility checks](../../docs/usability-tests/ut-01/README.md#recruitment-eligibility-check) establish the profile match and adult status without collecting a background or expectations questionnaire.
These arrangements preserve representative recruitment and evidence about task performance and perceived usability, but do not supply the assignment's pre-test baseline.
Team allocation no longer uses familiarity answers; the analysis must disclose that expectations and detailed prior familiarity were not collected and familiarity differences between conditions cannot be assessed.
DEC-048 records the customer's study-design agreement; this declaration does not claim a separate grading exemption from the pre-test requirement.

## Privacy

No private-only material or participant identity was committed to the product repository.
