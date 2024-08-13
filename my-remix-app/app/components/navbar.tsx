import React, { useEffect, useState } from "react";
import { Bars3Icon, LanguageIcon, XMarkIcon } from "@heroicons/react/24/solid";

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="yrelative ybg-white yz-50">
      <div className="yflex yitems-center yjustify-between ypx-4 ypy-2">
        <a href="/about" className="yw-1/12 yhidden sm:yblock special-text">
          A propos
        </a>
        <a
          href="/"
          className="ytext-black hover:ytext-blue-200 yflex yitems-center yjustify-center"
        >
          <img src="./logo.png" alt="Logo" className="sm:yw-1/6 yw-1/4" />
        </a>
        <div onClick={toggleMenu} className="ycursor-pointer">
          {isMenuOpen ? (
            <XMarkIcon className="yh-6 yw-6 ytext-black" />
          ) : (
            <Bars3Icon className="yh-6 yw-6 ytext-black" />
          )}
        </div>
      </div>
      <div className="yabsolute ybottom-0 yleft-0 yw-full yh-1 ybg-gradient-to-r yfrom-blue-900 yvia-blue-500 yto-transparent"></div>
      {isMenuOpen && (
        <div className="yabsolute ytop-full yleft-0 yw-full ybg-white yshadow-md ybg-opacity-80 special-text">
          <ul className="yflex yjustify-around">
            <li>
              <a href="/rendez-vous" className="yblock ypx-4 ypy-2 ytext-black">
                prendre rendez vous
              </a>
            </li>
            <li>
              <a href="/contacts" className="yblock ypx-4 ypy-2 ytext-black">
                contacts
              </a>
            </li>
            <li>
              <a href="/commandes" className="yblock ypx-4 ypy-2 ytext-black">
                ma commande
              </a>
            </li>
            <li className="sm:yhidden yblock">
              <a href="/about" className="yblock ypx-4 ypy-2 ytext-black">
                A propos
              </a>
            </li>
          </ul>
          <div className="yabsolute ybottom-0 yleft-0 yw-full yh-1 ybg-gradient-to-l yfrom-blue-900 yvia-blue-500 yto-transparent"></div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
