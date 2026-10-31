import { request } from "@/shared/api";

// An image block shows a diagram, and its content is the Mermaid code.
export type WidgetType = "text" | "ai" | "image";

export type Widget = {
    id: string;
    widget_type: WidgetType;
    title: string | null;
    content: string | null;
    x: number;
    y: number;
};

export const listWidgets = async (boardId: string, signal?: AbortSignal) => {
    const { items } = await request<{ items: Widget[] }>(
        `/widgets?boardId=${encodeURIComponent(boardId)}`,
        { signal },
    );

    return items;
};

export type NewWidget = {
    board_id: string;
    widget_type: WidgetType;
    title: string;
    content?: string;
    x: number;
    y: number;
};

export const createWidget = (widget: NewWidget) =>
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

export const deleteWidget = (widgetId: string) =>
    request<void>(`/widgets/${encodeURIComponent(widgetId)}`, {
        method: "DELETE",
    });
