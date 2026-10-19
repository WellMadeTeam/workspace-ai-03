import { request } from "@/shared/api";

export type MessageRole = "user" | "ai";

export type Message = {
    id: string;
    role: MessageRole;
    content: string;
};

export const listMessages = async (widgetId: string, signal?: AbortSignal) => {
    const { items } = await request<{ items: Message[] }>(
        `/messages?widgetId=${encodeURIComponent(widgetId)}`,
        { signal },
    );

    return items;
};

export const createMessage = (message: { widget_id: string; content: string }) =>
    request<{ user_message: Message; ai_message: Message }>("/messages", {
        method: "POST",
        body: JSON.stringify(message),
    });
