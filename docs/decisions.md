# Decisions

## DEC-001

The project is considered as exploratory

- **Status:** Active
- **Date:** 2026-10-03
- **Made by:** Customer
- **Source:** [the kickoff meeting](../reports/week-01/meeting-report.md)
- **Why:** the customer wants to validate the core idea first, whether a shared board for LLM queries and results is worth building, so the team may change direction if it finds something that works better for organizing teamwork and bringing LLMs or image generation to the table.

## DEC-002

Allow self-hosting option for users

- **Status:** Active
- **Date:** 2026-10-03
- **Made by:** Customer
- **Source:** [the kickoff meeting](../reports/week-01/meeting-report.md)
- **Why:** the customer wants to be able to bring the project up on his own computer to validate the team's work, and cannot require the team to pay for a hosted server, so the team may host it but must also provide simple self-hosting instructions.

## DEC-003

Hard limit of 10 simultaneous connections

- **Status:** Active
- **Date:** 2026-10-03
- **Made by:** Customer
- **Source:** [the kickoff meeting](../reports/week-01/meeting-report.md)
- **Why:** a brainstorming team is 7 to 10 people, a team of more than 10 people is something other than a brainstorming team.

## DEC-004

No complex access controls, stick to the simple sharing

- **Status:** Active
- **Date:** 2026-10-03
- **Made by:** Customer
- **Source:** [the kickoff meeting](../reports/week-01/meeting-report.md)
- **Why:** access levels are a very deep problem that could take the whole time of project, so everyone invited gets the same rights and everyone else is not invited, which is sufficient to validate the core idea.

## DEC-005

Allow users to share specific sessions and connect them to create a new context

- **Status:** Active
- **Date:** 2026-10-03
- **Made by:** Customer
- **Source:** [the kickoff meeting](../reports/week-01/meeting-report.md)
- **Why:** using the whole board as context would give surprising answers while several people work in parallel, so the context is tied to a widget and the user may extend it by connecting widgets with lines.

## DEC-006

Support diagrams, images if possible, and highlighting

- **Status:** Active
- **Date:** 2026-10-03
- **Made by:** Customer
- **Source:** [the kickoff meeting](../reports/week-01/meeting-report.md)
- **Why:** diagrams and images that an LLM produces are hard to share across a team today, and simple highlighting is enough to draw attention to a part of them, so the team starts with text, then images if time allows, then basic drawing tools for the purposes of highlighting.

## DEC-007

Export of vector data is a "nice-to-have" feature, but the primary one

- **Status:** Active
- **Date:** 2026-10-03
- **Made by:** Customer
- **Source:** [the kickoff meeting](../reports/week-01/meeting-report.md)
- **Why:** there is no time to cover the many export formats within the course, so the team focuses on collaboration and shared context first and, if time remains, picks one common format such as PDF.

## DEC-008
 
The project goal is to verify whether, and to what degree, a shared LLM whiteboard solves the aggregation problem
 
- **Status:** Active
- **Date:** 2026-10-08
- **Made by:** Customer
- **Source:** [the Week 2 meeting](../reports/week-02/meeting-report.md)
- **Why:** seven weeks are too short to actually solve the aggregation problem, and if the idea turned out not to solve it the team would fail the goal at the end; checking whether and how well it works is a smaller scope, and either answer counts as a result.
## DEC-009
 
Software developers and software architects are the primary persona
 
- **Status:** Active
- **Date:** 2026-10-08
- **Made by:** Customer
- **Source:** [the Week 2 meeting](../reports/week-02/meeting-report.md)
- **Why:** copying and pasting LLM messages is tolerable for text, but breaks down completely when architects need to share parts of diagrams while brainstorming a system.
## DEC-010
 
Rendering diagrams from code and AI-generated images are should-have features, in that order
 
- **Status:** Active
- **Date:** 2026-10-08
- **Made by:** Customer
- **Source:** [the Week 2 meeting](../reports/week-02/meeting-report.md)
- **Why:** both support architects explaining a system, and image generation can also draw diagrams, so they rank above every supporting feature, though the MUP does not depend on them.
## DEC-011
 
Account creation, granular roles and whiteboard export have the lowest priority; skills and reference documents come first among the could-haves
 
- **Status:** Active
- **Date:** 2026-10-08
- **Made by:** Customer
- **Source:** [the Week 2 meeting](../reports/week-02/meeting-report.md)
- **Why:** every app has accounts, roles and export, so they say nothing about whether the idea is worth pursuing; they may be dropped entirely if there is no time.
## DEC-012
 
Accept the minimum usable product candidate narrowed to a shared board with LLM query widgets, without invitations or joining by link
 
- **Status:** Active
- **Date:** 2026-10-08
- **Made by:** Customer
- **Source:** [the Week 2 meeting](../reports/week-02/meeting-report.md)
- **Why:** the proposed candidate held seven stories, while the smallest product that shows the idea is several people on one board creating query widgets and all seeing the same queries and responses; invitations, joining by link and other text elements can come later, and the team picks whatever access to the board is easiest, such as a shared link.
## DEC-013
 
The selected widget's content opens in a side panel that takes the full right side of the screen
 
- **Status:** Active
- **Date:** 2026-10-08
- **Made by:** Customer
- **Source:** [the Week 2 meeting](../reports/week-02/meeting-report.md)
- **Why:** a long LLM conversation cannot fit in a widget, so the widget can show just its name while the panel shows the chat or image; other buttons can move elsewhere.
## DEC-014
 
The side panel shows which widgets are connected to the selected widget as its context
 
- **Status:** Active
- **Date:** 2026-10-08
- **Made by:** Customer
- **Source:** [the Week 2 meeting](../reports/week-02/meeting-report.md)
- **Why:** without it a user cannot tell where an answer got its information from; at least the number of directly connected widgets is enough, and no summary is needed.
## DEC-015
 
The team decides UI layout details; the customer reviews concepts, not buttons
 
- **Status:** Active
- **Date:** 2026-10-08
- **Made by:** Customer
- **Source:** [the Week 2 meeting](../reports/week-02/meeting-report.md)
- **Why:** the customer cares about concepts and ideas; buttons can be added, removed or rearranged at any time, and quick design feedback can go through Telegram without waiting for a meeting.
