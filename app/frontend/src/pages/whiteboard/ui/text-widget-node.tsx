import { use, useRef, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { MAX_TITLE_LENGTH } from "../config/widget-title";
import { editableFieldClassName, useFocusOnEdit } from "../lib/editable-field";
import { SaveWidgetContext } from "../model/save-widget";
import { useTextContent } from "../model/use-text-content";
import type { TextWidgetData, WidgetNode } from "../model/widget-node";
import { MarkdownContent } from "./markdown-content";

type TextWidgetNodeProps = {
    id: string;
    data: TextWidgetData;
    selected: boolean;
};

export function TextWidgetNode({ id, data, selected }: TextWidgetNodeProps) {
    const { updateNodeData } = useReactFlow<WidgetNode>();
    const saveWidget = use(SaveWidgetContext);
    const textContent = useTextContent(id, data.content);
    const titleInputRef = useRef<HTMLInputElement>(null);
    // The text becomes editable only after a double click, like the AI block's
    // title. A single click (or Shift/Cmd/Ctrl-click) only selects the block,
    // so several blocks can be selected and a right click opens the context
    // menu, and pressing on the block and moving the mouse drags it.
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [titleDraft, setTitleDraft] = useState("");

    useFocusOnEdit(textContent.ref, isEditing);
    useFocusOnEdit(titleInputRef, isEditingTitle);

    const startEditingTitle = () => {
        if (isEditingTitle) return;
        setTitleDraft(data.label);
        setIsEditingTitle(true);
    };

    const commitTitle = () => {
        setIsEditingTitle(false);

        const label = titleDraft.trim() || "Text";
        if (label === data.label) return;

        updateNodeData(id, { label });
        saveWidget(id, { title: label });
    };

    return (
        <div
            onDoubleClick={() => setIsEditing(true)}
            style={
                data.highlightColor
                    ? {
                          outline: `3px solid ${data.highlightColor}`,
                          outlineOffset: 2,
                      }
                    : undefined
            }
            className={`w-48 rounded-md [border:var(--xy-node-border-default)] bg-(--xy-node-background-color-default) p-2 text-xs text-(--xy-node-color-default) ${
                selected ? "ring-2 ring-purple-500" : ""
            }`}
        >
            <input
                ref={titleInputRef}
                className={`${isEditingTitle ? editableFieldClassName(true) : "block w-full cursor-default bg-transparent outline-none"} mb-1 truncate text-center font-semibold`}
                readOnly={!isEditingTitle}
                tabIndex={isEditingTitle ? 0 : -1}
                maxLength={MAX_TITLE_LENGTH}
                aria-label="Text block title"
                value={isEditingTitle ? titleDraft : data.label}
                onDoubleClick={(event) => {
                    event.stopPropagation();
                    startEditingTitle();
                }}
                onChange={(event) => setTitleDraft(event.target.value)}
                onBlur={commitTitle}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === "Escape")
                        event.currentTarget.blur();
                }}
            />
            {isEditing ? (
                <textarea
                    {...textContent}
                    className={`${editableFieldClassName(true)} min-h-12 resize-none field-sizing-content`}
                    aria-label="Text block content"
                    onBlur={() => setIsEditing(false)}
                    onKeyDown={(event) => {
                        if (event.key === "Escape") event.currentTarget.blur();
                    }}
                />
            ) : (
                <div
                    className="min-h-12 cursor-text"
                    aria-label="Text block content"
                    onDoubleClick={() => setIsEditing(true)}
                >
                    {data.content ? (
                        <MarkdownContent content={data.content} />
                    ) : (
                        <span className="opacity-50">Type something…</span>
                    )}
                </div>
            )}
        </div>
    );
}
