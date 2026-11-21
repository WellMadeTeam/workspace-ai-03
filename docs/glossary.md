# Glossary

The words this project uses in one way only.
The code calls a block a widget, so `Widget` in `app/backend/` and `app/frontend/` means the same thing as [block](#block) here.

## Board

### Board

One infinite canvas, opened by its own address, on which every member sees the same blocks and connections.

**Defined by:** [the product vision's goal](product-vision.md#goal).

### Member

A person who has a board open in their browser, with the same rights as everyone else on it, and one of at most 10 on that board at a time.

**Defined by:** [`CON-03`](product-vision.md#con-03), [`DEC-004`](decisions.md#dec-004), and [`DEC-017`](decisions.md#dec-017).

### Block

An item a member places on a board, either an AI block, a text block, or an image block, which every member of the board can move, edit, and delete.

**Defined by:** [`DEC-012`](decisions.md#dec-012).

### AI Block

A block that holds one conversation with the LLM service provider: the queries members send from it and the replies to them.

**Defined by:** [`DEC-012`](decisions.md#dec-012).

### Text Block

A block that holds text a member writes on the board, such as a note, and that is not sent to the LLM service provider unless it is connected to an AI block.

**Defined by:** [`DEC-024`](decisions.md#dec-024) and [`DEC-025`](decisions.md#dec-025).

### Image Block

A block that shows a diagram a member added to the board from a reply, as the same picture for every member, and that is not sent to the LLM service provider, even when it is connected to an AI block.

**Defined by:** [`DEC-034`](decisions.md#dec-034).

### Connection

A line a member draws from one block to an AI block, so that the first block becomes part of the AI block's context.

**Defined by:** [`DEC-005`](decisions.md#dec-005).

### Side Panel

The panel on the right side of the screen that shows the selected block's full content, such as an AI block's conversation and the blocks it uses as context.

**Defined by:** [`DEC-013`](decisions.md#dec-013) and [`DEC-014`](decisions.md#dec-014).

## Query Flow

### Query

A message a member sends from an AI block to the LLM service provider.

**Defined by:** [the product vision's goal](product-vision.md#goal).

### Reply

The answer the LLM service provider gives to a query, stored in the AI block the query was sent from.

### Diagram

A Mermaid diagram that a reply holds in a code block marked `mermaid`, which the AI block shows as a picture next to its copyable source, and as the source with the error when it cannot be drawn.

**Defined by:** [`DEC-019`](decisions.md#dec-019) and [`DEC-033`](decisions.md#dec-033).

### Context

The content sent to the LLM service provider along with a query: the AI block's own conversation and the content of the blocks connected to it, and never the rest of the board.

**Defined by:** [`DEC-005`](decisions.md#dec-005).

### LLM Service Provider

The external service that answers queries, which the backend calls with the key set in `app/backend/.env`.

**Defined by:** [the product vision's context](product-vision.md#context) and [the setup page](setup.md#configure).

### System Message

A message the product itself adds to an AI block's conversation, such as the plain-language error shown to every member when the LLM service provider fails to answer a query.

**Defined by:** [`DEC-018`](decisions.md#dec-018) and [`QR-03`](quality-requirements/qr/QR-03.md).

## Analytics

### Focus Metric

The one metric that best expresses the value the product is meant to deliver and guides which outcomes the team improves.

### Input Metric

A measurable factor that contributes to the focus metric and that the team can influence through its work.

### Counter-metric

A metric watched alongside the focus metric to reveal harm caused by improving it.

### Metric Tree

A hierarchy that links the focus metric to the input metrics that contribute to it and the counter-metric that guards against harm.

### Event

A named record of a product action, with the properties needed to measure product use.

### Instrumentation

Code in the product that records and sends analytics events or operating signals.

### Analytics Backend

A service that receives and stores product-use events so an analyst can review them.

### Dashboard

A page of charts that displays analytics events or operating metrics for one environment.

## Observability

### Signal

A record or measurement the backend emits about a request or its behavior, such as a log or a metric.

### Observability Backend

A service that receives and stores operating signals, such as request logs and duration metrics.

### SLI

The abbreviation for service level indicator.

### Service Level Indicator

A number measured over a defined time window that shows how a service performs.

### Observability

The ability to understand how a service behaves by inspecting the signals it emits.

### Telemetry

Data a service records and sends to an observability backend, including logs and metrics.

## Usability Testing

### Usability Test

A test in which people outside the team attempt planned tasks on the staging product while team members observe, to show whether a shared board helps a team brainstorm with an LLM without help.

**Defined by:** [`DEC-046`](decisions.md#dec-046) and [`UT-01`](usability-tests/ut-01/README.md).

### Participant

A person aged 18 or older who matches the usability test's participant profile and is not a member of the product team, the customer, an instructor, or course staff, and who attempts the test's tasks.

**Defined by:** [the `UT-01` participant profile](usability-tests/ut-01/README.md#participant-profile).

### Usability Session

One participant's run of the usability test's tasks, in person on the staging deployment, with a facilitator and an observer from the team.

**Defined by:** [the `UT-01` protocol](usability-tests/ut-01/README.md#protocol) and [the session instructions](usability-tests/ut-01/sessions/README.md).

### Consent

The participant's durable, signed agreement, given before a session, to its capture and to the publication of sanitized results, which the participant can withdraw at any time.

**Defined by:** [the consent template](usability-tests/ut-01/consent.md).

### Recording

The data captured during a usability session, kept in the team-owned cloud folder shared with the instructors and never in this repository, which starts only after the participant has given consent.

**Defined by:** [the `UT-01` consent and data rules](usability-tests/ut-01/README.md#consent-and-data) and [the consent template](usability-tests/ut-01/consent.md).

### Measure

A quantity that one usability session records for one participant, such as a task's outcome, its time, or a survey score.

**Defined by:** [the `UT-01` measures](usability-tests/ut-01/README.md#measures).

### Metric

A number the product's analytics computes from the events it records, which is not a measure that a session records.

**Defined by:** [the analytics page](analytics.md#the-value-and-the-metrics).

### Statistic

A summary, such as a count, a proportion, a median, or a mean, that is computed from the recorded values of one measure.

**Defined by:** [the `UT-01` measures](usability-tests/ut-01/README.md#measures) and [the SUS scoring](usability-tests/ut-01/surveys.md#sus-scoring).

### SUS

The System Usability Scale, a ten-statement questionnaire that each participant answers from 1 to 5 after all the tasks and that is scored as 2.5 × (20 + the sum of the odd answers − the sum of the even answers).

**Defined by:** [the `UT-01` surveys](usability-tests/ut-01/surveys.md#sus-after-all-the-tasks) and [the SUS scoring](usability-tests/ut-01/surveys.md#sus-scoring).

### SEQ

The Single Ease Question, which each participant answers on a seven-point scale after each task to say how difficult or easy it was, where 1 is very difficult and 7 is very easy.

**Defined by:** [the `UT-01` surveys](usability-tests/ut-01/surveys.md#seq-after-each-task).

## Configuration Management

### Configuration

The files, settings, and processes that the team uses to produce, check, store, and deliver this repository's artifacts and that an agent reads to find them.

**Defined by:** [the course's artifact terminology](https://github.com/inno-itpd/itpd/blob/main/requirements/general-requirements.md#artifact-concepts-and-terminology).

### Configuration Management

The team's work of identifying, owning, reviewing, and updating the configuration so that the product can be built, checked, delivered, and understood as the repository changes.

### Configuration Review

The team's judgement of the configuration plan at a fixed baseline, asking whether the artifacts serve their local goals conveniently and what the team would change.

**Defined by:** [the Week 8 evaluation](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-08/cm-evaluation.md) and [the course's configuration evaluation rules](https://github.com/inno-itpd/itpd/blob/main/requirements/configuration-management-requirements.md#the-evaluation).

### Configuration Plan

The maintained inventory at `docs/configuration-plan.md` that records the configuration items, their purposes, owners, locations, and connections, with the date it was reviewed.

**Defined by:** [the configuration plan](configuration-plan.md) and [the course's configuration plan rules](https://github.com/inno-itpd/itpd/blob/main/requirements/configuration-management-requirements.md#where-the-configuration-plan-and-the-review-live).

### Configuration Item

One maintained file, setting, process, or dependency that this project needs to be built, checked, delivered, or understood, recorded under a stable `CFG-nn` identifier in the configuration plan.

**Defined by:** [the configuration plan's items](configuration-plan.md#source-control-and-release) and [the course's configuration item rules](https://github.com/inno-itpd/itpd/blob/main/requirements/configuration-management-requirements.md#the-configuration-items).

### Configuration Evaluation

The record of a configuration review in `reports/week-NN/cm-evaluation.md`, preserving the baseline, method, judgement for each local goal, what could not be judged, and the first proposed change as that week's evidence.

**Defined by:** [the Week 8 evaluation](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-08/cm-evaluation.md) and [the course's configuration evaluation rules](https://github.com/inno-itpd/itpd/blob/main/requirements/configuration-management-requirements.md#the-evaluation).

### Baseline

The frozen state of the repository identified by the tag or commit that a configuration evaluation judges, so later changes can be compared with the state reviewed.

**Defined by:** [the Week 8 evaluation's baseline](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/reports/week-08/cm-evaluation.md) and [the course's configuration baseline rule](https://github.com/inno-itpd/itpd/blob/main/requirements/configuration-management-requirements.md#where-the-configuration-plan-and-the-review-live).

### Upkeep

Work that keeps this repository's configuration and maintained documentation accurate and usable, tracked as `None: repository upkeep` when a task serves no product requirement.

**Defined by:** [the course's task requirement rules](https://github.com/inno-itpd/itpd/blob/main/requirements/task-issues-requirements.md#the-issue-form).

### Reproducible Build

A build that another member can repeat from the same commit, dependency versions, and documented configuration to obtain equivalent runnable product artifacts.

### Dependency Pinning

Fixing a dependency to an identified version or commit, using this project's lockfile, exact Python requirements, or action commit references, so an install does not silently select a different dependency.

**Defined by:** [the frontend lockfile](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/app/frontend/package-lock.json), [the backend requirements](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/app/backend/requirements.txt), and [the course's action pinning rules](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#pinning-third-party-actions).

### Secret

A credential that grants access to a service or deployment, such as the LLM service provider's key or a telemetry client's secret, kept in the team's password manager and the appropriate environment rather than in this public repository.

**Defined by:** [the deployment configuration](deployment.md#configuration) and [the course's sensitive information rules](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#configuration-and-sensitive-information).

## Agent Context

### Context Window

The limited amount of instructions, conversation, and file content a coding agent can consider at once while working on this repository.

### Agent Instruction

A repository rule addressed to a coding agent, entered through the root `AGENTS.md`, that directs how the agent finds project context, changes files, and checks its work.

**Defined by:** [the team's agent instructions](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/AGENTS.md).
