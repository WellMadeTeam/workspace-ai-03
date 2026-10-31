# Week 5 meeting script

## Context

Our problem-space sentence: teams of software developers and architects lose context when sharing LLM queries and results via fragmented tools like Telegram, and need a unified space to aggregate and build upon these interactions.

We believe the board now lets a block use earlier answers as context and shows which blocks an answer used, and that the next step is to share diagrams and highlight blocks.
We do not know what a connected AI block should receive from another AI block, how the customer wants rendered diagrams to behave, or whether he needs to undo a deletion.

Target: get the customer's verdict on the stories of the current sprint, and settle how diagrams, highlighting and deletion work next.

## Agenda

1. Permission questions (2 min).
   Show: nothing.
   Questions 1–3.
2. Demonstration of the deployed product (14 min).
   Show: the deployed product, with the context links, the AI-to-AI connection and the right-click menu.
   Question 4.
3. Verdicts on the user stories (9 min).
   Show: the acceptance criteria on the [story issues](https://github.com/WellMadeTeam/workspace-ai-03/issues?q=type%3A%22User%20story%22) of the current sprint.
   Questions 5–7.
4. Diagrams, highlighting and deletion (12 min).
   Show: nothing, so the answers describe the customer's routine rather than our idea.
   Questions 8–12.
5. Read back the decisions and action points (3 min).
   Show: the note taker's list.

## Questions

### Permission

1. _(closed)_ Do we have your permission to record this meeting?
2. _(closed)_ Do we have your permission to publish a summary of this meeting?
3. _(closed)_ Do we have your permission to publish the full transcript of this meeting in a public repository?

### Demonstration

4. _(closed)_ When an AI block is connected to another AI block, what should it receive from the other conversation: all of it, the last reply, or a summary?

### Verdicts

5. _(closed)_ Do you accept the story about seeing which context the query used (`US-06`), with its acceptance criteria?
6. _(closed)_ Do you accept the story about reusing earlier answers as context (`US-05`)?
7. _(closed)_ Do you accept the story about joining a teammate's board through a shared link?

### Diagrams, highlighting and deletion

8. _(closed)_ When you work on a shared board, how do you draw a teammate's attention to one block?
9. _(closed)_ Is a confirmation before deleting a block enough for now, or do you need to undo a deletion?
10. _(open)_ What specific brainstorming task should we prepare for the validation session to prove the tool's value?

## Roles

danmaninc moderates and demonstrates the product, hrrrsss takes notes, AntonChulakov observes and records what we did not ask.

## Key improvements

### "Should we show diagrams as images instead of code?" -> "When an LLM gives you a diagram, what do you do with its source text?"

The original offers our solution and invites a yes.
The rewrite asks for the customer's routine, so the answer shows whether the source text matters before we decide what to hide.

### "Do you want a highlight button on the toolbar?" -> "When you work on a shared board, how do you draw a teammate's attention to one block?"

The original asks about a feature in isolation.
The rewrite asks about a habit, so the answer tells us what the highlight has to do rather than where its button sits.
