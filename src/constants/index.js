import {
  backend,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  nextjs,
  git,
  figma,
  docker,
  meta,
  starbucks,
  seagate,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  java,
  bjak,
  python,
  idential,
  anthonyLondon,
  coinranking,
  check4d,
  fuyoh,
  cardranking,
} from "../assets";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "contact", title: "Contact" },
];

const services = [
  {
    title: "Frontend",
    icon: web,
    desc: "Product UIs that stay fast as they grow — SSR/static sites, design-system components, charts over live market data.",
    stack: ["TypeScript", "React", "Next.js", "Astro", "Tailwind"],
  },
  {
    title: "Backend",
    icon: backend,
    desc: "APIs and services behind them — real-time price pipelines, account/billing, third-party integrations, caching that keeps p99 flat.",
    stack: ["Node.js", "Go", "Fastify", "Express", "MariaDB", "Redis", "Docker", "AWS"],
  },
];

const technologies = [
  { name: "TypeScript", icon: typescript },
  { name: "JavaScript", icon: javascript },
  { name: "React", icon: reactjs },
  { name: "Next.js", icon: nextjs },
  { name: "Node.js", icon: nodejs },
  { name: "Tailwind", icon: tailwind },
  { name: "Redux", icon: redux },
  { name: "MongoDB", icon: mongodb },
  { name: "Docker", icon: docker },
  { name: "Git", icon: git },
  { name: "Python", icon: python },
  { name: "Java", icon: java },
  { name: "HTML5", icon: html },
  { name: "CSS3", icon: css },
];

const experiences = [
  {
    title: "Software Engineer",
    company_name: "Coinranking",
    icon: coinranking,
    iconBg: "#0f141a",
    date: "Jul 2024 - Present",
    points: [
      "Full-stack on Coinranking Hub — production crypto market-data platform.",
      "Microservices, real-time prices, and account/billing systems.",
      "Built a Go service that uses the Claude Batch API with web search to write coin descriptions, about pages and tags.",
      "Generated llms.txt and markdown versions of the API docs, and use Claude Code and Codex every day.",
      "Node.js · TypeScript · Go · Astro · React · Fastify · Express · MariaDB · Redis · Docker · AWS",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "Bjak",
    icon: bjak,
    iconBg: "#0f141a",
    date: "Aug 2021 - Jul 2024",
    points: [
      "Shipped motor insurance and motor loan products across Next.js, Node.js, NestJS, React, Express and MongoDB.",
      "Owned end-to-end features: frontend, backend algorithms, API integrations and peer code review.",
      "Bootstrapped Motor Loan from zero — architecture, data model, integrations, launch.",
    ],
  },
  {
    title: "Full Stack Developer Intern",
    company_name: "Seagate",
    icon: seagate,
    iconBg: "#0f141a",
    date: "Jan 2017 - Jun 2017",
    points: [
      "Built and maintained internal web apps with Java, JSP, Servlet and SQL.",
      "Collaborated with PMs and engineers on the access provision module powering Seagate's internal tooling.",
      "Delivered responsive UIs and ensured cross-browser compatibility across legacy IE and modern browsers.",
    ],
  },
];

const projects = [
  {
    name: "Cardranking",
    description:
      "Card catalogue and scanner apps for the Naruto and Gundam trading card games, in development. Built the shared Go backend (Echo, GORM, PostgreSQL) that serves every game, the Gundam app in Expo, and the card scanner: ML Kit reads the card number on the phone, and a MobileCLIP-S2 image-embedding service matches cards by their art when it can't.",
    tags: [
      { name: "go", color: "blue-text-gradient" },
      { name: "react-native", color: "green-text-gradient" },
      { name: "postgresql", color: "pink-text-gradient" },
    ],
    image: cardranking,
  },
  {
    name: "Fuyoh",
    description:
      "Malaysian motor and travel insurance aggregator. Core contributor for 18 months (Feb 2025 – Jul 2026) across four services: a Go/Gin backend integrating five insurers for quotes, policies and payments; a Playwright scraper service that recovers quotes when insurer portals return referred cases; a Next.js 14 storefront in EN/MS/ZH; and a Go microservice that renders policy PDFs. Still live — I have since handed it off.",
    tags: [
      { name: "go", color: "blue-text-gradient" },
      { name: "nextjs", color: "green-text-gradient" },
      { name: "playwright", color: "pink-text-gradient" },
    ],
    image: fuyoh,
    source_code_link: "https://www.fuyoh.my/ms/",
  },
  {
    name: "Check4DResult",
    description:
      "Live 4D results for Magnum, Sports Toto, Da Ma Cai and more. Auto-refresh during draw windows.",
    tags: [],
    image: check4d,
    source_code_link: "https://www.check4dresult.com/",
  },
  {
    name: "Idential.xyz",
    description:
      "Infrastructure for issuing micro-credentials and making them searchable in a curated, verifiable way. Built the platform end-to-end on Next.js and MongoDB. Past project — deprecated.",
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "mongodb", color: "green-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
    ],
    image: idential,
  },
  {
    name: "Anthony's London",
    description:
      "Admin platform for a London menswear brand — order management, inventory and customer ops. Built on Next.js and PostgreSQL. Past project — deprecated.",
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "postgresql", color: "green-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
    ],
    image: anthonyLondon,
  },
];

export { services, technologies, experiences, projects };
