# AI usage — Week 03

## Tools

Claude Code in the terminal; a second, independent Claude Code agent started as a reviewer.

## What we used them for

- Claude Code: drafting `docs/risks.md`, `RISK-01` to `RISK-04`, from Part 2 of the assignment, the risk requirements, the threshold of success, the project plan and assisting with the app code.
- Claude Code: reviewing `docs/project-plan.md` and `docs/risks.md` against Parts 1 and 2 of the assignment, the planning, risk and identifier requirements, the syllabus deadlines and the sprints' GitHub milestones.
- Claude Code: rewording the provisional goals of `SPRINT-06` to `SPRINT-08` into one sentence each, and adding the `**Sprint Backlog:**` links of `SPRINT-03` to `SPRINT-07`.
- Claude Code: GitHub housekeeping through `gh`: creating the `assignment` label, moving issues #95 to #102 into the `SPRINT-03` milestone, and updating the titles and descriptions of the `SPRINT-06` to `SPRINT-08` milestones to match the plan.
- Claude Code: a second, independent review of the plan and the risks, whose findings were compared with the first review.
- Claude Code: drafting `docs/definition-of-done.md`, `CONTRIBUTING.md`, `CHANGELOG.md` and the changelog line of the pull request template from Parts 4 and 9 of the assignment and their requirements.
- Claude Code: cutting the first release through `git` and `gh`: the `v0.1.0` tag and release, the changelog's released section and the `REL-03` line.

## What we did with the output

- `RISK-02` was rewritten after we pointed out that the outside team does not have to come from the course: any team outside ours counts.
- `RISK-02`'s contingency first relied on a reserve team, which cannot exist when the trigger fires; it was replaced by a session with at least 3 developers invited one by one.
- `RISK-01` first claimed that other clients see changes only after reloading the board; both reviews found this false, because the frontend polls every second and an update writes only the fields sent, so the risk was rewritten against the code.
- The `SPRINT-07` goal had an outside team run the 10-client test; it was corrected to ten clients, so it matches `MLS-07`, `TOS-02` and the milestone on GitHub.
- Every review finding was checked against the requirement it cited and, for claims about the product, against the app code before we accepted it; we chose which findings to apply.
- The merged sprint goals keep the meaning we wrote; only the sentence form was changed to the one-sentence goal the requirements ask for.
- The draft of threshold of success was verified against the failure statements prepared by the team. The contradiction of `TOS-03` with table was fixed manually.
- `CONTRIBUTING.md` first said we squash and merge; the reviewer pointed out that squash is disabled here, and after checking the repository settings it was rewritten to describe merge commits.
- The first changelog draft listed deleting blocks; it was removed, because only the backend can delete a block and the app has no way to do it.

## What was not used

- The first draft of `RISK-02`, which assumed the outside team comes from the course, was discarded.
- A separate task (#117) and pull request (#118) for the `REL-03` line were closed as not needed; the line went into #116 with the changelog.
- No generated text was submitted unchecked.
