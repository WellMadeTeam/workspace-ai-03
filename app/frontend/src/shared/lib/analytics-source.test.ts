import { afterEach, describe, expect, it } from "vitest";
import { getAnalyticsSource } from "./analytics-source";

describe("getAnalyticsSource", () => {
    afterEach(() => {
        window.history.replaceState({}, "", "/");
    });

    it("defaults to web", () => {
        window.history.replaceState({}, "", "/");

        expect(getAnalyticsSource()).toBe("web");
    });

    it.each(["usability-test", "smoke"] as const)(
        "accepts the closed source %s",
        (source) => {
            window.history.replaceState({}, "", `/?source=${source}`);

            expect(getAnalyticsSource()).toBe(source);
        },
    );

    it("rejects other source values", () => {
        window.history.replaceState({}, "", "/?source=member-name");

        expect(getAnalyticsSource()).toBe("web");
    });
});
