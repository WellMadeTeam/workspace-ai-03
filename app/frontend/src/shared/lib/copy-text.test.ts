import { afterEach, describe, expect, it, vi } from "vitest";

import { copyText } from "./copy-text";

describe("copyText", () => {
    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it("writes the text to the clipboard", async () => {
        const writeText = vi.fn().mockResolvedValue(undefined);
        vi.stubGlobal("navigator", { clipboard: { writeText } });

        await expect(copyText("graph TD")).resolves.toBe(true);
        expect(writeText).toHaveBeenCalledWith("graph TD");
    });

    it("copies without the clipboard API, as over plain HTTP", async () => {
        vi.stubGlobal("navigator", {});
        let copied = "";
        document.execCommand = vi.fn(() => {
            copied = (document.activeElement as HTMLTextAreaElement).value;
            return true;
        });

        await expect(copyText("graph TD")).resolves.toBe(true);
        expect(copied).toBe("graph TD");
        expect(document.querySelector("textarea")).toBeNull();
    });
});
