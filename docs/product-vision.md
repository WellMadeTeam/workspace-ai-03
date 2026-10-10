# Product vision

Workspace for AI collaboration

## Goal

A team of up to 10 people can put LLM queries and responses on a common board and use the selected results as a context for a new query without sending them via messengers

**Supports:** [VP-01](docs/research/value-proposition.md#vp-01).

## Stakeholders

- **Team member** who brainstorms with LLMs: the primary user, who needs to see and reuse the queries and results of colleagues.
- **Customer**: decides the scope, and brings the product up on his own computer to check the work.
- **Development team**: builds and documents the product, including how to self-host it.

## Constraints

### CON-01

Released under an open source license.

- **Status:** Active
- **Source:** Environmental
- **What it costs:** no proprietary code or dependencies with incompatible licenses.

### CON-02

The customer can bring the product up on his own computer.

- **Status:** Active
- **Source:** Customer-given
- **What it costs:** a simple deployment configuration and written self-hosting instructions.
- **Decision:** [`DEC-002`](docs/decisions.md#dec-002)

### CON-03

At most 10 simultaneous connections.

- **Status:** Active
- **Source:** Customer-given
- **What it costs:** the product does not serve larger groups, and no effort goes into scaling.
- **Decision:** [`DEC-003`](docs/decisions.md#dec-003)

### CON-04

Built by a team of 4 people.

- **Status:** Active
- **Source:** Team-given
- **What it costs:** the scope has to stay small enough for 4 people.

### CON-05

A 10-week course.

- **Status:** Active
- **Source:** Environmental
- **What it costs:** the team starts with text, then one or two diagram formats, and images only if time remains.

## Boundary

### BND-01

Manage complex access levels and permissions.

- **Status:** Active
- **Handled by:** Nobody
- **Why:** [`DEC-004`](docs/decisions.md#dec-004): everyone invited has the same rights.

### BND-02

Export the board to other formats.

- **Status:** Active
- **Handled by:** The user, by hand
- **Why:** [`DEC-007`](docs/decisions.md#dec-007): export is nice to have, not the focus.

### BND-03

Provide full drawing tools.

- **Status:** Active
- **Handled by:** Nobody
- **Why:** [`DEC-006`](docs/decisions.md#dec-006): simple highlighting is enough.

## Context

![System context diagram](dosc/architecture/context.svg)

The actors are the team members and the customer. The external system is an LLM service provider

## Where The Detail Lives

- [User stories](https://github.com/WellMadeTeam/workspace-ai-03/issues?q=label%3Auser-story)
- [Week 2 report](../reports/week-02/README.md)
