import { use, useRef, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { DEFAULT_AI_TITLE, MAX_TITLE_LENGTH } from "../config/widget-title";
import { editableFieldClassName, useFocusOnEdit } from "../lib/editable-field";
import { SaveWidgetContext } from "../model/save-widget";
import type { AiWidgetData, WidgetNode } from "../model/widget-node";

type AiWidgetNodeProps = {
    id: string;
    data: AiWidgetData;
    selected: boolean;
};

export function AiWidgetNode({ id, data, selected }: AiWidgetNodeProps) {
    const { updateNodeData } = useReactFlow<WidgetNode>();
    const saveWidget = use(SaveWidgetContext);
    const titleInputRef = useRef<HTMLInputElement>(null);
    // The title becomes editable only after a double click (a click opens the
    // messages panel), so pressing on the block and moving the mouse drags it
    // instead of focusing the field.
    const [isEditing, setIsEditing] = useState(false);
    // The title is saved when editing ends, so polling cannot overwrite it
    // while the user types and an empty title is never sent to the server.
    const [titleDraft, setTitleDraft] = useState("");

    useFocusOnEdit(titleInputRef, isEditing);

    const startEditing = () => {
        if (isEditing) return;
        setTitleDraft(data.label);
        setIsEditing(true);
    };

    const commitTitle = () => {
        setIsEditing(false);

        const title = titleDraft.trim() || DEFAULT_AI_TITLE;
        if (title === data.label) return;

        updateNodeData(id, { label: title });
        saveWidget(id, { title });
    };

    return (
        <div
            onDoubleClick={startEditing}
            style={
                data.highlightColor
                    ? {
                          outline: `3px solid ${data.highlightColor}`,
                          outlineOffset: 2,
                      }
                    : undefined
            }
            className={`w-48 rounded-md [border:var(--xy-node-border-default)] border-blue-500! bg-(--xy-node-background-color-default) p-2 text-xs text-(--xy-node-color-default) ${
                selected ? "ring-2 ring-purple-500" : ""
            }`}
        >
            <input
                ref={titleInputRef}
                className={`${editableFieldClassName(isEditing)} truncate text-center`}
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
        </div>
    );
}
