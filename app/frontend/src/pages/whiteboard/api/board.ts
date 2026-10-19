import { request } from "@/shared/api";

export const createBoard = (title: string) =>
    request<{ id: string }>("/boards", {
        method: "POST",
        body: JSON.stringify({ title }),
    });
