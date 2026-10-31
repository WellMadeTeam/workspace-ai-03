import { Handle, Position, useConnection, type NodeProps } from "@xyflow/react";
import type { WidgetNode } from "../model/widget-node";
import { AiWidgetNode } from "./ai-widget-node";
import { ImageWidgetNode } from "./image-widget-node";
import { TextWidgetNode } from "./text-widget-node";

const SIDES = [Position.Top, Position.Right, Position.Bottom, Position.Left];

export function WidgetNodeView({ id, data, selected }: NodeProps<WidgetNode>) {
    const isConnecting = useConnection((connection) => connection.inProgress);
    // The cursor is on this block or one of its handles, and the connection
    // being dragged can end here.
    const isDropTarget = useConnection(
        (connection) =>
            connection.inProgress &&
            connection.isValid === true &&
            connection.toNode?.id === id,
    );

    return (
        <>
            {data.widget_type === "text" && (
                <TextWidgetNode id={id} data={data} selected={selected} />
            )}
            {data.widget_type === "ai" && (
                <AiWidgetNode id={id} data={data} selected={selected} />
            )}
            {data.widget_type === "image" && (
                <ImageWidgetNode id={id} data={data} selected={selected} />
            )}
            {/*
             * Covers the whole block while a connection is dragged, so it can
             * be dropped anywhere on the block, not only on a handle. Always
             * rendered, so React Flow knows its bounds when the drag starts.
             */}
            <Handle
                id="block"
                type="source"
                position={Position.Top}
                isConnectableStart={false}
                className={`block-drop-target ${isConnecting ? "is-connecting" : ""} ${
                    isDropTarget ? "is-drop-target" : ""
                }`}
            />
            {/*
             * Hints for where to start dragging a connection. The arrows
             * connect blocks, not handles, so any handle can start or end
             * one and the arrow ends are not attached to them.
             */}
            {SIDES.map((side) => (
                <Handle
                    key={side}
                    id={side}
                    type="source"
                    position={side}
                    className="widget-handle"
                />
            ))}
        </>
    );
}
