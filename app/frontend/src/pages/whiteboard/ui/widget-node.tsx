import type { NodeProps } from "@xyflow/react";
import type { WidgetNode } from "../model/widget-node";
import { AiWidgetNode } from "./ai-widget-node";
import { TextWidgetNode } from "./text-widget-node";

export function WidgetNodeView({ id, data, selected }: NodeProps<WidgetNode>) {
    return data.widget_type === "text" ? (
        <TextWidgetNode id={id} data={data} selected={selected} />
    ) : (
        <AiWidgetNode id={id} data={data} selected={selected} />
    );
}
