# AI usage — Week 05

## Tools

Claude Code in the terminal; Codex.

## What we used them for

- Claude Code: reading Assignment 5 and the course requirements it cites from the course repository through `gh`, checking the repository's plan, quality requirements, workflows, and the Week 4 meeting report and retrospective, and proposing a split of the assignment into tasks before any change.
- Claude Code: creating the task issues #189 to #200 from the task form through `gh`, with acceptance criteria taken from the assignment's items, then adding them to the project, scheduling them into the `SPRINT-05` milestone, and setting their status to `Backlog`.
- Claude Code: drafting the two stories of the Week 4 action points, `US-14` (#201) for editing a text block in the side panel and `US-15` (#202) for a block deleted by mistake, from the Week 4 transcript and `DEC-025`, and creating them after our approval with their `MoSCoW`, `Story Points`, `Responsible`, and `Accountable` values set through the issue fields API.
- Claude Code: commenting on `US-15` that the Week 5 meeting should confirm the form of the protection, and adding `US-15` to the `Story` field of the soft-delete task #153.
- Claude Code: implementing #189: planning `SPRINT-05` in `docs/project-plan.md` with its goal and `**Planned Velocity:**`, checking the existing milestones against the Part 1 rules, adding the scope of `US-14` and `US-15` to `MLS-05`, `MLS-07`, and the provisional goal of `SPRINT-06`, and opening #203 from the template.
- Claude Code: GitHub housekeeping for #189 through `gh`: setting `Responsible`, `Accountable`, and assignees on `US-02`, `US-07`, and `US-08`, setting `Story Points` on `US-11` and `US-13` with a comment on each, and replacing the provisional description of the `SPRINT-05` milestone with the sprint's goal.
- Codex: implementing the frontend part of #211 and checking it with frontend and backend tests and a multi-client WebSocket smoke test.

## What we did with the output

- We asked to merge the tests and the CI checks into one task; the agent pointed out that `AGENTS.md` keeps workflow changes in their own pull request and that a task needing two pull requests is split, so they stay #190 and #191.
- We asked the agent to recheck every issue against the assignment's text and to add no requirement the assignment does not state.
- At our request, `US-14` keeps editing by typing in the block as well as in the side panel, so `FR-009` stays unchanged.
- At our request, the criteria of `US-15` stay neutral about undo, confirmation, or a harder-to-reach button until the customer decides.
- The planned velocity of `26` was checked by hand against the `Story Points` of the six stories in the `SPRINT-05` milestone.
- Every changed issue was read back through the API to confirm its milestone, assignees, and fields.
- We kept highlighting in the right-click menu; at our request, each member has at most one active block and only the first active member's color shows when several highlight the same block.

## What was not used

- A separate task for writing the new functional requirements was offered and not taken.
- A new requirement for bringing back a deleted block was not written, because it would choose the form of the protection before the customer does.
- Automatic highlighting on selecting or deselecting a block was not used.
- No generated text was submitted unchecked.
