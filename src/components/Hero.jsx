import React, { lazy, useState, useEffect, Suspense } from "react";
import { motion } from "motion/react";

import { styles } from "../styles";

const ComputersCanvas = lazy(() => import("./canvas/Computers"));

const TypedLine = ({ text, delay = 0, className = "" }) => {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplay(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 40);
    }, delay);
    return () => clearTimeout(start);
  }, [text, delay]);
  return <span className={className}>{display}</span>;
};

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return (
    <section className="relative w-full h-screen mx-auto grid-bg-fine">
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-col gap-6 z-10`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-accent text-[13px] font-mono"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-muted">status:</span>
          <span>online</span>
          <span className="text-muted mx-2">|</span>
          <span className="text-muted">kl, my</span>
        </motion.div>

        <div className="font-mono">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted text-[14px] sm:text-[16px] mb-4"
          >
            <span className="text-accent">$</span> whoami
          </motion.p>

          <h1 className={`${styles.heroHeadText} font-sans`}>
            <TypedLine text="Hwan Chin Yang" delay={800} />
            <span className="cursor-blink" />
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="mt-6 max-w-2xl"
          >
            <p className={`${styles.heroSubText} text-text/80`}>
              <span className="text-accent">→</span> Software engineer.{" "}
              <span className="text-info">Full-stack.</span>{" "}
              Building crypto data products at{" "}
              <a
                href="https://coinranking.com"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#3fb950] underline underline-offset-4 decoration-[#3fb950] hover:text-accent hover:decoration-accent"
              >
                Coinranking
              </a>
              .
            </p>
            <p className="mt-3 text-muted text-[14px] sm:text-[16px]">
              Node.js · TypeScript · Go · Astro · React · Fastify · Express · MariaDB · Redis · Docker · AWS
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="mt-8 flex gap-3 flex-wrap"
          >
            <a
              href="#work"
              className="border border-accent text-accent hover:bg-accent hover:text-primary px-5 py-2.5 text-[14px] font-semibold transition-colors"
            >
              ./view-work
            </a>
            <a
              href="#contact"
              className="border border-border text-muted hover:border-accent hover:text-accent px-5 py-2.5 text-[14px] font-semibold transition-colors"
            >
              ./contact
            </a>
          </motion.div>
        </div>
      </div>

      {isMounted && (
        <Suspense fallback={null}>
          <ComputersCanvas />
        </Suspense>
      )}

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about" className="text-muted text-[12px] font-mono flex flex-col items-center gap-2 hover:text-accent transition-colors">
          <span>scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-accent"
          >
            ↓
          </motion.span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
