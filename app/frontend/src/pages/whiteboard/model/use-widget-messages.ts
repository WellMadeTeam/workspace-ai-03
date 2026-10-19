import { useCallback, useState } from "react";
import { usePolling } from "@/shared/lib";
import { createMessage, listMessages, type Message } from "../api/message";

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

    const send = useCallback(
        async (content: string) => {
            setPending({
                id: crypto.randomUUID(),
                role: "user",
                content,
                baseCount: messages.length,
            });

            try {
                await createMessage({ widget_id: widgetId, content });
            } catch {
                // The server keeps the user message even if the AI reply fails.
                setError("Could not get a reply. Try again.");
            } finally {
                setPending(null);
                void refresh();
            }
        },
        [messages.length, refresh, widgetId],
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
    };
}
