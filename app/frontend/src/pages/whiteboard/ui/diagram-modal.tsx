import { useMemo } from "react";
import { Button, Modal, Tabs } from "@heroui/react";
import { Maximize2 } from "lucide-react";
import { DiagramCode } from "./diagram-code";

type DiagramModalProps = {
    // The id the SVG was rendered with, which its elements and styles use.
    renderId: string;
    svg: string;
    code: string;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
};

/**
 * A button that opens the diagram over the whole board, for one too big to
 * read in the panel. The focus returns to the button when it closes.
 */
export function DiagramModal({
    renderId,
    svg,
    code,
    isOpen,
    onOpenChange,
}: DiagramModalProps) {
    // The diagram stays in the message under the modal, so this copy gets its
    // own ids, or the styles of one would apply to the other.
    const modalSvg = useMemo(
        () => svg.replaceAll(renderId, `${renderId}-full`),
        [svg, renderId],
    );

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Button
                isIconOnly
                size="sm"
                variant="ghost"
                aria-label="Open diagram"
            >
                <Maximize2 className="size-4" aria-hidden />
            </Button>
            <Modal.Backdrop>
                <Modal.Container size="cover" className="sm:w-full">
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Tabs
                            variant="secondary"
                            align="start"
                            defaultSelectedKey="diagram"
                            className="flex min-h-0 flex-1 flex-col"
                        >
                            <Modal.Header>
                                <Modal.Heading>Diagram</Modal.Heading>
                                <Tabs.ListContainer>
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
                            </Modal.Header>
                            <Modal.Body className="min-h-0 flex-1">
                                <Tabs.Panel id="diagram">
                                    <div
                                        className="[&_svg]:mx-auto"
                                        dangerouslySetInnerHTML={{
                                            __html: modalSvg,
                                        }}
                                    />
                                </Tabs.Panel>
                                <Tabs.Panel id="code">
                                    <DiagramCode code={code} />
                                </Tabs.Panel>
                            </Modal.Body>
                        </Tabs>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
