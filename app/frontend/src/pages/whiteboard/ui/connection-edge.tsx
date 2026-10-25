import { BaseEdge, useInternalNode, type EdgeProps } from "@xyflow/react";
import { getArrowPaths, getConnectionPoints } from "../lib/connection-geometry";
import type { ConnectionEdge } from "../model/connection-edge";

/**
 * A straight arrow between two blocks. It connects the blocks, not their
 * handles: its ends slide along the borders as the blocks are moved.
 */
export function ConnectionEdgeView({
    source,
    target,
    selected,
}: EdgeProps<ConnectionEdge>) {
    const sourceNode = useInternalNode(source);
    const targetNode = useInternalNode(target);

    if (!sourceNode || !targetNode) return null;

    const { from, to } = getConnectionPoints(sourceNode, targetNode);
    const { line, head, hitArea } = getArrowPaths(from, to);

    return (
        <g className={`connection-arrow ${selected ? "selected" : ""}`}>
            <BaseEdge path={line} interactionWidth={0} />
            <path d={head} className="connection-arrow__head" />
            <path
                d={hitArea}
                className="react-flow__edge-interaction"
                fill="none"
                strokeOpacity={0}
                strokeWidth={16}
            />
        </g>
    );
}
