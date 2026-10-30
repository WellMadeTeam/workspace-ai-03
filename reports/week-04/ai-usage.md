# AI usage — Week 04

## Tools

Claude Code in the terminal; a background Claude Code agent for one research question.

## What we used them for

- Claude Code: reading Assignment 4 from the course repository through `gh` and summarizing Part 1, then looking up in the issue-tracking and sprint-ceremony requirements which issue type each of the `MoSCoW`, `Story Points`, and `Priority` fields is pinned to.
- Claude Code: proposing the `MoSCoW` and `Story Points` values for every user story, from the stories' bodies, their `moscow:*` labels, and the estimation rules, and proposing which issues leave the sprint milestones so that the next two sprints' stories sit refined in the product backlog.
- Claude Code: GitHub housekeeping through `gh` and the GraphQL API: setting `MoSCoW` on every story and `Story Points` on the stories of `SPRINT-04` to `SPRINT-06`, removing the milestones, assignees, and `Responsible` and `Accountable` values from #38, #43 to #47, and #49, unassigning the backlog task #153, and giving #15 and #110 the `Task` type.
- Claude Code: adding `**Planned Velocity:**` to `### SPRINT-04` in `docs/project-plan.md`, computed from the selected stories' `Story Points`.
- Claude Code: drafting this report from the structure of the Week 3 report.
- Claude Code: implementing #133 in the frontend:
  - deleting the selected blocks through the existing `DELETE /widgets/{id}` endpoint
  - making the `request` helper accept the empty `204 No Content` response
  - making Backspace delete blocks on the server instead of only on the local canvas
  - removing a block from the canvas right away and keeping polls that started earlier from bringing it back
  - dropping edits still waiting to be saved for a deleted block
  - treating a block another member already deleted as gone rather than as an error
- Claude Code: proposing a plan, and then moving the Delete button from above the block into a context menu opened with the right mouse button.
- Claude Code: making a text block editable on a double click instead of a single click, so a click only selects it: several blocks can be selected, and a right click does not start editing.

- Claude Code: GitHub housekeeping through `gh`:
  - creating #153 from the task template, linked to story #39 (AC-02), and setting its issue type to Task
  - cherry-picking the markdownlint configuration commit of #128 onto the branch of #135, so that the changelog's repeated section headings pass the lint

- Claude Code: writing the changelog entries for the deletion and for the double click.
- Claude Code: implementing #148: reading Part 8 and the glossary and agent-instructions requirements from the course repository through `gh`, then drafting `docs/glossary.md` with 13 terms taken from the vision, the decisions, the code, and the functional requirements of #161, and the root `AGENTS.md` with the layout, checks, conventions, and off-limits files.
- Claude Code: linking the glossary from `mkdocs.yml` and `docs/index.md`, running the Markdown check, checking the relative links and anchors with a script, and opening the pull request from the template.
- Claude Code: fixing the review of #156 (#136) on the branch `136-fix-references`, from the review comments read through `gh`:
  - restoring the system prompt, which the pull request had replaced with a second copy of the query
  - removing the `workspace-ai-03` submodule committed by mistake
  - rejecting connections from a block to itself and between blocks of different boards
  - storing `has_context` and `references` with the AI message, so `GET /messages` returns them
  - replacing `GET /connections/{id}/connections` with `GET /connections?boardId=` and `?widgetId=`, and sending a block reached by two paths to the LLM only once
- Claude Code: passing the connected blocks' content in the system prompt as `<doc id="...">` tags, and asking the LLM for a structured output, `{response, references}`, whose ids are saved in each message's `references`.
- Claude Code: merging `main` into `136-context-reusage` and `136-fix-references` to resolve the conflicts with #158, and opening #172 from the template, with a review requested from the author of #156.

- Claude Code: implementing the frontend of #134 on the branch `134-connections-feature`, based on `136-context-reusage` with `main` merged in for the deletion of #135:
  - an API client for the connections endpoints and a hook that polls the board's connections and saves new ones and deletions
  - straight one-sided arrows between blocks, created by dragging from a handle onto another block, with the backend's rules checked before a connection is sent
  - deleting connections like blocks, from the context menu or with Backspace, without a separate request for the connections of a deleted block
- Claude Code: leaving a comment on #156 that asks for an endpoint listing all connections of a board, since the first version of the frontend sent one request per block on every poll.
- Claude Code: finding the cause of a `500` on `GET /messages`, where the database held `system` messages from #158 that the branch's schema rejected, and merging `main` into the branch with the conflicts in the message router and schema resolved.
- Claude Code: reworking the connections at our request:
  - handles on all four sides, shown only when the pointer is on the block or a connection is dragged
  - arrow ends that slide along the blocks' borders instead of sticking to a handle, with the handles kept as hints
  - dropping a connection anywhere on a block, with a preview arrow drawn where the connection will be and a dashed outline around the target block
  - black arrows, and a purple border on the handle under the pointer
- Claude Code: committing the work in logical groups, opening #166 as a draft from the template, merging `136-fix-references` and later `main` after #156 and #172 merged, switching the frontend to `GET /connections?boardId=`, adding `has_context` and `references` to the message type, and updating the pull request description.
- Claude Code: implementing #150: reading Part 12 and the retrospective and sprint requirements from the course repository through `gh`, reading the `Story Points` of the `SPRINT-04` stories through the GraphQL API, and drafting `**Actual Velocity:**` and `reports/week-04/sprint-retrospective.md` from the review's decisions, the milestone's issues, and the pull requests and commits of the sprint, including the Groq `documents` and `citation_options` incident.
- Claude Code: renaming the branch to `150-close-the-sprint` and opening #173 from the template.

