# AI usage — Week 07

This draft records the AI use disclosed so far; the team must add any other AI use for the week before submission.

## Tools

- Codex (OpenAI), including work through Orca and a separate Codex reviewer coordinated through Orca orchestration for #354.
  The agent used `gh` and GitHub APIs for repository and issue work.

## What we used them for

- **UT-01 optional mirrored session impact analysis (#315, PR #362) — purpose:** Read the review comment at <https://github.com/WellMadeTeam/workspace-ai-03/pull/362#discussion_r4579436048> and identify documents affected by an optional additional control-condition session for the shared-board team, using another brainstorming topic on another suitable day.
- **UT-01 optional mirrored session impact analysis (#315, PR #362) — output:** Identified required updates to the UT-01 design, session instructions and template, consent template, surveys, and results template.
  The recommendations cover voluntary participation, separate scheduling and consent, linked repeat-run records, condition-specific questionnaires, and separation of supplementary evidence from primary comparisons and QR-06 evidence.
- **Block and connection copying (#354, PR #359) — purpose:** Inspect the issue and existing code, prepare the implementation plan, implement block copying and pasting, write regression tests and documentation, and prepare the commits and [PR #359](https://github.com/WellMadeTeam/workspace-ai-03/pull/359) for [#354](https://github.com/WellMadeTeam/workspace-ai-03/issues/354).
- **Block and connection copying (#354, PR #359) — output:** Generated the backend copy endpoint, frontend clipboard behavior, tests, FR-025, feature documentation, changelog entry, and PR description.
  The backend copies stored AI conversations and creates independent block, message, and connection identifiers.
- **SPRINT-07 issue housekeeping (#309–#322) — purpose:** Read the sprint issues through `gh`, their linked Assignment 7 sections, the course rules, and the related requirements to prepare task acceptance criteria.
- **SPRINT-07 issue housekeeping (#309–#322) — output:** Published 94 numbered, unchecked acceptance criteria in [#309](https://github.com/WellMadeTeam/workspace-ai-03/issues/309) through [#322](https://github.com/WellMadeTeam/workspace-ai-03/issues/322), replacing the fourteen tasks' `TBD` placeholders.
- **Backlog refinement, issue restructuring, and recovery (#309, PR #334) — purpose:** Read Assignment 7, the course requirements, glossary, customer decisions, and existing issues; refine the backlog, plan SPRINT-07 and SPRINT-08, prepare the planning PR, and perform the requested issue housekeeping.
- **Backlog refinement, issue restructuring, and recovery (#309, PR #334) — output:** Updated `docs/project-plan.md`, the sprint milestones, and issue fields for [#309](https://github.com/WellMadeTeam/workspace-ai-03/issues/309).
  Created [US-19 (#324)](https://github.com/WellMadeTeam/workspace-ai-03/issues/324) for Markdown in text blocks and AI conversation messages, plus implementation, dry-run, verification, session, results, triage, and release tasks.
  Set SPRINT-07's due date to November 15 and planned velocity to 21 points: Images 5, Analytics 5, Observability 8, and Markdown 3.
  Committed the plan change and opened [PR #334](https://github.com/WellMadeTeam/workspace-ai-03/pull/334) using the required template and `Closes #309`.
- **Backlog refinement, issue restructuring, and recovery (#309, PR #334) — recovery:** At the user's request, checked the ten created issues and found seven deleted issues, numbered `327`–`333`.
  Recreated them as [#338](https://github.com/WellMadeTeam/workspace-ai-03/issues/338) through [#344](https://github.com/WellMadeTeam/workspace-ai-03/issues/344) from saved descriptions, restoring sprint assignments, ownership, priorities, project membership, and dependencies within the replacements.
  Existing issues were left unchanged during that recovery.
- **Backlog refinement, issue restructuring, and recovery (#309, PR #334) — housekeeping:** Reused #316 for the glossary and created #346 for risks; reused #311 for the pre-test and created #347–#351 for SEQ, SUS, the post-test, organization, and usability tasks.
  Consolidated #318 into #317, closed #318 as not planned, narrowed #312 to private-repository setup, revised #315 and #319, and updated the direct dependency descriptions in #338 and #339.
  Created [#352](https://github.com/WellMadeTeam/workspace-ai-03/issues/352) for an exploratory brainstorming run, [#353](https://github.com/WellMadeTeam/workspace-ai-03/issues/353) for the Backspace caret defect, and [#354](https://github.com/WellMadeTeam/workspace-ai-03/issues/354) for copying selected board blocks.
  This conversation created those app tasks; it did not implement their product changes.
- Drafting and revising the UT-01 participant profile, recruitment and session plan, consent template, and the Week 7 report entry for #314.
- Planning and drafting the private usability-data repository's six README files, the public repository references, and the authenticated-link exclusion for #312.
- Reading the course rules, Assignment 7, the usability requirements, and the customer decision DEC-048 for the pre-test revision.
- Drafting changes to the public UT-01 protocol, surveys, session template, results template, and Week 7 deviation declaration to remove the pre-test.
- Replacing familiarity-based team allocation with a random draw and retaining minimum recruitment eligibility checks.
- Preparing the pre-test pull request and verifying GitHub authentication and the repository's Git author and committer identity before committing its AI disclosure separately.
- Drafting the empty UT-01 record, index, survey, consent, and results templates and tracked directories for [#310](https://github.com/WellMadeTeam/workspace-ai-03/issues/310).
- Assessing the user-written goal and hypotheses and proposing research-question wording about tool switching, context reuse, and task completion without assistance.
- Preparing [PR #345](https://github.com/WellMadeTeam/workspace-ai-03/pull/345), addressing its review, and verifying #310's acceptance criteria against the merged documentation before updating its checkboxes.
- Checking Markdown formatting, local links, and documentation builds for the relevant changes.
- Diagnosing the text-block caret jump in [#353](https://github.com/WellMadeTeam/workspace-ai-03/issues/353) and proposing three solutions before implementation.
- Implementing the approved synchronous editor-state approach, selection preservation, explanatory comments, regression tests, changelog entry, and [PR #358](https://github.com/WellMadeTeam/workspace-ai-03/pull/358).
- **AI usage report (#321, PR #323):** Read the course requirements and Week 06 report, created the empty Week 07 template, committed it, and opened the draft PR with the required description.
  Later consolidated the disclosures supplied in this file, resolved the branch conflict, and prepared the updated report and PR description.

## What we did with the output

- **UT-01 optional mirrored session impact analysis (#315, PR #362) — use of output:** Supplied an impact assessment for team review; no usability-test files were changed, and no study results or findings were claimed.
- **UT-01 optional mirrored session impact analysis (#315, PR #362) — verification and limits:** Read the GitHub comment through the API and checked the recommendations against the current public test documents and glossary.
  No implementation checks were run because this was a read-only assessment.
- **Block and connection copying (#354, PR #359) — use of output:** The user accepted the plan and extended it to copy a connection only when the connection itself and both endpoint blocks were selected.
  The initial exclusion of connection copying was replaced because it no longer matched that requested scope.
  The first AI review reproduced a save/clear race; Codex changed the save ordering, invalidated queued edits on clear, and added three regression tests.
  Codex also accepted the reviewer's callback-naming suggestion for readability.
  The second AI review reported no remaining actionable correctness or readability findings.
  The implementation, frontend, and documentation were committed separately and published in PR #359; the AI reviews do not replace the required member approval.
- **Block and connection copying (#354, PR #359) — verification and limits:** The local checks passed with 60 frontend tests and 42 backend tests, frontend lint and FSD checks, formatting, the production build, Markdown lint, and the MkDocs build.
  The documentation build reported existing warnings, and the local external-link check encountered connection failures.
  Live synchronization between two browsers was inspected in code rather than exercised manually.
  The clipboard records selection and positions when copying; stored block content and conversation history are read when pasting.
- **SPRINT-07 issue housekeeping (#309–#322) — use of output:** Applied the generated checklists after the agent compared them with the linked sections and requirements; no alternative generated checklist was rejected during this session.
  This disclosure is a draft for member review and does not claim accountable-member approval.
- **SPRINT-07 issue housekeeping (#309–#322) — verification:** Saved temporary before-and-after snapshots, checked for concurrent description edits before updating, and read the issues back to verify that all fourteen descriptions matched the prepared checklists exactly.
  The original links, other description fields, issue titles, states, and sprint membership remained unchanged, and the four existing story descriptions were left untouched.
- **SPRINT-07 issue housekeeping (#309–#322) — limits:** All 94 new criteria remained unchecked because editing a task's checklist does not establish that its work is complete.
  No participant answers, usability results, or findings were generated.
- **Backlog refinement, issue restructuring, and recovery (#309, PR #334) — use of output:** The user specified Images and Markdown for SPRINT-07, excluded reference documents, and made a production-ready usability-test draft the sprint goal.
  The initial lengthy task checklists were replaced with one or two concise criteria and description steps at the user's request; the original issues were retained when splitting them.
  The user chose selected board blocks for Ctrl+C/Ctrl+V rather than expanding the task to text editors; normal editor clipboard behavior was to remain available.
  Assignments and priorities were proposed from existing sprint work and applied on GitHub; this disclosure does not claim accountable-member approval of the tasks or PR.
- **Backlog refinement, issue restructuring, and recovery (#309, PR #334) — verification and limits:** Markdown lint passed before the user asked to leave further checks to the pipeline; no documentation build was completed in this conversation.
  GitHub API responses and issue-field reads were used to confirm deleted issues and their replacements.
  The assistant checked the course wording and explained that the dry run belongs in SPRINT-07, while instrumentation verification may run in SPRINT-08 before its first counted session.
  This report entry is drafted for member review.
- The output is a draft for the team to review and revise before the materials are used.
- For #312, the user approved the file layout before creation; Codex implemented the documentation and links without adding participant evidence or usability results.
- Markdown validation and local-link checking passed for #312; the full external-link check encountered network connection failures.
- The pre-test changes are committed separately on `317-drop-pre-test` and submitted for review; their AI disclosure is recorded on `321-ai-usage-report`.
  The draft removes the pre-test questionnaire and records the resulting limitation without claiming a grading exemption.
- For #310, the user removed the duplicate index, record, and consent files because [PR #336](https://github.com/WellMadeTeam/workspace-ai-03/pull/336) supplied them.
  PR #345 retained the remaining scaffolding and later added the missing results link, session README stub, and navigation entries requested by the reviewer.
- Codex suggested narrowing the goal, but the record retained the user's original goal.
  The record in #336 used the proposed comparative tool-switching and context-reuse questions alongside a question about unaided completion.
- The PR description was changed from `Closes #310` to `Refs #310` while the QR-file link was missing.
  Codex later verified the merged QR-06 link and Interaction Capability classification before checking AC-03.
- For PR #345's review fixes, Markdown lint and the MkDocs build passed; the build reported existing warnings for other documentation pages.
  The local full link check was unavailable because `lychee` was not installed.
- The UT-01 results sections remained empty; the disclosure does not treat scaffolding or research-question suggestions as session evidence.
- For #353, the user approved synchronous local editor state before Codex implemented the fix and later requested explanations and code comments.
  The implementation was adapted to the Markdown preview/edit controls merged into main and submitted as three logical commits in PR #358, which has merged.
- The initial jsdom caret check also passed against the original code, so it was not treated as proof of the fix.
  Chromium with mocked API responses reproduced the original board-editor jump and verified the fixed caret, autosave/polling, and shared updates in both editors; the original side-panel jump was not reproduced.
- For PR #358, all 59 frontend tests, lint, formatting, build, and Markdown lint passed locally.
  The local external-link check failed to connect, but GitHub's Markdown, link, actionlint, frontend, and backend checks all passed.
- **AI usage report (#321, PR #323):** The user first requested an empty template, then asked for the declared usage to be recorded according to the requirements.
  The report keeps the supplied disclosures, groups them under Week 06's four headings, and adds this conversation's assistance.
  Markdown lint passed for the initial template; this revision is checked again before pushing.
  The local full link check is unavailable because `lychee` is not installed.

## What was not used

- Agents received public usability-design material: course requirements, the UT-01 protocol and empty templates, public customer decisions, and published project documentation.
  No participant-session material was supplied: neither sanitized participant-session notes nor raw recordings or private notes.
  No participant identities, contact details, completed consent records, or test telemetry were provided for the work declared here.
- No participant answers, usability results, or findings were generated.
- For the optional mirrored-session assessment, no usability-test files were changed; the output was an impact assessment for team review.
