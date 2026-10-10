# Week 02 meeting script

## Context

Our problem-space sentence: teams of software developers and architects lose context when sharing LLM queries and results via fragmented tools like Telegram, and need a unified space to aggregate and build upon these interactions.

We believe a whiteboard with specific block widgets for LLM queries and responses will solve this aggregation problem.
We have not verified whether this hypothesis holds true in practice, and we do not know how minimal the initial prototype can be while still providing valid feedback.

Target: verify that the proposed whiteboard with interconnected LLM blocks solves the context aggregation problem, and align on the Minimum Usable Product (MUP) scope to validate this hypothesis within the 7-week course constraint.

## Agenda

1. Permission questions (2 min).
   Show: nothing.
   Questions 1–3.
2. Product vision and target audience (8 min).
   Show: Product vision notes.
   Questions 4–5.
3. Constraints and user stories prioritization (10 min).
   Show: User stories list.
   Questions 6–8.
4. Minimum Usable Product (MUP) scope definition (10 min).
   Show: nothing.
   Questions 9–10.
5. Prototype demonstration and feedback (10 min).
   Show: Prototype screen share.
   Questions 11–12.
6. Read back decisions and action points (5 min).
   Show: Note taker's list.

## Questions

### Permission
1. _(closed)_ Do we have your permission to record this meeting?
2. _(closed)_ Do we have your permission to publish a summary of this meeting?
3. _(closed)_ Do we have your permission to publish the full transcript of this meeting in a public repository?

### Product Vision & Target Audience
4. _(open)_ How do your teams currently share and build upon LLM queries and results during brainstorming?
5. _(closed)_ Is the primary target audience for this tool software developers and architects, rather than the general public?

### Constraints & User Stories
6. _(closed)_ Given the 7-week timeline, should we prioritize verifying the core hypothesis over building a fully featured product? *
7. _(closed)_ Which of the proposed user stories are absolutely critical for the Minimum Usable Product (MUP)? *
8. _(closed)_ Can we defer granular access levels, account creation, and complex data export to a later phase?

### MUP Scope
9. _(open)_ What is the absolute simplest way for a team to share a board and see LLM responses simultaneously for the MUP?
10. _(closed)_ Is a simple, unauthenticated shared link sufficient for the MUP, eliminating the need for a formal invitation system?

### Prototype & UX
11. _(closed)_ When viewing a detailed LLM conversation, would a dedicated side panel be more effective than expanding the block itself?
12. _(closed)_ Should the side panel display metadata about connected blocks (e.g., number of inputs/outputs) to help trace context?

## Roles

danmaninc moderates and asks questions, AntonChulakov takes notes, hrrrsss and Kamil116 observe and record what we did not ask.

## Key improvements

### "Do you want a whiteboard for LLM queries?" -> "How do your teams currently share and build upon LLM queries and results during brainstorming?"

We were offering a solution.
The rewrite asks for the current routine, so the answer describes real pain points instead of a preference for our proposed idea.

### "Do you need granular access levels and account creation?" -> "Is a simple, unauthenticated shared link sufficient for the MUP, eliminating the need for a formal invitation system?"

The original asks about a feature in isolation.
The rewrite anchors it to the MUP constraint, forcing a prioritization decision based on the 7-week timeline rather than abstract feature desirability.