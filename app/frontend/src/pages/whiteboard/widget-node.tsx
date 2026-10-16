import { use, useEffect, useRef, useState } from "react";
import { useReactFlow, type NodeProps } from "@xyflow/react";
import { SaveWidgetContext } from "./save-widget-context.ts";
import type { WidgetNode } from "./types.ts";

// Wait for a pause in typing before saving the text to the server.
const SAVE_CONTENT_DELAY_MS = 500;

// Shown and saved when an AI block's title is left empty.
const DEFAULT_AI_TITLE = "AI";
// The server rejects longer titles.
const MAX_TITLE_LENGTH = 200;

export function WidgetNodeView({ id, data, selected }: NodeProps<WidgetNode>) {
    const { updateNodeData } = useReactFlow<WidgetNode>();
    const saveWidget = use(SaveWidgetContext);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const titleInputRef = useRef<HTMLInputElement>(null);
    // The text becomes editable only after a click (the title after a double
    // click, as a click opens the messages panel), so pressing on the block
    // and moving the mouse drags it instead of focusing the field.
    const [isEditing, setIsEditing] = useState(false);
    // The title is saved when editing ends, so polling cannot overwrite it
    // while the user types and an empty title is never sent to the server.
    const [titleDraft, setTitleDraft] = useState("");

    // Focus the field with the caret at the end once editing starts.
    useEffect(() => {
        const field = textAreaRef.current ?? titleInputRef.current;
        if (!isEditing || !field) return;

        field.focus();
        field.setSelectionRange(field.value.length, field.value.length);
    }, [isEditing]);

    const startEditing = () => {
        if (isEditing) return;
        if (data.widget_type === "ai") setTitleDraft(data.label);
        setIsEditing(true);
    };

    const commitTitle = () => {
        setIsEditing(false);
        if (data.widget_type !== "ai") return;

        const title = titleDraft.trim() || DEFAULT_AI_TITLE;
        if (title === data.label) return;

        updateNodeData(id, { label: title });
        saveWidget(id, { title });
    };

    // While editing, "nodrag" lets the user select text and place the caret
    // instead of dragging the node around. Otherwise the field ignores the
    // mouse, so the block can be dragged by it.
    const fieldClassName = `block w-full bg-transparent outline-none placeholder:opacity-50 ${
        isEditing ? "nodrag cursor-text" : "pointer-events-none"
    }`;

    return (
        <div
            // React Flow does not fire a click after a drag.
            onClick={data.widget_type === "text" ? startEditing : undefined}
            onDoubleClick={data.widget_type === "ai" ? startEditing : undefined}
            className={`w-48 rounded-md [border:var(--xy-node-border-default)] bg-(--xy-node-background-color-default) p-2 text-xs text-(--xy-node-color-default) ${
                data.widget_type === "ai" ? "border-blue-500!" : ""
            } ${selected ? "ring-2 ring-purple-500" : ""}`}
        >
            {data.widget_type === "text" ? (
                <textarea
                    ref={textAreaRef}
                    className={`${fieldClassName} min-h-12 resize-none field-sizing-content`}
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
                <input
                    ref={titleInputRef}
                    className={`${fieldClassName} truncate text-center`}
                    readOnly={!isEditing}
                    tabIndex={isEditing ? 0 : -1}
                    maxLength={MAX_TITLE_LENGTH}
                    placeholder={DEFAULT_AI_TITLE}
                    aria-label="AI block title"
                    value={isEditing ? titleDraft : data.label}
                    onChange={(event) => setTitleDraft(event.target.value)}
                    onBlur={commitTitle}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === "Escape")
                            event.currentTarget.blur();
                    }}
                />
            )}
        </div>
    );
}
