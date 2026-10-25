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
- Claude Code: checking the delete path with `curl` through the Vite proxy against the running backend, for a text block and an AI block, and running the type check, `oxlint`, `steiger` and `oxfmt`.
- Claude Code: explaining how to stop a save that was already in flight from showing "Could not save changes." after its block is deleted, and applying the fix once a `curl` check confirmed that saving a deleted block returns 404.
- Claude Code: proposing a plan, and then moving the Delete button from above the block into a context menu opened with the right mouse button. The menu acts on the whole selection. A right click on a block outside the selection selects only that block first. A field being edited keeps the browser's own menu.
- Claude Code: making a text block editable on a double click instead of a single click, so a click only selects it: several blocks can be selected, and a right click does not start editing.
- Claude Code, on the branch of #134: a Delete button on a selected connection and a rule to show the Delete buttons only when exactly one block or connection is selected; both were later replaced by the context menu.
- A background Claude Code agent: comparing ways to undo a deletion that still shows for every member: soft delete with a restore endpoint, a delayed delete, recreating the block from a snapshot, and a shared trash for the board.
- Claude Code: GitHub housekeeping through `gh`:
  - creating #153 from the task template, linked to story #39 (AC-02), and setting its issue type to Task
  - cherry-picking the markdownlint configuration commit of #128 onto the branch of #135, so that the changelog's repeated section headings pass the lint
- Claude Code: writing the changelog entries for the deletion and for the double click.
- Claude Code: sorting the issues assigned to me by what Assignment 4 requires and by effort.
- Claude Code: drafting Parts 2–6 from the code and the course rules: the container view and its Mermaid source (#159), the quality requirements (#160), the functional requirements (#161), the ADRs and their index (#163), and the drivers (#164).
- Claude Code: fixing these pull requests after the review and drafting the replies to each comment.
- Claude Code: reviewing #127, #128 and #156; for #128, running the backend from the branch with a script that opens 11 WebSockets to check the member limit.

## What we did with the output

- The proposal also included moving the `SPRINT-04` milestone's due date from `2026-10-25` to `2026-10-24`; we rejected it and kept the milestone's deadline as it is.
- We asked for labels for the user stories; the agent pointed out that the Week 4 rules retire the `user-story` and `moscow:*` labels, so the stories carry the `User Story` type and the `MoSCoW` field instead.
- We accepted the proposed estimates as they were, after checking that the stories of the next two sprints add up to fewer points than the planned velocity of `SPRINT-04`, so two sprints' worth of the backlog is refined.
- The agent applied the field values to one story first and read them back before changing the rest; after the batch, every changed issue was read back through the API to confirm its milestone, assignees, and fields.
- `**Planned Velocity:** 26` was checked by hand against the `Story Points` of the five stories in the `SPRINT-04` milestone.
- The fix for a save that fails after its block is deleted was applied only after the `curl` check showed that the backend returns 404 for it, as we asked; a 404 from a save is now treated as a deleted block.
- We moved the Delete button into the context menu, replacing both the button above the block and the button on a connection.
- The rule to show Delete only for a single selected object was dropped, because the context menu acts on any selection, including several blocks.
- Backspace stays the delete key, as React Flow's default; adding the Delete key was offered and not taken.
- When Claude Code noticed that the work had moved to the branch of #133, it asked before building there; we chose to build the context menu on #133 and to bring it to #134 by merging later.
- The text block's single click was replaced with a double click at our request, so that selecting several blocks and opening the context menu do not start editing.
- From the agent's undo options we chose soft delete and moved it into its own task, #153, so that #135 stays small; the agent's note that the type check fails was already out of date, because the failing `tabIndex` prop had been removed and the checks passed.
- Claude Code could not add #153 to the project, because the token lacked the `project` scope; the project's own rule added it to the backlog.
- Each change was committed by us after Claude Code reported which checks passed and what it had not verified.
- Every reply and review was read and approved by me before Claude Code posted it.
- In the review of #127 we dropped a point about the error message, because it was outside a refactor, and added a suggestion to use a formatter.
- We kept the gateway → frontend arrow and only reworded its label, instead of removing it as one option suggested, because it is a separate request (`nginx.conf` proxies `/` to `frontend`).
- We raised QR-04's business importance to High instead of waiting for the customer.

## What was not used

- The proposed change of the `SPRINT-04` milestone's due date was not applied.
- The suggested `Priority` values for the `SPRINT-04` tasks were not applied, because the order of work is decided by the team at planning.
- The Delete button above the selected block, from the first version of #133, was replaced by the context menu.
- The Delete button on a selected connection and the single-selection rule, built on the branch of #134, were replaced by the context menu.
- A delayed delete and recreating a block from a snapshot were rejected as ways to undo: the first keeps the block visible to other members and loses the deletion if the tab closes, and the second cannot bring back the block's id, messages or connections.
- No generated text was submitted unchecked.

## What was not verified by AI

- Claude Code did not try the context menu or the double click in a browser: where the menu opens, closing it, and deleting several blocks at once still need a manual check.
- The UI of #128 (the "board is full" screen and reconnecting) was not opened in a browser, only the backend was checked.
- The new reading of US-06 (the context of a reply), BND-02 (PDF only) and FR-010 still need the customer's confirmation in Part 10.
