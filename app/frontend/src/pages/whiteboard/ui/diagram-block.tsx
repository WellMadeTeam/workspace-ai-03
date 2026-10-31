import { use, useEffect, useRef, useState } from "react";
import { Button, Tabs } from "@heroui/react";
import { Check, ImagePlus } from "lucide-react";
import { AddDiagramContext } from "../model/add-diagram";
import { useRenderedDiagram } from "../model/use-rendered-diagram";
import { DiagramCode } from "./diagram-code";
import { DiagramError } from "./diagram-error";
import { DiagramModal } from "./diagram-modal";

const ADDED_FEEDBACK_MS = 2000;

type DiagramBlockProps = {
    code: string;
};

/**
 * A Mermaid diagram in an AI answer: the picture, which opens in a modal or
 * goes on the board as an image block, and its source; or the source and the
 * error if it could not be rendered.
 */
export function DiagramBlock({ code }: DiagramBlockProps) {
    const diagram = useRenderedDiagram(code);
    const addDiagram = use(AddDiagramContext);
    const [isExpanded, setExpanded] = useState(false);
    const [isAdded, setAdded] = useState(false);
    const resetTimerRef = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(resetTimerRef.current), []);

    const addToBoard = async () => {
        if (!addDiagram || !(await addDiagram(code))) {
            return;
        }

        setAdded(true);
        window.clearTimeout(resetTimerRef.current);
        resetTimerRef.current = window.setTimeout(
            () => setAdded(false),
            ADDED_FEEDBACK_MS,
        );
    };

    if (diagram.status === "failed") {
        return (
            <figure className="my-1 flex flex-col gap-2 whitespace-normal">
                <figcaption>
                    <DiagramError error={diagram.error} />
                </figcaption>
                <DiagramCode code={code} className="max-h-64" />
            </figure>
        );
    }

    return (
        <figure className="relative my-1 whitespace-normal">
            <Tabs
                variant="secondary"
                align="start"
                defaultSelectedKey="diagram"
            >
                <Tabs.ListContainer className="pr-18">
                    <Tabs.List aria-label="Diagram view">
                        <Tabs.Tab id="diagram">
                            Diagram
                            <Tabs.Indicator />
                        </Tabs.Tab>
                        <Tabs.Tab id="code">
                            Code
                            <Tabs.Indicator />
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs.ListContainer>
                <Tabs.Panel id="diagram" className="pt-2">
                    {diagram.status === "rendered" ? (
                        // A click on the picture opens it too, as it is often
                        // too small to read in the panel; from the keyboard,
                        // the "Open diagram" button opens it.
                        <div
                            className="cursor-zoom-in"
                            onClick={() => setExpanded(true)}
                            dangerouslySetInnerHTML={{ __html: diagram.svg }}
                        />
                    ) : (
                        <p className="text-xs opacity-60" role="status">
                            Rendering the diagram…
                        </p>
                    )}
                </Tabs.Panel>
                <Tabs.Panel id="code" className="pt-2">
                    <DiagramCode code={code} className="max-h-64" />
                </Tabs.Panel>
            </Tabs>
            {/* Outside the tabs, whose tab list would take the modal's tabs. */}
            {diagram.status === "rendered" && (
                <div className="absolute top-0 right-0 flex">
                    {addDiagram && (
                        <Button
                            isIconOnly
                            size="sm"
                            variant="ghost"
                            aria-label="Add to board"
                            onPress={addToBoard}
                        >
                            {isAdded ? (
                                <Check className="size-4" aria-hidden />
                            ) : (
                                <ImagePlus className="size-4" aria-hidden />
                            )}
                        </Button>
                    )}
                    <span className="sr-only" role="status">
                        {isAdded ? "Added to the board" : ""}
                    </span>
                    <DiagramModal
                        renderId={diagram.id}
                        svg={diagram.svg}
                        code={code}
                        isOpen={isExpanded}
                        onOpenChange={setExpanded}
                    />
                </div>
            )}
        </figure>
    );
}
