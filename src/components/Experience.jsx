import React from "react";
import { motion } from "motion/react";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience, index }) => (
  <article className="tui-card p-6 font-mono">
    <div className="flex items-start gap-4">
      <img
        src={experience.icon}
        alt={experience.company_name}
        className="w-10 h-10 object-contain shrink-0"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2 text-[11px] text-muted uppercase tracking-widest">
          <span className="text-accent">●</span>
          <span>commit {String(index + 1).padStart(3, "0")}</span>
          <span className="text-muted/60">·</span>
          <span>{experience.date}</span>
        </div>
        <h3 className="text-text text-[18px] sm:text-[20px] font-bold text-balance">{experience.title}</h3>
        <p className="text-accent text-[14px] font-semibold mt-1">
          @ {experience.company_name}
        </p>
        <ul className="mt-5 space-y-2">
          {experience.points.map((point, i) => (
            <li
              key={i}
              className="text-text/80 text-[13px] pl-4 tracking-wide leading-[22px] relative before:content-['→'] before:absolute before:left-0 before:text-accent"
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </article>
);

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>// 02_experience</p>
        <h2 className={`${styles.sectionHeadText} text-center mt-2 font-sans`}>
          <span className="text-accent">&gt;</span>{" "}
          <span className="sm:hidden">experience</span>
          <span className="hidden sm:inline">git log --experience</span>
        </h2>
      </motion.div>

      <div className="mt-16 flex flex-col gap-6">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={`${experience.company_name}-${index}`}
            experience={experience}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
