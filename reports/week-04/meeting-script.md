# Week 4 meeting script

## Context

Our problem-space sentence: teams of software developers and architects lose context when sharing LLM queries and results via fragmented tools like Telegram, and need a unified space to aggregate and build upon these interactions.

We believe the shared board with AI blocks, now with the 10-connection limit, the shared LLM error, and text notes, meets the acceptance criteria that the customer rejected or has not yet judged.
We do not know how the customer expects text notes to behave next to AI blocks, or what he expects when someone deletes a block by accident.

Target: get the customer's verdict on the user stories implemented in the current sprint, and agree on the next sprint and on how we settle the architecture decisions.

## Agenda

1. Permission questions (2 min).
   Show: nothing.
   Questions 1–3.
2. Demonstration of the implemented stories (12 min).
   Show: the prototype running from the local branch, and the [user story issues](https://github.com/WellMadeTeam/workspace-ai-03/issues?q=type%3A%22User%20story%22) of the current sprint.
   Questions 4–6.
3. Verdicts on the user stories (10 min).
   Show: the acceptance criteria on each story issue.
   Questions 7–9.
4. Next sprint and architecture decisions (8 min).
   Show: the prioritized backlog of the next sprint and [decisions.md](../../docs/decisions.md).
   Questions 10–12.
5. Read back the decisions and action points (3 min).
   Show: the note taker's list.

## Questions

### Permission

1. _(closed)_ Do we have your permission to record this meeting?
2. _(closed)_ Do we have your permission to publish a summary of this meeting?
3. _(closed)_ Do we have your permission to publish the full transcript of this meeting in a public repository?

### Demonstration

4. _(closed)_ Do the "board is full" message and the LLM error shown to all members now meet what you asked for last week?
5. _(closed)_ When you click a text block, what do you expect to happen, compared with an AI block?

### Verdicts

6. _(closed)_ Do you accept `US-01`, seeing the same board as my teammates, with its acceptance criteria?
7. _(closed)_ Do you accept `US-04`, asking an LLM so that the whole team sees the query and the answer, with its acceptance criteria?
8. _(closed)_ Do you accept the story for adding notes of my own to the board?

### Next steps

9. _(closed)_ Should the next sprint focus on sharing diagrams on the board and highlighting a part of the board?
10. _(closed)_ May we draft the architecture decisions during this week, mark them as proposed, and settle them with you at the next meeting?

Priority questions, asked even if time runs short: 7, 8 and 11.

## Roles

danmaninc moderates and demonstrates the prototype, hrrrsss takes notes, Kamil116 observes and records what we did not ask.

## Key improvements

### "Do you like how the text notes work?" -> "When you click a text block, what do you expect to happen, compared with an AI block?"

The original asks for an opinion on a feature in isolation.
The rewrite anchors the answer to a concrete action and a comparison, so the answer describes the behavior the customer expects rather than a preference.

### "Is deleting blocks fine as it is?" -> "What do you expect to happen when someone deletes a block by accident?"

The original invites a yes without the customer picturing a failure.
The rewrite asks about a specific, memorable event, so the answer describes what the team must protect rather than approving a button.
