import type { MetaFunction } from "@remix-run/node";
import Pannel from "../components/pannel";
import Separator from "../components/separator";
import Theme from "../components/themes";

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
      <Theme
        text="Anime"
        description="Ce thème regroupe les images de dessins animés japonais. Cela peut être des images de manga, d'anime ou de pancarte. Elle regroupe des images de Hunter X Hunter, Yuri on Ice et L'attaque des titans ainsi que d'autres oeuvres issues de la pop culture japonaise."
        isTextOnRight={true}
        imageUrl="./images/template.jpeg"
      />
      <Theme
        text="Fantastique"
        description="Ce thème regroupe les images de dessins animés japonais. Cela peut être des images de manga, d'anime ou de pancarte. Elle regroupe des images de Hunter X Hunter, Yuri on Ice et L'attaque des titans ainsi que d'autres oeuvres issues de la pop culture japonaise."
        isTextOnRight={false}
        imageUrl="./images/template.jpeg"
      />
    </div>
  );
}
