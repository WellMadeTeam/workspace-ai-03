import type { Node } from "@xyflow/react";
import type { Widget } from "../api/widget";
import { DEFAULT_AI_TITLE } from "../config/widget-title";

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

export type AiWidgetNode = Node<AiWidgetData, "widget">;

export const isAiNode = (node: WidgetNode): node is AiWidgetNode =>
    node.data.widget_type === "ai";

const toNodeData = (widget: Widget): WidgetNodeData =>
    widget.widget_type === "text"
        ? { widget_type: "text", content: widget.content ?? "" }
        : { widget_type: "ai", label: widget.title ?? DEFAULT_AI_TITLE };

export const toNode = (widget: Widget): WidgetNode => ({
    id: widget.id,
    type: "widget",
    position: { x: widget.x, y: widget.y },
    data: toNodeData(widget),
});

const isSameData = (a: WidgetNodeData, b: WidgetNodeData) =>
    a.widget_type === "text" && b.widget_type === "text"
        ? a.content === b.content
        : a.widget_type === "ai" &&
          b.widget_type === "ai" &&
          a.label === b.label;

// Applies the server state to a node already on the canvas, keeping the
// node object (and its local flags like selection) when nothing changed.
export const mergeNode = (node: WidgetNode, widget: Widget): WidgetNode => {
    const data = toNodeData(widget);
    const samePosition =
        node.position.x === widget.x && node.position.y === widget.y;

    if (samePosition && isSameData(node.data, data)) return node;

    return { ...node, position: { x: widget.x, y: widget.y }, data };
};

// A text block has no title, so it is named by the first line of its text.
export const getNodeTitle = (data: WidgetNodeData) => {
    if (data.widget_type === "ai") return data.label;

    const firstLine = data.content
        .split("\n")
        .map((line) => line.trim())
        .find(Boolean);

    return firstLine ?? "Empty text block";
};
