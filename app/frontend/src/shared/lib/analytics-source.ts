export type AnalyticsSource = "web" | "usability-test" | "smoke";

const sources: AnalyticsSource[] = ["web", "usability-test", "smoke"];

export const getAnalyticsSource = (): AnalyticsSource => {
    if (typeof window === "undefined") return "web";

    const requested = new URLSearchParams(window.location.search).get("source");
    return sources.find((source) => source === requested) ?? "web";
};
