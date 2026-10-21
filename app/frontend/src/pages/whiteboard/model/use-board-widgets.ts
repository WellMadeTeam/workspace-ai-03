import { useCallback, useMemo, useRef, useState } from "react";
import { useNodesState } from "@xyflow/react";
import { ApiError } from "@/shared/api";
import { usePolling } from "@/shared/lib";
import {
    createWidget,
    listWidgets,
    updateWidget,
    type NewWidget,
    type Widget,
    type WidgetUpdate,
} from "../api/widget";
import type { SaveWidget } from "./save-widget";
import { mergeNode, toNode, type WidgetNode } from "./widget-node";

const POLL_INTERVAL_MS = 1000;

/**
 * Keeps the board's nodes in sync with the widgets stored on the server,
 * polling every second, and saves local edits back to the server. A `null`
 * board pauses polling.
 */
export function useBoardWidgets(boardId: string | null) {
    const [nodes, setNodes, onNodesChange] = useNodesState<WidgetNode>([]);
    const [error, setError] = useState<string | null>(null);
    // The board whose widgets were loaded at least once.
    const [loadedBoardId, setLoadedBoardId] = useState<string | null>(null);
    // Widgets with unsaved local changes; polling must not overwrite them.
    const unsavedWidgets = useRef(new Set<string>());
    const pendingUpdates = useRef(new Map<string, WidgetUpdate>());
    const saveTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

    const refresh = usePolling({
        load: useMemo(
            () =>
                boardId
                    ? (signal?: AbortSignal) => listWidgets(boardId, signal)
                    : null,
            [boardId],
        ),
        onData: useCallback(
            (widgets: Widget[]) => {
                setNodes((current) => {
                    const currentById = new Map(
                        current.map((node) => [node.id, node]),
                    );

                    return widgets.map((widget) => {
                        const node = currentById.get(widget.id);
                        if (!node) return toNode(widget);
                        if (
                            node.dragging ||
                            unsavedWidgets.current.has(widget.id)
                        )
                            return node;
                        return mergeNode(node, widget);
                    });
                });
                setLoadedBoardId(boardId);
                setError(null);
            },
            [boardId, setNodes],
        ),
        onError: useCallback(
            (err: unknown) =>
                setError(
                    err instanceof ApiError && err.status === 404
                        ? "Board not found."
                        : "Could not load the board. Retrying…",
                ),
            [],
        ),
        intervalMs: POLL_INTERVAL_MS,
    });

    // Updates are merged per widget and sent after `delayMs`, so typing does
    // not send a request for every keystroke.
    const saveWidget: SaveWidget = useCallback(
        (widgetId, update, delayMs = 0) => {
            unsavedWidgets.current.add(widgetId);
            pendingUpdates.current.set(widgetId, {
                ...pendingUpdates.current.get(widgetId),
                ...update,
            });
            clearTimeout(saveTimers.current.get(widgetId));

            const timer = setTimeout(async () => {
                saveTimers.current.delete(widgetId);
                const pendingUpdate =
                    pendingUpdates.current.get(widgetId) ?? {};
                pendingUpdates.current.delete(widgetId);

                try {
                    await updateWidget(widgetId, pendingUpdate);
                } catch {
                    setError("Could not save changes.");
                } finally {
                    // Newer edits may have been scheduled while this request ran.
                    if (!saveTimers.current.has(widgetId)) {
                        unsavedWidgets.current.delete(widgetId);
                    }
                    // Also discards polls started before the save finished.
                    void refresh();
                }
            }, delayMs);

            saveTimers.current.set(widgetId, timer);
        },
        [refresh],
    );

    const addWidget = useCallback(
        async (widget: Omit<NewWidget, "board_id">) => {
            if (!boardId) return;

            try {
                await createWidget({ board_id: boardId, ...widget });
                void refresh();
            } catch {
                setError("Could not add the block.");
            }
        },
        [boardId, refresh],
    );

    const isLoaded = boardId !== null && loadedBoardId === boardId;

    return { nodes, onNodesChange, error, isLoaded, addWidget, saveWidget };
}
