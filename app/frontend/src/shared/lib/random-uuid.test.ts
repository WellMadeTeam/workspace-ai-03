import { afterEach, describe, expect, it, vi } from "vitest";

import { randomUUID } from "./random-uuid";

const UUID_V4 =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

describe("randomUUID", () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("returns a version 4 UUID", () => {
        expect(randomUUID()).toMatch(UUID_V4);
    });

    it("works where crypto.randomUUID is missing, as over plain HTTP", () => {
        vi.stubGlobal("crypto", {
            getRandomValues: crypto.getRandomValues.bind(crypto),
        });

        expect(randomUUID()).toMatch(UUID_V4);
    });

    it("returns a new UUID on each call", () => {
        expect(randomUUID()).not.toBe(randomUUID());
    });
});
