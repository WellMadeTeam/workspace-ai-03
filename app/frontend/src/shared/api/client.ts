// Requests go through the Vite dev server proxy (see vite.config.ts),
// so the backend does not need CORS.
export const API_URL = "/api";

export class ApiError extends Error {
    readonly status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
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

    // 204 No Content has no body to parse.
    if (response.status === 204) return undefined as T;

    return response.json() as Promise<T>;
}
