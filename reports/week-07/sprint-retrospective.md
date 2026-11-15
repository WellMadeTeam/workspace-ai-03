# Sprint 07 retrospective

## What Went Well

| What went well |
| --- |
| We fixed the caret jumping while editing text blocks, including after autosave and shared-board updates, in [#358](https://github.com/WellMadeTeam/workspace-ai-03/pull/358). |
| We added Ctrl/Cmd+C and Ctrl/Cmd+V hotkeys for copying selected blocks and connections in [#359](https://github.com/WellMadeTeam/workspace-ai-03/pull/359), improving the board after the team's exploratory run. |
| We prepared a production-ready draft of [UT-01](../../docs/usability-tests/ut-01/README.md), including the tasks, protocol, surveys, consent template, session instructions, and analysis plan. |
| The customer accepted the analytics and observability implementation at the [Week 7 meeting](meeting-report.md#summary), completing `US-17` and `US-18` for an actual velocity of 13 points. |

## What Did Not

| Problem | Root cause |
| --- | --- |
| The full teammate dry run [#339](https://github.com/WellMadeTeam/workspace-ai-03/issues/339) was deferred to `SPRINT-08`, leaving the draft without a complete protocol rehearsal at the sprint's close. | The task, protocol, and analysis pull requests [#360](https://github.com/WellMadeTeam/workspace-ai-03/pull/360), [#361](https://github.com/WellMadeTeam/workspace-ai-03/pull/361), and [#362](https://github.com/WellMadeTeam/workspace-ai-03/pull/362) were opened on the due date, leaving no buffer to rehearse the assembled design. |
| The [team-run instrumentation check](../../docs/usability-tests/ut-01/README.md#team-run-instrumentation-check) verified a failed query but could not verify successful replies or context reuse. | The LLM service provider failed during the run, so the success-path events could not be observed and the pre-session verification remains open in [#340](https://github.com/WellMadeTeam/workspace-ai-03/issues/340). |

## Actions

| Action | Owner | Impact | Reason | Carried |
| --- | --- | --- | --- | --- |
| Open a pull request for each issue by Wednesday of the sprint week, even as a draft. | AntonChulakov | High | The design pull requests arrived at the sprint's end, leaving no buffer for the full dry run. | Yes |
| A pull request that uses a new LLM provider parameter shows the output of one real call to the model we deploy in its "What you checked" section. | hrrrsss | Medium | No new provider parameter was introduced this sprint, so the action remains unapplied. | Yes |
| Write the request and response of every new endpoint into the issue before the backend and frontend work is split between members. | Kamil116 | Medium | The copy task [#354](https://github.com/WellMadeTeam/workspace-ai-03/issues/354) describes behavior but does not record the new copy endpoint's request and response shapes. | Yes |
| In `SPRINT-08`, run the full teammate protocol rehearsal in #339, then complete #340 on the same staging deployment, record the design and deployment revisions and coverage, and resolve blocking findings before any counted session. | danmaninc | High | Combining the deferred dry run with instrumentation verification can check the protocol and data path together, including the success paths missing from the first check. | Yes |

## Carried Actions

| Action | Outcome |
| --- | --- |
| [`reports/week-06/sprint-retrospective.md`](../week-06/sprint-retrospective.md#actions): "Open a pull request for each issue by Wednesday of the sprint week, even as a draft." | Not done: the sprint plan [#334](https://github.com/WellMadeTeam/workspace-ai-03/pull/334) opened on 2026-11-14, and the task, protocol, and analysis pull requests opened on 2026-11-15, after Wednesday, 2026-11-11. |
| [`reports/week-06/sprint-retrospective.md`](../week-06/sprint-retrospective.md#actions): "A pull request that uses a new LLM provider parameter shows the output of one real call to the model we deploy in its "What you checked" section." | Not done: no new LLM service provider parameter was introduced in `SPRINT-07`, so the action was not applied and remains carried for the next applicable change. |
| [`reports/week-06/sprint-retrospective.md`](../week-06/sprint-retrospective.md#actions): "Write the request and response of every new endpoint into the issue before the backend and frontend work is split between members." | Not done: [#359](https://github.com/WellMadeTeam/workspace-ai-03/pull/359) introduced a backend copy endpoint, but its task #354 records no request or response shape. |
