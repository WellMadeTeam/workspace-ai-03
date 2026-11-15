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
    const inFlightSaves = useRef(new Map<string, Promise<boolean>>());
    const failedUpdates = useRef(new Map<string, WidgetUpdate>());
    // Clearing or deleting a block invalidates saves not yet submitted.
    const saveGenerations = useRef(new Map<string, number>());
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

    // Serialize saves per block so an older request cannot overwrite a newer edit.
    const savePending = useCallback(
        (widgetId: string): Promise<boolean> => {
            clearTimeout(saveTimers.current.get(widgetId));
            saveTimers.current.delete(widgetId);
            const update = pendingUpdates.current.get(widgetId);
            if (!update && !failedUpdates.current.has(widgetId))
                return (
                    inFlightSaves.current.get(widgetId) ?? Promise.resolve(true)
                );
            pendingUpdates.current.delete(widgetId);

            const generation = saveGenerations.current.get(widgetId) ?? 0;
            const previous = inFlightSaves.current.get(widgetId);
            const saving = Promise.resolve(previous).then(async () => {
                const changes = {
                    ...failedUpdates.current.get(widgetId),
                    ...update,
                };
                try {
                    if (
                        (saveGenerations.current.get(widgetId) ?? 0) !==
                        generation
                    )
                        return false;
                    await updateWidget(widgetId, changes);
                    failedUpdates.current.delete(widgetId);
                    return true;
                } catch (err) {
                    if (
                        !(err instanceof ApiError && err.status === 404) &&
                        (saveGenerations.current.get(widgetId) ?? 0) ===
                            generation
                    ) {
                        // Keep failed edits so another paste retries the save
                        // instead of silently copying the older server state.
                        failedUpdates.current.set(widgetId, changes);
                        setError("Could not save changes.");
                    }
                    return false;
                } finally {
                    if (inFlightSaves.current.get(widgetId) === saving) {
                        inFlightSaves.current.delete(widgetId);
                        if (
                            !pendingUpdates.current.has(widgetId) &&
                            !failedUpdates.current.has(widgetId)
                        )
                            unsavedWidgets.current.delete(widgetId);
                    }
                    void refresh();
                }
            });
            inFlightSaves.current.set(widgetId, saving);
            return saving;
        },
        [refresh],
    );

    // Updates are merged per block and sent after a pause in typing.
    const saveWidget: SaveWidget = useCallback(
        (widgetId, update, delayMs = 0) => {
            unsavedWidgets.current.add(widgetId);
            pendingUpdates.current.set(widgetId, {
                ...pendingUpdates.current.get(widgetId),
                ...update,
            });
            clearTimeout(saveTimers.current.get(widgetId));
            saveTimers.current.set(
                widgetId,
                setTimeout(() => void savePending(widgetId), delayMs),
            );
        },
        [savePending],
    );

    const flushWidgets = useCallback(
        async (ids: string[]) => {
            const results = await Promise.all(ids.map(savePending));
            return results.every(Boolean);
        },
        [savePending],
    );

    const acceptCopies = useCallback(
        (widgets: Widget[]) => {
            // Starting a fresh load invalidates polls from before the copy.
            void refresh();
            setNodes((current) => {
                const copyIds = new Set(widgets.map((widget) => widget.id));
                return [
                    ...current
                        .filter((node) => !copyIds.has(node.id))
                        .map((node) => ({ ...node, selected: false })),
                    ...widgets.map((widget) => ({
                        ...toNode(widget),
                        selected: true,
                    })),
                ];
            });
        },
        [refresh, setNodes],
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

    const discardPendingSaves = useCallback((id: string) => {
        saveGenerations.current.set(
            id,
            (saveGenerations.current.get(id) ?? 0) + 1,
        );
        clearTimeout(saveTimers.current.get(id));
        saveTimers.current.delete(id);
        pendingUpdates.current.delete(id);
        failedUpdates.current.delete(id);
    }, []);

    // Expects the nodes to be already removed from the canvas (React Flow does
    // it before calling onNodesDelete). On failure the next poll restores them.
    const removeWidgets = useCallback(
        async (widgetIds: string[]) => {
            for (const widgetId of widgetIds) {
                deletingWidgets.current.add(widgetId);
                // Drop unsent edits, the server would reject them with 404.
                discardPendingSaves(widgetId);
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
        [discardPendingSaves, refresh],
    );

    const clearWidgets = useCallback(
        async (ids: string[]) => {
            const clears = ids.map((id) => {
                discardPendingSaves(id);
                unsavedWidgets.current.add(id);
                // Active saves finish first, queued old saves are skipped,
                // and edits made after this clear wait for it to finish.
                const previous = inFlightSaves.current.get(id);
                const clearing = Promise.resolve(previous).then(async () => {
                    try {
                        await clearWidget(id);
                        return true;
                    } catch {
                        return false;
                    } finally {
                        if (inFlightSaves.current.get(id) === clearing) {
                            inFlightSaves.current.delete(id);
                            if (!pendingUpdates.current.has(id))
                                unsavedWidgets.current.delete(id);
                        }
                        void refresh();
                    }
                });
                inFlightSaves.current.set(id, clearing);
                return clearing;
            });
            const results = await Promise.all(clears);
            if (results.some((result) => !result)) {
                setError("Could not clear some blocks.");
            }
        },
        [discardPendingSaves, refresh],
    );

    const isLoaded = boardId !== null && loadedBoardId === boardId;

    return {
        nodes,
        onNodesChange,
        error,
        isLoaded,
        addWidget,
        saveWidget,
        flushWidgets,
        acceptCopies,
        removeWidgets,
        clearWidgets,
    };
}
