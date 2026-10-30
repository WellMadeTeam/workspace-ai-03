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
 * A connection gives the source's content to the target's AI as context, so
 * it may only end on an AI block. Also mirrors the server's rules: no loops
 * and no duplicates.
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
    if (!targetNode || !sourceNode) return false;
    if (
        sourceNode.data.widget_type === "ai" &&
        targetNode.data.widget_type === "text"
    )
        return false;

    return !edges.some(
        (edge) => edge.source === source && edge.target === target,
    );
};
