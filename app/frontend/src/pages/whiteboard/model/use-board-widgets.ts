import { useCallback, useMemo, useRef, useState } from "react";
import { useNodesState } from "@xyflow/react";
import { ApiError } from "@/shared/api";
import { usePolling } from "@/shared/lib";
import {
    createWidget,
    clearWidget,
    deleteWidget,
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
 * polling every second, and saves local edits and deletions back to the
 * server. A `null` board pauses polling.
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
    // Widgets removed locally whose deletion the server has not confirmed yet;
    // polls must not bring them back.
    const deletingWidgets = useRef(new Set<string>());

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

                    return widgets
                        .filter(
                            (widget) => !deletingWidgets.current.has(widget.id),
                        )
                        .map((widget) => {
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
                } catch (err) {
                    // 404: the block was deleted (by us or another member)
                    // while the save was in flight; the refresh below
                    // removes it from the canvas.
                    if (!(err instanceof ApiError && err.status === 404)) {
                        setError("Could not save changes.");
                    }
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
        // Resolves to whether the block was added.
        async (widget: Omit<NewWidget, "board_id">) => {
            if (!boardId) return false;

            try {
                await createWidget({ board_id: boardId, ...widget });
                void refresh();
                return true;
            } catch {
                setError("Could not add the block.");
                return false;
            }
        },
        [boardId, refresh],
    );

    // Expects the nodes to be already removed from the canvas (React Flow does
    // it before calling onNodesDelete). On failure the next poll restores them.
    const removeWidgets = useCallback(
        async (widgetIds: string[]) => {
            for (const widgetId of widgetIds) {
                deletingWidgets.current.add(widgetId);
                // Drop unsent edits, the server would reject them with 404.
                clearTimeout(saveTimers.current.get(widgetId));
                saveTimers.current.delete(widgetId);
                pendingUpdates.current.delete(widgetId);
                unsavedWidgets.current.delete(widgetId);
            }

            const results = await Promise.allSettled(
                widgetIds.map((widgetId) => deleteWidget(widgetId)),
            );
            // A widget someone else already deleted is gone either way.
            if (
                results.some(
                    (result) =>
                        result.status === "rejected" &&
                        !(
                            result.reason instanceof ApiError &&
                            result.reason.status === 404
                        ),
                )
            ) {
                setError("Could not delete the block.");
            }

            for (const widgetId of widgetIds) {
                deletingWidgets.current.delete(widgetId);
            }
            // Also discards polls started before the deletion finished.
            void refresh();
        },
        [refresh],
    );

    const clearWidgets = useCallback(
        async (ids: string[]) => {
            for (const id of ids) {
                clearTimeout(saveTimers.current.get(id));
                saveTimers.current.delete(id);
                pendingUpdates.current.delete(id);
                unsavedWidgets.current.add(id);
            }
            const results = await Promise.allSettled(
                ids.map((id) => clearWidget(id)),
            );
            if (results.some((result) => result.status === "rejected")) {
                setError("Could not clear some blocks.");
            }
            for (const id of ids) unsavedWidgets.current.delete(id);
            void refresh();
        },
        [refresh],
    );

    const isLoaded = boardId !== null && loadedBoardId === boardId;

    return {
        nodes,
        onNodesChange,
        error,
        isLoaded,
        addWidget,
        saveWidget,
        removeWidgets,
        clearWidgets,
    };
}
