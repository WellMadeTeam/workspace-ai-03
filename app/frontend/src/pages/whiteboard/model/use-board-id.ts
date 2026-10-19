import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { createBoard } from "../api/board";

const BOARD_PARAM = "board";

/**
 * Returns the board id from the URL. On the first visit without one, creates
 * a board and remembers its id in the query parameters. An existing id is
 * never replaced.
 */
export function useBoardId() {
    const [searchParams, setSearchParams] = useSearchParams();
    const boardId = searchParams.get(BOARD_PARAM);
    // The ref survives StrictMode's double effect run, so only one board is created.
    const isCreatingBoard = useRef(false);

    useEffect(() => {
        if (boardId || isCreatingBoard.current) return;
        isCreatingBoard.current = true;

        createBoard("Untitled board")
            .then(({ id }) =>
                setSearchParams(
                    (params) => {
                        params.set(BOARD_PARAM, id);
                        return params;
                    },
                    { replace: true },
                ),
            )
            .finally(() => {
                isCreatingBoard.current = false;
            });
    }, [boardId, setSearchParams]);

    return boardId;
}
