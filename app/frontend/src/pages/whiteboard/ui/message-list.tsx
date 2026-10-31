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

export function MessageList({
    messages,
    isSending,
    onDelete,
}: MessageListProps) {
    const listEndRef = useRef<HTMLDivElement>(null);

    // Keep the newest message in view.
    useEffect(() => {
        listEndRef.current?.scrollIntoView({ block: "end" });
    }, [messages.length, isSending]);

    const deleteButton = (id: string, className = "") => (
        <button
            type="button"
            aria-label="Delete message"
            title="Delete message"
            onClick={() => onDelete(id)}
            className={`flex size-6 shrink-0 items-center justify-center
                rounded text-default-400
                opacity-0 transition-opacity
                hover:text-danger
                group-hover:opacity-100
                focus-visible:opacity-100
                ${className}`}
        >
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
                                className="group relative flex flex-col items-start gap-2
                                    self-stretch rounded-lg border border-danger/40
                                    px-3 py-2 text-xs text-danger"
                            >
                                <CircleAlert
                                    className="mt-px size-4 shrink-0"
                                    aria-hidden
                                />
                                <p className="break-words pr-8">
                                    <span className="font-semibold">System</span>
                                    <span aria-hidden> · </span>
                                    <span className="sr-only">: </span>
                                    {message.content}
                                </p>

                                {deleteButton(message.id, "absolute top-2 right-2 hover:!text-white")}
                            </li>
                        ) : message.role === "user" ? (
                            <li
                                key={message.id}
                                className="group flex max-w-[85%] items-end gap-1 self-end"
                            >
                                {deleteButton(message.id, "mb-0.5")}

                                <div
                                    className={`${bubbleClassName} min-w-0 bg-purple-500 text-white`}
                                >
                                    <span className="sr-only">You: </span>
                                    {message.content}
                                </div>
                            </li>
                        ) : (
                            <li
                                key={message.id}
                                className="group flex max-w-[85%] flex-col items-start
                                    gap-0.5 self-start"
                            >
                                <div className="flex w-full items-end gap-1">
                                    <p
                                        className={`${bubbleClassName} min-w-0 bg-(--surface-secondary)`}
                                    >
                                        <span className="sr-only">AI: </span>
                                        {message.content}
                                    </p>

                                    {deleteButton(message.id, "mb-0.5")}
                                </div>

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
