import Meteors from "./@/components/magicui/meteors";
import NumberTicker from "./@/components/magicui/number-ticker";
import images from "./images";

const Separator = () => {
  const Year = new Date().getFullYear();

  const NumberCommades = 100;

  const info = [
    {
      number: NumberCommades,
      alt: "Commandes réalisées",
    },
    {
      number: 20,
      alt: "Clients m'ont fait confiance",
    },
    {
      number: Year - 2010,
      alt: "Années d'expériences",
    },
    {
      number: NumberCommades + images.length - 1,
      alt: "Projets réalisés",
    },
  ];

  let MeteorsNumber = 0;
  for (let i = 0; i < info.length; i++) {
    MeteorsNumber += info[i].number;
  }
  MeteorsNumber = Math.floor(MeteorsNumber / 2);

  return (
    <div className="yrelative yflex yh-[500px] yw-full sm:yflex-row yflex-col yitems-center yjustify-center yoverflow-hidden yrounded-lg yborder ybg-background md:yshadow-xl">
      <Meteors number={MeteorsNumber} />
      {info.map((item, index) => {
        return (
          <div
            key={index}
            className="yflex yflex-col yitems-center yjustify-center ypx-4 ypy-2"
          >
            <NumberTicker
              value={item.number}
              className="ytext-2xl yfont-bold ytext-black"
            />
            {/* <span className="ytext-2xl yfont-bold ytext-white">{item.number}</span> */}
            <span className="sm:ytext-2xl ytext-lg ytext-black yjustify-center special-text">
              {item.alt}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Separator;
