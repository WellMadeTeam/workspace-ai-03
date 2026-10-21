# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Limit each board to 10 members at a time, and show a "board is full" screen with options to try again or create a new board when the limit is reached.
- Show a loading screen until the board is joined, and an error screen when the board is not found or the server cannot be reached.
- Reconnect to the board automatically after the connection drops, with a "Reconnecting…" notice in the meantime.

### Fixed

- Stop showing placeholder "Idea" and "Prompt" blocks on the whiteboard.
- Show an error message when adding a block to the whiteboard fails.
- Follow the browser's light or dark theme everywhere in the interface, not only on the board canvas.

## [0.1.0](https://github.com/WellMadeTeam/workspace-ai-03/releases/tag/v0.1.0) - 2026-10-17

### Added

- Open an infinite whiteboard that pans and zooms, and get a new board automatically on the first visit.
- Add text blocks and AI blocks to the board from the toolbar.
- Move and edit blocks, and keep them on the board after a reload.
- See the blocks other members add, move, or edit on the same board within about a second.
- Rename an AI block by double-clicking its title.
- Open an AI block's messages panel, send a prompt, and read the AI's reply in the block's conversation.
- Run the whole application locally with Docker Compose.
