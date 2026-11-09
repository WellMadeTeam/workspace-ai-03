# Sprint 06 retrospective

## What Went Well

| What went well |
| --- |
| The core functionality is complete: the customer accepted highlighting, `US-05`, sharing LLM diagrams on the board, and long text in a text block at the meeting on 2026-11-05, per [`DEC-038`](../../docs/decisions.md#dec-038) to [`DEC-041`](../../docs/decisions.md#dec-041), so every story carried from `SPRINT-05` closed. |
| The analytics and observability pipelines run on the VM, and their staging and production dashboards are built, in [#287](https://github.com/WellMadeTeam/workspace-ai-03/pull/287) and [#289](https://github.com/WellMadeTeam/workspace-ai-03/pull/289), with the screenshots in [`images/`](images/analytics-staging.png), so the next meeting can show the customer how teams use the board and how a request is diagnosed. |
| The product is mostly ready for the usability study the customer defined in [`DEC-046`](../../docs/decisions.md#dec-046), and the customer put that study and the analytics ahead of accounts and board export in [`DEC-045`](../../docs/decisions.md#dec-045). |

## What Did Not

| Problem | Root cause |
| --- | --- |
| Most of the sprint's work was done at or after the due date of 2026-11-08: the sprint plan [#279](https://github.com/WellMadeTeam/workspace-ai-03/pull/279), the instrumentation [#282](https://github.com/WellMadeTeam/workspace-ai-03/pull/282) and the observability plan [#286](https://github.com/WellMadeTeam/workspace-ai-03/pull/286) were opened on that day, the dashboards and the diagnosability check [#283](https://github.com/WellMadeTeam/workspace-ai-03/pull/283) merged on 2026-11-09, and `QR-05 QRT-01` stayed `Not verified` with only partial log output in [the testing plan](../../docs/project-plan.md#quality-requirement-testing-plan). | The sprint was not planned and split into issues at its start, so no member had an issue to open a pull request for by Wednesday, and the first one, [#256](https://github.com/WellMadeTeam/workspace-ai-03/pull/256), was opened on 2026-11-06. |
| Some open questions and action points were not covered at the meeting: the diagram kinds question, open since Week 5, and five of the Week 5 action points reappear in [the Week 6 meeting report](meeting-report.md#previous-action-points). | [The meeting script](meeting-script.md#agenda) had no agenda item for the previous report's open questions and action points, so they were raised only if time remained, and none did. |
| The meeting ran to 61 minutes, past its planned slot, although the 22 minutes planned for the analytics evidence and the threshold proposal were not used because those were not ready. | The demonstration and the verdicts had no one keeping their timeboxes, so they took the time freed by the missing items and more. |

## Actions

| Action | Owner | Impact | Reason | Carried |
| --- | --- | --- | --- | --- |
| Open a pull request for each issue by Wednesday of the sprint week, even as a draft. | AntonChulakov | High | The first member pull request of the sprint, [#256](https://github.com/WellMadeTeam/workspace-ai-03/pull/256), was opened on 2026-11-06, and all 17 others were opened on the due date, 2026-11-08, or the day after. | Yes |
| Start the meeting script's agenda with a timeboxed item for every open question and uncovered action point of the previous meeting report, and have the observer call each timebox aloud. | Kamil116 | High | The diagram kinds question and five Week 5 action points were not covered, and the meeting ran to 61 minutes. | No |
| A pull request that uses a new LLM provider parameter shows the output of one real call to the model we deploy in its "What you checked" section. | hrrrsss | Medium | No pull request in `SPRINT-06` used a new parameter, so the action was not applied, and `US-09` and `US-10` in `SPRINT-07` will add provider calls. | Yes |
| Write the request and response of every new endpoint into the issue before the backend and frontend work is split between members. | Kamil116 | Medium | No new endpoint was split between members in `SPRINT-06`, so the action was not applied, and `US-09` and `US-10` will need new endpoints. | Yes |

## Carried Actions

| Action | Outcome |
| --- | --- |
| [`reports/week-05/sprint-retrospective.md`](../week-05/sprint-retrospective.md#actions): "A pull request that uses a new LLM provider parameter shows the output of one real call to the model we deploy in its "What you checked" section." | Not done: no pull request in `SPRINT-06` used a new LLM provider parameter, so the action was never applied. |
| [`reports/week-05/sprint-retrospective.md`](../week-05/sprint-retrospective.md#actions): "Write the request and response of every new endpoint into the issue before the backend and frontend work is split between members." | Not done: no new endpoint was split between members in `SPRINT-06`, so the action was never applied. |
| [`reports/week-05/sprint-retrospective.md`](../week-05/sprint-retrospective.md#actions): "Open a pull request for each issue by Wednesday of the sprint week, even as a draft." | Not done: no member pull request was opened by Wednesday, 2026-11-04; the first, [#256](https://github.com/WellMadeTeam/workspace-ai-03/pull/256), was opened on 2026-11-06. |
