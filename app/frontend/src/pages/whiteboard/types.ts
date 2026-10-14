import type { Node } from "@xyflow/react";

export type WidgetType = "text" | "ai";

export type WidgetNodeData = {
    label: string;
    widget_type: WidgetType;
};

export type WidgetNode = Node<WidgetNodeData>;
