# Risks

| ID                  | Status | Impact | Likelihood | Risk                                                                                                                                                                                                                                                          |
| ------------------- | ------ | ------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [RISK-01](#risk-01) | Open   | High   | High       | The board saves each widget by overwriting it through REST and pushes no changes to other clients, so 10 clients editing one board may lose updates or see them late, which would fail the TOS-02 test at the Week 7 deadline.                                |
| [RISK-02](#risk-02) | Open   | High   | Medium     | The outside session needs at least 3 people who owe the project nothing to agree on a date and spend a full session on the board, so no session may happen by Week 8, which would leave TOS-03 without its measure and the project goal without its evidence. |
| [RISK-03](#risk-03) | Open   | High   | Medium     | The product sends every query through one Groq free-tier key, so a team querying with large selected contexts at once may hit its rate limits, which would show errors instead of responses in the customer demo or the outside session.                      |
| [RISK-04](#risk-04) | Open   | High   | Low        | The customer brings the product up on his own computer, so a setup step that works only on ours may fail there, which would delay the customer's acceptance of the core flow past the Week 5 deadline of TOS-01.                                              |

## RISK-01

The board saves each widget by overwriting it through REST and pushes no changes to other clients, so 10 clients editing one board may lose updates or see them late, which would fail the TOS-02 test at the Week 7 deadline.

- **Status:** Open
- **Impact:** High
  - [TOS-02](threshold-of-success.md#tos-02) requires 0 lost updates and every change visible within 2 s, so either failure leaves that part of the threshold unmet.
- **Likelihood:** High
  - Today a widget update replaces the whole widget and other clients see it only after they load the board again, and the team has not built real-time sync before.
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
- **Contingency:** run a shorter remote session with the reserve team in [SPRINT-08](project-plan.md#sprint-08), so the session still happens before the Week 8 deadline.

## RISK-03

The product sends every query through one Groq free-tier key, so a team querying with large selected contexts at once may hit its rate limits, which would show errors instead of responses in the customer demo or the outside session.

- **Status:** Open
- **Impact:** High
  - A demo or session where queries fail would stop the core flow of [TOS-01](threshold-of-success.md#tos-01) in front of the customer and spoil the session of [TOS-03](threshold-of-success.md#tos-03).
- **Likelihood:** Medium
  - The free tier limits requests and tokens per minute for the whole key, and a query whose context is several selected responses sends many tokens at once.
- **Trigger:** a query on the deployed product returns a rate-limit error from Groq, in a rehearsal or in the backend logs.
- **Window:** from [SPRINT-04](project-plan.md#sprint-04), when context queries arrive, up to [MLS-08](project-plan.md#mls-08) on 2026-11-20.
- **Mitigation:** rehearse the demo and the session with several members querying at once with selected contexts, and show a rate-limit error to every member as a failed query instead of a silent failure.
- **Contingency:** run the demo and the session on a paid Groq key, or on another provider's key, set through `backend/.env` without code changes.

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
