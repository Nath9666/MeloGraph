import type { MetaFunction } from "@remix-run/node";
import Pannel from "../components/pannel";

export const meta: MetaFunction = () => {
  return [
    { title: "Melo Graph" },
    { name: "description", content: "portfolio de MeloGraph" },
  ];
};

export default function Index() {
  return (
    <div className="yfont-sans">
      <Pannel/>
    </div>
  );
}
