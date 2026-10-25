import { useEffect, useRef } from "react";
import { ScrollShadow } from "@heroui/react";
import { CircleAlert } from "lucide-react";
import type { Message } from "../api/message";
import { MessageReferences } from "./message-references";

const bubbleClassName =
    "whitespace-pre-wrap break-words rounded-xl px-3 py-2 text-sm";

type MessageListProps = {
    messages: Message[];
    isSending: boolean;
};

export function MessageList({ messages, isSending }: MessageListProps) {
    const listEndRef = useRef<HTMLDivElement>(null);

    // Keep the newest message in view.
    useEffect(() => {
        listEndRef.current?.scrollIntoView({ block: "end" });
    }, [messages.length, isSending]);

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
                                className="flex items-start gap-2 self-stretch rounded-lg border border-danger/40 px-3 py-2 text-xs text-danger"
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
                            </li>
                        ) : message.role === "user" ? (
                            <li
                                key={message.id}
                                className={`${bubbleClassName} max-w-[85%] self-end bg-purple-500 text-white`}
                            >
                                <span className="sr-only">You: </span>
                                {message.content}
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
                                {message.references.length > 0 && (
                                    <MessageReferences
                                        references={message.references}
                                    />
                                )}
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
