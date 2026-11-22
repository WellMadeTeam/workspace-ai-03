# AI usage — Week 08

## Tools

- Codex (OpenAI).

## What we used them for

- Prepare and update the Week 08 report for #418 from public repository and GitHub evidence, then prepare its commit and pull request.
  Use sanitized public study records and the public configuration plan/evaluation; no private notes or raw recordings were supplied for this report work.

- Create the AI usage draft for #394, check the course requirements, and open draft PR #396.
- Plan SPRINT-08 for #382 without feature stories, refine the backlog, update GitHub scheduling and UT-01, and prepare [PR #395](https://github.com/WellMadeTeam/workspace-ai-03/pull/395).
- Prepare UT-01 consent and session-note templates, structure and translate sanitized notes, draft three participant records and one shared team-run record, and document telemetry fields for #383.
- Draft the qualitative record for #384, group observations and requests into eight findings for #385, and prepare the shortfall and threshold assessment for #387.
  Update PRs #398, #400, #402, and #407 after member clarifications and review; resolve conflicts with merged findings and triage.
  For #387, prepare an implementation plan, check the assignment rules and dependency PRs, and publish [PR #407](https://github.com/WellMadeTeam/workspace-ai-03/pull/407) on a separate branch.
  At the member’s request, exclude the report draft, AI-usage draft, and implementation plan from that commit.
- Triage the eight findings from #402 for #386, create and schedule the Major diagram-discovery task #405 in SPRINT-08, and prepare [PR #406](https://github.com/WellMadeTeam/workspace-ai-03/pull/406).
  Record individual reasons for deferring the seven Minor findings, update the release handoff, check merge readiness, and reconcile the branch with the merged eligibility corrections.
- Read the repository and public-safe GitHub settings, prepare the 26-item configuration inventory for #388, and publish [PR #399](https://github.com/WellMadeTeam/workspace-ai-03/pull/399).
- Draft the goal-based configuration evaluation for #389 and publish [PR #403](https://github.com/WellMadeTeam/workspace-ai-03/pull/403).
  Ask the member about unjudged items one at a time, incorporate baseline confirmations, and retain unresolved points.
- Draft the 13 configuration and agent terms and four risks with their fallbacks for #390, and publish [PR #397](https://github.com/WellMadeTeam/workspace-ai-03/pull/397).
  Merge current main, address review feedback, and record the consistency check against the merged inventory and evaluation from #399 and #403.

- Draft the Week 8 meeting script and report for #391 from the member’s brief account, carry forward the Week 7 action points and open questions, and publish [PR #408](https://github.com/WellMadeTeam/workspace-ai-03/pull/408).
  Revise consent, transcript availability, and action ownership and timing after member clarifications; commit and push the requested changes and mark the PR ready for review.

- Explain #392's PART-11 artifact and release sequence, verify the course's versioning rules, and prepare [PR #410](https://github.com/WellMadeTeam/workspace-ai-03/pull/410) after the member confirmed eligibility for all three participants.
  Reconcile the session notes, UT-01 record/index, results, testing plan, and threshold outcome with the approved triage.
