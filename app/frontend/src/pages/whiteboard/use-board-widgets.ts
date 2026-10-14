import { useCallback, useEffect, useRef, useState } from "react";
import { useNodesState } from "@xyflow/react";
import { ApiError, listWidgets, type Widget } from "./api.ts";
import type { WidgetNode, WidgetNodeData } from "./types.ts";

const POLL_INTERVAL_MS = 5000;

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

/**
 * Keeps the board's nodes in sync with the widgets stored on the server,
 * polling every 5 seconds.
 */
export function useBoardWidgets(boardId: string | null) {
    const [nodes, setNodes, onNodesChange] = useNodesState<WidgetNode>([]);
    const [error, setError] = useState<string | null>(null);
    // Only the most recently started request may update the nodes, so a slow
    // poll cannot remove a widget that a newer request already returned.
    const latestRequest = useRef(0);

    const refresh = useCallback(
        async (signal?: AbortSignal) => {
            if (!boardId) return;

            const requestId = ++latestRequest.current;

            try {
                const widgets = await listWidgets(boardId, signal);
                if (requestId !== latestRequest.current) return;

                // Nodes already on the canvas keep their local state (position,
                // selection, edits); the set of nodes follows the server.
                setNodes((current) => {
                    const currentById = new Map(current.map((node) => [node.id, node]));
                    return widgets.map((widget) => currentById.get(widget.id) ?? toNode(widget));
                });
                setError(null);
            } catch (err) {
                if (signal?.aborted || requestId !== latestRequest.current) return;

                setError(
                    err instanceof ApiError && err.status === 404
                        ? "Board not found."
                        : "Could not load the board. Retrying…",
                );
            }
        },
        [boardId, setNodes],
    );

    useEffect(() => {
        if (!boardId) return;

        const controller = new AbortController();
        void refresh(controller.signal);
        const interval = setInterval(() => void refresh(controller.signal), POLL_INTERVAL_MS);

        return () => {
            clearInterval(interval);
            controller.abort();
        };
    }, [boardId, refresh]);

    return { nodes, onNodesChange, error, refresh };
}
