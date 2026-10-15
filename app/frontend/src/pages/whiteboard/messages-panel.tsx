import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Button, CloseButton, ScrollShadow, Surface, TextArea } from "@heroui/react";
import { useReactFlow } from "@xyflow/react";
import { MessageSquare, SendHorizontal } from "lucide-react";
import type { AiWidgetNode, Message, WidgetNode } from "./types.ts";

type MessagesPanelProps = {
    node: AiWidgetNode;
};

export function MessagesPanel({ node }: MessagesPanelProps) {
    const { updateNode, updateNodeData } = useReactFlow<WidgetNode>();
    const [draft, setDraft] = useState("");
    const listEndRef = useRef<HTMLDivElement>(null);
    const { label, messages } = node.data;

    // Keep the newest message in view.
    useEffect(() => {
        listEndRef.current?.scrollIntoView({ block: "end" });
    }, [messages.length]);

    const close = () => updateNode(node.id, { selected: false });

    const send = () => {
        const content = draft.trim();
        if (!content) return;

        const message: Message = { id: crypto.randomUUID(), role: "user", content };
        updateNodeData(node.id, { messages: [...messages, message] });
        setDraft("");
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        send();
    };

    // Enter sends, Shift+Enter inserts a new line.
    const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
            event.preventDefault();
            send();
        }
    };

    return (
        <Surface
            role="complementary"
            aria-label={`${label} messages`}
            className="flex h-[calc(100vh-2rem)] w-80 max-w-[calc(100vw-2rem)] flex-col rounded-2xl shadow-lg"
        >
            <header className="flex items-center gap-2 border-b border-(--border) px-4 py-3">
                <MessageSquare className="size-4" />
                <h2 className="flex-1 truncate text-sm font-semibold">{label}</h2>
                <CloseButton aria-label="Close messages" onPress={close} />
            </header>

            <ScrollShadow className="flex-1 overflow-y-auto px-4 py-3">
                {messages.length === 0 ? (
                    <p className="py-8 text-center text-sm opacity-60">
                        No messages yet. Ask something below.
                    </p>
                ) : (
                    <ul className="flex flex-col gap-2" aria-label="Messages">
                        {messages.map((message) => (
                            <li
                                key={message.id}
                                className={`max-w-[85%] whitespace-pre-wrap break-words rounded-xl px-3 py-2 text-sm ${
                                    message.role === "user"
                                        ? "self-end bg-purple-500 text-white"
                                        : "self-start bg-(--surface-secondary)"
                                }`}
                            >
                                <span className="sr-only">
                                    {message.role === "user" ? "You: " : "AI: "}
                                </span>
                                {message.content}
                            </li>
                        ))}
                    </ul>
                )}
                <div ref={listEndRef} />
            </ScrollShadow>

            <form className="flex items-end gap-2 border-t border-(--border) p-3" onSubmit={onSubmit}>
                <TextArea
                    aria-label="New message"
                    placeholder="Type a message…"
                    rows={1}
                    className="max-h-40 flex-1 resize-none field-sizing-content"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={onKeyDown}
                />
                <Button type="submit" isIconOnly aria-label="Send message" isDisabled={!draft.trim()}>
                    <SendHorizontal className="size-4" />
                </Button>
            </form>
        </Surface>
    );
}
