import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { createBoard } from "../api/board";

const BOARD_PARAM = "board";

/**
 * Returns the board id from the URL. On the first visit without one, creates
 * a board and remembers its id in the query parameters. `createNewBoard`
 * moves to a new board, keeping the current one in the browser history.
 */
export function useBoardId() {
    const [searchParams, setSearchParams] = useSearchParams();
    const boardId = searchParams.get(BOARD_PARAM);
    const [isCreating, setIsCreating] = useState(false);
    const [createFailed, setCreateFailed] = useState(false);
    // The ref survives StrictMode's double effect run, so only one board is created.
    const isCreatingBoard = useRef(false);

    // Creates a board and opens it; `replace` keeps it out of the history.
    const create = useCallback(
        async (replace: boolean) => {
            if (isCreatingBoard.current) return;
            isCreatingBoard.current = true;

            try {
                const { id } = await createBoard("Untitled board");
                setSearchParams(
                    (params) => {
                        params.set(BOARD_PARAM, id);
                        return params;
                    },
                    { replace },
                );
            } finally {
                isCreatingBoard.current = false;
            }
        },
        [setSearchParams],
    );

    // An existing id is never replaced; a failed attempt waits for `createNewBoard`.
    useEffect(() => {
        if (boardId || createFailed) return;
        create(true).catch(() => setCreateFailed(true));
    }, [boardId, createFailed, create]);

    // Without a board in the URL there is nothing to go back to, so the
    // address is replaced; otherwise the new board is a new history entry.
    const createNewBoard = useCallback(async () => {
        setIsCreating(true);
        setCreateFailed(false);

        try {
            await create(!boardId);
        } catch {
            setCreateFailed(true);
        } finally {
            setIsCreating(false);
        }
    }, [boardId, create]);

    return { boardId, isCreating, createFailed, createNewBoard };
}
