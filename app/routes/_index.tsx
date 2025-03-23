import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Split the bill" },
    { name: "description", content: "calculate your portion" },
  ];
};

export default function Index() {
  return (
    <>
      <Link to="/app">App</Link>
    </>
  );
}
