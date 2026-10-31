import { useCallback, useRef, useState } from "react";
import type {
    BoardSocketEvent,
    Highlight,
    HighlightCommand,
} from "../api/board-socket";
import { CLIENT_ID } from "./client-id";

type HighlightMap = Record<string, Highlight[]>;

type BoardHighlightsState = {
    boardId: string | null;
    highlights: HighlightMap;
};

const EMPTY_HIGHLIGHTS: HighlightMap = {};

/** Keeps the live highlight state received through the board's WebSocket. */
export function useBoardHighlights(boardId: string | null) {
    const [state, setState] = useState<BoardHighlightsState>({
        boardId: null,
        highlights: EMPTY_HIGHLIGHTS,
    });
    const ownHighlight = useRef<{
        boardId: string | null;
        widgetId: string | null;
    }>({ boardId: null, widgetId: null });

    const onSocketEvent = useCallback(
        (event: BoardSocketEvent) => {
            if (
                event.type !== "highlight.update" &&
                event.type !== "highlight.start" &&
                event.type !== "highlight.stop"
            )
                return;

            if (ownHighlight.current.boardId !== boardId) {
                ownHighlight.current = { boardId, widgetId: null };
            }

            if (event.type === "highlight.update") {
                const highlights = event.data.highlights;
                ownHighlight.current.widgetId =
                    Object.entries(highlights).find(([, entries]) =>
                        entries.some((entry) => entry.client_id === CLIENT_ID),
                    )?.[0] ?? null;
                setState({ boardId, highlights });
                return;
            }

            const { client_id, color, widget_id } = event.data;
            if (client_id === CLIENT_ID) {
                ownHighlight.current.widgetId =
                    event.type === "highlight.start" ? widget_id : null;
            }

            setState((current) => {
                const previous =
                    current.boardId === boardId ? current.highlights : {};
                const entries = previous[widget_id] ?? [];
                const remaining = entries.filter(
                    (entry) => entry.client_id !== client_id,
                );

                if (event.type === "highlight.start") {
                    return {
                        boardId,
                        highlights: {
                            ...previous,
                            [widget_id]: [...remaining, { client_id, color }],
                        },
                    };
                }

                const highlights = { ...previous };
                if (remaining.length > 0) {
                    highlights[widget_id] = remaining;
                } else {
                    delete highlights[widget_id];
                }
                return { boardId, highlights };
            });
        },
        [boardId],
    );

    const sendStart = useCallback(
        (
            widgetId: string,
            sendCommand: (command: HighlightCommand) => boolean,
        ) => {
            if (ownHighlight.current.boardId !== boardId) {
                ownHighlight.current = { boardId, widgetId: null };
            }

            const previousWidgetId = ownHighlight.current.widgetId;
            if (previousWidgetId === widgetId) return;
            if (
                previousWidgetId &&
                !sendCommand({
                    type: "highlight.stop",
                    data: { widget_id: previousWidgetId },
                })
            )
                return;

            if (
                sendCommand({
                    type: "highlight.start",
                    data: { widget_id: widgetId },
                })
            ) {
                ownHighlight.current.widgetId = widgetId;
            }
        },
        [boardId],
    );

    const sendStop = useCallback(
        (
            widgetId: string,
            sendCommand: (command: HighlightCommand) => boolean,
        ) => {
            if (
                ownHighlight.current.boardId !== boardId ||
                ownHighlight.current.widgetId !== widgetId
            )
                return;

            if (
                sendCommand({
                    type: "highlight.stop",
                    data: { widget_id: widgetId },
                })
            ) {
                ownHighlight.current.widgetId = null;
            }
        },
        [boardId],
    );

    const highlights =
        state.boardId === boardId ? state.highlights : EMPTY_HIGHLIGHTS;
    const isHighlightedByMe = useCallback(
        (widgetId: string) =>
            (highlights[widgetId] ?? []).some(
                (entry) => entry.client_id === CLIENT_ID,
            ),
        [highlights],
    );

    return {
        highlights,
        isHighlightedByMe,
        onSocketEvent,
        sendStart,
        sendStop,
    };
}
