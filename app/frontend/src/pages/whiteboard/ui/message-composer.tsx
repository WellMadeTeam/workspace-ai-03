import { useState, type FormEvent, type KeyboardEvent } from "react";
import { Button, TextArea } from "@heroui/react";
import { SendHorizontal } from "lucide-react";

type MessageComposerProps = {
    isSending: boolean;
    onSend: (content: string) => void;
};

export function MessageComposer({ isSending, onSend }: MessageComposerProps) {
    const [draft, setDraft] = useState("");

    const send = () => {
        const content = draft.trim();
        if (!content || isSending) return;

        onSend(content);
        setDraft("");
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        send();
    };

    // Enter sends, Shift+Enter inserts a new line.
    const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (
            event.key === "Enter" &&
            !event.shiftKey &&
            !event.nativeEvent.isComposing
        ) {
            event.preventDefault();
            send();
        }
    };

    return (
        <form
            className="flex items-end gap-2 border-t border-(--border) p-3"
            onSubmit={onSubmit}
        >
            <TextArea
                aria-label="New message"
                placeholder="Type a message…"
                rows={1}
                className="max-h-40 flex-1 resize-none field-sizing-content"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={onKeyDown}
            />
            <Button
                type="submit"
                isIconOnly
                aria-label="Send message"
                isDisabled={!draft.trim() || isSending}
            >
                <SendHorizontal className="size-4" />
            </Button>
        </form>
    );
}
