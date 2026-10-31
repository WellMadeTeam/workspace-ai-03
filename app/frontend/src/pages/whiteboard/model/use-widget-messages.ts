import { useCallback, useState } from "react";
import { randomUUID, usePolling } from "@/shared/lib";
import {
    createMessage,
    deleteMessage,
    listMessages,
    type Message,
} from "../api/message";

const MESSAGES_POLL_INTERVAL_MS = 2000;

// A sent message shown until the server returns it. `baseCount` is the number
// of messages loaded when it was sent, so it hides once the list grows.
type PendingMessage = Message & { baseCount: number };

/**
 * Loads the messages of an AI widget, polling every 2 seconds, and sends
 * new messages to the server.
 */
export function useWidgetMessages(widgetId: string) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [pending, setPending] = useState<PendingMessage | null>(null);
    const [error, setError] = useState<string | null>(null);

    const refresh = usePolling({
        load: useCallback(
            (signal?: AbortSignal) => listMessages(widgetId, signal),
            [widgetId],
        ),
        onData: useCallback((items: Message[]) => {
            setMessages(items);
            setError(null);
        }, []),
        onError: useCallback(
            () => setError("Could not load messages. Retrying…"),
            [],
        ),
        intervalMs: MESSAGES_POLL_INTERVAL_MS,
    });

    // Resolves to false when the query got no AI answer, so the composer can
    // give the text back to the member.
    const send = useCallback(
        async (content: string) => {
            setPending({
                id: randomUUID(),
                role: "user",
                content,
                has_context: false,
                references: [],
                baseCount: messages.length,
            });

            try {
                const { reply } = await createMessage({
                    widget_id: widgetId,
                    content,
                });
                // The server saves the failure as a system message, so every
                // member sees it in the list.
                return reply.role === "ai";
            } catch {
                setError("Could not send the message. Try again.");
                return false;
            } finally {
                setPending(null);
                void refresh();
            }
        },
        [messages.length, refresh, widgetId],
    );

    const removeMessage = useCallback(
        async (id: string) => {
            try {
                await deleteMessage(id);
                setMessages((current) =>
                    current.filter((message) => message.id !== id),
                );
                void refresh();
            } catch {
                setError("Could not delete the message.");
            }
        },
        [refresh],
    );

    const visibleMessages =
        pending && messages.length <= pending.baseCount
            ? [...messages, pending]
            : messages;

    return {
        messages: visibleMessages,
        isSending: pending !== null,
        error,
        send,
        removeMessage,
    };
}
