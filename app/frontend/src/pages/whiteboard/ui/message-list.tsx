import { useEffect, useRef } from "react";
import { ScrollShadow } from "@heroui/react";
import { CircleAlert, Trash2 } from "lucide-react";
import type { Message } from "../api/message";
import { MessageReferences } from "./message-references";

const bubbleClassName =
    "whitespace-pre-wrap break-words rounded-xl px-3 py-2 text-sm";

type MessageListProps = {
    messages: Message[];
    isSending: boolean;
    onDelete: (id: string) => void;
};

export function MessageList({ messages, isSending, onDelete }: MessageListProps) {
    const listEndRef = useRef<HTMLDivElement>(null);

    // Keep the newest message in view.
    useEffect(() => {
        listEndRef.current?.scrollIntoView({ block: "end" });
    }, [messages.length, isSending]);

    const deleteButton = (id: string) => (
        <button type="button" aria-label="Delete message" onClick={() => onDelete(id)}
            className="mt-1 self-end rounded p-1 opacity-70 hover:opacity-100">
            <Trash2 className="size-3.5" />
        </button>
    );

    return (
        <ScrollShadow className="flex-1 overflow-y-auto px-4 py-3">
            {messages.length === 0 ? (
                <p className="py-8 text-center text-sm opacity-60">
                    No messages yet. Ask something below.
                </p>
            ) : (
                <ul className="flex flex-col gap-2" aria-label="Messages">
                    {messages.map((message) =>
                        message.role === "system" ? (
                            // Not a chat bubble, so it does not read as an AI answer.
                            <li
                                key={message.id}
                                className="flex flex-col items-start gap-2 self-stretch rounded-lg border border-danger/40 px-3 py-2 text-xs text-danger"
                            >
                                <CircleAlert
                                    className="mt-px size-4 shrink-0"
                                    aria-hidden
                                />
                                <p className="break-words">
                                    <span className="font-semibold">
                                        System
                                    </span>
                                    <span aria-hidden> · </span>
                                    <span className="sr-only">: </span>
                                    {message.content}
                                </p>
                                {deleteButton(message.id)}
                            </li>
                        ) : message.role === "user" ? (
                            <li
                                key={message.id}
                                className={`${bubbleClassName} flex max-w-[85%] flex-col self-end bg-purple-500 text-white`}
                            >
                                <span className="sr-only">You: </span>
                                {message.content}
                                {deleteButton(message.id)}
                            </li>
                        ) : (
                            <li
                                key={message.id}
                                className="flex max-w-[85%] flex-col items-start gap-0.5 self-start"
                            >
                                <p
                                    className={`${bubbleClassName} max-w-full bg-(--surface-secondary)`}
                                >
                                    <span className="sr-only">AI: </span>
                                    {message.content}
                                </p>
                                {deleteButton(message.id)}
                                {message.references.length > 0 && (
                                    <MessageReferences
                                        references={message.references}
                                    />
                                )}
                                {deleteButton(message.id)}
                            </li>
                        ),
                    )}
                </ul>
            )}
            {isSending && (
                <p className="mt-2 text-sm opacity-60" role="status">
                    AI is thinking…
                </p>
            )}
            <div ref={listEndRef} />
        </ScrollShadow>
    );
}
