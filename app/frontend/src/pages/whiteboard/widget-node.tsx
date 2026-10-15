import { use, useEffect, useRef, useState } from "react";
import { useReactFlow, type NodeProps } from "@xyflow/react";
import { SaveWidgetContext } from "./save-widget-context.ts";
import type { WidgetNode } from "./types.ts";

// Wait for a pause in typing before saving the text to the server.
const SAVE_CONTENT_DELAY_MS = 500;

export function WidgetNodeView({ id, data, selected }: NodeProps<WidgetNode>) {
    const { updateNodeData } = useReactFlow<WidgetNode>();
    const saveWidget = use(SaveWidgetContext);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    // The text becomes editable only after a click, so pressing on the block
    // and moving the mouse drags it instead of focusing the text.
    const [isEditing, setIsEditing] = useState(false);

    // Focus the text with the caret at the end once editing starts.
    useEffect(() => {
        const textArea = textAreaRef.current;
        if (!isEditing || !textArea) return;

        textArea.focus();
        textArea.setSelectionRange(textArea.value.length, textArea.value.length);
    }, [isEditing]);

    return (
        <div
            // React Flow does not fire a click after a drag.
            onClick={() => {
                if (data.widget_type === "text") setIsEditing(true);
            }}
            className={`w-48 rounded-md [border:var(--xy-node-border-default)] bg-(--xy-node-background-color-default) p-2 text-xs text-(--xy-node-color-default) ${
                data.widget_type === "ai" ? "border-blue-500!" : ""
            } ${selected ? "ring-2 ring-purple-500" : ""}`}
        >
            {data.widget_type === "text" ? (
                // While editing, "nodrag" lets the user select text and place
                // the caret instead of dragging the node around. Otherwise the
                // text ignores the mouse, so the block can be dragged by it.
                <textarea
                    ref={textAreaRef}
                    className={`block min-h-12 w-full resize-none bg-transparent outline-none field-sizing-content placeholder:opacity-50 ${
                        isEditing ? "nodrag cursor-text" : "pointer-events-none"
                    }`}
                    readOnly={!isEditing}
                    tabIndex={isEditing ? 0 : -1}
                    placeholder="Type something…"
                    aria-label="Text block content"
                    value={data.content}
                    onChange={(event) => {
                        const content = event.target.value;
                        updateNodeData(id, { content });
                        saveWidget(id, { content }, SAVE_CONTENT_DELAY_MS);
                    }}
                    onBlur={() => setIsEditing(false)}
                    onKeyDown={(event) => {
                        if (event.key === "Escape") event.currentTarget.blur();
                    }}
                />
            ) : (
                <div className="text-center">{data.label}</div>
            )}
        </div>
    );
}
