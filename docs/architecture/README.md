# Architecture

This document records the architecture of the shared LLM whiteboard, and [the product vision](../product-vision.md) is the scope it serves.

## Container View

The product runs as the containers below, and [`ADR-001`](adr/ADR-001.md) decides that split and the stack it runs on.

![Container view](container.svg)

### Container Responsibilities

| Container  | Responsibilities                                                                                                                                                           |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `frontend` | Renders the board, its blocks, and an AI block's messages panel; polls the backend for the board's blocks and messages; holds a block's unsaved edits until they are sent  |
| `gateway`  | Exposes the product on one public port; routes `/api` requests to the backend and every other request to the frontend; owns the routing rules and the AI reply timeout     |
| `backend`  | Serves the board, block, and message API; sends an AI block's conversation to the LLM service provider and stores the reply; owns the boards, the blocks, and the messages |
| `database` | Stores the boards, the blocks, their connections, and the messages; keeps them in a volume, so they survive a restart                                                      |

## Diagrams And Legends

Solid boxes are containers, the cylinder is a data store, and the dashed box is an external system.
An arrow is one exchange, pointing from the container that sends the request, and labelled with what crosses it.
The `gateway` is the `nginx` service in [`app/docker-compose.yml`](https://github.com/WellMadeTeam/workspace-ai-03/blob/main/app/docker-compose.yml); the other containers keep their service names, and the `database` is the SQLite file in its `backend-data` volume.

The image is [`container.svg`](./container.svg), rendered with [Mermaid](https://mermaid.js.org/) from its source [`container.mmd`](./container.mmd).

## Architectural Decisions

| ADR                       | Status   | Addresses                                                                                                                                                                                                                                           | Decision                                                |
| ------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [ADR-001](adr/ADR-001.md) | Accepted | [FR-001](../functional-requirements/fr/FR-001.md), [FR-005](../functional-requirements/fr/FR-005.md), [QR-01](../quality-requirements/qr/QR-01.md), [QR-04](../quality-requirements/qr/QR-04.md)                                                    | A frontend, a gateway, a backend, and a SQLite database |
| [ADR-002](adr/ADR-002.md) | Accepted | [FR-003](../functional-requirements/fr/FR-003.md), [FR-004](../functional-requirements/fr/FR-004.md), [QR-01](../quality-requirements/qr/QR-01.md)                                                                                                  | One WebSocket per member and board                      |
| [ADR-003](adr/ADR-003.md) | Accepted | [FR-005](../functional-requirements/fr/FR-005.md), [FR-006](../functional-requirements/fr/FR-006.md), [FR-007](../functional-requirements/fr/FR-007.md), [QR-02](../quality-requirements/qr/QR-02.md), [QR-03](../quality-requirements/qr/QR-03.md) | The backend calls the LLM while the query request waits |
