import { useEffect, useRef } from "react";
import { ScrollShadow } from "@heroui/react";
import type { Message } from "../api/message";

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
            {isSending && (
                <p className="mt-2 text-sm opacity-60" role="status">
                    AI is thinking…
                </p>
            )}
            <div ref={listEndRef} />
        </ScrollShadow>
    );
}
