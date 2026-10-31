import { useState } from "react";
import { CloseButton } from "@heroui/react";
import { useReactFlow } from "@xyflow/react";
import { MessageSquare } from "lucide-react";
import { useWidgetMessages } from "../model/use-widget-messages";
import type { AiWidgetNode, WidgetNode } from "../model/widget-node";
import { MessageComposer } from "./message-composer";
import { ConfirmationDialog } from "./confirmation-dialog";
import { MessageList } from "./message-list";
import { SidePanel } from "./side-panel";

type MessagesPanelProps = {
    node: AiWidgetNode;
};

export function MessagesPanel({ node }: MessagesPanelProps) {
    const { updateNode } = useReactFlow<WidgetNode>();
    const { label } = node.data;
    const { messages, isSending, error, send, removeMessage } =
        useWidgetMessages(node.id);

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

            <MessageList
                messages={messages}
                isSending={isSending}
                onDelete={setDeletingMessage}
            />
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
