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

## What was not used

- The proposed change of the `SPRINT-04` milestone's due date was not applied.
- The suggested `Priority` values for the `SPRINT-04` tasks were not applied, because the order of work is decided by the team at planning.
- The Delete button above the selected block, from the first version of #133, was replaced by the context menu.
- The Delete button on a selected connection and the single-selection rule, built on the branch of #134, were replaced by the context menu.
- A delayed delete and recreating a block from a snapshot were rejected as ways to undo: the first keeps the block visible to other members and loses the deletion if the tab closes, and the second cannot bring back the block's id, messages or connections.
- No generated text was submitted unchecked.
