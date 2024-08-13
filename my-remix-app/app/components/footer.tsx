import { BrandicoFacebookRect } from "./icon/BrandicoFacebookRect";
import { LogosInstagram } from "./icon/LogosInstagram";
import { BrandicoLinkedinRect } from "./icon/BrandicoLinkedinRect";
import { BrandicoTwitterBird } from "./icon/BrandicoTwitterBird";

const Footer = () => {
  const Year = new Date().getFullYear();
  const info = [
    {
      visible: true,
      icon: BrandicoFacebookRect,
      link: "https://www.facebook.com/example",
    },
    {
      visible: true,
      icon: LogosInstagram,
      link: "https://www.instagram.com/example",
    },
    {
      visible: true,
      icon: BrandicoLinkedinRect,
      link: "https://www.linkedin.com/company/example",
    },
    {
      visible: true,
      icon: BrandicoTwitterBird,
      link: "https://twitter.com/example",
    },
  ];

  return (
    <footer className="yflex yflex-col ybg-white ypy-4 yjustify-center yitems-center">
      <div className="ycontainer ymx-auto yflex yjustify-center yitems-center">
        <div className="yflex yspace-x-4">
          {info.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="hover:ybg-blue-500 yp-2 hover:ytext-white yrounded-full"
              >
                <Icon className="yh-6 yw-auto" />
              </a>
            );
          })}
        </div>
      </div>
      <span>2023-{Year}</span>
    </footer>
  );
};

export default Footer;
