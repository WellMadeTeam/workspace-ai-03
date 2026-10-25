import { socketUrl } from "@/shared/api";

// Matches CloseCode in app/backend/src/realtime/utils/protocol.py.
export const BoardCloseCode = {
    BAD_REQUEST: 4400,
    ORIGIN_REJECTED: 4403,
    BOARD_NOT_FOUND: 4404,
    HEARTBEAT_TIMEOUT: 4408,
    REPLACED: 4409,
    BOARD_FULL: 4429,
    TOO_SLOW: 4430,
} as const;

export type Member = {
    client_id: string;
    label: string;
    color: string;
};

type ServerFrame<Type extends string, Data> = {
    type: Type;
    board_id: string;
    seq: number | null;
    origin: string | null;
    sent_at: string;
    data: Data;
};

// Only the events the client handles so far.
export type BoardSocketEvent =
    | ServerFrame<
          "connection.ready",
          { seq: number; you: Member; members: Member[] }
      >
    | ServerFrame<"member.joined", Member>
    | ServerFrame<"member.left", { client_id: string }>
    | ServerFrame<"ping", { nonce: string }>;

export const openBoardSocket = (boardId: string, clientId: string) =>
    new WebSocket(
        socketUrl(
            `/ws/boards/${encodeURIComponent(boardId)}?client_id=${encodeURIComponent(clientId)}`,
        ),
    );

export const sendPong = (socket: WebSocket, nonce: string) =>
    socket.send(JSON.stringify({ type: "pong", data: { nonce } }));
