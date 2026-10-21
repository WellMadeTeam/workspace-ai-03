import { NodeToolbar, type NodeProps } from "@xyflow/react";
import type { WidgetNode } from "../model/widget-node";
import { AiWidgetNode } from "./ai-widget-node";
import { DeleteWidgetButton } from "./delete-widget-button";
import { TextWidgetNode } from "./text-widget-node";

export function WidgetNodeView({ id, data, selected }: NodeProps<WidgetNode>) {
    return (
        <>
            {/* Shown above the block while it is the only selected one. */}
            <NodeToolbar>
                <DeleteWidgetButton id={id} />
            </NodeToolbar>
            {data.widget_type === "text" ? (
                <TextWidgetNode id={id} data={data} selected={selected} />
            ) : (
                <AiWidgetNode id={id} data={data} selected={selected} />
            )}
        </>
    );
}
