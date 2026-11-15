# UT-01 Surveys

## Pre-test

Omitted following [DEC-048](../../decisions.md#dec-048) to reduce participant burden in this exploratory study.
The [Week 7 deviation](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-07/README.md#deviations) explains the departure from the assignment's pre-test requirement.
Only the minimum [recruitment eligibility checks](README.md#recruitment-eligibility-check) are retained; no background, usage-frequency, or expectations questionnaire is administered before the tasks.
The survey instruments below are administered after tasks.

## SEQ, After Each Task

Ask every participant this question after each usability test task:

> Overall, how difficult or easy was the task to complete?

Choose one answer on a seven-point scale.
`1` means very difficult, and `7` means very easy.
A higher score means the task felt easier to complete.

## Observer Rating, After Each Task

After each task, the observer answers this question separately from the participants:

> Based on what you observed, how difficult or easy was it for the team to complete the task?

Choose one answer on a seven-point scale.
`1` means very difficult, and `7` means very easy.
Record the observer's rating separately; do not combine it with the participants' SEQ answers.

## SUS, After All The Tasks

Ask every participant to answer these ten statements about the tools used during the session.
Keep the statements in this order and do not reword them.

1. I think that I would like to use this system frequently.
2. I found the system unnecessarily complex.
3. I thought the system was easy to use.
4. I think that I would need the support of a technical person to be able to use this system.
5. I found the various functions in this system were well integrated.
6. I thought there was too much inconsistency in this system.
7. I would imagine that most people would learn to use this system very quickly.
8. I found the system very cumbersome to use.
9. I felt very confident using the system.
10. I needed to learn a lot of things before I could get going with this system.

For each statement, choose one answer from `1` (strongly disagree) to `5` (strongly agree).

## SUS Scoring

Calculate each participant's SUS score using the answers as recorded:

`SUS = 2.5 × (20 + sum(odd answers) - sum(even answers))`

Do not reverse-code the even answers before applying the formula.
Report the mean and median SUS score separately for each study condition, together with the number of participants (`n`).
Keep raw answers in the private usability-data repository; publish only sanitized aggregate scores.

## Open-ended Post-test

**Goal:** Understand the participant's overall impression of the session, the changes they would like, and anything the questions did not cover.

Ask the following questions after all three tasks and the SUS, in the same order for every participant.
Before asking, remind the participant to leave out names, contact details, organization names, and other identifying information.

1. What is your overall impression of using Workspace for AI Collaboration across the tasks you just tried?
2. What did you find most useful about Workspace for AI Collaboration?
3. What was the biggest obstacle or frustration for you?
4. What, if anything, would you change about the experience, and why?
5. What else about your experience would you like to share that we have not asked about?

Record the open responses in the private usability-data repository under the assigned `UT-01 P-nn` code.
Mark an unanswered question as missing; do not infer or invent a response.
If an answer contains identifying details, omit those details from the survey record while preserving the non-identifying meaning of the answer.
