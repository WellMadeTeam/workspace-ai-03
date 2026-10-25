import type { Edge } from "@xyflow/react";
import type { Connection } from "../api/connection";
import type { WidgetNode } from "./widget-node";

export type ConnectionEdge = Edge;

export const toEdge = (connection: Connection): ConnectionEdge => ({
    id: connection.id,
    source: connection.source_widget_id,
    target: connection.target_widget_id,
});

/**
 * Mirrors the server's rules, so the member cannot draw a connection the
 * server would reject: no loops, no duplicates and no AI to text connections.
 */
export const canConnect = (
    nodes: WidgetNode[],
    edges: ConnectionEdge[],
    source: string,
    target: string,
) => {
    if (source === target) return false;

    const sourceNode = nodes.find((node) => node.id === source);
    const targetNode = nodes.find((node) => node.id === target);
    if (!sourceNode || !targetNode) return false;
    if (
        sourceNode.data.widget_type === "ai" &&
        targetNode.data.widget_type === "text"
    )
        return false;

    return !edges.some(
        (edge) => edge.source === source && edge.target === target,
    );
};
