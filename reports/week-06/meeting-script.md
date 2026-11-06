# Week 6 meeting script

## Context

Our problem-space sentence: teams of software developers and architects lose context when sharing LLM queries and results via fragmented tools like Telegram, and need a unified space to aggregate and build upon these interactions.

We believe the stories of the current sprint are done, and that the telemetry now answers the questions the customer recognises, so the next step is a usability study.
We do not know which goal the customer wants the validation session with other members to pursue, or whether he sees the telemetry as answering his questions.

Target: get the customer's verdict on the finished stories, settle the goal of the validation session, and agree what the telemetry threshold should measure next.

## Agenda

1. Permission questions (2 min).
   Show: nothing.
   Questions 1–3.
2. Demonstration of the deployed product (14 min).
   Show: the deployed product, with highlighting, the context summary, diagrams and long text blocks.
   Questions 4–5.
3. Verdicts on the user stories (8 min).
   Show: the acceptance criteria on the [story issues](https://github.com/WellMadeTeam/workspace-ai-03/issues?q=label%3Auser-story).
   Questions 6–9.
4. Validation session (10 min).
   Show: nothing, so the answers describe the customer's routine rather than our idea.
   Questions 10–11.
5. Analytics and observability evidence (12 min).
   Show: the analytics staging and production dashboards, the observability staging and production dashboards, the observability `QRT-01` result with its `SLI` (the failed request's log point with its `request_id`, route and failure labels, the P95 query result, and the dashboard screenshot), and the optional runtime test's result with the `SLI` it read.
   Questions 12–13.
6. Threshold proposal and the next sprint (10 min).
   Show: the threshold proposal and the prioritized backlog.
   Questions 14–15.
7. Read back the decisions and action points (3 min).
   Show: the note taker's list.

## Questions

### Permission

1. _(closed)_ Do we have your permission to record this meeting?
2. _(closed)_ Do we have your permission to publish a summary of this meeting?
3. _(closed)_ Do we have your permission to publish the full transcript of this meeting in a public repository?

### Demonstration

4. _(closed)_ Should highlighting stay limited to one block at a time?
5. _(open)_ How should a user find out whether a connected block receives a whole conversation or only its summary?

### Verdicts

6. _(closed)_ Do you accept the story for highlighting a block on the board?
7. _(closed)_ Do you accept `US-05`, using earlier answers as context?
8. _(closed)_ Do you accept the story for sharing LLM diagrams on the board?
9. _(closed)_ Do you accept the story for long text in a text block?

### Analytics and observability

10. _(closed)_ Do the dashboards answer the questions you would ask about how the product is used?
11. _(closed)_ Is the failed request's log point enough to diagnose the failure in staging?

### Next steps

12. _(closed)_ Do you accept our threshold proposal?
13. _(closed)_ Should the usability study and the telemetry come before accounts and board export?

Priority questions, asked even if time runs short: 7, 10 and 15.

## Roles

danmaninc moderates and demonstrates the product, hrrrsss takes notes, Kamil116 observes and records what we did not ask.

## Key improvements

### "Is the 6,000-character limit for summaries fine?" -> "How should a user find out whether a connected block receives a whole conversation or only its summary?"

The original asks about a number the customer has no reason to hold an opinion on.
The rewrite asks what the user needs to see, so the answer shapes the interface rather than approving a constant.

### "Which brainstorming task should we use?" -> "Which goal should the validation session with other members pursue?"

The original asks for a task before we know what the session has to prove.
The rewrite asks for the goal first, so the answer fixes what the task, the groups and the surveys must measure.
