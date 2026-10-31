import { Button, Modal } from "@heroui/react";

type ConfirmationDialogProps = {
    message: string | null;
    onConfirm: () => void;
    onCancel: () => void;
};

export function ConfirmationDialog({
    message,
    onConfirm,
    onCancel,
}: ConfirmationDialogProps) {
    return (
        <Modal
            isOpen={message !== null}
            onOpenChange={(open) => {
                if (!open) onCancel();
            }}
        >
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Heading>Confirm action</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <p>{message}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onPress={onCancel}>
                                Cancel
                            </Button>
                            <Button variant="danger" onPress={onConfirm}>
                                Confirm
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
