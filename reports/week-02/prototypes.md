# Week 02 prototypes

## AI context reuse flow

- **What it is:** sketch of basic user interface with functionality of adding the LLM queries with special widget, sending messages in the LLM session, and reusing the context of widgets within other widgets by connecting them with the lines.
- **View:** [Excalidraw board](https://excalidraw.com/#json=LIIr86xe6s-fhB-P48nPi,W6l1AeqVhPlLYuovupNu_g) and [board screenshot](images/context-reuse-flow.png).
- **Tested:** [`US-04`](https://github.com/WellMadeTeam/workspace-ai-03/issues/40) (`AC-01`, `AC-02`) and [`US-05`](https://github.com/WellMadeTeam/workspace-ai-03/issues/41) (`AC-01`, `AC-02`), covering [`GAP-01`](https://github.com/WellMadeTeam/workspace-ai-03/blob/fd5f01cbda1c2294bcc8c01fdd29a521f2d6518f/docs/research/gap-analysis.md#gap-01-high-friction-for-ai-context-reuse-in-visual-thinking-tools), because the way user extends the context is the risky part.
- **Question:** will the customer accept the proposed user flow of adding LLM query via special widget, connecting the widgets to extend their context and communicating with LLM via sidebar panel?
- **What the customer said:** the customer accepted the proposed user flow and liked the idea of sidebar panel. Customer suggested to make the panel for the entire part of the screen. Customer also proposed the information panel that will list the connected widgets with links to widgets that are used as a context.
- **What changed:** `DEC-013`, `DEC-014` listed in the meeting report: new [`US-06`](https://github.com/WellMadeTeam/workspace-ai-03/issues/42).
