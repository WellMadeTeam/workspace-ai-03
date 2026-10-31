import { CircleAlert } from "lucide-react";

type DiagramErrorProps = {
    error: string;
};

/** The note that a diagram could not be rendered, with Mermaid's reason. */
export function DiagramError({ error }: DiagramErrorProps) {
    return (
        <p className="flex items-start gap-2 text-xs text-danger">
            <CircleAlert className="mt-px size-4 shrink-0" aria-hidden />
            <span className="min-w-0">
                This diagram could not be rendered:
                <span className="mt-1 block max-h-32 overflow-auto font-mono whitespace-pre-wrap">
                    {error}
                </span>
            </span>
        </p>
    );
}
