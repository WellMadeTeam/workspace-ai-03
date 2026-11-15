# UT-01 Surveys

## Pre-test

**Goal:** Check whether the participant matches the UT-01 profile and record the background, familiarity, device, and expectations needed to interpret their session.

Use these questions when screening volunteers and confirm the answers at the session before the tasks.
Do not request names, contact details, organization names, exact ages, or other identifying information.

### Questions

1. **Are you 18 years of age or older?**
   Choose one: Yes / No.
2. **Are you a member of this product's team, its customer, an instructor, or a member of the course staff?**
   Choose one: Yes / No.
3. **Which describes your current study or work?**
   Select all that apply: I study software development or software architecture / I work in software development or software architecture / Neither.
   Do not name your school, employer, or team.
4. **Have you taken part in a team brainstorming session about a software problem?**
   Choose one: Yes / No.
5. **How often have you used a conversational LLM for work or study in the past six months?**
   Choose one: Never / Less than once a month / At least once a month but less than once a week / At least once a week but not every day / Every day.
6. **How often have you used a collaborative digital whiteboard in the past six months?**
   Choose one: Never / Less than once a month / At least once a month but less than once a week / At least once a week but not every day / Every day.
7. **Have you used Workspace for AI Collaboration before?**
   Choose one: Yes / No / Not sure.
8. **Will you be able to use a laptop for this session?**
   Choose one: Yes / No.
9. **What would you expect a shared board to help you do during a brainstorming session with an LLM?**
   Give an open response without names, organization details, or other identifying information.
10. **Which tools have you used previously during your brainstorming sessions, if any?**
    Give an open response without names, organization details, or other identifying information.

### Eligibility And Recording

A counted participant must answer Yes to questions 1, 4, and 8, No to question 2, select at least one software-related study or work option in question 3, and report some LLM use in question 5.
Before the session, the facilitator confirms that the laptop has a keyboard and a current browser and that the session can run in person on the university network.
Whiteboard familiarity and prior use of this product are background information, not eligibility conditions.

If question 1 is answered No, stop the screening and do not run the session.
If another eligibility condition is not met, do not count the session towards UT-01; any exploratory session must be labelled as such.
If an eligibility answer is missing or unclear, confirm it before accepting the person for a counted session.
This screening does not replace the consent and session-readiness checks in the UT-01 record.

Record the selected options and the open responses to questions 9 and 10 in the private usability-data repository.
For a scheduled participant, use their assigned `UT-01 P-nn` code; keep screening responses private and keep contact details and the identity mapping separate from survey answers.
Mark missing responses as missing and never infer an answer.
If an answer contains identifying details, omit those details from the survey record while preserving the non-identifying meaning of the answer.

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
