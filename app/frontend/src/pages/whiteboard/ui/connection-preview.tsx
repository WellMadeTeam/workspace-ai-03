import type {
    ConnectionLineComponentProps,
    InternalNode,
    XYPosition,
} from "@xyflow/react";
import {
    getArrowPaths,
    getBorderPoint,
    getConnectionPoints,
} from "../lib/connection-geometry";
import type { WidgetNode } from "../model/widget-node";

// Not over a block yet: from the block's border towards the cursor.
const toPointer = (fromNode: InternalNode, pointer: XYPosition) => ({
    from: getBorderPoint(fromNode, pointer),
    to: pointer,
});

/**
 * The arrow drawn while the member drags a new connection. Over a block it
 * can connect to, it is drawn exactly where the connection will be.
 */
export function ConnectionPreview({
    fromNode,
    toNode,
    toX,
    toY,
    connectionStatus,
}: ConnectionLineComponentProps<WidgetNode>) {
    const { from, to } =
        toNode !== null && connectionStatus === "valid"
            ? getConnectionPoints(fromNode, toNode)
            : toPointer(fromNode, { x: toX, y: toY });
    const { line, head } = getArrowPaths(from, to);

    return (
        <g
            className={`connection-arrow ${
                connectionStatus === "invalid" ? "invalid" : ""
            }`}
        >
            <path d={line} className="connection-arrow__line" />
            <path d={head} className="connection-arrow__head" />
        </g>
    );
}
