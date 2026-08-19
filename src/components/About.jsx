import React from "react";
import { motion } from "motion/react";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.3, 0.6)}
    className="tui-card tui-card-hover p-6 w-full xs:w-[240px] flex flex-col gap-4"
  >
    <div className="flex items-center gap-3">
      <span className="text-accent text-[14px] font-mono">[{String(index + 1).padStart(2, "0")}]</span>
      <span className="text-muted text-[11px] font-mono uppercase tracking-widest">module</span>
    </div>
    <img src={icon} alt={title} className="w-12 h-12 object-contain opacity-80" />
    <h3 className="text-text text-[18px] font-mono font-bold">{title}</h3>
    <div className="mt-auto pt-4 border-t border-border text-muted text-[11px] font-mono">
      → active
    </div>
  </motion.div>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>// 01_introduction</p>
        <h2 className={`${styles.sectionHeadText} mt-2 font-sans`}>
          <span className="text-accent">&gt;</span> whoami
        </h2>
      </motion.div>

      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-8 tui-card p-6 max-w-3xl font-mono"
      >
        <div className="text-[12px] text-muted mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-warn" />
          <span className="w-2 h-2 rounded-full bg-info" />
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="ml-2">~/about.md</span>
        </div>
        <p className="text-text text-[15px] leading-[28px]">
          <span className="text-accent">$</span> cat about.md
        </p>
        <p className="mt-3 text-text/90 text-[15px] leading-[28px]">
          Software engineer. Full-stack. 6+ yrs shipping web products across
          fintech, insurtech and crypto. Currently building crypto data
          infrastructure at <span className="text-accent">Coinranking</span> —
          Hub, real-time prices, account/billing. Node.js, TypeScript, Go,
          Astro, React, MariaDB, Redis, Docker, AWS.
        </p>
        <p className="mt-3 text-text/90 text-[15px] leading-[28px]">
          Previously at <span className="text-info">Bjak</span> (motor
          insurance, motor loan) and <span className="text-info">Seagate</span>.
          I care about clean systems, honest APIs, and code that survives.
        </p>
      </motion.div>

      <div className="mt-16">
        <p className="text-muted text-[12px] font-mono mb-6">
          <span className="text-accent">$</span> ls ./services
        </p>
        <div className="flex flex-wrap gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
