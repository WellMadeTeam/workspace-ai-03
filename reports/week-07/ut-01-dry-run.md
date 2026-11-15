# UT-01 teammate dry run

- **Task:** [Run the UT-01 teammate dry run #339](https://github.com/WellMadeTeam/workspace-ai-03/issues/339)
- **Status:** Planned
- **Run on:** TODO: date of the dry run
- **Tested design revision:** TODO: the commit of `main` that holds the `UT-01` design the run used
- **Environment:** the staging deployment, `$STAGING_URL`

## What this run is not

The dry run is a rehearsal of the full [`UT-01` protocol](../../docs/usability-tests/ut-01/README.md#protocol) with a teammate.
It is not a counted session, and its teammate gets no participant code.
It is excluded from the recruitment count, from the usability results, and from the quality requirement verdict, and nothing in this record is evidence for them.
UT-01 instrumentation is required in SPRINT-08 before the first counted session.

## Run record

- **Facilitator:** TODO: GitHub username
- **Observer:** TODO: GitHub username
- **Teammate taking the part of the participant:** TODO: GitHub username
- **Run was captured:** TODO: Yes / No

Open the board with `?source=usability-test` and no board parameter, so the run starts on a new empty board.
Every browser that joins the board must open a link that still carries `source=usability-test`, because a link without it records its events as `source=web`.

## Checks

Write `Pass`, `Fixed`, or `Blocking` in the **Result** column, and describe anything that is not `Pass` under **Issues found**.

| Check                       | Expected                                                                                                                                                                                                             | Result |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|
| Scenario wording            | Each scenario is read exactly as written in [The Tasks](../../docs/usability-tests/ut-01/README.md#the-tasks), is understood without help, and names no button, label, or screen.                                    | TODO   |
| Main task time limit        | 30 minutes, and the end state of two design ideas and one selected idea can be reached within it.                                                                                                                    | TODO   |
| Secondary task 1 time limit | 10 minutes, and its start state, an earlier AI answer from another member, is available from the main task.                                                                                                          | TODO   |
| Secondary task 2 time limit | 10 minutes, and its start state, the selected design and the ideas, is available from the main task.                                                                                                                 | TODO   |
| Consent and recording steps | The facilitator explains what is captured and who can access it before the [consent](../../docs/usability-tests/ut-01/consent.md) is signed, and capture does not start before it.                                   | TODO   |
| Surveys                     | The [pre-test](../../docs/usability-tests/ut-01/surveys.md#pre-test), the SEQ after each task, the SUS, and the open-ended post-test are asked in order, and the ten SUS statements are readable on the screen used. | TODO   |
| Observer sheet              | The [observation sheet](../../docs/usability-tests/ut-01/sessions/README.md#observation-sheet) has room for duration, actions, difficulty, help, quotes, and tool switches for all three tasks.                      | TODO   |
| Seed reset                  | A new empty board starts the session, and the board of the next session is reset to the same empty synthetic seed.                                                                                                   | TODO   |
| Instrumentation destination | The events of the run reach the staging OpenPanel project, carry `source=usability-test`, and no production data is written.                                                                                         | TODO   |
| Session linking             | The private mapping between the session code and the board's opaque `board_id` identifies the run's events, and no participant name or contact detail is sent to analytics.                                          | TODO   |

## Time on each task

| Task             | Time limit | Time taken | Outcome |
|------------------|------------|------------|---------|
| Main task        | 30 minutes | TODO       | TODO    |
| Secondary task 1 | 10 minutes | TODO       | TODO    |
| Secondary task 2 | 10 minutes | TODO       | TODO    |

## Issues found

Correct each issue in the design, and link the change, or record an owner and the readiness condition that blocks counted sessions until it is met.

| Issue                                   | Corrected in | Owner | Blocking readiness condition |
|-----------------------------------------|--------------|-------|------------------------------|
| TODO: the issues found, or `None found` | TODO         | TODO  | TODO                         |
