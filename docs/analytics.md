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
The event names and fields are proposed for task #261 to define in the event table.

**Query:** Count distinct `board_id` values from `context_reuse_reply_received` in the last seven days, where `source != 'smoke'`.
This metric is computed by the query, not counted by hand.

### Context-reuse query failure rate

**Definition:** The percentage of submitted queries that use an earlier AI reply as context and fail before a reply is delivered, in a rolling seven-day window.

**Source:** [`context_reuse_query_submitted`](#the-events) and [`query_failed`](#the-events), correlated by `query_id`; `query_failed` must identify that the failed query used an earlier AI reply as context.
The event names and fields are proposed for task #261 to define in the event table.

**Query:** Count failed context-reuse query IDs in the last seven days, divide by all submitted context-reuse query IDs in the same window, and multiply by 100; exclude events where `source = 'smoke'`.

### Weekly context-reuse query attempts

**Definition:** The number of distinct boards that submit at least one query using an earlier AI reply as context in a rolling seven-day window.

**Source:** [`context_reuse_query_submitted`](#the-events), grouped by the opaque `board_id`.
The event name and fields are proposed for task #261 to define in the event table.

**Query:** Count distinct `board_id` values from `context_reuse_query_submitted` in the last seven days, where `source != 'smoke'`.

### Weekly core-task query attempts

**Definition:** The number of distinct boards that submit at least one query in a rolling seven-day window.

**Source:** [`query_submitted`](#the-events), grouped by the opaque `board_id`.
The event name and fields are proposed for task #261 to define in the event table.

**Query:** Count distinct `board_id` values from `query_submitted` in the last seven days, where `source != 'smoke'`.

### Weekly boards with replies available for reuse

**Definition:** The number of distinct boards that receive at least one AI reply in a rolling seven-day window, making a previous result available as context for a later query.

**Source:** [`reply_received`](#the-events), grouped by the opaque `board_id`.
The event name and fields are proposed for task #261 to define in the event table.

**Query:** Count distinct `board_id` values from `reply_received` in the last seven days, where `source != 'smoke'`.

## The Events

Task #261 defines the event table and instrumentation.
It will replace the provisional event names above with the agreed event names and complete each metric's source with those names.
