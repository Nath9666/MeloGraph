import React, { useEffect, useState } from "react";
import { Bars3Icon, LanguageIcon, XMarkIcon } from "@heroicons/react/24/solid";

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative bg-white">
      <div className="flex items-center justify-between px-4 py-2">
        <a href="/about"> A propos</a>
        <a
          href="/"
          className="text-black hover:text-blue-200 p-4 flex items-center"
        >
          <img src="./favicon.ico" alt="Logo" className="h-8 w-8" />
        </a>
        <div onClick={toggleMenu} className="cursor-pointer">
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6 text-black" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-black" />
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-900 via-blue-500 to-transparent"></div>
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md bg-opacity-80">
          <ul className="flex justify-around">
            <li>
              <a href="/rendez-vous" className="block px-4 py-2 text-black">
                prendre rendez vous
              </a>
            </li>
            <li>
              <a href="/contacts" className="block px-4 py-2 text-black">
                contacts
              </a>
            </li>
            <li>
              <a href="/commandes" className="block px-4 py-2 text-black">
                ma commandes
              </a>
            </li>
          </ul>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-l from-blue-900 via-blue-500 to-transparent"></div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
