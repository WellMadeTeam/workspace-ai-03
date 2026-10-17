# Week 3 meeting script

## Context

Our problem-space sentence: teams of software developers and architects lose context when sharing LLM queries and results via fragmented tools like Telegram, and need a unified space to aggregate and build upon these interactions.

We believe a whiteboard with specific block widgets for LLM queries and responses will solve this aggregation problem.
We have developed a preliminary Minimum Usable Product (MUP) prototype and need to validate whether it meets the core hypothesis and aligns with the customer's expectations.

Target: demonstrate the preliminary MUP prototype, validate the core user stories and acceptance criteria, and agree on the next set of features to implement.

## Agenda

1. Permission questions (2 min).
   Show: nothing.
   Questions 1–3.
2. MUP Prototype Demonstration (15 min).
   Show: preliminary MUP prototype (shared board with AI block).
   Questions 4–5.
3. Acceptance Criteria Validation (15 min).
   Show: user stories and acceptance criteria list.
   Questions 6–7.
4. Next Steps and Future Features (10 min).
   Show: prioritized backlog / next user stories.
   Questions 8–9.
5. Read back decisions and action points (3 min).
   Show: the note taker's list.

## Questions

### Permission

1. _(closed)_ Do we have your permission to record this meeting?
2. _(closed)_ Do we have your permission to publish a summary of this meeting?
3. _(closed)_ Do we have your permission to publish the full transcript of this meeting in a public repository?

### Prototype Demonstration

4. _(closed)_ How does this preliminary MUP prototype align with your expectations for a shared LLM whiteboard?
5. _(closed)_ Is the current interaction model (adding blocks, typing, seeing real-time AI responses in a side panel) sufficient for the MUP?

### Acceptance Criteria

6. _(closed)_ Regarding the 10-connection limit, should we enforce a hard limit with a clear "board is full" message to prevent system instability?
7. _(closed)_ If the LLM fails to answer, should the error message be displayed to all users on the board with a meaningful, non-technical description?

### Next Steps

8. _(closed)_ Should we prioritize implementing diagram rendering (e.g., Mermaid) and automatic block titling over user accounts and authentication for the next iteration?
9. _(closed)_ What specific brainstorming task should we prepare for the upcoming validation session to prove the tool's value?

### Carried Out Questions

10. _(open)_ How do your teams currently share and build upon LLM queries and results during brainstorming?
11. _(closed)_ What is the absolute simplest way for a team to share a board and see LLM responses simultaneously for the MUP?

## Roles

danmaninc moderates and demonstrates the prototype, hrrrsss takes notes, Kamil116 observes and records what we did not ask.

## Key improvements

### "Do you want us to add user authentication?" -> "Should we prioritize implementing diagram rendering and automatic block titling over user accounts and authentication for the next iteration?"

The original asks about a feature in isolation.
The rewrite anchors it to the MUP constraint and trade-offs, forcing a prioritization decision based on the 7-week timeline and value delivery.

### "Does the 10-connection limit work for you?" -> "Regarding the 10-connection limit, should we enforce a hard limit with a clear 'board is full' message to prevent system instability?"

The original asks for a simple yes/no on a technical constraint.
The rewrite presents a specific UX solution to a known edge case, ensuring the customer understands the behavioral implication and can approve the user-facing message.
