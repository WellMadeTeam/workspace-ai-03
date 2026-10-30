# Decisions

## DEC-001

The project is considered as exploratory

- **Status:** Active
- **Date:** 2026-10-03
- **Made by:** Customer
- **Source:** [the kickoff meeting](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-01/meeting-report.md)
- **Why:** the customer wants to validate the core idea first, whether a shared board for LLM queries and results is worth building, so the team may change direction if it finds something that works better for organizing teamwork and bringing LLMs or image generation to the table.

## DEC-002

Allow self-hosting option for users

- **Status:** Active
- **Date:** 2026-10-03
- **Made by:** Customer
- **Source:** [the kickoff meeting](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-01/meeting-report.md)
- **Why:** the customer wants to be able to bring the project up on his own computer to validate the team's work, and cannot require the team to pay for a hosted server, so the team may host it but must also provide simple self-hosting instructions.

## DEC-003

Hard limit of 10 simultaneous connections

- **Status:** Active
- **Date:** 2026-10-03
- **Made by:** Customer
- **Source:** [the kickoff meeting](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-01/meeting-report.md)
- **Why:** a brainstorming team is 7 to 10 people, a team of more than 10 people is something other than a brainstorming team.

## DEC-004

No complex access controls, stick to the simple sharing

- **Status:** Active
- **Date:** 2026-10-03
- **Made by:** Customer
- **Source:** [the kickoff meeting](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-01/meeting-report.md)
- **Why:** access levels are a very deep problem that could take the whole time of project, so everyone invited gets the same rights and everyone else is not invited, which is sufficient to validate the core idea.

## DEC-005

Allow users to share specific sessions and connect them to create a new context

- **Status:** Active
- **Date:** 2026-10-03
- **Made by:** Customer
- **Source:** [the kickoff meeting](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-01/meeting-report.md)
- **Why:** using the whole board as context would give surprising answers while several people work in parallel, so the context is tied to a widget and the user may extend it by connecting widgets with lines.

## DEC-006

Support diagrams, images if possible, and highlighting

- **Status:** Active
- **Date:** 2026-10-03
- **Made by:** Customer
- **Source:** [the kickoff meeting](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-01/meeting-report.md)
- **Why:** diagrams and images that an LLM produces are hard to share across a team today, and simple highlighting is enough to draw attention to a part of them, so the team starts with text, then images if time allows, then basic drawing tools for the purposes of highlighting.

## DEC-007

Export of vector data is a "nice-to-have" feature, but the primary one

- **Status:** Active
- **Date:** 2026-10-03
- **Made by:** Customer
- **Source:** [the kickoff meeting](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-01/meeting-report.md)
- **Why:** there is no time to cover the many export formats within the course, so the team focuses on collaboration and shared context first and, if time remains, picks one common format such as PDF.

## DEC-008

The project goal is to verify whether, and to what degree, a shared LLM whiteboard solves the aggregation problem

- **Status:** Active
- **Date:** 2026-10-08
- **Made by:** Customer
- **Source:** [the Week 2 meeting](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-02/meeting-report.md)
- **Why:** seven weeks are too short to actually solve the aggregation problem, and if the idea turned out not to solve it the team would fail the goal at the end; checking whether and how well it works is a smaller scope, and either answer counts as a result.

## DEC-009

Software developers and software architects are the primary persona

- **Status:** Active
- **Date:** 2026-10-08
- **Made by:** Customer
- **Source:** [the Week 2 meeting](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-02/meeting-report.md)
- **Why:** copying and pasting LLM messages is tolerable for text, but breaks down completely when architects need to share parts of diagrams while brainstorming a system.

## DEC-010

Rendering diagrams from code and AI-generated images are should-have features, in that order

- **Status:** Active
- **Date:** 2026-10-08
- **Made by:** Customer
- **Source:** [the Week 2 meeting](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-02/meeting-report.md)
- **Why:** both support architects explaining a system, and image generation can also draw diagrams, so they rank above every supporting feature, though the MUP does not depend on them.

