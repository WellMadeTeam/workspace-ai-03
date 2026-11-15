# Risks

| ID                  | Status | Impact | Likelihood | Risk                                                                                                                                                                                                                                                                                                               |
|---------------------|--------|--------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [RISK-01](#risk-01) | Open   | High   | High       | Every client polls the board once a second and saves its edits through REST, where the last write to a field wins, so 10 clients editing one board may lose concurrent edits or see changes late, which would fail the TOS-02 test at the Week 7 deadline.                                                         |
| [RISK-02](#risk-02) | Open   | High   | Medium     | The outside session needs at least 3 people who owe the project nothing to agree on a date and spend a full session on the board, so no session may happen by Week 8, which would leave TOS-03 without its measure and the project goal without its evidence.                                                      |
| [RISK-03](#risk-03) | Open   | High   | Medium     | The product sends every query through one Groq free-tier key, so a team querying with large selected contexts at once may hit its rate limits, which would show errors instead of responses in the customer demo or the outside session.                                                                           |
| [RISK-04](#risk-04) | Open   | High   | Low        | The customer brings the product up on his own computer, so a setup step that works only on ours may fail there, which would delay the customer's acceptance of the core flow past the Week 5 deadline of TOS-01.                                                                                                   |
| [RISK-05](#risk-05) | Open   | High   | Medium     | The usability test needs at least 3 counted participants who are adults outside the team and match the profile, so too few eligible volunteers may agree to a slot in SPRINT-08, which would leave UT-01 below its minimum of three completed sessions and without evidence for the project goal.                  |
| [RISK-06](#risk-06) | Open   | Medium | Low        | A session counts only when the participant has signed the consent to its capture and to sanitized public results, so a participant who declines or later withdraws may cost that session and its data, which would reduce the counted sessions below three with little time left for a replacement.                |
| [RISK-07](#risk-07) | Open   | High   | Low        | The consent records, identity mapping, raw notes, and recordings are kept in a private repository and a cloud folder that only granted accounts can open, so an instructor or a member without access may be unable to check them, which would leave the published results without evidence the course can verify. |
| [RISK-08](#risk-08) | Open   | High   | Medium     | The counted sessions need one facilitator, in-person slots on the university network, and prerequisites that are still open, so the sessions may not all finish within the six days of SPRINT-08, which would leave the study unfinished at the 2026-11-21 deadline for its results.                               |

## RISK-01

Every client polls the board once a second and saves its edits through REST, where the last write to a field wins, so 10 clients editing one board may lose concurrent edits or see changes late, which would fail the TOS-02 test at the Week 7 deadline.

- **Status:** Open
- **Impact:** High
  - [TOS-02](threshold-of-success.md#tos-02) requires 0 lost updates and every change visible within 2 s, so either failure leaves that part of the threshold unmet.
- **Likelihood:** High
  - Two members editing the same widget at once already overwrite each other's change, 10 clients polling every second for 30 minutes have never been load-tested, and the team has not built real-time sync before.
- **Trigger:** by the end of [SPRINT-06](project-plan.md#sprint-06), a run of 10 clients on one board shows a lost update or a change that takes longer than 2 s to reach the others.
- **Window:** [SPRINT-06](project-plan.md#sprint-06) and [SPRINT-07](project-plan.md#sprint-07), up to [MLS-07](project-plan.md#mls-07) on 2026-11-13.
- **Mitigation:** write the 10-client test script at the start of [SPRINT-06](project-plan.md#sprint-06), before the sync itself, and run it on every sync change, so a failure shows up while there is still a sprint left to fix it.
- **Contingency:** move the accounts and export of [MLS-07](project-plan.md#mls-07) out of scope and spend [SPRINT-07](project-plan.md#sprint-07) on the sync until the test passes.

## RISK-02

The outside session needs at least 3 people who owe the project nothing to agree on a date and spend a full session on the board, so no session may happen by Week 8, which would leave TOS-03 without its measure and the project goal without its evidence.

- **Status:** Open
- **Impact:** High
  - [TOS-03](threshold-of-success.md#tos-03) and the goal of [`DEC-008`](decisions.md#dec-008) both rest on an outside team using the board, and the team cannot produce that evidence by itself.
- **Likelihood:** Medium
  - Any team of developers or architects qualifies, per [`DEC-009`](decisions.md#dec-009), so there are many candidates, but nobody has been asked yet, and a volunteer team can cancel at short notice.
- **Trigger:** by the end of [SPRINT-06](project-plan.md#sprint-06), no outside team of at least 3 people has agreed to a session date.
- **Window:** [SPRINT-06](project-plan.md#sprint-06) to [SPRINT-08](project-plan.md#sprint-08), up to [MLS-08](project-plan.md#mls-08) on 2026-11-20.
- **Mitigation:** in Week 5, ask several candidate teams, such as fellow students, developers the members know from work or other projects, and the customer's contacts; fix the session date with one of them by Week 6, keep a second team as a reserve, and run the trial session of [SPRINT-06](project-plan.md#sprint-06) early if a team is free.
- **Contingency:** run a shorter remote session in [SPRINT-08](project-plan.md#sprint-08) with at least 3 developers the members invite one by one for a single fixed slot, so the session still happens before the Week 8 deadline without an agreed team.

## RISK-03

The product sends every query through one Groq free-tier key, so a team querying with large selected contexts at once may hit its rate limits, which would show errors instead of responses in the customer demo or the outside session.

- **Status:** Open
- **Impact:** High
  - A demo or session where queries fail would stop the core flow of [TOS-01](threshold-of-success.md#tos-01) in front of the customer and spoil the session of [TOS-03](threshold-of-success.md#tos-03).
- **Likelihood:** Medium
  - The free tier limits requests and tokens per minute for the whole key, and a query whose context is several selected responses sends many tokens at once.
- **Trigger:** a query on the deployed product returns a rate-limit error from Groq, in a rehearsal or in the backend logs.
- **Window:** from [SPRINT-04](project-plan.md#sprint-04), when context queries arrive, up to [MLS-08](project-plan.md#mls-08) on 2026-11-20.
- **Mitigation:** rehearse the demo and the session with several members querying at once with selected contexts, show a rate-limit error to every member as a failed query instead of a silent failure, and by the end of [SPRINT-05](project-plan.md#sprint-05), before the customer sees the deployed product, choose a backup provider with an OpenAI-compatible API and record the choice in this contingency.
- **Contingency:** move the backend to the chosen backup provider: replace the Groq client in `app/backend/ai_service.py` with an OpenAI-compatible client pointed at that provider's endpoint, and set its key in `app/backend/.env` and its placeholder in `app/backend/.env.example`.

## RISK-04

The customer brings the product up on his own computer, so a setup step that works only on ours may fail there, which would delay the customer's acceptance of the core flow past the Week 5 deadline of TOS-01.

- **Status:** Open
- **Impact:** High
  - The customer checks the work on his own computer, per [CON-02](product-vision.md#con-02), so a failed setup leaves [TOS-01](threshold-of-success.md#tos-01) without the acceptance `DEC-nnn` it needs by Week 5.
- **Likelihood:** Low
  - The product runs with one `docker compose` command, but the self-hosting instructions have not yet been tried on a computer outside the team.
- **Trigger:** a member who did not write the setup cannot bring the product up from a clean checkout by following the instructions alone.
- **Window:** [SPRINT-04](project-plan.md#sprint-04) and [SPRINT-05](project-plan.md#sprint-05), up to the Week 5 meeting.
- **Mitigation:** in [SPRINT-05](project-plan.md#sprint-05), have a member who did not write the setup follow the self-hosting instructions on a clean machine and fix every step they had to guess.
- **Contingency:** show the core flow on the team's deployed product at the Week 5 meeting, so the customer can accept it there, and fix the self-hosting setup in the next sprint.

## RISK-05

The usability test needs at least 3 counted participants who are adults outside the team and match the profile, so too few eligible volunteers may agree to a slot in SPRINT-08, which would leave UT-01 below its minimum of three completed sessions and without evidence for the project goal.

- **Status:** Open
- **Impact:** High
  - [`UT-01`](usability-tests/ut-01/README.md#recruitment-target) needs at least three completed, counted sessions and the study of [`DEC-046`](decisions.md#dec-046) needs participants for both the board group and the control group, while a teammate, the customer, an instructor, or course staff cannot count, so a shortfall leaves [MLS-08](project-plan.md#mls-08) without results to publish.
- **Likelihood:** Medium
  - The design target is five people from classmates outside the team and the members' software-development networks, but [the session appointments](usability-tests/ut-01/README.md#schedule) are still to be agreed, each volunteer must pass the pre-test screening before being scheduled, and a session that does not match the profile is exploratory and does not count.
- **Trigger:** at the weekly review on 2026-11-17, fewer than three eligible volunteers have an agreed session slot before 2026-11-21.
- **Window:** [SPRINT-07](project-plan.md#sprint-07) and [SPRINT-08](project-plan.md#sprint-08), up to [MLS-08](project-plan.md#mls-08) on 2026-11-21.
- **Mitigation:** invite at least five eligible volunteers before the first session, screen each one with the [pre-test](usability-tests/ut-01/surveys.md#pre-test) before scheduling, assign `P-nn` codes in the order sessions are scheduled, and when a scheduled participant drops out or fails the screening, recruit a replacement under the next free code and never reuse the old one.
- **Contingency:** ask each member to invite one more eligible person for a fixed slot between 2026-11-18 and 2026-11-20, screen them with the same pre-test, and run those sessions in person on the university network before 2026-11-21.

## RISK-06

A session counts only when the participant has signed the consent to its capture and to sanitized public results, so a participant who declines or later withdraws may cost that session and its data, which would reduce the counted sessions below three with little time left for a replacement.

- **Status:** Open
- **Impact:** Medium
  - A session without the required consent, or one that is withdrawn, does not count and its raw notes and captured data are removed, per [the `UT-01` consent and data rules](usability-tests/ut-01/README.md#consent-and-data), so one lost session is covered by the five-person target but two would leave fewer than three.
- **Likelihood:** Low
  - The facilitator explains the capture method and the data handling before the participant signs the [consent](usability-tests/ut-01/consent.md), volunteers are screened before they are scheduled, and only a refusal of a required item or a withdrawal costs a session.
- **Trigger:** a participant declines a required consent item, a session is about to start without a recorded signed consent, or a participant asks to withdraw.
- **Window:** [SPRINT-08](project-plan.md#sprint-08), from the first counted session up to [MLS-08](project-plan.md#mls-08) on 2026-11-21.
- **Mitigation:** tick the consent item of the [session-readiness check](usability-tests/ut-01/README.md#session-readiness-check) before capture starts, explain what is captured and who can access it before the participant signs, and keep every completed form only in the private usability-data repository.
- **Contingency:** remove the withdrawn participant's raw notes and captured data, retire their code, and run a replacement session under the next free code with a new participant who signs the consent before capture starts.

## RISK-07

The consent records, identity mapping, raw notes, and recordings are kept in a private repository and a cloud folder that only granted accounts can open, so an instructor or a member without access may be unable to check them, which would leave the published results without evidence the course can verify.

- **Status:** Open
- **Impact:** High
  - The public record holds only sanitized notes and aggregate results, per [the `UT-01` evidence map](usability-tests/ut-01/README.md#evidence-map), so evidence that cannot be opened leaves the results of [MLS-08](project-plan.md#mls-08) unverifiable.
- **Likelihood:** Low
  - Access needs a GitHub sign-in and a granted team or instructor role, per [the Week 7 report](../reports/week-07/README.md), so one missing grant or an instructor without a GitHub account is enough to block it, although the private repository's README already documents a fallback.
- **Trigger:** an instructor or a member reports that they cannot open the private usability-data repository or the recordings folder.
- **Window:** [SPRINT-07](project-plan.md#sprint-07) and [SPRINT-08](project-plan.md#sprint-08), up to [MLS-08](project-plan.md#mls-08) on 2026-11-21.
- **Mitigation:** before the first counted session, have every member and ask every instructor to open the private repository and the recordings folder once, and fix any missing grant while no session is running.
- **Contingency:** give the instructors the private text data as a Moodle-only text archive, as the private repository's README describes, and declare the deviation in the weekly report, while the recordings stay in the cloud folder linked from the Moodle submission.

## RISK-08

The counted sessions need one facilitator, in-person slots on the university network, and prerequisites that are still open, so the sessions may not all finish within the six days of SPRINT-08, which would leave the study unfinished at the 2026-11-21 deadline for its results.

- **Status:** Open
- **Impact:** High
  - [MLS-08](project-plan.md#mls-08) and [TOS-03](threshold-of-success.md#tos-03) both rest on results due with Submission 8 on 2026-11-21, so an unfinished study leaves the results, the findings, and the usability verdict unwritten.
- **Likelihood:** Medium
  - The sessions fit in [one sprint of six days](usability-tests/ut-01/README.md#schedule), the same facilitator runs every counted session, and the instrumentation verification and the teammate dry run are prerequisites that are not yet complete.
- **Trigger:** at the weekly review on 2026-11-17, the instrumentation verification has not passed or no counted session has a fixed slot.
- **Window:** [SPRINT-08](project-plan.md#sprint-08), from 2026-11-16 up to [MLS-08](project-plan.md#mls-08) on 2026-11-21.
- **Mitigation:** hold the facilitator's time for the whole session window, fix every counted session's slot at the start of [SPRINT-08](project-plan.md#sprint-08), and run the teammate dry run and the instrumentation verification first, so no session waits for a prerequisite.
- **Contingency:** postpone the unfinished study to [SPRINT-09](project-plan.md#sprint-09): move its row in the [testing plan](project-plan.md#quality-requirement-testing-plan) to SPRINT-09 with the reason, declare the open window in the Week 8 report, and claim no result or verdict until the sessions are complete.
