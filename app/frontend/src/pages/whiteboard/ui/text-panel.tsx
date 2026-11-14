import { CloseButton, TextArea } from "@heroui/react";
import { useReactFlow } from "@xyflow/react";
import { use, useState } from "react";
import { SaveWidgetContext } from "../model/save-widget";
import type { TextWidgetNode, WidgetNode } from "../model/widget-node";
import { SidePanel } from "./side-panel";
import { MarkdownContent } from "./markdown-content";

const SAVE_CONTENT_DELAY_MS = 500;

type TextPanelProps = {
    node: TextWidgetNode;
};

export function TextPanel({ node }: TextPanelProps) {
    const { updateNode, updateNodeData } = useReactFlow<WidgetNode>();
    const saveWidget = use(SaveWidgetContext);
    const [isEditing, setIsEditing] = useState(false);
    const { label, content } = node.data;

    const close = () => updateNode(node.id, { selected: false });

    return (
        <SidePanel label={`${label} text`}>
            <header className="flex items-center gap-2 border-b border-(--border) px-4 py-3">
                <h2 className="flex-1 truncate text-sm font-semibold">
                    {label}
                </h2>
                <button
                    type="button"
                    className="rounded px-2 py-1 text-xs hover:bg-(--surface-secondary)"
                    aria-label={isEditing ? "Preview text" : "Edit text"}
                    onClick={() => setIsEditing((editing) => !editing)}
                >
                    {isEditing ? "Preview" : "Edit"}
                </button>
                <CloseButton aria-label="Close text" onPress={close} />
            </header>

            {isEditing ? (
                <TextArea
                    aria-label="Text block content"
                    className="min-h-0 flex-1 resize-none p-4"
                    value={content}
                    onChange={(event) => {
                        const nextContent = event.target.value;
                        updateNodeData(node.id, { content: nextContent });
                        saveWidget(
                            node.id,
                            { content: nextContent },
                            SAVE_CONTENT_DELAY_MS,
                        );
                    }}
                />
            ) : (
                <div className="min-h-0 flex-1 overflow-y-auto p-4">
                    <MarkdownContent content={content} />
                </div>
            )}
        </SidePanel>
    );
}
