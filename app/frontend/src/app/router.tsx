import { createBrowserRouter } from "react-router";
import { NotFoundPage } from "@/pages/not-found";
import { WhiteboardPage } from "@/pages/whiteboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <WhiteboardPage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);
