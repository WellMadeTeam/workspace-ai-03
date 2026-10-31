import { useCallback, useRef, useState } from "react";
import { CloseButton } from "@heroui/react";
import { useReactFlow } from "@xyflow/react";
import { MessageSquare } from "lucide-react";
import type { NewWidget } from "../api/widget";
import { DEFAULT_IMAGE_TITLE } from "../config/widget-title";
import { AddDiagramContext, type AddDiagram } from "../model/add-diagram";
import { useWidgetMessages } from "../model/use-widget-messages";
import type { AiWidgetNode, WidgetNode } from "../model/widget-node";
import { MessageComposer } from "./message-composer";
import { ConfirmationDialog } from "./confirmation-dialog";
import { MessageList } from "./message-list";
import { SidePanel } from "./side-panel";

// Where a diagram goes below its AI block, and how far each next one moves,
// so diagrams added one after another do not cover each other.
const DIAGRAM_GAP = 40;
const DIAGRAM_STAGGER = 24;

type MessagesPanelProps = {
    node: AiWidgetNode;
    // Resolves to whether the block was added.
    onAddWidget: (widget: Omit<NewWidget, "board_id">) => Promise<boolean>;
};

export function MessagesPanel({ node, onAddWidget }: MessagesPanelProps) {
    const { updateNode } = useReactFlow<WidgetNode>();
    const { label } = node.data;
    const { messages, isSending, error, send, removeMessage } =
        useWidgetMessages(node.id);
    const addedDiagramsRef = useRef(0);
    const { x, y } = node.position;
    const height = node.measured?.height ?? 0;

    const addDiagram: AddDiagram = useCallback(
        (code) => {
            const offset = addedDiagramsRef.current++ * DIAGRAM_STAGGER;

            return onAddWidget({
                widget_type: "image",
                title: DEFAULT_IMAGE_TITLE,
                content: code,
                x: x + offset,
                y: y + height + DIAGRAM_GAP + offset,
            });
        },
        [onAddWidget, x, y, height],
    );

    const [deletingMessage, setDeletingMessage] = useState<string | null>(null);
    const close = () => updateNode(node.id, { selected: false });

    return (
        <SidePanel label={`${label} messages`}>
            <header className="flex items-center gap-2 border-b border-(--border) px-4 py-3">
                <MessageSquare className="size-4" />
                <h2 className="flex-1 truncate text-sm font-semibold">
                    {label}
                </h2>
                <CloseButton aria-label="Close messages" onPress={close} />
            </header>

            <AddDiagramContext value={addDiagram}>
                <MessageList
                    messages={messages}
                    isSending={isSending}
                    onDelete={setDeletingMessage}
                />
            </AddDiagramContext>
            <ConfirmationDialog
                message={
                    deletingMessage
                        ? "Are you sure you want to delete this message?"
                        : null
                }
                onCancel={() => setDeletingMessage(null)}
                onConfirm={() => {
                    if (deletingMessage) void removeMessage(deletingMessage);
                    setDeletingMessage(null);
                }}
            />

            {error && (
                <p className="px-4 pb-2 text-sm text-danger" role="alert">
                    {error}
                </p>
            )}

            <MessageComposer isSending={isSending} onSend={send} />
        </SidePanel>
    );
}
