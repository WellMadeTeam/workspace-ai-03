# Features

This page describes product capabilities using the terms defined in the [glossary](glossary.md).

## Work on the same board

You can open a [board](glossary.md#board) and see its [blocks](glossary.md#block) alongside other [members](glossary.md#member).

**Stories:** [US-01](https://github.com/WellMadeTeam/workspace-ai-03/issues/37)
**Behavior:** [FR-001](functional-requirements/fr/FR-001.md), [FR-002](functional-requirements/fr/FR-002.md), [FR-003](functional-requirements/fr/FR-003.md), [FR-004](functional-requirements/fr/FR-004.md)
**Decisions:** [ADR-001](architecture/adr/ADR-001.md), [ADR-002](architecture/adr/ADR-002.md)

## Ask the LLM a question

You can send a [query](glossary.md#query) from an [AI block](glossary.md#ai-block) and see its [reply](glossary.md#reply).

**Stories:** [US-04](https://github.com/WellMadeTeam/workspace-ai-03/issues/40)
**Behavior:** [FR-005](functional-requirements/fr/FR-005.md), [FR-006](functional-requirements/fr/FR-006.md)
**Decisions:** [ADR-003](architecture/adr/ADR-003.md)

## Reuse connected blocks in a query

You can create a [connection](glossary.md#connection) from a [block](glossary.md#block) to an [AI block](glossary.md#ai-block) so its content can be used as [context](glossary.md#context) for a [query](glossary.md#query).

**Stories:** [US-05](https://github.com/WellMadeTeam/workspace-ai-03/issues/41), [US-06](https://github.com/WellMadeTeam/workspace-ai-03/issues/42)
**Behavior:** [FR-007](functional-requirements/fr/FR-007.md), [FR-008](functional-requirements/fr/FR-008.md)
**Decisions:** [ADR-003](architecture/adr/ADR-003.md)

## See how the product is used

A product analyst can see how teams use the board from [events](glossary.md#event) collected through [instrumentation](glossary.md#instrumentation) and shown by the [analytics backend](glossary.md#analytics-backend) on a [dashboard](glossary.md#dashboard).

**Stories:** [US-17](https://github.com/WellMadeTeam/workspace-ai-03/issues/277)
**Behavior:** [FR-022](functional-requirements/fr/FR-022.md)
**Decisions:** [ADR-004](architecture/adr/ADR-004.md)

## Diagnose a quality problem from operating signals

A system operator can diagnose a failed request by finding its [signal](glossary.md#signal) in the [observability backend](glossary.md#observability-backend) and checking its duration on a [dashboard](glossary.md#dashboard).

**Stories:** [US-18](https://github.com/WellMadeTeam/workspace-ai-03/issues/278)
**Behavior:** [FR-023](functional-requirements/fr/FR-023.md)
**Decisions:** [ADR-005](architecture/adr/ADR-005.md)
