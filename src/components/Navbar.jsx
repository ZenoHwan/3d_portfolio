import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { menu, close } from "../assets";
import resume from "../assets/HwanChinYang.pdf";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full flex items-center py-4 fixed top-0 z-20 font-mono transition-all duration-200 ${
        scrolled ? "bg-primary/90 backdrop-blur border-b border-border" : "bg-transparent"
      }`}
    >
      <div className={`${styles.paddingX} w-full flex justify-between items-center max-w-7xl mx-auto`}>
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <span className="text-accent text-[18px] font-bold">$</span>
          <p className="text-text text-[16px] font-semibold cursor-pointer flex items-center">
            hwan
            <span className="text-muted mx-1">@</span>
            <span className="text-info">portfolio</span>
            <span className="text-muted mx-1">:~$</span>
            <span className="hidden sm:inline text-accent ml-1">full-stack</span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-8 items-center">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-accent" : "text-muted"
              } hover:text-accent text-[14px] font-medium cursor-pointer transition-colors`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>./{nav.title.toLowerCase()}</a>
            </li>
          ))}
          <a
            href={resume}
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:bg-accent hover:text-primary border border-accent px-3 py-1.5 text-[13px] font-semibold transition-colors"
          >
            resume.pdf
          </a>
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[24px] h-[24px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-5 bg-surface border border-border absolute top-16 right-4 min-w-[160px] z-10`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-3">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-mono font-medium cursor-pointer text-[14px] ${
                    active === nav.title ? "text-accent" : "text-muted"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>./{nav.title.toLowerCase()}</a>
                </li>
              ))}
              <li className="font-mono text-[14px] text-accent">
                <a href={resume} target="_blank" rel="noreferrer">resume.pdf</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
