import { Surface } from "@heroui/react";

type BoardErrorProps = {
    message: string;
};

export function BoardError({ message }: BoardErrorProps) {
    return (
        <Surface className="rounded-xl px-4 py-2 text-sm text-danger shadow-lg">
            {message}
        </Surface>
    );
}
