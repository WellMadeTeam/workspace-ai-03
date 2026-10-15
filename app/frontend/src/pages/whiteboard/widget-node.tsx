import { use } from "react";
import { useReactFlow, type NodeProps } from "@xyflow/react";
import { SaveWidgetContext } from "./save-widget-context.ts";
import type { WidgetNode } from "./types.ts";

// Wait for a pause in typing before saving the text to the server.
const SAVE_CONTENT_DELAY_MS = 500;

export function WidgetNodeView({ id, data, selected }: NodeProps<WidgetNode>) {
    const { updateNodeData } = useReactFlow<WidgetNode>();
    const saveWidget = use(SaveWidgetContext);

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
                    onChange={(event) => {
                        const content = event.target.value;
                        updateNodeData(id, { content });
                        saveWidget(id, { content }, SAVE_CONTENT_DELAY_MS);
                    }}
                />
            ) : (
                <div className="text-center">{data.label}</div>
            )}
        </div>
    );
}
