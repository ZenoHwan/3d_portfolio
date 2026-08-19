import React from "react";
import { motion } from "motion/react";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.3, 0.75)}
      className="tui-card tui-card-hover w-full sm:w-[360px] font-mono flex flex-col"
    >
      <div className="text-[11px] text-muted p-3 border-b border-border flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className={source_code_link ? "text-accent" : "text-muted"}>●</span>
          <span>project_{String(index + 1).padStart(2, "0")}.log</span>
        </span>
        {source_code_link ? (
          <a
            href={source_code_link}
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:text-info text-[11px]"
          >
            [visit ↗]
          </a>
        ) : (
          <span className="text-muted text-[11px]">[archived]</span>
        )}
      </div>

      <div className="relative w-full h-[200px] overflow-hidden border-b border-border">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-text font-bold text-[20px]">
          <span className="text-accent">→</span> {name}
        </h3>
        <p className="text-muted text-[13px] leading-[22px]">{description}</p>
        <div className="mt-auto pt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={`${name}-${tag.name}`}
              className="text-[11px] text-accent border border-border px-2 py-1"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>// 03_projects</p>
        <h2 className={`${styles.sectionHeadText} mt-2 font-sans`}>
          <span className="text-accent">&gt;</span> ls ./projects
        </h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-muted text-[15px] max-w-3xl leading-[26px] font-mono"
        >
          Shipped work. Real users, real production. Each one solved a specific
          problem — not portfolio filler.
        </motion.p>
      </div>

      <div className="mt-16 flex flex-wrap gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
