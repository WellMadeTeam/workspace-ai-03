import { useCallback, useEffect, useRef } from "react";

type PollingOptions<T> = {
    /** Loads the data. `null` pauses polling. Keep it stable with `useCallback`. */
    load: ((signal?: AbortSignal) => Promise<T>) | null;
    onData: (data: T) => void;
    onError: (error: unknown) => void;
    intervalMs: number;
};

/**
 * Calls `load` right away and then every `intervalMs`. Returns `refresh` to
 * load again outside the schedule.
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
        void refresh(controller.signal);
        const interval = setInterval(
            () => void refresh(controller.signal),
            intervalMs,
        );

        return () => {
            clearInterval(interval);
            controller.abort();
        };
    }, [load, refresh, intervalMs]);

    return refresh;
}
