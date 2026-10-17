# Week 03 report

## Project

Workspace for AI collaboration, team 3.

Our problem-space sentence: We solve the problem of teams who brainstorm with LLMs but lose context when sharing queries and results — they aim for seamless collaborative visual thinking where everything stays shared and evolves together.

## What we did

1. Stated the threshold of success with three goals, and linked it from the goal of the product vision.
2. Wrote the project plan with four milestones and seven sprints, created the sprint milestones on GitHub, and named the risks that threaten the plan.
3. Chose the stack of the minimum usable product and recorded it as [`DEC-016`](../../docs/decisions.md#dec-016).
4. Defined done for a story, a task, and a pull request, wrote the contributing guide, and set up the public GitHub project with the `Responsible` and `Accountable` issue fields.
5. Built the minimum usable product candidate into one working slice on `main` through task issues and one pull request per task.
6. Published `docs/` as a documentation site and wrote the setup page.
7. Carried out the Week 2 action points, and showed the working slice to the customer against the acceptance criteria of its stories.
8. Cut the first release, [`REL-03`](../../docs/project-plan.md#rel-03), tagged [`v0.1.0`](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.1.0).

No candidate story moved out of the candidate this week.

## Findings

1. The customer validated the slice: several members on one board create AI blocks, send queries, and all see the same queries and answers.
2. The 10-connection limit stays a hard limit, and the 11th member sees a clear "board is full" message, per [`DEC-017`](../../docs/decisions.md#dec-017).
3. A failed LLM query shows a meaningful, non-technical error to every member of the board, per [`DEC-018`](../../docs/decisions.md#dec-018).
4. Diagram rendering and automatic block titling take priority over user accounts and authentication, per [`DEC-019`](../../docs/decisions.md#dec-019).
5. Still open: which brainstorming task the next validation session with the customer runs, owned by @hrrrsss and due in Week 4.

## Customer meeting outcome

| Story                                                                                                         | Shown                                    | Verdict                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`US-01`: See the same board as my teammates](https://github.com/WellMadeTeam/workspace-ai-03/issues/37)      | `AC-01` working; `AC-02` not implemented | Rejected on `AC-02`, per [`DEC-020`](../../docs/decisions.md#dec-020); `AC-02` is refined by [`DEC-017`](../../docs/decisions.md#dec-017), and the rework is scheduled into [`SPRINT-04`](../../docs/project-plan.md#sprint-04). |
| [`US-04`: Ask an LLM where the whole team sees it](https://github.com/WellMadeTeam/workspace-ai-03/issues/40) | `AC-01` working; `AC-02` not implemented | Rejected on `AC-02`, per [`DEC-021`](../../docs/decisions.md#dec-021); `AC-02` is refined by [`DEC-018`](../../docs/decisions.md#dec-018), and the rework is scheduled into [`SPRINT-04`](../../docs/project-plan.md#sprint-04). |

## Coverage

| Deliverable                        | Artifact                                                                                                                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Threshold of success               | [`docs/threshold-of-success.md`](../../docs/threshold-of-success.md)                                                                                                                       |
| Project plan                       | [`docs/project-plan.md`](../../docs/project-plan.md)                                                                                                                                       |
| Risk register                      | [`docs/risks.md`](../../docs/risks.md)                                                                                                                                                     |
| Stack decision                     | [`docs/decisions.md#dec-016`](../../docs/decisions.md#dec-016)                                                                                                                             |
| Definition of Done                 | [`docs/definition-of-done.md`](../../docs/definition-of-done.md)                                                                                                                           |
| Contributing guide                 | [`CONTRIBUTING.md`](../../CONTRIBUTING.md)                                                                                                                                                 |
| Sprint milestones and issue fields | [the `SPRINT-03` GitHub milestone](https://github.com/WellMadeTeam/workspace-ai-03/milestone/3?closed=1), with the `Responsible` and `Accountable` values and the assignees on its issues  |
| GitHub project                     | [the project's table view](https://github.com/orgs/WellMadeTeam/projects/1/views/3)                                                                                                        |
| Minimum usable product             | [`US-01`](https://github.com/WellMadeTeam/workspace-ai-03/issues/37) and [`US-04`](https://github.com/WellMadeTeam/workspace-ai-03/issues/40), merged into `main` and shown at the meeting |
| Changelog and first release        | [`CHANGELOG.md`](../../CHANGELOG.md), and [the `v0.1.0` release](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.1.0)                                                      |
| Documentation site                 | [the documentation site](https://wellmadeteam.github.io/workspace-ai-03/)                                                                                                                  |
| Setup and run instructions         | [`docs/setup.md`](../../docs/setup.md)                                                                                                                                                     |
| Week 2 action points               | [`reports/week-03/meeting-report.md#previous-action-points`](meeting-report.md#previous-action-points)                                                                                     |
| Week 2 open questions              | [`reports/week-03/meeting-report.md#previous-open-questions`](meeting-report.md#previous-open-questions)                                                                                   |
| Meeting script                     | [`reports/week-03/meeting-script.md`](meeting-script.md)                                                                                                                                   |
| Customer validation                | [`reports/week-03/meeting-report.md`](meeting-report.md), and [`reports/week-03/meeting-transcript.md`](meeting-transcript.md)                                                             |
| AI usage                           | [`reports/week-03/ai-usage.md`](ai-usage.md)                                                                                                                                               |

## Minimum Usable Product Candidate

Core task: a team member sends an LLM query on a shared board, and every teammate on the board sees the query and the answer.

- [`US-01`: See the same board as my teammates](https://github.com/WellMadeTeam/workspace-ai-03/issues/37)
- [`US-04`: Ask an LLM where the whole team sees it](https://github.com/WellMadeTeam/workspace-ai-03/issues/40)

Customer's verdict on the candidate: [`DEC-012`](../../docs/decisions.md#dec-012).
The candidate is unchanged this week, and it is the scope of [`MLS-03`](../../docs/project-plan.md#mls-03).

## Contribution

| Member         | Work |
| -------------- | ---- |
| @danmaninc     |      |
| @Kamil116      |      |
| @AntonChulakov |      |
| @hrrrsss       |      |

## Repository evidence

[Merged pull request #93](https://github.com/WellMadeTeam/workspace-ai-03/pull/93) that closed [task issue #74](https://github.com/WellMadeTeam/workspace-ai-03/issues/74), the latest green [link check run](https://github.com/WellMadeTeam/workspace-ai-03/actions/runs/39041668558) and [Markdown check run](https://github.com/WellMadeTeam/workspace-ai-03/actions/runs/39041668595) on `main`.

## Deviations

- The verdicts on `US-01` and `US-04`, [`DEC-020`](../../docs/decisions.md#dec-020) and [`DEC-021`](../../docs/decisions.md#dec-021), were stated by the team at the meeting and not contested by the customer, rather than given by the customer explicitly. The transcript shows the customer agreeing that the team iterates on the working slice, and the verdicts are confirmed with the customer in Week 4, as an action point in [`reports/week-03/meeting-report.md`](meeting-report.md#action-points) records.
- The Week 2 action point to send the customer a UI design draft in Telegram was carried out at the meeting instead: the customer gave feedback on the live slice, as recorded in [`## Previous action points`](meeting-report.md#previous-action-points).

## Privacy

No private-only material was committed to this repository.
