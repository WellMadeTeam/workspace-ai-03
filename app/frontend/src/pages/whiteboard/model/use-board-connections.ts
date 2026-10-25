import { useCallback, useMemo, useRef, useState } from "react";
import { useEdgesState } from "@xyflow/react";
import { ApiError } from "@/shared/api";
import { usePolling } from "@/shared/lib";
import {
    createConnection,
    deleteConnection,
    listConnections,
    type Connection,
    type NewConnection,
} from "../api/connection";
import { toEdge, type ConnectionEdge } from "./connection-edge";

const POLL_INTERVAL_MS = 2000;

const isNotFound = (err: unknown) =>
    err instanceof ApiError && err.status === 404;

/**
 * Keeps the board's edges in sync with the connections stored on the server,
 * polling every 2 seconds, and saves new connections and deletions back to
 * the server. Only connections between `widgetIds` are shown, so a block
 * deleted locally takes its arrows with it before the server confirms.
 */
export function useBoardConnections(
    boardId: string | null,
    widgetIds: string[],
) {
    const [edges, setEdges, onEdgesChange] = useEdgesState<ConnectionEdge>([]);
    const [error, setError] = useState<string | null>(null);
    // Connections removed locally whose deletion the server has not confirmed
    // yet; polls must not bring them back.
    const deletingConnections = useRef(new Set<string>());

    const refresh = usePolling({
        load: useMemo(
            () =>
                boardId
                    ? (signal?: AbortSignal) => listConnections(boardId, signal)
                    : null,
            [boardId],
        ),
        onData: useCallback(
            (connections: Connection[]) => {
                setEdges((current) => {
                    const currentById = new Map(
                        current.map((edge) => [edge.id, edge]),
                    );

                    // Connections never change their ends, so an edge already
                    // on the canvas is kept with its local flags like selection.
                    return connections
                        .filter(
                            (connection) =>
                                !deletingConnections.current.has(connection.id),
                        )
                        .map(
                            (connection) =>
                                currentById.get(connection.id) ??
                                toEdge(connection),
                        );
                });
                setError(null);
            },
            [setEdges],
        ),
        onError: useCallback(
            () => setError("Could not load the connections. Retrying…"),
            [],
        ),
        intervalMs: POLL_INTERVAL_MS,
    });

    const addConnection = useCallback(
        async (connection: NewConnection) => {
            try {
                await createConnection(connection);
            } catch (err) {
                // 409: someone else has just made the same connection.
                if (!(err instanceof ApiError && err.status === 409)) {
                    setError("Could not connect the blocks.");
                }
            } finally {
                void refresh();
            }
        },
        [refresh],
    );

    // Expects the edges to be already removed from the canvas (React Flow does
    // it before calling onDelete). On failure the next poll restores them.
    const removeConnections = useCallback(
        async (connectionIds: string[]) => {
            if (connectionIds.length === 0) return;

            for (const connectionId of connectionIds) {
                deletingConnections.current.add(connectionId);
            }

            const results = await Promise.allSettled(
                connectionIds.map((connectionId) =>
                    deleteConnection(connectionId),
                ),
            );
            // A connection someone else already deleted is gone either way.
            if (
                results.some(
                    (result) =>
                        result.status === "rejected" &&
                        !isNotFound(result.reason),
                )
            ) {
                setError("Could not delete the connection.");
            }

            for (const connectionId of connectionIds) {
                deletingConnections.current.delete(connectionId);
            }
            // Also discards polls started before the deletion finished.
            void refresh();
        },
        [refresh],
    );

    const widgetIdsKey = widgetIds.join(",");
    const visibleEdges = useMemo(() => {
        const known = new Set(widgetIdsKey.split(","));
        return edges.filter(
            (edge) => known.has(edge.source) && known.has(edge.target),
        );
    }, [edges, widgetIdsKey]);

    return {
        edges: visibleEdges,
        onEdgesChange,
        error,
        addConnection,
        removeConnections,
    };
}
