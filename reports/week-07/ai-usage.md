# AI usage — Week 07

This draft records the AI use disclosed so far; the team must add any other AI use for the week before submission.

## UT-01 optional mirrored session impact analysis (#315, PR #362)

- **Tool:** Codex (OpenAI).
- **Purpose:** Read the review comment at <https://github.com/WellMadeTeam/workspace-ai-03/pull/362#discussion_r4579436048> and identify documents affected by an optional additional control-condition session for the shared-board team, using another brainstorming topic on another suitable day.
- **Output:** Identified required updates to the UT-01 design, session instructions and template, consent template, surveys, and results template.
  The recommendations cover voluntary participation, separate scheduling and consent, linked repeat-run records, condition-specific questionnaires, and separation of supplementary evidence from primary comparisons and QR-06 evidence.
- **Use of output:** Supplied an impact assessment for team review; no usability-test files were changed, and no study results or findings were claimed.
- **Verification and limits:** Read the GitHub comment through the API and checked the recommendations against the current public test documents and glossary.
  No implementation checks were run because this was a read-only assessment.
- **Data:** No participant identities, completed consent forms, recordings, raw notes, or test telemetry were supplied to the assistant.

## Block and connection copying (#354, PR #359)

- **Tool:** Codex (OpenAI) through Orca, including a separate Codex reviewer coordinated through Orca orchestration.
- **Purpose:** Inspect the issue and existing code, prepare the implementation plan, implement block copying and pasting, write regression tests and documentation, and prepare the commits and [PR #359](https://github.com/WellMadeTeam/workspace-ai-03/pull/359) for [#354](https://github.com/WellMadeTeam/workspace-ai-03/issues/354).
- **Output:** Generated the backend copy endpoint, frontend clipboard behavior, tests, FR-025, feature documentation, changelog entry, and PR description.
  The backend copies stored AI conversations and creates independent block, message, and connection identifiers.
- **Use of output:** The user accepted the plan and extended it to copy a connection only when the connection itself and both endpoint blocks were selected.
  The initial exclusion of connection copying was replaced because it no longer matched that requested scope.
  The first AI review reproduced a save/clear race; Codex changed the save ordering, invalidated queued edits on clear, and added three regression tests.
  Codex also accepted the reviewer's callback-naming suggestion for readability.
  The second AI review reported no remaining actionable correctness or readability findings.
  The implementation, frontend, and documentation were committed separately and published in PR #359; the AI reviews do not replace the required member approval.
- **Verification and limits:** The local checks passed with 60 frontend tests and 42 backend tests, frontend lint and FSD checks, formatting, the production build, Markdown lint, and the MkDocs build.
  The documentation build reported existing warnings, and the local external-link check encountered connection failures.
  Live synchronization between two browsers was inspected in code rather than exercised manually.
  The clipboard records selection and positions when copying; stored block content and conversation history are read when pasting.
- **Data:** No participant identities, recordings, raw or sanitized usability-session notes, or test telemetry were supplied for this task.
  No participant answers, usability results, or usability findings were generated.

## Tools

- Codex (OpenAI).

## What we used them for

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

## What we did with the output

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

## What was not used

- No participant identities, contact details, completed consent records, recordings, raw notes, or test telemetry were provided to the assistant for this work.
- No participant answers, usability results, or findings were generated.
