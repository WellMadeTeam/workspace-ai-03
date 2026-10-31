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

An item a member places on a board, either an AI block or a text block, which every member of the board can move, edit, and delete.

**Defined by:** [`DEC-012`](decisions.md#dec-012).

### AI Block

A block that holds one conversation with the LLM service provider: the queries members send from it and the replies to them.

**Defined by:** [`DEC-012`](decisions.md#dec-012).

### Text Block

A block that holds text a member writes on the board, such as a note, and that is not sent to the LLM service provider unless it is connected to an AI block.

**Defined by:** [`DEC-024`](decisions.md#dec-024) and [`DEC-025`](decisions.md#dec-025).

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
