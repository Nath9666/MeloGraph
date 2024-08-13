import type { MetaFunction } from "@remix-run/node";
import Pannel from "../components/pannel";
import Separator from "../components/separator";

export const meta: MetaFunction = () => {
  return [
    { title: "Melo Graph" },
    { name: "description", content: "portfolio de MeloGraph" },
  ];
};

export default function Index() {
  return (
    <div className="">
      <Pannel/>
      <Separator/>
    </div>
  );
}
