# Week 7 meeting script

## Context

Our problem-space sentence: teams of software developers and architects lose context when sharing LLM queries and results via fragmented tools like Telegram, and need a unified space to aggregate and build upon these interactions.

We believe the analytics and observability infrastructure is ready to support the validation phase, and that the usability study design needs settling before execution.
We do not know if the customer accepts the analytics user stories, nor the exact structure of the usability study (control group vs. single group, on-site vs. remote).

Target: settle the usability study design, validate the analytics implementation against the user stories, and agree on the scope of remaining "nice-to-have" features.

## Agenda

1. Permission questions (2 min).
   Show: nothing.
2. Analytics and Observability demonstration (15 min).
   Show: [the deployed product](https://github.com/WellMadeTeam/workspace-ai-03) with OpenObserve and OpenPanel dashboards, event logs, and filtering capabilities.
   Questions 1–4.
3. Usability Study Design review (20 min).
   Show: the draft study protocol and proposed participant recruitment strategy.
   Questions 5–8.
4. Scope adjustment for remaining features (10 min).
   Show: the backlog items for Images, Reference Documents, and Accounts.
   Questions 9–10.
5. Read back the decisions and action points (3 min).
   Show: the note taker's list.

## Questions

### Analytics and Observability

1. _(closed)_ Do the implemented dashboards and event tracking meet the acceptance criteria for `US-07` (Analytics)?
2. _(closed)_ Are the current event definitions sufficient to derive the specific insights needed for the usability study, or do we need additional custom events?
3. _(closed)_ Is the distinction between functional user stories and non-functional quality attributes acceptable in our documentation format?
4. _(closed)_ Which specific analytical scenarios (e.g., "boards with no AI usage") should we prioritize building dashboards for?

### Usability Study Design

5. _(closed)_ Should the study include a control group, or proceed as a single-group observational study?
6. _(closed)_ What is the optimal group size for the brainstorming task to ensure valid dynamics?
7. _(closed)_ Should the study be conducted on-site or remotely, and what are the constraints regarding recording?
8. _(closed)_ Is a post-test-only survey design acceptable, omitting pre-tests to reduce participant burden?

### Scope Adjustment

9. _(closed)_ Should we deprioritize or remove the "Reference Documents" and "Image Generation" features from the current sprint scope?
10. _(closed)_ Does the customer agree that accounts and exports remain low priority compared to the usability study?

## Roles

danmaninc moderates, demonstrates the analytics and asks questions, hrrrsss takes notes, observes and records gaps in the study design.

## Key improvements

### "Do you accept the analytics stories?" -> "Do the dashboards answer the questions you would ask about how the product is used?"

The original asks for a binary approval of technical tickets.
The rewrite forces the customer to evaluate the utility of the data itself, ensuring the analytics align with business goals rather than just implementation completion.

### "Should we record the screen?" -> "What are the privacy implications and logistical benefits of on-site vs. remote observation?"

The original jumps to a technical constraint.
The rewrite opens the discussion to the methodology, allowing the customer to weigh the value of detailed observation against the friction of privacy concerns.
