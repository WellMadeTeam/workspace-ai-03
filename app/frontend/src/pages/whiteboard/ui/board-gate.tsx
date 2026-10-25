import { Button, Spinner, Surface } from "@heroui/react";
import { SearchX, Users, WifiOff, type LucideIcon } from "lucide-react";
import { BOARD_MEMBER_LIMIT } from "../config/board-members";
import type { BoardConnectionError } from "../model/use-board-connection";

export type BoardGateState = "loading" | BoardConnectionError;

const errors: Record<
    BoardConnectionError,
    {
        icon: LucideIcon;
        title: string;
        description: string;
        canRetry: boolean;
        canCreateBoard: boolean;
    }
> = {
    not_found: {
        icon: SearchX,
        title: "Board not found",
        description: "The link may be wrong, or the board was removed.",
        canRetry: false,
        canCreateBoard: true,
    },
    unavailable: {
        icon: WifiOff,
        title: "Could not connect to server",
        description: "Check your connection and try again.",
        canRetry: true,
        canCreateBoard: false,
    },
    full: {
        icon: Users,
        title: `Maximum of ${BOARD_MEMBER_LIMIT} members reached The board is full`,
        description: "Someone has to leave before you can join.",
        canRetry: true,
        canCreateBoard: true,
    },
};

type BoardGateProps = {
    state: BoardGateState;
    isCreatingBoard: boolean;
    onRetry: () => void;
    onCreateBoard: () => void;
};

/** Shown instead of the board until it is loaded, or when it cannot be joined. */
export function BoardGate({
    state,
    isCreatingBoard,
    onRetry,
    onCreateBoard,
}: BoardGateProps) {
    return (
        <section className="flex h-screen w-screen items-center justify-center p-4">
            <Surface className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl p-8 text-center shadow-lg">
                {state === "loading" ? (
                    <div
                        role="status"
                        className="flex flex-col items-center gap-4"
                    >
                        <Spinner size="lg" />
                        <p className="text-sm text-muted">Loading the board…</p>
                    </div>
                ) : (
                    <BoardGateError
                        error={state}
                        isCreatingBoard={isCreatingBoard}
                        onRetry={onRetry}
                        onCreateBoard={onCreateBoard}
                    />
                )}
            </Surface>
        </section>
    );
}

type BoardGateErrorProps = Omit<BoardGateProps, "state"> & {
    error: BoardConnectionError;
};

function BoardGateError({
    error,
    isCreatingBoard,
    onRetry,
    onCreateBoard,
}: BoardGateErrorProps) {
    const {
        icon: Icon,
        title,
        description,
        canRetry,
        canCreateBoard,
    } = errors[error];

    return (
        <div role="alert" className="flex flex-col items-center gap-4">
            <Icon className="size-10 text-muted" aria-hidden />
            <div className="flex flex-col gap-1">
                <h1 className="text-lg font-medium">{title}</h1>
                <p className="text-sm text-muted">{description}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
                {canRetry && (
                    <Button
                        variant="primary"
                        isDisabled={isCreatingBoard}
                        onPress={onRetry}
                    >
                        Try again
                    </Button>
                )}
                {canCreateBoard && (
                    <Button
                        variant={canRetry ? "secondary" : "primary"}
                        isDisabled={isCreatingBoard}
                        onPress={onCreateBoard}
                    >
                        {isCreatingBoard && (
                            <Spinner size="sm" color="current" />
                        )}
                        Create new board
                    </Button>
                )}
            </div>
        </div>
    );
}
