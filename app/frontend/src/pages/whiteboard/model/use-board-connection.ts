import { useCallback, useEffect, useState } from "react";
import {
    BoardCloseCode,
    openBoardSocket,
    sendPong,
    type BoardSocketEvent,
} from "../api/board-socket";
import { CLIENT_ID } from "./client-id";

// A server that accepts the connection but never says it is ready counts as unavailable.
const CONNECT_TIMEOUT_MS = 10_000;
const RECONNECT_BASE_MS = 500;
const RECONNECT_MAX_MS = 30_000;

export type BoardConnectionError = "not_found" | "unavailable" | "full";

export type BoardConnection =
    | { status: "connecting" }
    | { status: "live" }
    // The board was open and the socket dropped; it reconnects on its own.
    | { status: "reconnecting" }
    | { status: "error"; reason: BoardConnectionError };

const CONNECTING: BoardConnection = { status: "connecting" };

/**
 * Keeps the board's WebSocket open: answers the server's pings, reconnects
 * after a drop, and reports why the board cannot be joined. `retry` opens a
 * new connection after an error.
 */
export function useBoardConnection(boardId: string | null) {
    const [attempt, setAttempt] = useState(0);
    // Every board and retry starts as "connecting", so the state is stored
    // with the attempt it belongs to instead of being reset in the effect.
    const key = boardId && `${boardId}#${attempt}`;
    const [state, setState] = useState<{
        key: string | null;
        connection: BoardConnection;
    }>({ key: null, connection: CONNECTING });

    useEffect(() => {
        if (!boardId) return;

        let socket: WebSocket | null = null;
        let wasLive = false;
        let reconnects = 0;
        let connectTimer: ReturnType<typeof setTimeout> | undefined;
        let reconnectTimer: ReturnType<typeof setTimeout> | undefined;

        const report = (connection: BoardConnection) =>
            setState({ key, connection });

        const connect = () => {
            const current = openBoardSocket(boardId, CLIENT_ID);
            socket = current;
            connectTimer = setTimeout(() => current.close(), CONNECT_TIMEOUT_MS);

            current.onmessage = (message) => {
                const event = JSON.parse(message.data) as BoardSocketEvent;

                if (event.type === "connection.ready") {
                    clearTimeout(connectTimer);
                    wasLive = true;
                    reconnects = 0;
                    report({ status: "live" });
                } else if (event.type === "ping") {
                    sendPong(current, event.data.nonce);
                }
            };

            current.onclose = (event) => {
                clearTimeout(connectTimer);

                if (event.code === BoardCloseCode.BOARD_NOT_FOUND) {
                    report({ status: "error", reason: "not_found" });
                } else if (event.code === BoardCloseCode.BOARD_FULL) {
                    report({ status: "error", reason: "full" });
                } else if (event.code === BoardCloseCode.REPLACED) {
                    // A newer socket of this tab took over; it reports from now on.
                } else if (!wasLive) {
                    report({ status: "error", reason: "unavailable" });
                } else {
                    report({ status: "reconnecting" });
                    // Exponential backoff with full jitter, so clients that
                    // lost the server together do not return all at once.
                    const delay =
                        Math.random() *
                        Math.min(
                            RECONNECT_MAX_MS,
                            RECONNECT_BASE_MS * 2 ** reconnects++,
                        );
                    reconnectTimer = setTimeout(() => {
                        reconnectTimer = undefined;
                        connect();
                    }, delay);
                }
            };
        };

        // Coming back online should not wait for the backoff.
        const reconnectNow = () => {
            if (reconnectTimer === undefined) return;
            clearTimeout(reconnectTimer);
            reconnectTimer = undefined;
            connect();
        };

        connect();
        window.addEventListener("online", reconnectNow);

        return () => {
            window.removeEventListener("online", reconnectNow);
            clearTimeout(connectTimer);
            clearTimeout(reconnectTimer);
            if (socket) {
                // Detached first, so a closing socket cannot report anything.
                socket.onmessage = null;
                socket.onclose = null;
                socket.close();
            }
        };
    }, [boardId, key]);

    const retry = useCallback(() => setAttempt((current) => current + 1), []);

    const connection = state.key === key ? state.connection : CONNECTING;

    return { connection, retry };
}
