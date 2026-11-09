# Week 06 report

<!-- DRAFT for #276: not committed. Each TODO names the task issue whose merge fills it. -->

## Project

Workspace for AI collaboration, team 3.

Our problem-space sentence: We solve the problem of teams who brainstorm with LLMs but lose context when sharing queries and results — they aim for seamless collaborative visual thinking where everything stays shared and evolves together.

## What we did

1. Planned [`SPRINT-06`](../../docs/project-plan.md#sprint-06) with a planned velocity of 47, and added the product analyst's story [`US-17`](https://github.com/WellMadeTeam/workspace-ai-03/issues/277) and the system operator's story [`US-18`](https://github.com/WellMadeTeam/workspace-ai-03/issues/278).
2. Wrote [the analytics plan](../../docs/analytics.md) with the focus metric, its counter-metric, and the metric tree.
3. Wrote [the event table](../../docs/analytics.md#the-events) and instrumented the `backend` in [#282](https://github.com/WellMadeTeam/workspace-ai-03/pull/282), deployed OpenPanel on the VM with a `staging` and a `production` project as [the telemetry pipelines](../../docs/deployment.md#the-telemetry-pipelines) describe in [#284](https://github.com/WellMadeTeam/workspace-ai-03/pull/284), and built [the two analytics dashboards](../../docs/analytics.md#the-dashboards) in [#287](https://github.com/WellMadeTeam/workspace-ai-03/pull/287).
4. TODO (#264, #265, #266): the observability plan and its `SLI`s, the OpenObserve pipeline on the VM, and its two dashboards.
5. TODO (#267, #268): the two ADRs, the container view, and the two feature entries.
6. TODO (#269, #270): the diagnosability requirement and its `QRT-01`, run against staging, and the `SPRINT-06` testing-plan rows.
7. Carried out the Week 5 action points and open questions, and showed the deployed product to the customer on 2026-11-05, who accepted `US-02`, `US-05`, `US-08`, and `US-14`.
8. Reviewed [the threshold of success](../../docs/threshold-of-success.md) against the new data, set `TOS-01` to `Missed`, and prepared a proposal for `TOS-03`, deferred to the Week 7 meeting.
9. TODO (#273, #274): `REL-06` and the sprint's close.

## Summary

- The focus metric, [weekly boards completing a context-reuse flow](../../docs/analytics.md#weekly-boards-completing-a-context-reuse-flow), has no value yet: the production dashboard has no data, because nobody outside the team has used the product since the instrumentation was deployed.
  Its query and that of its L1 input, [weekly context-reuse query attempts](../../docs/analytics.md#weekly-context-reuse-query-attempts), both compute `1` on staging, from the team's one context-reuse flow outside the `smoke` source.
- TODO (#273): [`REL-06`](../../docs/project-plan.md#rel-06) is released as `v0.4.0` on 2026-11-08.
- TODO (#274): what moved out of `SPRINT-06` and to which sprint, with the actual velocity.
- The tests that are not `Passes` are in [the testing plan](../../docs/project-plan.md#quality-requirement-testing-plan).

## Findings

1. The customer accepted highlighting with one highlighted block at a time, `US-05`, sharing diagrams on the board, and the long text block, per [`DEC-038`](../../docs/decisions.md#dec-038), [`DEC-039`](../../docs/decisions.md#dec-039), [`DEC-040`](../../docs/decisions.md#dec-040), and [`DEC-041`](../../docs/decisions.md#dec-041); the acceptance of `US-05` replaces its rejection in [`DEC-029`](../../docs/decisions.md#dec-029).
2. A connected block has to tell the user when it receives a summary instead of a whole conversation, per [`DEC-042`](../../docs/decisions.md#dec-042), and basic Markdown formatting comes as its own story, per [`DEC-043`](../../docs/decisions.md#dec-043).
3. The validation session becomes a usability study that compares a group on the board with a control group, with surveys and an observer, per [`DEC-046`](../../docs/decisions.md#dec-046), and it and the analytics come before accounts and board export, per [`DEC-045`](../../docs/decisions.md#dec-045).
4. The architecture decisions are written in plain text, with a diagram only where it has a purpose, per [`DEC-047`](../../docs/decisions.md#dec-047).
5. Still open: whether the telemetry answers the customer's questions, and which three kinds of diagrams the customer uses most, carried in [the meeting report](meeting-report.md#open-questions).

## Customer meeting outcome

| Story                                                                                                               | Shown                                                        | Verdict                                                    |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| [`US-02`: Highlight part of the board](https://github.com/WellMadeTeam/workspace-ai-03/issues/38)                   | Highlighting from the right-click menu                       | Accepted, per [`DEC-038`](../../docs/decisions.md#dec-038) |
| [`US-05`: Reuse earlier answers as context](https://github.com/WellMadeTeam/workspace-ai-03/issues/41)              | A connected AI block receiving a long conversation's summary | Accepted, per [`DEC-039`](../../docs/decisions.md#dec-039) |
| [`US-08`: Share LLM diagrams on the board](https://github.com/WellMadeTeam/workspace-ai-03/issues/44)               | A rendered diagram added to the board as an image            | Accepted, per [`DEC-040`](../../docs/decisions.md#dec-040) |
| [`US-14`: Work with a long text block like an AI block](https://github.com/WellMadeTeam/workspace-ai-03/issues/201) | A long text block opened in the side panel                   | Accepted, per [`DEC-041`](../../docs/decisions.md#dec-041) |

No dashboard and no test result was shown at the meeting, as [the meeting report](meeting-report.md#metadata) records; see [Deviations](#deviations).

## Dashboards

TODO (#266): the observability screenshots, each linked with the `SLI` its chart shows.

- [Analytics, staging](images/analytics-staging.png): the `Staging: product analytics` dashboard, with the focus metric [weekly boards completing a context-reuse flow](../../docs/analytics.md#weekly-boards-completing-a-context-reuse-flow) and its L1 input [weekly context-reuse query attempts](../../docs/analytics.md#weekly-context-reuse-query-attempts), each at `1`, and `Smoke events (excluded from the metric)`, which lists the `source=smoke` board's two events that both metric charts leave out.
- [Analytics, production](images/analytics-production.png): the `Production: product analytics` dashboard, with the same three reports and queries, and no data in any of them.
- [Observability, staging](images/observability-staging.png): TODO `SLI-nn`.
- [Observability, production](images/observability-production.png): TODO `SLI-nn`.

## Quality requirement tests

Each result below is recorded as its row in [the testing plan](../../docs/project-plan.md#quality-requirement-testing-plan).
TODO (#270): after its pull request merges, rebase on `main` and link the `Evidence` cells of the `QR-01 QRT-01` and `QR-04 QRT-01` rows to [their](#qr-01-qrt-01-2026-11-09) [sections](#qr-04-qrt-01-2026-11-09).

### QR-05 QRT-01, TODO date

TODO (#269): the command run against staging, the commit, the staging organization's log point for the failed request with its `request_id`, route, and failure labels, and the `SLI`'s five-minute P95 query result.

### QR-01 QRT-01, 2026-11-09

danmaninc ran the test from a machine on the university network against the staging deployment, which ran `5191692`, with `STAGING_URL` set to its address:

```bash
python scripts/check_sync_latency.py "$STAGING_URL"
```

Its output:

```text
board: 9adf433f-8608-4f87-b8c4-1fffb8131761
started: 2026-11-09 18:51:03 MSK
members: 10, duration: 1800 s, interval: 5 s, threshold: 2 s
kind   changes  reads  p95 ms  max ms  over missed
add        114   1026    1038    1127     0      0
move       114   1026    1027    1132     0      0
edit        86    774    1528    1618     0      0
query       28    252    1886    2110     9      0
all        342   3078    1491    2110     9      0
failed reads: 0
socket failures: 0
result: FAIL: 9 reads over 2 s, 0 missed
```

The test fails: 9 of the 252 reads of a query message took longer than 2 seconds, up to 2110 ms, while every added, moved, and edited block reached the other 9 members within 2 seconds and no change was missed.
The other members read an AI block's conversation every 2 seconds, so the poll interval alone takes the whole budget of [`QR-01`](../../docs/quality-requirements/qr/QR-01.md).

### QR-02 QRT-01, 2026-11-09

On `main`, at `5191692`, [the product-code run](https://github.com/WellMadeTeam/workspace-ai-03/actions/runs/42637687059) passed `Test backend` in 3 seconds and `Test frontend` in 8 seconds, with `GROQ_API_KEY` set to an empty value.

### QR-04 QRT-01, 2026-11-09

danmaninc ran the test on a development machine, from the repository root, with the key in the environment:

```bash
GROQ_API_KEY=<key> scripts/check_setup_time.sh
```

Its output:

```text
branch: main
commit: 5191692
[+] Running 1/1
 ✔️ nginx Pulled                                                                                                    9.5s
[+] Running 5/5
 ✔️ Network workspace-ai-qr04-2075_default        Created                                                           0.1s
 ✔️ Volume "workspace-ai-qr04-2075_backend-data"  Created                                                           0.0s
 ✔️ Container workspace-ai-qr04-2075-frontend-1   Started                                                           0.8s
 ✔️ Container workspace-ai-qr04-2075-backend-1    Started                                                           0.8s
 ✔️ Container workspace-ai-qr04-2075-nginx-1      Started                                                           0.9s
containers up after: 120 s
board opened after: 122 s
reply role: ai
query answered after: 123 s
changed tracked files: none
ignored files: app/backend/.env
result: PASS: answered in 123 s, under 600 s, editing only app/backend/.env
```

The test passes: the reply was the LLM's, it came 123 of the 600 seconds after the clone, and only the ignored `app/backend/.env` changed.
No base image was kept from the cache this time, unlike the Week 05 run.

## Threshold review

| Goal                                                | Current measure                                                                                                                                                                                  | New data can settle it                                                                                                                                                                                                                                                                                                                      | Proposal                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [TOS-01](../../docs/threshold-of-success.md#tos-01) | The customer's `DEC-nnn` accepting `US-01`, `US-04`, and `US-05` at the Week 5 meeting, recorded in `docs/decisions.md`, by the end of Week 5                                                    | No — the measure is a customer decision, which neither the analytics events nor the request signals record; `docs/decisions.md` already settles it                                                                                                                                                                                          | —                                                                                                                                                                                                                                                                                                                                                             |
| [TOS-02](../../docs/threshold-of-success.md#tos-02) | A repeatable test of 10 clients on one board for 30 minutes showing 0 lost updates and every change visible to the other clients within 2 s, linked from the Week 7 report, by the end of Week 7 | No — [`SLI-01`](../../docs/observability.md#sli-01) times HTTP requests, not board updates sent over the WebSocket, and no analytics event records a lost or a late update                                                                                                                                                                  | —                                                                                                                                                                                                                                                                                                                                                             |
| [TOS-03](../../docs/threshold-of-success.md#tos-03) | The board state of a session by at least 3 people outside the team, with their answer to "did you need a messenger?" recorded as a finding, in the Week 8 report, by the end of Week 8           | No — no analytics event or request signal records who took part, the board state, or the answer to "did you need a messenger?"; the analytics records only that a board received a reply to a query using an earlier AI reply as context, marked `source` = `usability-test` when the session opens the board with `?source=usability-test` | Add to the measure at least 1 board with `source` = `usability-test` counted by [Weekly boards completing a context-reuse flow](../../docs/analytics.md#weekly-boards-completing-a-context-reuse-flow), read from the dashboard of the deployment the session uses, by the end of Week 8, in `SPRINT-08`; the board state and the finding stay in the measure |

[TOS-01](../../docs/threshold-of-success.md#tos-01) is `Missed`.
[TOS-02](../../docs/threshold-of-success.md#tos-02) is `Open`.
[TOS-03](../../docs/threshold-of-success.md#tos-03) is `Open`.

The team proposed no measure for `TOS-01`, because its verdict is final, and none for `TOS-02`, because neither pipeline observes how board updates travel between clients, so the load test planned for `SPRINT-07` stays the only evidence that can settle it.
The team proposed an analytics measure for `TOS-03`, because the session's core step, a query sent with an earlier reply as context, is exactly what the focus metric counts, so the query settles that part of the goal instead of a reading of the board state alone.
The proposal was not presented at the [Week 6 meeting](meeting-report.md), which recorded no decision on it, so it is deferred to the Week 7 meeting, see [Deviations](#deviations); until the customer agrees a `DEC-nnn` there, no goal changes and `TOS-03` keeps its current measure.

## Coverage

| Deliverable                   | Artifact                                                                                                                                                                                                                                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sprint plan and new stories   | [`docs/project-plan.md#sprint-06`](../../docs/project-plan.md#sprint-06), and [`US-17`](https://github.com/WellMadeTeam/workspace-ai-03/issues/277) and [`US-18`](https://github.com/WellMadeTeam/workspace-ai-03/issues/278) in [the `SPRINT-06` milestone](https://github.com/WellMadeTeam/workspace-ai-03/milestone/6) |
| Analytics plan                | [`docs/analytics.md`](../../docs/analytics.md), with [the metric tree](../../docs/analytics.md#the-metric-tree) and a section per metric                                                                                                                                                                                  |
| Events and instrumentation    | [`docs/analytics.md#the-events`](../../docs/analytics.md#the-events)                                                                                                                                                                                                                                                      |
| Analytics dashboards          | [`analytics-staging.png`](images/analytics-staging.png) and [`analytics-production.png`](images/analytics-production.png), with the metric each chart shows in [Dashboards](#dashboards)                                                                                                                                  |
| Observability plan and `SLI`s | [`docs/observability.md`](../../docs/observability.md)                                                                                                                                                                                                                                                                    |
| Observability dashboards      | [`observability-staging.png`](images/observability-staging.png) and [`observability-production.png`](images/observability-production.png), with the `SLI` each chart shows in [Dashboards](#dashboards)                                                                                                                   |
| Feature documentation         | [`docs/features.md`](../../docs/features.md)                                                                                                                                                                                                                                                                              |
| Functional requirements       | [`docs/functional-requirements/README.md`](../../docs/functional-requirements/README.md), with TODO the two new `FR-nnn` files                                                                                                                                                                                            |
| ADRs and container view       | [`docs/architecture/adr/README.md`](../../docs/architecture/adr/README.md) and [`docs/architecture/README.md#container-view`](../../docs/architecture/README.md#container-view)                                                                                                                                           |
| Observability requirement     | TODO [`QR-05`](../../docs/quality-requirements/qr/QR-05.md) and its [`QRT-01`](../../docs/quality-requirements/qr/QR-05.md#qrt-01)                                                                                                                                                                                        |
| Runtime test re-run           | None was run, as [Deviations](#deviations) says; the results are in [the testing plan](../../docs/project-plan.md#quality-requirement-testing-plan)                                                                                                                                                                       |
| Threshold review              | [`reports/week-06/README.md#threshold-review`](#threshold-review)                                                                                                                                                                                                                                                         |
| Week 5 action points          | [`reports/week-06/meeting-report.md#previous-action-points`](meeting-report.md#previous-action-points)                                                                                                                                                                                                                    |
| Week 5 open questions         | [`reports/week-06/meeting-report.md#previous-open-questions`](meeting-report.md#previous-open-questions)                                                                                                                                                                                                                  |
| Meeting script                | [`reports/week-06/meeting-script.md`](meeting-script.md)                                                                                                                                                                                                                                                                  |
| Meeting transcript            | [`reports/week-06/meeting-transcript.md`](meeting-transcript.md)                                                                                                                                                                                                                                                          |
| Customer validation           | [`reports/week-06/meeting-report.md`](meeting-report.md); no threshold decision was taken, see [Deviations](#deviations)                                                                                                                                                                                                  |
| `REL-06`                      | TODO the `v0.4.0` tag and release, [the changelog's released section](../../CHANGELOG.md), and [the plan's `REL-06` block](../../docs/project-plan.md#rel-06)                                                                                                                                                             |
| Sprint retrospective          | [`reports/week-06/sprint-retrospective.md`](sprint-retrospective.md)                                                                                                                                                                                                                                                      |
| AI usage                      | [`reports/week-06/ai-usage.md`](ai-usage.md)                                                                                                                                                                                                                                                                              |

## Minimum Usable Product Candidate

Core task: a team member sends an LLM query on a shared board, and every teammate on the board sees the query and the answer.

- [`US-01`: See the same board as my teammates](https://github.com/WellMadeTeam/workspace-ai-03/issues/37)
- [`US-04`: Ask an LLM where the whole team sees it](https://github.com/WellMadeTeam/workspace-ai-03/issues/40)

Customer's verdict on the candidate: [`DEC-012`](../../docs/decisions.md#dec-012).
The candidate is unchanged this week.

## Contribution

TODO: fill from the week's merged pull requests and reviews, after the remaining pull requests merge.

| Member         | Work                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| @danmaninc     | [PR #258](https://github.com/WellMadeTeam/workspace-ai-03/pull/258) (closed without merging), [PR #279](https://github.com/WellMadeTeam/workspace-ai-03/pull/279), [PR #280](https://github.com/WellMadeTeam/workspace-ai-03/pull/280), [PR #284](https://github.com/WellMadeTeam/workspace-ai-03/pull/284), [PR #287](https://github.com/WellMadeTeam/workspace-ai-03/pull/287); TODO |
| @Kamil116      | [PR #281](https://github.com/WellMadeTeam/workspace-ai-03/pull/281), [PR #282](https://github.com/WellMadeTeam/workspace-ai-03/pull/282); TODO                                                                                                                                                                                                                                         |
| @AntonChulakov | [PR #256](https://github.com/WellMadeTeam/workspace-ai-03/pull/256); TODO                                                                                                                                                                                                                                                                                                              |
| @hrrrsss       | TODO                                                                                                                                                                                                                                                                                                                                                                                   |

## Repository evidence

[Merged pull request #281](https://github.com/WellMadeTeam/workspace-ai-03/pull/281) that closed [task issue #260](https://github.com/WellMadeTeam/workspace-ai-03/issues/260), and the latest green [link check run](https://github.com/WellMadeTeam/workspace-ai-03/actions/runs/42502508831), [Markdown check run](https://github.com/WellMadeTeam/workspace-ai-03/actions/runs/42502508842), [`actionlint` run](https://github.com/WellMadeTeam/workspace-ai-03/actions/runs/42502508819), and [product-code CI run](https://github.com/WellMadeTeam/workspace-ai-03/actions/runs/42502508827) on `main`, at `82c7948`.
TODO: refresh the runs from the final `main` commit before submitting.

## Deviations

- The analytics and observability dashboards, the observability `QRT-01` result with its `SLI`, and the threshold proposal were not shown at the 2026-11-05 meeting, because they were not ready, as [the meeting report](meeting-report.md#metadata) records.
  Showing them is an action point due at the end of Week 7, and the question of whether the telemetry answers the customer's questions is carried in [the meeting report's open questions](meeting-report.md#open-questions); with no proposal presented, no `DEC-nnn` records a threshold decision.
- The link check may fail on the final `main` commit for a reason other than a broken link: during the GitHub incident on 2026-11-08, `github.com` answered `504 Gateway Timeout`, both to the download of the lychee binary and to the links lychee checks, as [issue #257](https://github.com/WellMadeTeam/workspace-ai-03/issues/257) and [pull request #258](https://github.com/WellMadeTeam/workspace-ai-03/pull/258) record.
  The link check runs linked in [Repository evidence](#repository-evidence) are the latest green ones; a red run from that window is the outage, not a broken link.
- [`QR-01 QRT-01`](../../docs/quality-requirements/qr/QR-01.md#qrt-01), the row planned for `SPRINT-06`, was run on staging and fails: 9 reads of a query message took more than 2 seconds.
  Its row in [the testing plan](../../docs/project-plan.md#quality-requirement-testing-plan) records `Fails` with [this run](#qr-01-qrt-01-2026-11-09) as evidence and is planned again for `SPRINT-07`, whose goal is every change visible to the other members.
- No row was moved to `SPRINT-07` without a run.
- No runtime test was re-run against [`SLI-01`](../../docs/observability.md#sli-01): the only implemented runtime test, `QR-01 QRT-01`, measures the members' reads of the board, which the request duration `SLI-01` does not cover.
- [`QR-02 QRT-01`](../../docs/quality-requirements/qr/QR-02.md#qrt-01) was checked again on its run on `main` only; the broken branch was not opened again, and that half of its `**Pass when:**` rests on the Week 05 run.
- A member's check of the context-reuse flow on production reached the production OpenPanel project, so production received test traffic, which Part 4 rules out.
  Its events were deleted from the production project before [the production screenshot](images/analytics-production.png) was taken, as [#287](https://github.com/WellMadeTeam/workspace-ai-03/pull/287) records, and the pipeline is checked on staging only.
- TODO: any other difference from the assignment, such as a dashboard the customer could not reach, or a test window still open at the deadline.

## Privacy

No private-only material was committed to this repository.
