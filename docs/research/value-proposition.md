## VP-01: Query and results reuse in the visual thinking tools

**User:** member of a team that uses LLM for brainstorming \
**Problem:** teams who brainstorm with LLMs lose context when sharing queries and results \
**What we do that the alternatives do not:** provide to user visual collaboration tools with seamless query and results reusage as a context for subsequent queries. \
**Closes:** [GAP-01](gap-analysis.md#gap-01-high-friction-for-ai-context-reuse-in-visual-thinking-tools) \
**What it costs:** the development team must implement displaying logic of the queries and reusage technique for the results that will allow to combine them in a single context. \
**How a competitor would respond:** redesign the logic of working with AI, store the AI sessions for further usage

## VP-02: Control over data

**User:** member of a team that uses LLM for brainstorming \
**Problem:** some teams cannot trust the third party to hold their data \
**What we do that the alternatives do not:** provide ability to control the data that is stored on the server and remove the need to fully trust a third party for storing the data by providing opportunity to self-host. \
**Closes:** [GAP-02](gap-analysis.md#gap-02-dependency-on-vendor-hosted-cloud) \
**What it costs:** it requires creating a robust and simple deployment configuration and producing a coherent instruction for end user. \
**How a competitor would respond:** change the pricing politics from cloud-based SaaS to open-source, which will influence number of their paid customers.

## VP-03: Enhanced data portability for structural graph

**User:** member of a team that uses LLM for brainstorming \
**Problem:** some teams need the data for further integrations with their workflow tools \
**What we do that the alternatives do not:** \
**Closes:** [GAP-03](gap-analysis.md#gap-03-poor-data-portability-for-spatial-relationships) \
**What it costs:** implementation of export logic for the whiteboard state in convenient format and verification of export correctness \
**How a competitor would respond:** implement the export of the vector/spatial data, which may positively influence the ability of users to move to other platforms than one that has responded

# Assumptions

| Assumption                                                                              | Supports      | How to check                                                               |
| --------------------------------------------------------------------------------------- | ------------- | -------------------------------------------------------------------------- |
| The security management is important for teams | VP-02 | Raise it at the Week 1 Kickoff and verify it. |
| The export of the vector and spatial data is beneficial for teams workflow to further edit or enhance brainstorming outcome       | VP-03         | Raise it at the Week 1 Kickoff and verify it.                                            |
