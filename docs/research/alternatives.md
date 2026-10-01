# Problem space
We solve the problem of teams who brainstorm with LLMs but lose context when sharing queries and results — they aim for seamless collaborative visual thinking where everything stays shared and evolves together.

## ALT-01: Miro

**Kind:** SaaS, cloud-hosted collaborative whiteboard platform

**Link:** https://miro.com

**Version looked at:** 2026-10-01

**Depth of evaluation:** Tested the web client, created and shared boards, used Miro Assist (AI features), and tested data export options.

**Problem it solves:** Provides an infinite digital canvas for distributed teams to brainstorm, diagram, and collaborate visually in real-time.

**Observations by property**

| Property | Observation |
| --- | --- |
| Shareability | Public links with granular guest permissions (view/comment/edit); no account required. |
| Privacy | Vendor-hosted cloud. Robust access controls, but requires trusting a third party with data. |
| Data portability | Exports flat files (PDF/CSV/image). Editable spatial and vector data is locked in Miro. |
| Version history | Continuous auto-save. Can restore specific deleted objects or roll back the whole board. |
| Variety of collaboration tools | Rich toolset (sticky notes, voting, timers, diagramming, mind maps, video chat). |
| Ease of reusing query and previous results as context | Manual. Must visually lasso and select specific canvas objects to pass as context to the AI. |

**Strengths**

- Extremely frictionless shareability: Boards can be accessed and edited by guests instantly via public links without requiring account creation.
- Granular version history: Allows for the recovery of individual deleted objects without requiring a full board rollback, protecting concurrent work by other users.
- Rich variety of collaboration tools: Features like timers, voting, and built-in video chat make it exceptionally strong for live synchronous workshops.

**Weaknesses**

- Poor structural data portability: Exports are limited to flat formats (CSV/PDF). Editable spatial and vector data remain locked in Miro, preventing full migration to competitor platforms.
- High friction for AI context reuse: The AI does not preserve conversational context. Chaining queries requires manually re-selecting previous canvas outputs for each new prompt.

## ALT-02: Illumi

**Kind:** SaaS, AI-native collaborative whiteboard

**Link:** https://www.illumi.one/

**Version looked at:** 2026-10-01

**Depth of evaluation:** tested the web client, created and shared boards, used AI features, and tested data import/export options.

**Problem it solves:** Turns messy multi-source inputs and group thinking into structured, publish-ready deliverables by connecting AI reasoning directly to a visual spatial canvas.

**Observations by property**

| Property | Observation |
| --- | --- |
| Shareability | "Multiplayer" cloud-based sharing. Collaborators can view not just the final document, but the entire visual tree of inputs, prompts, and AI outputs. |
| Privacy | Vendor-hosted cloud SaaS. No advertised self-hosting or on-premise options. Requires trusting a third-party startup with strategic or research data. |
| Data portability | Strong for final text deliverables (reports, briefs, proposals), but poor for the structural graph. The complex spatial relationships between prompts, AI models, and context cards are locked into Illumi. |
| Version history | Uniquely spatial. Instead of just rolling back board states, Illumi keeps the "thinking visible" by maintaining the history of how specific inputs led to specific AI outputs directly on the canvas. |
| Variety of collaboration tools | Focused heavily on knowledge synthesis. Uses text cards, visual grouping, and integrated multi-model AI comparisons rather than traditional free-drawing whiteboard tools. |
| Ease of reusing query and previous results as context | Exceptional. Built specifically for "Active Context Management." You can visually connect previous AI outputs and specific note cards as direct context for new prompts without copying/pasting. |

**Strengths**

- Exceptional context reuse: The core architecture solves the "lost context" problem of linear AI chats by letting you visually wire specific cards and previous AI outputs into new prompts.
- Multi-model comparison: Allows running the exact same visual context block through different AI models simultaneously and comparing the outputs side-by-side on the board.

**Weaknesses**

- Poor structural data portability: While you can export the final generated brief or report, the valuable spatial map of how your team arrived at those conclusions (the connected prompts, sources, and dead-ends) is trapped in the platform.
- Niche collaboration tools: Because it is highly optimized for text, cards, and AI processing ("knowledge work"), it lacks the free-form drawing, standard diagramming, and facilitation features of a pure whiteboard like Miro.