## DEC-011

Account creation, granular roles and whiteboard export have the lowest priority; skills and reference documents come first among the could-haves

- **Status:** Active
- **Date:** 2026-10-08
- **Made by:** Customer
- **Source:** [the Week 2 meeting](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-02/meeting-report.md)
- **Why:** every app has accounts, roles and export, so they say nothing about whether the idea is worth pursuing; they may be dropped entirely if there is no time.

## DEC-012

Accept the minimum usable product candidate narrowed to a shared board with LLM query widgets, without invitations or joining by link

- **Status:** Active
- **Date:** 2026-10-08
- **Made by:** Customer
- **Source:** [the Week 2 meeting](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-02/meeting-report.md)
- **Why:** the proposed candidate held seven stories, while the smallest product that shows the idea is several people on one board creating query widgets and all seeing the same queries and responses; invitations, joining by link and other text elements can come later, and the team picks whatever access to the board is easiest, such as a shared link.

## DEC-013

The selected widget's content opens in a side panel that takes the full right side of the screen

- **Status:** Active
- **Date:** 2026-10-08
- **Made by:** Customer
- **Source:** [the Week 2 meeting](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-02/meeting-report.md)
- **Why:** a long LLM conversation cannot fit in a widget, so the widget can show just its name while the panel shows the chat or image; other buttons can move elsewhere.

## DEC-014

The side panel shows which widgets are connected to the selected widget as its context

- **Status:** Active
- **Date:** 2026-10-08
- **Made by:** Customer
- **Source:** [the Week 2 meeting](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-02/meeting-report.md)
- **Why:** without it a user cannot tell where an answer got its information from; at least the number of directly connected widgets is enough, and no summary is needed.

## DEC-015

The team decides UI layout details; the customer reviews concepts, not buttons

- **Status:** Active
- **Date:** 2026-10-08
- **Made by:** Customer
- **Source:** [the Week 2 meeting](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-02/meeting-report.md)
- **Why:** the customer cares about concepts and ideas; buttons can be added, removed or rearranged at any time, and quick design feedback can go through Telegram without waiting for a meeting.

## DEC-016

Build the product with React, Vite and React Flow on the frontend and Python with FastAPI on the backend with SQLite database, also used Docker

- **Status:** Active
- **Date:** 2026-10-14
- **Made by:** Team
- **Source:** team discussion
- **Why:** React Flow provides draggable blocks connected by lines out of the box, which is exactly what choosing a context by connecting widgets needs, and a Python backend lets the team call LLM APIs directly and build the minimum usable product within the weeks left.

## DEC-017

Keep the 10-connection hard limit and display a clear message when reached

- **Status:** Active
- **Date:** 2026-10-15
- **Made by:** Customer
- **Source:** [the Week 3 meeting](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-03/meeting-report.md)
- **Why:** A hard connection limit is necessary to ensure deterministic behavior and prevent the application from breaking under unexpected load.

## DEC-018

Display meaningful LLM error messages to all users on the shared board

- **Status:** Active
- **Date:** 2026-10-15
- **Made by:** Customer
- **Source:** [the Week 3 meeting](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-03/meeting-report.md)
- **Why:** If the LLM fails to answer a query, the error should be visible to all users on the board with a meaningful, non-technical description.

## DEC-019

Prioritize diagram rendering and automatic block titling over user authentication

- **Status:** Active
- **Date:** 2026-10-15
- **Made by:** Customer
- **Source:** [the Week 3 meeting](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-03/meeting-report.md)
- **Why:** The team should instead focus capacity on valuable, hypothesis-validating features like rendering diagrams (e.g., Mermaid) from LLM output and automatically generating short, descriptive titles for AI blocks to improve usability.

## DEC-020

`US-01` is rejected because `AC-02` is not met, and its rework is scheduled into SPRINT-04

