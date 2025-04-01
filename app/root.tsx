import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="max-w-3xl mx-auto px-4 py-12">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">
            SpliTheBill
          </h1>
        </header>

        {children}
        <ScrollRestoration />
        <Scripts />
        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} SpliTheBill App</p>
          <p className="mt-1">Making group payments fair and friendly</p>
        </footer>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
