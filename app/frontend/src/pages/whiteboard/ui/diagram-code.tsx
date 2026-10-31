import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/react";
import { Check, Copy } from "lucide-react";
import { copyText } from "@/shared/lib";

const COPIED_FEEDBACK_MS = 2000;

type DiagramCodeProps = {
    code: string;
    className?: string;
};

/** The source of a diagram, with a button that copies it. */
export function DiagramCode({ code, className = "" }: DiagramCodeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const resetTimerRef = useRef<number | undefined>(undefined);
    const [isCopied, setCopied] = useState(false);

    useEffect(() => () => window.clearTimeout(resetTimerRef.current), []);

    const copy = async () => {
        if (!(await copyText(code, containerRef.current ?? undefined))) {
            return;
        }

        setCopied(true);
        window.clearTimeout(resetTimerRef.current);
        resetTimerRef.current = window.setTimeout(
            () => setCopied(false),
            COPIED_FEEDBACK_MS,
        );
    };

    return (
        <div ref={containerRef} className="relative">
            <pre
                className={`overflow-auto rounded-md border border-(--border) p-2 pr-10 font-mono text-xs whitespace-pre ${className}`}
            >
                <code>{code}</code>
            </pre>
            <Button
                isIconOnly
                size="sm"
                variant="ghost"
                aria-label="Copy code"
                className="absolute top-1 right-1"
                onPress={copy}
            >
                {isCopied ? (
                    <Check className="size-4" aria-hidden />
                ) : (
                    <Copy className="size-4" aria-hidden />
                )}
            </Button>
            <span className="sr-only" role="status">
                {isCopied ? "Copied" : ""}
            </span>
        </div>
    );
}
