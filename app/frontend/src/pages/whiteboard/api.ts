import type { Message, WidgetType } from "./types.ts";

// Requests go through the Vite dev server proxy (see vite.config.ts),
// so the backend does not need CORS.
const API_URL = "/api";

export type Widget = {
    id: string;
    widget_type: WidgetType;
    title: string | null;
    content: string | null;
    x: number;
    y: number;
};

export class ApiError extends Error {
    readonly status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
        ...init,
        headers: { "Content-Type": "application/json", ...init?.headers },
    });

    if (!response.ok) {
        throw new ApiError(
            response.status,
            `${init?.method ?? "GET"} ${path} failed with ${response.status}`,
        );
    }

    return response.json() as Promise<T>;
}

export const createBoard = (title: string) =>
    request<{ id: string }>("/boards", {
        method: "POST",
        body: JSON.stringify({ title }),
    });

export const listWidgets = async (boardId: string, signal?: AbortSignal) => {
    const { items } = await request<{ items: Widget[] }>(
        `/widgets?boardId=${encodeURIComponent(boardId)}`,
        { signal },
    );

    return items;
};

export const createWidget = (widget: {
    board_id: string;
    widget_type: WidgetType;
    title: string;
    x: number;
    y: number;
}) =>
    request<Widget>("/widgets", {
        method: "POST",
        body: JSON.stringify(widget),
    });

export type WidgetUpdate = Partial<Pick<Widget, "content" | "x" | "y">> & {
    title?: string;
};

export const updateWidget = (widgetId: string, update: WidgetUpdate) =>
    request<Widget>(`/widgets/${encodeURIComponent(widgetId)}`, {
        method: "PUT",
        body: JSON.stringify(update),
    });

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
