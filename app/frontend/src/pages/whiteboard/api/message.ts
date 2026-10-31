import { request } from "@/shared/api";

// "system" messages come from the application, e.g. when the AI fails to answer.
export type MessageRole = "user" | "ai" | "system";

export type Message = {
    id: string;
    role: MessageRole;
    content: string;
    // Whether connected blocks were given to the AI as context for the answer.
    has_context: boolean;
    // Ids of the connected blocks the answer cites.
    references: string[];
};

export const listMessages = async (widgetId: string, signal?: AbortSignal) => {
    const { items } = await request<{ items: Message[] }>(
        `/messages?widgetId=${encodeURIComponent(widgetId)}`,
        { signal },
    );

    return items;
};

export const createMessage = (message: {
    widget_id: string;
    content: string;
}) =>
    // `reply` is the AI answer, or a "system" message if the AI failed to answer.
    request<{ user_message: Message; reply: Message }>("/messages", {
        method: "POST",
        body: JSON.stringify(message),
    });

export const deleteMessage = (messageId: string) =>
    request<void>(`/messages/${encodeURIComponent(messageId)}`, { method: "DELETE" });
