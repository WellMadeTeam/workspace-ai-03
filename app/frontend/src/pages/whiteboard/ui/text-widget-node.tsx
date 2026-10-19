import { use, useRef, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { editableFieldClassName, useFocusOnEdit } from "../lib/editable-field";
import { SaveWidgetContext } from "../model/save-widget";
import type { TextWidgetData, WidgetNode } from "../model/widget-node";

// Wait for a pause in typing before saving the text to the server.
const SAVE_CONTENT_DELAY_MS = 500;

type TextWidgetNodeProps = {
    id: string;
    data: TextWidgetData;
    selected: boolean;
};

export function TextWidgetNode({ id, data, selected }: TextWidgetNodeProps) {
    const { updateNodeData } = useReactFlow<WidgetNode>();
    const saveWidget = use(SaveWidgetContext);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    // The text becomes editable only after a click, so pressing on the block
    // and moving the mouse drags it instead of focusing the field.
    const [isEditing, setIsEditing] = useState(false);

    useFocusOnEdit(textAreaRef, isEditing);

    return (
        <div
            // React Flow does not fire a click after a drag.
            onClick={() => setIsEditing(true)}
            className={`w-48 rounded-md [border:var(--xy-node-border-default)] bg-(--xy-node-background-color-default) p-2 text-xs text-(--xy-node-color-default) ${
                selected ? "ring-2 ring-purple-500" : ""
            }`}
        >
            <textarea
                ref={textAreaRef}
                className={`${editableFieldClassName(isEditing)} min-h-12 resize-none field-sizing-content`}
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
        </div>
    );
}
