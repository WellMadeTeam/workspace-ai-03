## GAP-01: High friction for AI context reuse in visual thinking tools

**Who needs it and what they cannot do:** teams who brainstorm with LLMs but lose context when sharing queries and results.

**Evidence:** `Ease of reusing query and previous results as context` row in [the comparison](comparison.md) — alternatives either allow easy reuse of results as context (ALT-02), or require manual selection of items to pass them as the context and do not allow sharing the LLM session with query (ALT-01, ALT-03).

**What closing it looks like:** allow members to see each other's LLM sessions when brainstorming, to combine them in a context that will be used for subsequent queries, accompanied by the visual thinking collaboration tools.

**Buildable by us in this course:** yes.
It is implementation of displaying logic of the queries and reusage technique for the results that will allow to combine them in a single context.

**Confidence:** high.
This issue is consistent across all three alternatives, and it is one of the essential reasons why this project exists.

## GAP-02: Dependency on vendor-hosted cloud

**Who needs it and what they cannot do:** teams who brainstorm with LLMs but cannot trust the third party to hold their data

**Evidence:** `Privacy` row in [the comparison](comparison.md) — alternatives that provide support for desired functionality at their's corresponding level (reusing query and previous results as context) are vendor-hosted cloud (ALT-01, ALT-02), which cannot be used for information that should be processed according to specific rules.

**What closing it looks like:** Providing a user with option to self-host the workspace in custom environment.

**Buildable by us in this course:** yes.
It requires creating a robust and simple deployment configuration and producing a coherent instruction for end user.

**Confidence:** medium.
This issue is consistent across all major alternatives.

## GAP-03: Poor data portability for spatial relationships

**Who needs it and what they cannot do:** teams who brainstorm with LLMs but need the data for further integrations with their workflow tools

**Evidence:** `Data portability` row in [the comparison](comparison.md) — most of the alternatives have the spatial and vector data locked-in. This prevents users from using the spatial data as a context in separate queries to preserve the relationships between cards.

**What closing it looks like:** Allowing user to export the spatial data in reproducible format.

**Buildable by us in this course:** yes.

**Confidence:** medium.
Most of the alternatives have their spatial and vector data locked in. This feature allows to preserve the relationships between cards while other platforms do not.