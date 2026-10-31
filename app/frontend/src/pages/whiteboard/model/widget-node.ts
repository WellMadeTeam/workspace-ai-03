import type { Node } from "@xyflow/react";
import type { Widget } from "../api/widget";
import { DEFAULT_AI_TITLE, DEFAULT_IMAGE_TITLE } from "../config/widget-title";

export type TextWidgetData = {
    widget_type: "text";
    label: string;
    content: string;
    highlightColor?: string;
};

export type AiWidgetData = {
    widget_type: "ai";
    label: string;
    highlightColor?: string;
};

// A rendered diagram, which is not used as context yet.
export type ImageWidgetData = {
    widget_type: "image";
    label: string;
    // The Mermaid code, which every member renders as the same picture.
    code: string;
    highlightColor?: string;
};

export type WidgetNodeData = TextWidgetData | AiWidgetData | ImageWidgetData;

export type WidgetNode = Node<WidgetNodeData, "widget">;

export type AiWidgetNode = Node<AiWidgetData, "widget">;

export type TextWidgetNode = Node<TextWidgetData, "widget">;

export type ImageWidgetNode = Node<ImageWidgetData, "widget">;

export const isAiNode = (node: WidgetNode): node is AiWidgetNode =>
    node.data.widget_type === "ai";

export const isTextNode = (node: WidgetNode): node is TextWidgetNode =>
    node.data.widget_type === "text";

const toNodeData = (widget: Widget): WidgetNodeData => {
    switch (widget.widget_type) {
        case "text":
            return {
                widget_type: "text",
                label: widget.title ?? "Untitled",
                content: widget.content ?? "",
            };
        case "image":
            return {
                widget_type: "image",
                label: widget.title ?? DEFAULT_IMAGE_TITLE,
                code: widget.content ?? "",
            };
        default:
            return {
                widget_type: "ai",
                label: widget.title ?? DEFAULT_AI_TITLE,
            };
    }
};

export const toNode = (widget: Widget): WidgetNode => ({
    id: widget.id,
    type: "widget",
    position: { x: widget.x, y: widget.y },
    data: toNodeData(widget),
});

const isSameData = (a: WidgetNodeData, b: WidgetNodeData) => {
    if (a.widget_type === "text" && b.widget_type === "text") {
        return a.label === b.label && a.content === b.content;
    }

    if (a.widget_type === "image" && b.widget_type === "image") {
        return a.label === b.label && a.code === b.code;
    }

    return (
        a.widget_type === "ai" && b.widget_type === "ai" && a.label === b.label
    );
};

// Applies the server state to a node already on the canvas, keeping the
// node object (and its local flags like selection) when nothing changed.
export const mergeNode = (node: WidgetNode, widget: Widget): WidgetNode => {
    const data = toNodeData(widget);
    const samePosition =
        node.position.x === widget.x && node.position.y === widget.y;

    if (samePosition && isSameData(node.data, data)) return node;

    return { ...node, position: { x: widget.x, y: widget.y }, data };
};

export const getNodeTitle = (data: WidgetNodeData) => {
    return data.label;
};
