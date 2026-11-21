# UT-01 Sessions

## Recorded sessions

Three participants completed the tasks together in one shared-board team run, `T-01`, on 19 November 2026 during [SPRINT-08](../../../project-plan.md#sprint-08).
No control or supplementary run took place.
Each participant has a sanitized observation record; their shared task outcomes represent one team attempt per task.
The three records do not establish three counted sessions: only P-01 has fully confirmed eligibility, while P-02 and P-03 remain partially unconfirmed.

| Participant | Team run | Condition | Public note |
| --- | --- | --- | --- |
| UT-01 P-01 | T-01 | Shared board | [P-01](P-01.md) |
| UT-01 P-02 | T-01 | Shared board | [P-02](P-02.md) |
| UT-01 P-03 | T-01 | Shared board | [P-03](P-03.md) |

### Eligibility, consent, and capture confirmation

The team reports one fully confirmed eligibility profile (P-01) and two partially unconfirmed profiles (P-02 and P-03).
The outstanding individual checks for P-02 and P-03 are not specified; do not infer which criteria passed or failed.
All three participants gave consent, and the capture method was explained as telemetry and human observations, with no video.
Consent timing and withdrawal status still require confirmation before establishing the counted-session total.
The underlying consent and eligibility records remain private.

| Participant | Eligibility status | Counted-session status |
| --- | --- | --- |
| UT-01 P-01 | All checks confirmed | Not established until prior consent and withdrawal status are confirmed. |
| UT-01 P-02 | Partially unconfirmed | Not counted while eligibility remains incomplete. |
| UT-01 P-03 | Partially unconfirmed | Not counted while eligibility remains incomplete. |

The minimum of three counted sessions is not established by these records.
The results work must use the confirmed counted-session total rather than treating all three participants as eligible.

### T-01 shared task record

The team member confirmed completion with assistance on all three tasks.
The task names correspond to [the UT-01 tasks](../README.md#the-tasks).
The 30-, 10-, and 10-minute task limits in the design are not recorded elapsed times.

| Task | Team outcome | Assistance | Actual elapsed time |
| --- | --- | --- | --- |
| Task 1: Brainstorm ideas and select one | Assisted | P-01 needed help with editing-related technical difficulties and bugs and asked questions about functionality; P-02 and P-03 asked questions about functionality and received assistance. | Not recorded |
| Task 2: Reuse another member's AI answer | Assisted | All three participants asked questions about functionality and received assistance. | Not recorded |
| Task 3: Create and share a diagram | Assisted | All three participants needed a substantial hint to locate the diagram feature. | Not recorded |

These are retrospective outcome confirmations, not reconstructed timings.
Detailed descriptions of the selected idea, reused answer, and final diagram are not established by the supplied notes or questionnaire.
The formal QR/QRT verdict is separate from this session record.

### Shared observations

The notes describe manual copying from AI replies into text blocks and confusion about connecting AI blocks to text blocks with the ambiguous attribution P-02/P-03.
They do not establish whether one or both participants experienced each issue.
Other group observations concern arrow direction, text-block titles, the interpretation of blue as another member, and missing onboarding; individual support is not enumerated for each observation.
The observer separately noted a small reply area for both P-01 and P-02.
Group feedback described diagram creation as non-obvious, with the dedicated-button suggestion explicitly attributed to P-01.
Observer ideas about generation status, Mermaid import, and diagram appearance are not treated as participant findings.

### Measurement limitations

SEQ was not administered after any task; all participant SEQ values are missing (`n=0`).
Task durations, participant tool-switch counts and observation durations, and observer ease ratings are unavailable in the supplied material.
SUS scores use the ten recorded numeric answers and the formula in [surveys.md](../surveys.md#sus-scoring); raw answers and post-test responses remain private.
There is one team and no control group, so neither individual questionnaire responses nor repeated task outcomes establish independent team comparisons or a population effect.
The team member retrospectively confirmed the date, software-development student roles, and laptop use.
Device details were not captured during the session.
P-01 has since confirmed all eligibility checks, including the minimum LLM-use and device criteria; exact browser details remain unrecorded.
P-02 and P-03 have only partial eligibility confirmation.

## Session Instructions

Before the participant arrives:

- Reset the staging board to the initial empty state.
- Confirm that staging is reachable from a machine on the university network.
- Confirm that the [recruitment eligibility check](../README.md#recruitment-eligibility-check) is complete and stored privately.
- Prepare the consent form, capturing method, task scenarios, and observation sheet.
- Keep staging credentials out of this repository.

At least two team members take part in each session.
The same facilitator runs every counted session.

During the session:

- Follow the protocol in [UT-01](../README.md).
- Omit the pre-test questionnaire, following [DEC-048](../../../decisions.md#dec-048).
- Use the participant code, such as `P-01`, instead of the participant's name.
- Do not record names, email addresses, phone numbers, or other identifying details here.
- The facilitator may clarify the scenario but must not explain the interface or solve a task.
- The observer records task completion, time, difficulties, help given, and relevant quotes.
- Ask the participant to complete SEQ after each task, then SUS and the open-ended post-test after all tasks.
- Stop if the participant asks to stop or the team observes a critical or security-sensitive problem.
- Record why the session stopped.

After the session:

- Save the completed note using the next participant code, such as `P-01.md`.
- Keep consent records, identity mapping, raw notes, and recordings in the private locations described in [UT-01](../README.md).
- Publish only sanitized notes and only when the participant's consent allows it.
- Do not count the teammate dry run as a participant session.

## Session Template

Copy this section into a new file named with the participant code, for example `P-01.md`.

### Session details

- **Participant code:**
- **Anonymous team-run key:**
- **Condition:** Shared board / Control
- **Team size:**
- **Date:** Keep the date private if it could identify the participant.
- **Profile matched:** Yes / No
- **Consent and capturing check completed:** Yes / No
- **Recruitment eligibility confirmed and stored privately:** Yes / No
- **Relation to the target user:** Sanitized role and brainstorming experience; no organization names.
- **Familiarity:** Meets the minimum LLM-use criterion / Does not meet it / Not confirmed.
- **Device:** Laptop or desktop, keyboard, and current browser; no identifying details.
- **Facilitator GitHub username:**
- **Observer GitHub username:**
- **Staging reset:** Yes / No

### Task results

Record shared outcome, help, and elapsed time once in a team-task record identified by the team-run key.
Reference that record in each participant note; copied shared values must not be counted as additional team attempts.
The SEQ and tool-switch count below belong to this participant; the observer rating belongs to the team task and observer.

| Task             | Completed | Unaided or assisted | Time | Tool switches | SEQ (1–7) | Observer rating (1–7) |
| ---------------- | --------- | ------------------- | ---- | ------------- | --------- | --------------------- |
| Main task        |           |                     |      |               |           |                       |
| Secondary task 1 |           |                     |      |               |           |                       |
| Secondary task 2 |           |                     |      |               |           |                       |

### Tool-switch observation coverage

For each task, record this participant's switch count and observed duration over the same start/stop interval as the task timing.
Flag any interval the observer could not follow; an unobserved switch count is missing, not zero.
These participant records supply the team totals and rates in the analysis plan.

| Task | Participant switches | Observed minutes | Coverage complete? | Gap or missing-data reason |
| ---- | -------------------- | ---------------- | ------------------ | -------------------------- |
| Main task | | | | |
| Secondary task 1 | | | | |
| Secondary task 2 | | | | |

### SUS

- **SUS answers:** Store only in the approved location.
- **SUS score:**

### Open-ended post-test

Ask these questions in the same order as in [surveys.md](../surveys.md):

1. What is your overall impression of using Workspace for AI Collaboration across the tasks you just tried?
2. What did you find most useful about Workspace for AI Collaboration?
3. What was the biggest obstacle or frustration for you?
4. What, if anything, would you change about the experience, and why?
5. What else about your experience would you like to share that we have not asked about?

Keep raw answers in the approved private location.
Publish only sanitized notes, according to the participant's consent.

### Debrief and stop record

- **Debrief completed:** Yes / No
- **Session stopped early:** Yes / No
- **Reason, if stopped early:**
- **Sanitized notes:**

## Observation Sheet

| Task             | Start/end or duration | What the participant did | Difficulty or friction | Help given | Relevant quote |
| ---------------- | --------------------- | ------------------------ | ---------------------- | ---------- | -------------- |
| Main task        |                       |                          |                        |            |                |
| Secondary task 1 |                       |                          |                        |            |                |
| Secondary task 2 |                       |                          |                        |            |                |

Record what happened without adding the observer's guesses about what the participant intended.
Do not include identifying details or quotes unless publication is allowed by the participant's consent.
