# UT-01: Brainstorm with an LLM on a shared board

- **Status:** Planned
- **Design sprint:** [SPRINT-07](../../project-plan.md#sprint-07)
- **Run sprint:** [SPRINT-08](../../project-plan.md#sprint-08)

## Goal

Find out whether a representative software-team member can brainstorm with an LLM on a shared board and reuse an earlier answer without help.

## Research questions

1. Can a representative participant complete the main task without help, and where do they need assistance?
2. Which parts of the tasks cause the most difficulty or delay?
3. How does the participant describe the shared-board workflow compared with their usual way of brainstorming with a team and an LLM?

## Requirement

The usability requirement is `QR-06`, being specified in [task #313](https://github.com/WellMadeTeam/workspace-ai-03/issues/313); link its requirement file here when that task is merged.

## Participant Profile

- **Role and task:** An adult who studies or works in software development or software architecture and has taken part in a team brainstorming task about a software problem.
- **Familiarity:** Has used a conversational LLM for a work or study task at least once in the past six months. The pre-test records how often the participant uses conversational LLMs and similar collaborative whiteboards; prior use of this product is not required.
- **Device:** A laptop or desktop computer with a keyboard and a current browser, used in person on the university network. A phone-only session does not match the profile.
- **Relation to the target user:** Directly represents a member of a software team who brainstorms with LLMs, as described by [VP-01](../../research/value-proposition.md#vp-01). A classmate outside the product team may qualify if they meet the same criteria.

### Recruitment target

Recruit five people as the design target and obtain at least three completed, counted sessions. Every counted participant must be 18 or older, match the profile, and be outside the product team; the customer, instructors, and course staff are excluded.

Invite eligible classmates outside the team and people in the team's software-development or software-architecture networks to volunteer. Screen volunteers against the profile with the pre-test before scheduling; do not publish names or contact details. A session that fails to meet the profile is exploratory and is not counted.

## The Tasks

Task design and success criteria are being prepared in [task #311](https://github.com/WellMadeTeam/workspace-ai-03/issues/311).

## Protocol

The fixed session protocol and observation sheet are being prepared in [task #311](https://github.com/WellMadeTeam/workspace-ai-03/issues/311). The Week 7 teammate dry run is not a counted session or evidence.

## Measures

The session measures are being specified in [task #311](https://github.com/WellMadeTeam/workspace-ai-03/issues/311).

## Instrumentation

Instrumentation design and implementation are being handled in [task #311](https://github.com/WellMadeTeam/workspace-ai-03/issues/311).
Before the first counted session, a team member must run and record a staging verification that confirms the participant/session link identifies the run, every analytics-pipeline test event carries `source=usability-test`, and no production data is written.
The verification is a prerequisite for counting sessions and has not yet been completed.

## Analysis Plan

The analysis plan is being prepared in [task #315](https://github.com/WellMadeTeam/workspace-ai-03/issues/315). No results or findings are claimed during the design week.

## Schedule

The team will invite and screen volunteers after the design review and once the consent and data-handling prerequisites in [task #312](https://github.com/WellMadeTeam/workspace-ai-03/issues/312) are ready. Counted sessions are planned in person on the university network during SPRINT-08, 16–21 November 2026; exact appointments will be agreed with eligible volunteers. Results are due with Submission 8 on 21 November 2026.

Assign `P-01`, `P-02`, and subsequent codes in the order sessions are scheduled. Never reuse a code. If a participant withdraws or a session cannot count, retire that code and assign a replacement the next free code; the identity mapping stays private.

The SPRINT-07 teammate dry run is excluded from the recruitment count and results. Sessions cannot count until consent and recording are ready and the instrumentation verification above has passed.

## Roles

Facilitator, observer, and recordings/raw-notes custodian are to be named by GitHub username in the design review.

## Environment

Run every counted session against the staging deployment from a machine on the university network, using `$STAGING_URL`; never send session traffic to production.
Start each session on a fresh staging board with the same empty synthetic seed, reset before the next session.
Use no real participant data and make no real payment.

### Session-readiness check

Before each counted session, confirm all applicable checks:

- [ ] The staging deployment is reachable from a machine on the university network.
- [ ] The board has been reset to the same synthetic seed used for every session.
- [ ] The participant/session link works and identifies the session's run.
- [ ] Before the first counted session, a team-run verification confirms that every analytics-pipeline test event uses `source=usability-test` and that no production data is written.
- [ ] The required recording and durable consent are ready.
- [ ] The recording tool and capture method have been explained before the participant signs the durable consent.

Do not count a session until the recording and consent are ready and all applicable checks have passed.
These checks are still planned; this record does not claim that staging or instrumentation has been verified.

## Consent And Data

Before every counted session, collect durable consent using the public [consent template](consent.md), prepared as part of [task #312](https://github.com/WellMadeTeam/workspace-ai-03/issues/312).
Consent to recording and sanitized public results is required; consent to an anonymized quote is separate and optional.

Do not count a session without the required consent or recording, or one that is technically broken or withdrawn.
A participant who cannot complete a task still counts, because that outcome is evidence.
If a participant withdraws, remove their raw data and recording and retire their code.

Keep consent records, the identity mapping, raw notes, working analysis, and the test's filtered telemetry export in the private usability-data repository.
Keep recordings in the team-owned cloud folder shared with instructors.
The private repository, its history, recordings, and copies held by tools are deleted after the course is graded; the sanitized public record remains.
Publish only sanitized session notes and aggregate results; keep identities, access instructions, and private folder links out of this repository.

## Evidence Map

- The public repository contains this sanitized test design and, after the sessions, sanitized session notes and results.
- The private usability-data repository holds consent records, identity mapping, raw notes, working analysis, and the filtered telemetry export.
- The team-owned cloud folder holds session recordings and is shared with instructors; its link and access instructions stay in the private repository and Moodle submission.
- The public consent template is [`consent.md`](consent.md); completed consent records remain private.
- The Week 7 report links the public profile and session plan and claims no usability result.

## Results

Results and findings are due in SPRINT-08 and are not recorded during the design week.
