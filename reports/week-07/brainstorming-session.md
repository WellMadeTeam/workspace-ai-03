# Brainstorming session: bugs and improvements

- **Task:** [Run a brainstorming session to find improvements and bugs #352](https://github.com/WellMadeTeam/workspace-ai-03/issues/352)
- **Status:** Planned
- **Run on:** TODO: date of the session
- **Environment:** the staging deployment, `$STAGING_URL`

## Purpose and limits

This is an exploratory run by the team on staging, to find bugs and improvements before the counted [`UT-01`](../../docs/usability-tests/ut-01/README.md) sessions.
It uses the main usability test task and the adjacent flows of `UT-01`, with synthetic data only.
It is separate from the counted participant sessions: it has no participant code, adds nothing to the recruitment count, and claims no `UT-01` result or quality requirement verdict.
Open the board with `?source=smoke` and no board parameter, so the run starts on a new empty board and its events stay out of the product metrics and out of the `source=usability-test` events of the study.
Write down the board ID the run used, and put no real names, contact details, or secrets in this note.

## Session

- **Members present:** TODO: GitHub usernames
- **Board ID:** TODO: the opaque ID of the board used

## What the session exercises

| Area           | What to try on the board                                                                                               |
|----------------|------------------------------------------------------------------------------------------------------------------------|
| Shared queries | Two members send queries from the same AI block, and from different AI blocks, at the same time.                       |
| Context reuse  | Connect an earlier reply or a text block to an AI block, send a new query, and check the side panel's context.         |
| Text editing   | Edit a text block on the board and in the side panel, with a second member editing at the same time.                   |
| Diagrams       | Ask for a diagram, read it as a picture and as source, collapse it, and add it to the board as an image block.         |
| Images         | Move, delete, and collapse an image block, and connect it to an AI block.                                              |
| Markdown       | Write headings, bold text, and numbered and unnumbered lists in a text block and in an AI conversation message.        |
| Main task      | Brainstorm the architecture of a service for organizing university events, as in the `UT-01` main usability test task. |

## How to record a finding

Give every finding its own `###` section under **Bugs** or **Improvements**, numbered in the order found, such as `### Bug 1`.

A bug carries these fields:

- **Steps:** the numbered steps that reproduce it, starting from an empty board.
- **Expected:** what should happen.
- **Actual:** what happened.
- **Reproduced:** how many times, and by which member.
- **Task issue:** the link to the task issue that carries the work, or **Deferred:** the reason it is not scheduled.

An improvement carries these fields:

- **Suggestion:** what to change.
- **Impact:** who it helps and how much.
- **Task issue:** the link to the task issue that carries the work, or **Deferred:** the reason it is not scheduled.

## Bugs

TODO: list the reproducible bugs, or replace this line with `No reproducible bugs were found.`

## Improvements

TODO: list the suggested improvements, or replace this line with `No improvements were suggested.`
