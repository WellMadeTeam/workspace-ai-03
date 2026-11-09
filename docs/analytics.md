# Analytics

## The Value And The Metrics

The focus metric is [weekly boards completing a context-reuse flow](#weekly-boards-completing-a-context-reuse-flow).
It expresses [`VP-01`](research/value-proposition.md#vp-01): teams reuse earlier query results as context for later queries on a shared board.

### The Metric Tree

The labels show each metric's level in the tree.

- **Focus:** [Weekly boards completing a context-reuse flow](#weekly-boards-completing-a-context-reuse-flow)
  - **L1 (counter-metric):** [Context-reuse query failure rate](#context-reuse-query-failure-rate)
  - **L1:** [Weekly context-reuse query attempts](#weekly-context-reuse-query-attempts)
    - **L2:** [Weekly core-task query attempts](#weekly-core-task-query-attempts)
    - **L2:** [Weekly boards with replies available for reuse](#weekly-boards-with-replies-available-for-reuse)

### Why This Focus Metric

The product's value proposition is helping a team preserve and reuse query results as context on a shared board.
This metric is a measurable proxy for completing that core behavior, not proof that collaboration improved or that the product solved the aggregation problem.
The flow also reflects the product vision and its core task.
The focus metric depends on several inputs: teams need to start the core task, receive replies, and then use a previous reply as context.
Query attempts and replies available for reuse are nearer-term inputs the team can influence.
The focus metric is measurable from opaque board identifiers and events that record query submission and reply delivery without collecting query or answer text.
The proposed events do not establish that the member who reuses an answer differs from the member whose query produced it, so this metric does not by itself prove cross-member collaboration.
It may have no value until people outside the team use the product; team smoke events are excluded, and internal development activity is not evidence that the product's value proposition works for customers.
The metric is a hypothesis about value and is not evidence by itself that customers retain or pay for the product.

The focus metric is checked against the seven North Star Framework criteria:

- **Expresses customer value:** a completed flow shows that the board's context-reuse behavior was exercised, which is a proxy for the value in `VP-01` but not proof that a customer received it.
- **Represents vision and strategy:** reuse of shared query results is the value named by `VP-01`.
- **Is a leading indicator of success:** repeated completed flows may indicate that teams find the core workflow useful before longer-term retention is observable; usability evidence must validate that interpretation.
- **Is actionable:** the team can improve context selection, query flow, and collaboration to help more boards complete it.
- **Is understandable to non-technical partners:** it counts boards that complete the reuse flow in a week.
- **Is measurable:** the event stream records the flow with an opaque board identifier and excludes `source=smoke`.
- **Is not a vanity metric:** each counted board completed the core reuse behavior rather than merely opening the product or generating traffic, though the count alone cannot show whether the reuse helped the team.

Rejected as a vanity metric: total page views, because reloads and internal checks can raise the count without showing that a team reused an answer.

### Weekly boards completing a context-reuse flow

**Definition:** The number of distinct boards that, in a rolling seven-day window, receive a reply to a query that used an earlier AI reply as context.
Count each board once in the window.

**Source:** [`context_reuse_query_submitted`](#the-events) and [`context_reuse_reply_received`](#the-events), correlated by `query_id` and grouped by the opaque `board_id`.

**Query:** Count distinct `board_id` values from `context_reuse_reply_received` in the last seven days, where `source != 'smoke'`.
In OpenPanel, the report counts the event `context_reuse_reply_received` with the segment **Unique groups**, the filter `source` is not `smoke`, the range **Last 7 days**, and the chart type **Metric**, because each event's group is its `board_id`.
This metric is computed by the query, not counted by hand.

### Context-reuse query failure rate

**Definition:** The percentage of submitted queries that use an earlier AI reply as context and fail before a reply is delivered, in a rolling seven-day window.

**Source:** [`context_reuse_query_submitted`](#the-events) and [`query_failed`](#the-events), correlated by `query_id`; `query_failed` carries `has_ai_context=true` when the failed query used an earlier AI reply as context.

**Query:** Count failed context-reuse query IDs in the last seven days, divide by all submitted context-reuse query IDs in the same window, and multiply by 100; exclude events where `source = 'smoke'`.

### Weekly context-reuse query attempts

**Definition:** The number of distinct boards that submit at least one query using an earlier AI reply as context in a rolling seven-day window.

**Source:** [`context_reuse_query_submitted`](#the-events), grouped by the opaque `board_id`.

**Query:** Count distinct `board_id` values from `context_reuse_query_submitted` in the last seven days, where `source != 'smoke'`.
In OpenPanel, the report counts the event `context_reuse_query_submitted` with the segment **Unique groups**, the filter `source` is not `smoke`, the range **Last 7 days**, and the chart type **Metric**.

### Weekly core-task query attempts

**Definition:** The number of distinct boards that submit at least one query in a rolling seven-day window.

**Source:** [`query_submitted`](#the-events), grouped by the opaque `board_id`.

**Query:** Count distinct `board_id` values from `query_submitted` in the last seven days, where `source != 'smoke'`.

### Weekly boards with replies available for reuse

**Definition:** The number of distinct boards that receive at least one AI reply in a rolling seven-day window, making a previous result available as context for a later query.

**Source:** [`reply_received`](#the-events), grouped by the opaque `board_id`.

**Query:** Count distinct `board_id` values from `reply_received` in the last seven days, where `source != 'smoke'`.

## The Events

Every event is named `object_action` in snake case.
Every event carries `source`, which is one of `web`, `usability-test`, or `smoke`; `smoke` marks the team's own pipeline check.
The backend sends events to the OpenPanel project configured for its environment.
An event with a `board_id` is sent with that `board_id` as its OpenPanel group, because OpenPanel counts distinct groups but not distinct values of a property, so a count of distinct boards is the segment **Unique groups**.

| Event | Fires when | Fields | Collected at |
| --- | --- | --- | --- |
| `board_opened` | A member joins a board over its WebSocket. | `board_id` (UUID, required), `source` (one of `web`, `usability-test`, `smoke`, required) | `backend`, staging and production |
| `ai_block_created` | The backend stores a new AI block. | `board_id` (UUID, required), `widget_id` (UUID, required), `source` (one of `web`, `usability-test`, `smoke`, required) | `backend`, staging and production |
| `connection_created` | The backend stores a connection between two blocks. | `board_id` (UUID, required), `source_widget_id` (UUID, required), `target_widget_id` (UUID, required), `source` (one of `web`, `usability-test`, `smoke`, required) | `backend`, staging and production |
| `query_submitted` | The backend stores a member's query before sending it to the LLM service provider. | `board_id` (UUID, required), `widget_id` (UUID, required), `query_id` (UUID, required), `has_ai_context` (boolean, required), `source` (one of `web`, `usability-test`, `smoke`, required) | `backend`, staging and production |
| `reply_received` | The backend stores an AI reply from the LLM service provider. | `board_id` (UUID, required), `widget_id` (UUID, required), `query_id` (UUID, required), `has_ai_context` (boolean, required), `source` (one of `web`, `usability-test`, `smoke`, required) | `backend`, staging and production |
| `query_failed` | The backend stores a system message because the LLM service provider did not answer a query. | `board_id` (UUID, required), `widget_id` (UUID, required), `query_id` (UUID, required), `has_ai_context` (boolean, required), `source` (one of `web`, `usability-test`, `smoke`, required) | `backend`, staging and production |
| `context_reuse_query_submitted` | The backend stores a query whose context includes an earlier AI reply. | `board_id` (UUID, required), `widget_id` (UUID, required), `query_id` (UUID, required), `source` (one of `web`, `usability-test`, `smoke`, required) | `backend`, staging and production |
| `context_reuse_reply_received` | The backend stores an AI reply to a query whose context includes an earlier AI reply. | `board_id` (UUID, required), `widget_id` (UUID, required), `query_id` (UUID, required), `source` (one of `web`, `usability-test`, `smoke`, required) | `backend`, staging and production |

The events carry only opaque UUIDs, booleans, and the closed `source` value.
They never carry member identities, block titles, query text, answer text, or other free text.
The product sends no events when `ANALYTICS_ENABLED=false`.

## The Dashboards

Each OpenPanel project has one dashboard, and both dashboards carry the same reports with the same settings.

| Environment | Dashboard | Reports |
| ----------- | --------- | ------- |
| Staging | `Staging: product analytics` | `Weekly boards completing a context-reuse flow`, `Weekly context-reuse query attempts`, and `Smoke events (excluded from the metric)` |
| Production | `Production: product analytics` | The same three reports |

Each metric report runs the `**Query:**` recorded in its metric's section, which this page owns, and is named after that metric.
`Smoke events (excluded from the metric)` counts the events `context_reuse_query_submitted` and `context_reuse_reply_received` with the segment **All events**, the filter `source` is `smoke`, a breakdown by event name, and the range **Last 7 days**, so the staging dashboard shows the test events its metric reports leave out.
The production project receives no test traffic, so its `Smoke events (excluded from the metric)` report stays empty.

The dashboards are reachable from the university network only, by the members and the customer with an OpenPanel account, and their addresses are in the Moodle submission.
OpenPanel's installation, its projects, and the configuration of each deployment are in [the telemetry pipelines](deployment.md#the-telemetry-pipelines).