- **Status:** Superseded by [DEC-022](#dec-022)
- **Date:** 2026-10-15
- **Made by:** Team
- **Source:** [the Week 3 meeting](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-03/meeting-report.md)
- **Why:** `AC-01` was shown working, but an 11th member is not yet turned away with a "board is full" message, as [DEC-017](#dec-017) refines `AC-02`; the customer agreed that the team iterates on the working slice.

## DEC-021

`US-04` is rejected because `AC-02` is not met, and its rework is scheduled into SPRINT-04

- **Status:** Superseded by [DEC-023](#dec-023)
- **Date:** 2026-10-15
- **Made by:** Team
- **Source:** [the Week 3 meeting](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-03/meeting-report.md)
- **Why:** `AC-01` was shown working, but a failed LLM query does not yet show a meaningful error to every member, as [DEC-018](#dec-018) refines `AC-02`; the customer agreed that the team iterates on the working slice.

## DEC-022

Accept `US-01` now that the "board is full" criterion is met

- **Status:** Active
- **Date:** 2026-10-22
- **Made by:** Customer
- **Source:** [the Week 4 meeting](../reports/week-04/meeting-report.md)
- **Why:** the customer saw that a member who opens a board that already has 10 members is told the board is full, and that changes made by one member are seen by the other, so both criteria of `US-01` are met; this replaces the rejection in [DEC-020](#dec-020).

## DEC-023

Accept `US-04` now that the LLM error is visible to all members

- **Status:** Active
- **Date:** 2026-10-22
- **Made by:** Customer
- **Source:** [the Week 4 meeting](../reports/week-04/meeting-report.md)
- **Why:** the customer saw the "AI cannot answer this query right now" error appear for every member on the board when the LLM was unavailable, and the query and the answer reach both members, so the criteria of `US-04` are met; this replaces the rejection in [DEC-021](#dec-021).

## DEC-024

Accept the story for adding notes of my own to the board

- **Status:** Active
- **Date:** 2026-10-22
- **Made by:** Customer
- **Source:** [the Week 4 meeting](../reports/week-04/meeting-report.md)
- **Why:** a note added by one member appears for every member, and a note deleted by its author disappears for every member, which is what the story asks for; the customer said the story can be closed.

## DEC-025

Open text blocks in the side panel like AI blocks, with Markdown support later

- **Status:** Active
- **Date:** 2026-10-22
- **Made by:** Customer
- **Source:** [the Week 4 meeting](../reports/week-04/meeting-report.md)
- **Why:** AI blocks open a side panel while text blocks are typed into inside the block, which is inconsistent and does not scale to long documents such as a skill; the same panel lets the text be edited, renamed and later connected to an AI block as context.

## DEC-026

Focus the next sprint on sharing diagrams and highlighting a part of the board

- **Status:** Active
- **Date:** 2026-10-22
- **Made by:** Team
- **Source:** [the Week 4 meeting](../reports/week-04/meeting-report.md)
- **Why:** the necessary features are in place, so the team moves on to supplementary ones, in line with [DEC-006](#dec-006) and [DEC-019](#dec-019); the customer agreed and noted that rendering large diagrams may be a big feature.

## DEC-027

Draft the architecture decisions in Week 4 and mark them as proposed

- **Status:** Active
- **Date:** 2026-10-22
- **Made by:** Team
- **Source:** [the Week 4 meeting](../reports/week-04/meeting-report.md)
- **Why:** the architecture assignment was published the night before the meeting and the drafts are not ready, so the team drafts the decisions and compares them with the drivers this week and settles them with the customer at the next meeting; the customer agreed and expects a simple architecture for this product.

## DEC-028

Accept `US-06`, seeing which blocks an answer used, with its acceptance criterion reworded

- **Status:** Active
- **Date:** 2026-10-29
- **Made by:** Customer
- **Source:** [the Week 5 meeting](../reports/week-05/meeting-report.md)
- **Why:** the deployed product showed an answer linking each block it used, and a click on a link focuses that block; the old criterion spoke of all linked widgets rather than the ones used in the answer, so it was reworded, and the customer found the used-block links useful even when an answer comes from the AI's own knowledge.

## DEC-029

`US-05` is rejected because a connected AI block does not yet use another AI block's conversation as context, and its rework stays open

- **Status:** Active
- **Date:** 2026-10-29
- **Made by:** Team
- **Source:** [the Week 5 meeting](../reports/week-05/meeting-report.md)
- **Why:** connecting blocks works for text blocks, but an AI block does not yet pass its conversation on; the customer agreed that the story stays open for that rework.

## DEC-030

Accept the story for joining a teammate's board through a shared link

- **Status:** Active
- **Date:** 2026-10-29
- **Made by:** Customer
- **Source:** [the Week 5 meeting](../reports/week-05/meeting-report.md)
- **Why:** the story was already implemented, and the customer joined the deployed board through a link sent in Telegram during the meeting.

## DEC-031

Add a story for clearing the context of an AI block

- **Status:** Active
- **Date:** 2026-10-29
- **Made by:** Customer
- **Source:** [the Week 5 meeting](../reports/week-05/meeting-report.md)
- **Why:** without it a user must delete every link or recreate the block to reset what the AI uses; the customer expects an AI block to be clearable as a text block is editable, and said the used-block links stay useful after clearing.

## DEC-032

Pass a summary of a long AI conversation as context to a connected block

- **Status:** Active
- **Date:** 2026-10-29
- **Made by:** Team
- **Source:** [the Week 5 meeting](../reports/week-05/meeting-report.md)
- **Why:** sending the whole conversation makes little sense, so a conversation above a size threshold is summarized, and the summary is refreshed rarely to limit updates; the customer liked it and said that for an exact chunk he would copy it into a text block.

## DEC-033

Show a rendered diagram together with its copyable, collapsible source text in the AI block

- **Status:** Active
- **Date:** 2026-10-29
- **Made by:** Customer
- **Source:** [the Week 5 meeting](../reports/week-05/meeting-report.md)
- **Why:** a user spots a mistake in the picture, then copies the source, changes it and wants to see the updated picture, so hiding the source would be detrimental; collapsing long code keeps the picture readable.

## DEC-034

Put rendered diagrams on the board as images, without native diagram blocks

- **Status:** Active
- **Date:** 2026-10-29
- **Made by:** Customer
- **Source:** [the Week 5 meeting](../reports/week-05/meeting-report.md)
- **Why:** an image is enough for now, and turning diagrams into native blocks would open a variety of block types that is out of scope; the image also leads to the upcoming feature of adding images, in line with [DEC-006](#dec-006).

## DEC-035

Highlight a block from the right-click menu only or a toolbar button

- **Status:** Active
- **Date:** 2026-10-29
- **Made by:** Customer
- **Source:** [the Week 5 meeting](../reports/week-05/meeting-report.md)
- **Why:** member colors need extra assignment and display work, and a toolbar button invites highlighting everything; the highlight is meant to draw attention to one block, and how many blocks stay highlighted at once is left open.

## DEC-036

Ask for confirmation before deleting a block

- **Status:** Active
- **Date:** 2026-10-29
- **Made by:** Customer
- **Source:** [the Week 5 meeting](../reports/week-05/meeting-report.md)
- **Why:** deleting a block loses a whole conversation, and a confirmation in the right-click menu prevents an accidental click, such as meaning to highlight; this replaces hotkeys and a harder-to-reach button as the protection.

## DEC-037

Undoing a deletion is a nice-to-have outside the current scope

- **Status:** Active
- **Date:** 2026-10-29
- **Made by:** Customer
- **Source:** [the Week 5 meeting](../reports/week-05/meeting-report.md)
- **Why:** an undo needs a trash bin and, if shared, synchronized history of who sees what, which is complex; once a deletion is confirmed it is gone and the block can be recreated, and the team keeps the undo as a later option rather than dropping it.
