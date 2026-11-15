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

## What was not used

- No participant identities, contact details, completed consent records, recordings, raw notes, or test telemetry were provided to the assistant for this work.
- No participant answers, usability results, or findings were generated.
