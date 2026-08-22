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

  useEffect(() => {
    document.body.style.overflow = toggle ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [toggle]);

  return (
    <nav
      className={`w-full flex items-center py-3 sm:py-4 fixed top-0 z-20 font-mono pt-[max(0.75rem,env(safe-area-inset-top))] transition-all duration-200 ${
        scrolled || toggle ? "bg-primary/90 backdrop-blur border-b border-border" : "bg-transparent"
      }`}
    >
      <div className={`${styles.paddingX} w-full flex justify-between items-center max-w-7xl mx-auto`}>
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3 group min-h-11"
          onClick={() => {
            setActive("");
            setToggle(false);
            window.scrollTo(0, 0);
          }}
        >
          <span className="text-accent text-[18px] font-bold">$</span>
          <p className="text-text text-[15px] sm:text-[16px] font-semibold cursor-pointer flex items-center">
            hwan
            <span className="hidden xs:inline">
              <span className="text-muted mx-1">@</span>
              <span className="text-info">portfolio</span>
              <span className="text-muted mx-1">:~$</span>
            </span>
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

        <div className="sm:hidden flex items-center">
          <button
            type="button"
            aria-expanded={toggle}
            aria-label={toggle ? "Close menu" : "Open menu"}
            className="flex min-h-11 min-w-11 items-center justify-center"
            onClick={() => setToggle(!toggle)}
          >
            <img
              src={toggle ? close : menu}
              alt=""
              className="w-6 h-6 object-contain"
            />
          </button>
        </div>
      </div>
      {toggle && (
        <div className="sm:hidden fixed inset-x-0 top-[calc(env(safe-area-inset-top)+3.25rem)] bottom-0 bg-primary/95 border-t border-border px-6 py-6 z-10">
          <ul className="list-none flex flex-col gap-1">
            {navLinks.map((nav) => (
              <li key={nav.id}>
                <a
                  href={`#${nav.id}`}
                  className={`flex min-h-11 items-center font-mono font-medium text-[16px] ${
                    active === nav.title ? "text-accent" : "text-muted"
                  }`}
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.title);
                  }}
                >
                  ./{nav.title.toLowerCase()}
                </a>
              </li>
            ))}
            <li>
              <a
                href={resume}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 items-center font-mono text-[16px] text-accent"
              >
                resume.pdf
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
