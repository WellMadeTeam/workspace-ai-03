# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.3.0](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.3.0) - 2026-10-31

### Added

- Highlight a block from its right-click menu with the member's color; each member can highlight one block at a time.
- Open text blocks in a side panel to read and edit their full text and rename them.
- Widen the side panel of an AI or text block by dragging its left edge, or with the arrow keys on that edge; the panel keeps its width for the next block and after a reload.
- Show Mermaid diagrams in AI replies as pictures, with a tab for their copyable source, a button to open a diagram over the whole board, and the error when a diagram cannot be drawn.
- Add a diagram from an AI reply to the board as an image block, which every member sees, opens full size, and can connect to other blocks, though it is not used as context yet.
- Clear an AI block's conversation or a text block's text with «Clear» in the right-click menu.
- Delete a single message from an AI block's conversation.
- Ask for confirmation before deleting blocks, clearing a block, or deleting a message.
- Connect a text block to another text block.
- Summarize a long connected AI conversation before using it as context.

### Fixed

- Use a connected AI block's conversation as context for another AI block's replies.
- Use every connected text block as context when several text blocks are connected to one block.
- Send a query that is sent again after a failure to the AI only once.
- Open the board over plain HTTP from another computer, where it failed with `crypto.randomUUID is not a function`.
- Start the backend container with `docker compose up`, which exited right after it started.

## [0.2.0](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.2.0) - 2026-10-25

### Added

- Limit each board to 10 members at a time, and show a "board is full" screen with options to try again or create a new board when the limit is reached.
- Show a loading screen until the board is joined, and an error screen when the board is not found or the server cannot be reached.
- Reconnect to the board automatically after the connection drops, with a "Reconnecting…" notice in the meantime.
- Delete the selected text or AI blocks from the whiteboard with «Delete» in the right-click menu or the Backspace key; they disappear for every member of the board.
- Connect a text block to an AI block, or one AI block to another, by dragging an arrow from a block's edge onto the other block; every member of the board sees the connections, and they are deleted like blocks.
- Use the content of the connected blocks as context for an AI block's replies, and reuse the same block as context for several AI blocks.
- Show how many connected blocks an AI answer used under the answer; hover it to see their titles, and click a title to select that block and center the board on it.

### Changed

- Start editing a text block with a double click instead of a single click, so a click only selects it.

### Fixed

- Stop showing placeholder "Idea" and "Prompt" blocks on the whiteboard.
- Show an error message when adding a block to the whiteboard fails.
- Follow the browser's light or dark theme everywhere in the interface, not only on the board canvas.
- Show every member of the board a system message in the AI block when the AI fails to answer a query, keep the query in the conversation, and put its text back into the sender's message field.

## [0.1.0](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.1.0) - 2026-10-17

### Added

- Open an infinite whiteboard that pans and zooms, and get a new board automatically on the first visit.
- Add text blocks and AI blocks to the board from the toolbar.
- Move and edit blocks, and keep them on the board after a reload.
- See the blocks other members add, move, or edit on the same board within about a second.
- Rename an AI block by double-clicking its title.
- Open an AI block's messages panel, send a prompt, and read the AI's reply in the block's conversation.
- Run the whole application locally with Docker Compose.
