import type { MetaFunction } from "@remix-run/node";
import Pannel from "../components/pannel";
import BlurIn from "../components/@/components/magicui/blur-in";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="yfont-sans">
      <Pannel></Pannel>
    </div>
  );
}
