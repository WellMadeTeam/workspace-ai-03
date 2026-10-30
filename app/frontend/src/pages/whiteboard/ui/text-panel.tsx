import { CloseButton, Surface, TextArea } from "@heroui/react";
import { useReactFlow } from "@xyflow/react";
import { use } from "react";
import { SaveWidgetContext } from "../model/save-widget";
import type { TextWidgetNode, WidgetNode } from "../model/widget-node";

const SAVE_CONTENT_DELAY_MS = 500;

type TextPanelProps = {
    node: TextWidgetNode;
};

export function TextPanel({ node }: TextPanelProps) {
    const { updateNode, updateNodeData } = useReactFlow<WidgetNode>();
    const saveWidget = use(SaveWidgetContext);
    const { label, content } = node.data;

    const close = () => updateNode(node.id, { selected: false });

    return (
        <Surface
            role="complementary"
            aria-label={`${label} text`}
            className="flex h-[calc(100vh-2rem)] w-80 max-w-[calc(100vw-2rem)] flex-col rounded-2xl shadow-lg"
        >
            <header className="flex items-center gap-2 border-b border-(--border) px-4 py-3">
                <h2 className="flex-1 truncate text-sm font-semibold">
                    {label}
                </h2>
                <CloseButton aria-label="Close text" onPress={close} />
            </header>

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
        </Surface>
    );
}
