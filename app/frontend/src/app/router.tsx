import { createBrowserRouter } from "react-router";
import { WhiteboardPage } from "../pages/whiteboard/index.tsx";
import NotFoundPage from "../pages/404/index.tsx";

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
