import { useReactFlow, type NodeProps } from "@xyflow/react";
import type { WidgetNode } from "./types.ts";

export function WidgetNodeView({ id, data, selected }: NodeProps<WidgetNode>) {
    const { updateNodeData } = useReactFlow<WidgetNode>();

    return (
        <div
            className={`w-48 rounded-md [border:var(--xy-node-border-default)] bg-(--xy-node-background-color-default) p-2 text-xs text-(--xy-node-color-default) ${
                selected ? "ring-2 ring-purple-500" : ""
            }`}
        >
            {data.widget_type === "text" ? (
                // "nodrag" lets the user select text and place the caret
                // instead of dragging the node around.
                <textarea
                    className="nodrag block min-h-12 w-full resize-none bg-transparent outline-none field-sizing-content placeholder:opacity-50"
                    placeholder="Type something…"
                    aria-label="Text block content"
                    value={data.content}
                    onChange={(event) =>
                        updateNodeData(id, { content: event.target.value })
                    }
                />
            ) : (
                <div className="text-center">{data.label}</div>
            )}
        </div>
    );
}