- Claude Code: implementing #146: reading Part 7 and the user-story, task-issue, and issue-tracking requirements from the course repository through `gh`, checking every issue's type, `MoSCoW` value, criteria, and labels through the GraphQL API, and proposing a plan before any change.
- Claude Code: adding `### Specified by` to every story except `US-12` and `### Requirements` to every open task through `gh`, mapped from the functional requirements' `**Traces to:**` and the `Addresses` column of the ADR index.
- Claude Code: adding the `Specified by`, `Requirements`, and `Priority reason` fields to the issue forms, removing the retired labels from them, filtering the story issue links in the vision and the Week 4 meeting script and report by the `User story` type, and opening #171 from the template.
- Claude Code: finding that the failed link check of #171 was a `503` from GitHub on a link the pull request did not change, and rerunning the job.

## What we did with the output

- The proposal also included moving the `SPRINT-04` milestone's due date from `2026-10-25` to `2026-10-24`; we rejected it and kept the milestone's deadline as it is.
- We asked for labels for the user stories; the agent pointed out that the Week 4 rules retire the `user-story` and `moscow:*` labels, so the stories carry the `User Story` type and the `MoSCoW` field instead.
- We accepted the proposed estimates as they were, after checking that the stories of the next two sprints add up to fewer points than the planned velocity of `SPRINT-04`, so two sprints' worth of the backlog is refined.
- The agent applied the field values to one story first and read them back before changing the rest; after the batch, every changed issue was read back through the API to confirm its milestone, assignees, and fields.
- `**Planned Velocity:** 26` was checked by hand against the `Story Points` of the five stories in the `SPRINT-04` milestone.

- We moved the Delete button into the context menu, replacing both the button above the block and the button on a connection.
- The rule to show Delete only for a single selected object was dropped, because the context menu acts on any selection, including several blocks.
- Backspace stays the delete key, as React Flow's default; adding the Delete key was offered and not taken.

- The text block's single click was replaced with a double click at our request, so that selecting several blocks and opening the context menu do not start editing.
- For #148 we asked to keep the pull request description short; the first pull request, #168, came from a branch with a nickname prefix, so it was closed and reopened as #169 from `148-glossary-agents`, and at our request `AGENTS.md` now tells an agent to drop such a prefix.
- The glossary links only artifacts already on `main`; the `FR-nnn` and `ADR-nnn` links wait until those pull requests merge.
- The first version of the context used Groq's `documents` and `citation_options` fields; we replaced it with the context in the system prompt and a structured output, because the model does not support those fields, and we gave the agent the draft of the `response_format` schema.
- At our request, the schema's `citations` field was renamed to `references`, to match the message field.

- For #134 we asked for straight, one-sided arrows instead of curves, and for connections to be deleted the same way as blocks.
- The preview arrow first pointed at the handle closest to the cursor, while the saved arrow joined the nearest sides of the blocks; at our request the preview now shows exactly where the arrow will be.
- The arrows and handles were made larger at our request and then reduced, because the first version was too large.
- At our request, the handle under the pointer has a purple border instead of a purple fill, and the arrows are black; the agent made them white in dark mode, where black would not be visible.
- The agent pointed out that the frontend sent one request per block on every poll; we asked it to comment on #156, and the endpoint came in #172, after which the frontend loads a board's connections in one request.
- The agent limited connections to end on an AI block, to match the changelog entries of #156, since a connection into a text block gives no context to any AI.
- Claude in Chrome was not connected, so the drag and delete interactions were not checked in a browser by the agent; it checked the types, lint, formatting, and build, and the connections API with `curl` against a local backend.
- For #150 the agent first counted `US-05` and `US-06` as not finished; we corrected it, since both are finished but not yet accepted, and the actual velocity stays `15` because a story closes only on the customer's acceptance.
- `**Actual Velocity:** 15` was checked by hand against the `Story Points` of the three accepted stories.

- For #146 the agent found that the types, the `MoSCoW` values, and the checkbox criteria were already in place, so the pass added only the two lists, the form fields, and the retirement of the labels.
- At our request `ADR-001` is named only in `US-04`, matching the ADR index, rather than in every story, and the issues were edited before the pull request merged.
- The agent's deletion of the retired labels was blocked by its permission settings, so the labels are deleted by hand.

## What was not used

- The proposed change of the `SPRINT-04` milestone's due date was not applied.
- The suggested `Priority` values for the `SPRINT-04` tasks were not applied, because the order of work is decided by the team at planning.
- The Delete button above the selected block, from the first version of #133, was replaced by the context menu.
- The Delete button on a selected connection and the single-selection rule, built on the branch of #134, were replaced by the context menu.
- A delayed delete and recreating a block from a snapshot were rejected as ways to undo: the first keeps the block visible to other members and loses the deletion if the tab closes, and the second cannot bring back the block's id, messages or connections.
- Groq's `documents` and `citation_options` fields and the citations they returned were removed.
- React Flow's built-in arrowheads and the arrow ends fixed to the handles, and then to the nearest sides of the blocks, were replaced with custom arrows whose ends slide along the borders.
- The per-block polling of connections was replaced with one request per board once #172 added the endpoint.
- The agent's resolution of the message router and schema conflicts on `134-connections-feature` was replaced with the one from `136-fix-references`.
- Changing the label links of the Week 2 and Week 3 reports to the `User story` type was offered and not taken, because those reports record their own week.
- Making the link check accept a `503` was suggested and not applied; the failed job was rerun instead.
- No generated text was submitted unchecked.
