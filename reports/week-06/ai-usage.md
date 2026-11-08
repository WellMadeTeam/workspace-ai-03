# AI usage — Week 06

## Tools

Claude Code in the terminal.

## What we used them for

- Claude Code: reading Assignment 6 and the course requirements it cites from the course repository through `gh`, and proposing a split of the assignment into tasks before any change.
- Claude Code: creating the task issues #259 to #276 from the task form through `gh`, with acceptance criteria taken from the assignment's items, and scheduling them into the `SPRINT-06` milestone.
- Claude Code: drafting the stories `US-17` (#277) for the product analyst and `US-18` (#278) for the system operator in the Week 4 shape, and creating them after our approval with their `Story Points`, `Responsible`, and `Accountable` values set.
- Claude Code: implementing #259 in #279: planning `SPRINT-06` in `docs/project-plan.md` with its goal and `**Planned Velocity:**`, linking the new stories from the task issues #260 to #269, and setting the `SPRINT-06` milestone's name and description.
- Claude Code: finding that the `lychee` job failed with exit code 22 because the release download answered `504`, creating #257, and proposing #258, which installs lychee through `gh release download` with retries and a checksum check.
- Claude Code: drafting this report from the week's issues and pull requests.

## What we did with the output

- The planned velocity of `47` was checked by hand against the `Story Points` of the eight stories in the `SPRINT-06` milestone.
- The story fields of `US-17` and `US-18` were read back from GitHub after they were set.
- #258 was closed without merging, because the `504` answers came from a GitHub incident and not from the workflow, and the link check recovers when the incident is resolved.

## What was not used

- The change to `.github/workflows/lychee.yml` in #258 was not merged, for the reason above.
- No generated text was submitted unchecked.
