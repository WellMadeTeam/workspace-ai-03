import { request } from "@/shared/api";

export type Connection = {
    id: string;
    source_widget_id: string;
    target_widget_id: string;
};

export const listConnections = (boardId: string, signal?: AbortSignal) =>
    request<Connection[]>(
        `/connections?boardId=${encodeURIComponent(boardId)}`,
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