- Interpret the member-run QR-01 QRT-01 output and prepare [PR #412](https://github.com/WellMadeTeam/workspace-ai-03/pull/412) with the dated evidence and release preparation.
  Create dedicated documentation tasks, prepare stacked PRs, resolve overlaps with merged records, and retarget the PR after its base merged.
- Prepare the v0.5.1 changelog and upgrade note for member review, publish the protected tag and [GitHub Release](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.5.1) after approval, and open [PR #415](https://github.com/WellMadeTeam/workspace-ai-03/pull/415) for the changelog and [PR #416](https://github.com/WellMadeTeam/workspace-ai-03/pull/416) for REL-08.
  Retarget #416 to main after #415 merged, preserving the required post-tag record order.
- Prepare the retrospective and sprint closure in [PR #417](https://github.com/WellMadeTeam/workspace-ai-03/pull/417), record actual velocity of 0, and carry unfinished tasks into SPRINT-09.

## What we did with the output

- Kept the Week 07 sections, added the required disclosure sections, and checked Markdown formatting.
- Checked the sprint plan against Assignment 8 and user clarifications; comparing the rules with the backlog identified duplicate tasks.
  The issue-field audit, Markdown lint, local links, and MkDocs build passed; external links failed on network connections and MkDocs retained existing warnings.
  Corrected an incompatible GitHub option identifier and verified the update; member review remains required.
- Checked usability drafts against the course rules, sanitized notes and questionnaires, and member confirmations of assistance, eligibility, consent timing, capture, and withdrawals.
  This helped organize the evidence and expose missing measures: SEQ and task times were left unavailable rather than reconstructed.
- On 2026-11-21, record an intermediate shortfall in #407 when only P-01 had fully confirmed eligibility: P-02 and P-03 were then exploratory, and UT-01 stayed Planned with a qualitative shortfall record.
  At that point QR-06 was Not verified and TOS-03 was Missed against its existing measure; the later PART-11 confirmations below supersede the eligibility and board-state gaps.
  For #387, distinguish the missing TOS-03 board-state and messenger-answer evidence from the observed assisted brainstorming; retain Checked and Evidence as None on the Not verified row.
  Markdown lint, MkDocs, diff checks, and 156 local links and anchors passed before the initial push; MkDocs retained warnings, and lychee was unavailable locally.
  Remove links to the excluded report draft so the committed documentation does not depend on an uncommitted file.
- Review identified unsupported attribution of direction-independent context and independent connection-line movement to participants.
  Moved those ideas to design options requiring validation and retained only documented observations as evidence.
- Rechecked Markdown, local links and anchors, finding fields, and the documentation build after review fixes and conflict resolution.
  These checks passed; existing MkDocs warnings remain, and external link checking was left to CI where lychee was unavailable locally.
- Checked the triage against the course rules, #386 acceptance criteria, #402 findings, and the existing story criteria and functional requirements.
  Verified all eight stable finding anchors and dispositions and #405’s Task type, High priority, SPRINT-08 milestone, ownership fields, and matching assignees.
  The member accepted the triage; only the Major finding became a new task, while the Minor requests remain recorded for review without scheduled implementation.
- Markdown lint, local links, diff checks, and MkDocs build passed for #406, with existing build warnings.
  Local networked lychee failed on connection errors; the initial PR subsequently passed all five CI checks, including links.
  After #402 merged, retargeting exposed conflicts with its eligibility corrections; preserved the then-current one-counted-session shortfall and Planned status, reapplied the triage, and reran local checks.
  The updated PR was left ready for review, awaiting fresh CI and independent approval rather than treated as merged.
- Compared the inventory and evaluation with Assignment 8, the course rules, repository files, and settings; checked the required fields, heading order, local links, and coverage of all 26 items across seven local goals.
  Markdown lint and offline link checks passed; the inventory documentation build passed with existing warnings, and curl returned HTTP 200 for its 49 external URLs and the evaluation's nine external URLs.
  Networked lychee encountered connection failures, so its result was not reported as a passing external-link check.
- Distinguished member confirmations from agent-run tests and confirmed that the answers concerned the frozen baseline.
  Corrected the initial retention answer after the member clarified that the 30-day setting was verified but actual deletion was not; credential-rotation procedures, telemetry operating cost, local skill installations, and branch-rule bypass permissions also remain unverified.
- Checked the glossary and risks against #390, the course rules, and the merged configuration artifacts; linked the relevant CFG items and evaluation evidence, including unverified credential-replacement responsibilities and differing CI/container runtimes.
  Markdown lint, local links, diff checks, and MkDocs build passed with existing build warnings; the 12 initial external URLs and the newly linked evaluation returned HTTP 200 via curl, while full local lychee encountered connection failures.
  The first draft sorted risks by rating; restored identifier order at the member’s request.
  This consistency check made the evidence traceable without treating evaluation proposals or confirmed builds as proof that a risk had occurred.
- Checked #391 against the course meeting requirements, the issue, the glossary, and the Week 7 report.
  Kept Markdown acceptance open after the customer-reported rendering bug; incorporated the member’s confirmation of recording and transcript consent, pending receipt, all-member ownership of the SPRINT-08 usability test, and danmaninc’s Markdown fix during SPRINT-09.
  Removed the script’s reconstruction notice at the member’s request; suggested timeboxes remain distinguished from measured duration, and the report still identifies the script as reconstructed.
  Markdown lint, local link checks, and diff checks passed; repository-wide external link checking encountered connection failures.
  The PR records remaining evidence and acceptance gaps rather than claiming all #391 criteria are satisfied.

- On 2026-11-22, supersede that intermediate shortfall through #410 using the member's eligibility confirmation: three counted participants in one team run, UT-01 Completed, and QR-06 QRT-01 Fails because the single main-task attempt was Assisted.
  Publish SUS mean 67.5 and median 72.5 with n=3.
  Keep missing timings, SEQ, tool-switch measurements, instrumentation departures, and the pending full Sprint Review explicit.
  The member confirmed a retained context-reuse board state but no collected messenger-use answer, so TOS-03 remains Missed on its stated evidence measure.
- Preserve the supplied latency output: 12 query-message reads over two seconds, maximum 2,129 ms, zero missed/failed reads, and zero socket failures.
  The member confirmed tested SHA `0fa12cffbe3018876a5e39821625ba00aed98083` and university-VM staging from the university network before the PR was marked ready.
  Codex did not execute that deployed test; the evidence attributes the run to the member and omits the generated board identifier from the public record.
- Check the final release candidate against the tested application and scripts, the merged PRs since v0.5.0, the course rules, SemVer, and the active tag rules.
  This exposed routine dependency changes, so the release was described as maintenance rather than strictly documentation-only; the rules leave the version number to the team and do not require v0.6.0.
  The member approved the exact changelog and release-note wording before Codex tagged `fdab519c243828aeacaad0d29fbbed593b71c853` as v0.5.1 and published the GitHub Release.
- Markdown lint, local links/anchors, whitespace checks, and documentation builds passed for the PART-11 documentation; existing MkDocs warnings remained.
  Local full-network Lychee runs failed on widespread external connection errors, so they were not reported as green; the release commit's seven GitHub checks, including links, product checks, and documentation deployment, were verified green before tagging.
  GitHub GraphQL retargeting failed once; the REST API succeeded, and Codex verified each resulting base and file scope.
  API field updates initially rejected numeric option identifiers; using option names succeeded and the task metadata was verified.
- For #417, check carried-action outcomes and carry-over reasons against public evidence, verify issue assignments and milestone closure, and retain the unfinished results review and diagram fix.
  Markdown lint, offline links, MkDocs, and whitespace checks passed; external link checks encountered connection failures.

## What was not used

- No generated weekly findings or Week 9 handoff were added.
- Configuration recommendations were left as proposals; no proposed runtime, workflow, branch-rule, or instruction change was enacted.
  No new build, deployment, restore, or telemetry test was performed by the agent, and no private configuration value was included in the inventory or evaluation.
- The triage did not implement or verify a product fix, change the formal usability verdict, or create a task for every request.
  Kept #405’s REL-08 inclusion conditional on completion and verification, with unfinished work to move to SPRINT-09 at sprint close and its actual reason recorded in the report.
- Removed operating-system details the member could not confirm and unnecessary changes to an existing pre-session verification record.
- Did not invent missing questionnaire answers, task durations, independent team attempts, participant attribution, or product commitments; retained the merged triage decisions when resolving conflicts.
- For #391, no meeting recording or transcript was supplied, and no transcript, quotation, usability result, missing action outcome, or decision identifier was generated.
  The script’s suggested questions and timeboxes are generated structure rather than recovered meeting evidence; missing metadata and unconfirmed follow-ups remain explicit.

- For PART-11, no additional participant session, deployed performance test, product fix, or workaround was generated or claimed by the agent.
  The initial shortfall interpretation was replaced only after member confirmation; assisted outcomes were not rewritten into unaided success and three participants were not counted as three independent team attempts.
  The full results Sprint Review, final weekly report, unfinished task disposition, and sprint milestone closure were not fabricated or represented as completed by release publication.

## Usability material supplied to agents

- Sprint planning used public design material and the user's participant-count clarification.
- The usability work supplied sanitized notes (`ut-01-notes.md`), sanitized SUS and post-test responses (`ut-01-posttest.csv`), filtered event and observability exports, and member clarifications.
  The agent used these to prepare session records, qualitative analysis, findings, and telemetry documentation; participant-level source records and exports remain private.
- The #387 preparation used public sanitized session records, public issue and PR text, and the member’s threshold confirmation; no raw participant material or private telemetry was supplied for that task.
- PART-11 used public sanitized records, issue/PR text, member confirmations, and aggregate script output from the member-run latency check; no raw participant notes, consent records, identity mapping, or private telemetry were supplied for that release work.
- No recordings or participant identity mapping were supplied for this work.

## Public, sanitized configuration plan or evaluation supplied to agents

- The configuration work used the public repository, the configuration inventory and evaluation drafts, public-safe merge and branch-rule settings, and member confirmations.
  Codex prepared both documents and read them when checking their consistency and assignment structure.
- No secret value, private deployment or dashboard address, credential, raw usability record, or recording was supplied for the configuration work.
