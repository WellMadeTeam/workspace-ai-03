import { useCallback, useEffect, useRef, useState } from "react";
import { useNodesState } from "@xyflow/react";
import { ApiError } from "@/shared/api";
import {
    listWidgets,
    updateWidget,
    type Widget,
    type WidgetUpdate,
} from "./api/widget.ts";
import type { SaveWidget } from "./save-widget-context.ts";
import type { WidgetNode, WidgetNodeData } from "./types.ts";

const POLL_INTERVAL_MS = 1000;

const toNodeData = (widget: Widget): WidgetNodeData =>
    widget.widget_type === "text"
        ? { widget_type: "text", content: widget.content ?? "" }
        : { widget_type: "ai", label: widget.title ?? "AI" };

const toNode = (widget: Widget): WidgetNode => ({
    id: widget.id,
    type: "widget",
    position: { x: widget.x, y: widget.y },
    data: toNodeData(widget),
});

const isSameData = (a: WidgetNodeData, b: WidgetNodeData) =>
    a.widget_type === "text" && b.widget_type === "text"
        ? a.content === b.content
        : a.widget_type === "ai" &&
          b.widget_type === "ai" &&
          a.label === b.label;

// Applies the server state to a node already on the canvas, keeping the
// node object (and its local flags like selection) when nothing changed.
const mergeNode = (node: WidgetNode, widget: Widget): WidgetNode => {
    const data = toNodeData(widget);
    const samePosition =
        node.position.x === widget.x && node.position.y === widget.y;

    if (samePosition && isSameData(node.data, data)) return node;

    return { ...node, position: { x: widget.x, y: widget.y }, data };
};

/**
 * Keeps the board's nodes in sync with the widgets stored on the server,
 * polling every second, and saves local edits back to the server.
 */
export function useBoardWidgets(
    boardId: string | null,
    initialState: WidgetNode[] = [],
) {
    const [nodes, setNodes, onNodesChange] =
        useNodesState<WidgetNode>(initialState);
    const [error, setError] = useState<string | null>(null);
    // Only the most recently started request may update the nodes, so a slow
    // poll cannot remove a widget that a newer request already returned.
    const latestRequest = useRef(0);
    // Widgets with unsaved local changes; polling must not overwrite them.
    const unsavedWidgets = useRef(new Set<string>());
    const pendingUpdates = useRef(new Map<string, WidgetUpdate>());
    const saveTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

    const refresh = useCallback(
        async (signal?: AbortSignal) => {
            if (!boardId) return;

            const requestId = ++latestRequest.current;

            try {
                const widgets = await listWidgets(boardId, signal);
                if (requestId !== latestRequest.current) return;

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
                setError(null);
            } catch (err) {
                if (signal?.aborted || requestId !== latestRequest.current)
                    return;

                setError(
                    err instanceof ApiError && err.status === 404
                        ? "Board not found."
                        : "Could not load the board. Retrying…",
                );
            }
        },
        [boardId, setNodes],
    );

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

    useEffect(() => {
        if (!boardId) return;

        const controller = new AbortController();
        void refresh(controller.signal);
        const interval = setInterval(
            () => void refresh(controller.signal),
            POLL_INTERVAL_MS,
        );

        return () => {
            clearInterval(interval);
            controller.abort();
        };
    }, [boardId, refresh]);

    return { nodes, onNodesChange, error, refresh, saveWidget };
}
