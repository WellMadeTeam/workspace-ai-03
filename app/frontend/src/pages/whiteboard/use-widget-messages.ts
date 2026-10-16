import { useCallback, useEffect, useRef, useState } from "react";
import { createMessage, listMessages } from "./api.ts";
import type { Message } from "./types.ts";

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
    // Only the most recently started request may update the messages, so a
    // slow poll cannot replace a newer list.
    const latestRequest = useRef(0);

    const refresh = useCallback(
        async (signal?: AbortSignal) => {
            const requestId = ++latestRequest.current;

            try {
                const items = await listMessages(widgetId, signal);
                if (requestId !== latestRequest.current) return;

                setMessages(items);
                setError(null);
            } catch {
                if (signal?.aborted || requestId !== latestRequest.current)
                    return;

                setError("Could not load messages. Retrying…");
            }
        },
        [widgetId],
    );

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

    useEffect(() => {
        const controller = new AbortController();
        void refresh(controller.signal);
        const interval = setInterval(
            () => void refresh(controller.signal),
            MESSAGES_POLL_INTERVAL_MS,
        );

        return () => {
            clearInterval(interval);
            controller.abort();
        };
    }, [refresh]);

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
