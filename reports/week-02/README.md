# Week 02 report

## Project

Workspace for AI collaboration, team 3.

Our problem-space sentence: We solve the problem of teams who brainstorm with LLMs but lose context when sharing queries and results — they aim for seamless collaborative visual thinking where everything stays shared and evolves together.

## What we did

1. Shared the team's version of product vision with the customer.
2. Discussed user stories and MUP candidate with the customer.
3. Presented the prototype of AI context reusage flow in the form of sketch to the customer and received feedback.
4. Documented the updated product vision and user stories in the repository of the project.

## Findings

1. The goal is not to solve the aggregation problem but to verify whether a shared LLM whiteboard solves it.
2. The main stakeholders are software developers and software architects.
3. Diagrams rendering from code and AI-generated images are should-have features now.
4. Account creation, granular access and whiteboard access have the lower priority than skills and reference documents among could-have features.
5. The MUP is narrowed to a shared board with LLM query widgets without invitations and approved by the customer.
6. The proposed prototype of the AI context reusage flow is approved by the customer.

## Coverage

| Deliverable            | Artifact                                                                                                                                                                                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Kickoff action points  | `## Previous action points` in [`reports/week-02/meeting-report.md`](meeting-report.md)                                                                                                                                                                |
| Kickoff open questions | `## Previous open questions` in [`reports/week-02/meeting-report.md`](meeting-report.md)                                                                                                                                                               |
| Product vision         | [`docs/product-vision.md`](../../docs/product-vision.md)                                                                                                                                                                                               |
| System context diagram | [`docs/architecture/context.svg`](../../docs/architecture/context.svg) and its source, embedded in [`docs/product-vision.md`](../../docs/product-vision.md)                                                                                            |
| Assumptions            | [`docs/assumptions.md`](../../docs/assumptions.md)                                                                                                                                                                                                     |
| Decisions              | [`docs/decisions.md`](../../docs/decisions.md)                                                                                                                                                                                                         |
| Story issues           | the `US-nn` [issues](https://github.com/WellMadeTeam/workspace-ai-03/issues?q=is%3Aissue+state%3Aopen+label%3Auser-story), filtered by the `user-story` label                                                                                          |
| Issue forms            | [`.github/ISSUE_TEMPLATE/user-story.yml`](../../.github/ISSUE_TEMPLATE/user-story.yml), [`.github/ISSUE_TEMPLATE/task.yml`](../../.github/ISSUE_TEMPLATE/task.yml), and [`.github/ISSUE_TEMPLATE/config.yml`](../../.github/ISSUE_TEMPLATE/config.yml) |
| Labels                 | [the repository's labels page](https://github.com/WellMadeTeam/workspace-ai-03/labels), with `user-story`, `task`, and the `moscow:*` labels                                                                                                           |
| Pull request template  | [`.github/pull_request_template.md`](../../.github/pull_request_template.md)                                                                                                                                                                           |
| Prototypes             | [`reports/week-02/prototypes.md`](prototypes.md)                                                                                                                                                                                                       |
| Meeting script         | [`reports/week-02/meeting-script.md`](meeting-script.md)                                                                                                                                                                                               |
| Customer validation    | [`reports/week-02/meeting-report.md`](meeting-report.md), and [`reports/week-02/meeting-transcript.md`](meeting-transcript.md)                                                                                                                         |
| AI usage               | [`reports/week-02/ai-usage.md`](ai-usage.md)                                                                                                                                                                                                           |

## Minimum Usable Product Candidate

Core task: a team member sends an LLM query on a shared board, and every teammate on the board sees the query and the answer.

- [`US-01`: See the same board as my teammates](https://github.com/WellMadeTeam/workspace-ai-03/issues/37)
- [`US-04`: Ask an LLM where the whole team sees it](https://github.com/WellMadeTeam/workspace-ai-03/issues/40)

Customer's verdict: [`DEC-012`](../../docs/decisions.md#dec-012).

## Contribution

| Member         | Work                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| @danmaninc     | [PR #16](https://github.com/WellMadeTeam/workspace-ai-03/pull/16), [PR #17](https://github.com/WellMadeTeam/workspace-ai-03/pull/17), [PR #34](https://github.com/WellMadeTeam/workspace-ai-03/pull/34), [PR #35](https://github.com/WellMadeTeam/workspace-ai-03/pull/35), [PR #36](https://github.com/WellMadeTeam/workspace-ai-03/pull/36), [PR #59](https://github.com/WellMadeTeam/workspace-ai-03/pull/59), [PR #60](https://github.com/WellMadeTeam/workspace-ai-03/pull/60), [PR #61](https://github.com/WellMadeTeam/workspace-ai-03/pull/61); context diagram; [approved #32](https://github.com/WellMadeTeam/workspace-ai-03/pull/32#pullrequestreview-5480627168), [approved #33](https://github.com/WellMadeTeam/workspace-ai-03/pull/33#pullrequestreview-5480763230) @hrrrsss; [approved #54](https://github.com/WellMadeTeam/workspace-ai-03/pull/54#pullrequestreview-5480670687) @Kamil116; [approved #51](https://github.com/WellMadeTeam/workspace-ai-03/pull/51#pullrequestreview-5480448929), [approved #53](https://github.com/WellMadeTeam/workspace-ai-03/pull/53#pullrequestreview-5480727645), [approved #55](https://github.com/WellMadeTeam/workspace-ai-03/pull/55#pullrequestreview-5482060968) @AntonChulakov |
| @Kamil116      | [PR #54](https://github.com/WellMadeTeam/workspace-ai-03/pull/54), [created user stories as issues](https://github.com/WellMadeTeam/workspace-ai-03/issues?q=is%3Aissue+state%3Aopen+label%3Auser-story), [proposed MUP](https://github.com/WellMadeTeam/workspace-ai-03/pull/36#pullrequestreview-5480323633), [approved #34](https://github.com/WellMadeTeam/workspace-ai-03/pull/34#pullrequestreview-5480742215) @danmaninc                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| @AntonChulakov | [PR #51](https://github.com/WellMadeTeam/workspace-ai-03/pull/51), [PR #53](https://github.com/WellMadeTeam/workspace-ai-03/pull/53), [PR #55](https://github.com/WellMadeTeam/workspace-ai-03/pull/55); [approved #54](https://github.com/WellMadeTeam/workspace-ai-03/pull/54#pullrequestreview-5480746028) @Kamil116; [approved #35](https://github.com/WellMadeTeam/workspace-ai-03/pull/35#pullrequestreview-5483642051), [approved #59](https://github.com/WellMadeTeam/workspace-ai-03/pull/59#pullrequestreview-5484005151) @danmaninc                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| @hrrrsss       | [PR #32](https://github.com/WellMadeTeam/workspace-ai-03/pull/32), [PR #33](https://github.com/WellMadeTeam/workspace-ai-03/pull/33), [PR #52](https://github.com/WellMadeTeam/workspace-ai-03/pull/52), [PR #50](https://github.com/WellMadeTeam/workspace-ai-03/pull/50); [approved #16](https://github.com/WellMadeTeam/workspace-ai-03/pull/16#pullrequestreview-5456611308), [approved #35](https://github.com/WellMadeTeam/workspace-ai-03/pull/35#pullrequestreview-5483643574), [approved #60](https://github.com/WellMadeTeam/workspace-ai-03/pull/60#pullrequestreview-5484147648), [approved #61](https://github.com/WellMadeTeam/workspace-ai-03/pull/61#pullrequestreview-5484149768) @danmaninc; [approved #53](https://github.com/WellMadeTeam/workspace-ai-03/pull/53#pullrequestreview-5480736259) @AntonChulakov; [approved #54](https://github.com/WellMadeTeam/workspace-ai-03/pull/54#pullrequestreview-5480687020) @Kamil116;                                                                                                                                                                                                                                                                                           |

## Repository evidence

[Reviewed pull requests](https://github.com/WellMadeTeam/workspace-ai-03/pulls?q=is%3Apr+state%3Aopen+milestone%3A%22Week+02%22), [user story issues](https://github.com/WellMadeTeam/workspace-ai-03/issues?q=is%3Aissue+state%3Aopen+label%3Auser-story).

## Deviations

- Assignment's artifacts are submitted after hard deadline.
- Markdown errors are fixed after adding the Markdown check rather than before it. Despite this deviation, the runs on branch `main` [were successful](https://github.com/WellMadeTeam/workspace-ai-03/actions/workflows/markdown.yml).
- In the recording of the meeting, the audio from `AntonChulakov` member is absent due to techincal reasons. Despite this deviation, all sentences from the `AntonChulakov` are present in the meeting transcript.

## Privacy

No private-only material was committed to this repository.
