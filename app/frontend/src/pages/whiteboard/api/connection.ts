import { request } from "@/shared/api";

export type Connection = {
    id: string;
    source_widget_id: string;
    target_widget_id: string;
};

/** Lists the connections that start at the widget. */
export const listWidgetConnections = (widgetId: string, signal?: AbortSignal) =>
    request<Connection[]>(
        `/connections/${encodeURIComponent(widgetId)}/connections`,
        { signal },
    );

export type NewConnection = Omit<Connection, "id">;

export const createConnection = (connection: NewConnection) =>
    request<Connection>("/connections", {
        method: "POST",
        body: JSON.stringify(connection),
    });

export const deleteConnection = (connectionId: string) =>
    request<void>(`/connections/${encodeURIComponent(connectionId)}`, {
        method: "DELETE",
    });
