import type { Node } from "@xyflow/react";

export type WidgetType = "text" | "ai";

export type TextWidgetData = {
    widget_type: "text";
    content: string;
};

export type AiWidgetData = {
    widget_type: "ai";
    label: string;
};

export type WidgetNodeData = TextWidgetData | AiWidgetData;

export type WidgetNode = Node<WidgetNodeData, "widget">;
