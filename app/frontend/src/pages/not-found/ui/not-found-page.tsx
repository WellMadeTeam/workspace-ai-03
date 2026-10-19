import { Link } from "react-router";

export function NotFoundPage() {
    return (
        <section className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white text-gray-500 dark:bg-gray-900 dark:text-gray-400">
            <h1 className="text-5xl font-medium text-gray-950 dark:text-gray-100">404</h1>
            <p>Page not found</p>
            <Link to="/" className="text-purple-600 hover:underline dark:text-purple-400">
                Go home
            </Link>
        </section>
    );
}
