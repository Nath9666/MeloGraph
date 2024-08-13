import type { MetaFunction } from "@remix-run/node";
import Pannel from "~/components/pannel";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans p-4">
      <Pannel></Pannel>
    </div>
  );
}
