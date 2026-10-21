import { API_URL } from "./client";

/** WebSocket URL of an API path, on the same host as the page, like `request`. */
export function socketUrl(path: string) {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";

    return `${protocol}//${window.location.host}${API_URL}${path}`;
}
