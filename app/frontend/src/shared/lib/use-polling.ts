import { useCallback, useEffect, useRef } from "react";

type PollingOptions<T> = {
    /** Loads the data. `null` pauses polling. Keep it stable with `useCallback`. */
    load: ((signal?: AbortSignal) => Promise<T>) | null;
    onData: (data: T) => void;
    onError: (error: unknown) => void;
    intervalMs: number;
};

/**
 * Calls `load` right away and then `intervalMs` after each call finishes.
 * Returns `refresh` to load again outside the schedule.
 */
export function usePolling<T>({
    load,
    onData,
    onError,
    intervalMs,
}: PollingOptions<T>) {
    // Only the most recently started request may report its result, so a
    // slow request cannot overwrite newer data.
    const latestRequest = useRef(0);

    const refresh = useCallback(
        async (signal?: AbortSignal) => {
            if (!load) return;

            const requestId = ++latestRequest.current;

            try {
                const data = await load(signal);
                if (requestId !== latestRequest.current) return;

                onData(data);
            } catch (error) {
                if (signal?.aborted || requestId !== latestRequest.current)
                    return;

                onError(error);
            }
        },
        [load, onData, onError],
    );

    useEffect(() => {
        if (!load) return;

        const controller = new AbortController();
        let timer: ReturnType<typeof setTimeout> | undefined;

        // The next poll waits for the previous one: on a connection slower
        // than `intervalMs`, a fixed interval would start a newer request
        // before each response arrived, and every response would be discarded.
        const poll = async () => {
            await refresh(controller.signal);
            if (!controller.signal.aborted) {
                timer = setTimeout(() => void poll(), intervalMs);
            }
        };
        void poll();

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [load, refresh, intervalMs]);

    return refresh;
}
