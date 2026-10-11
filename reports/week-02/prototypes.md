# Week 02 prototypes

## AI context reuse flow

- **What it is:** sketch of basic user interface with functionality of adding the LLM queries with special widget, sending messages in the LLM session, and reusing the context of widgets within other widgets by connecting them with the lines.
- **View:** [Excalidraw board](https://excalidraw.com/#json=LIIr86xe6s-fhB-P48nPi,W6l1AeqVhPlLYuovupNu_g) and [board screenshot](images/context-reuse-flow.png).
- **Tested:** [`US-04`](https://github.com/WellMadeTeam/workspace-ai-03/issues/40) (`AC-01`) and [`US-05`](https://github.com/WellMadeTeam/workspace-ai-03/issues/41) (`AC-01`, `AC-02`), covering [`GAP-01`](../../docs/research/gap-analysis.md#gap-01), because the way user extends the context is the risky part.
- **Question:** will the customer accept the proposed user flow of adding LLM query via special widget, connecting the widgets to extend their context and communicating with LLM via sidebar panel?
- **What the customer said:** the customer accepted the proposed user flow and liked the idea of sidebar panel. Customer suggested to make the panel for the entire part of the screen. Customer also proposed the information panel that will list the connected widgets with links to widgets that are used as a context.
- **What changed:** [`DEC-013`](../../docs/decisions.md#dec-013) and [`DEC-014`](../../docs/decisions.md#dec-014), listed in [the meeting report](meeting-report.md#decisions): new [`US-06`](https://github.com/WellMadeTeam/workspace-ai-03/issues/42), per `DEC-014`.
