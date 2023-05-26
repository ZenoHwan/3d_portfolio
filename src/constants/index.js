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
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Nextjs",
    icon: nextjs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "java",
    icon: java,
  },
  {
    name: "python",
    icon: python,
  },
];

const experiences = [
  {
    title: "Full Stack Developer Intern",
    company_name: "Seagate",
    icon: seagate,
    iconBg: "#E6DEDD",
    date: "Jan 2017 - Jun 2017",
    points: [
      "Developing and maintaining web applications using Java, JSP, Servlet and SQL",
      "Collaborating with cross-functional teams including product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      " Planning and building on access provision module in Seagate web application.",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "Bjak",
    icon: bjak,
    iconBg: "#FFFFFF",
    date: "Aug 2021 - Present",
    points: [
      "Developing and maintaining web applications using Nextjs, Nodejs, Nestjs, React, Express and MongoDB",
      "Responsible in handling and improving a wide range of areas: Motor Insurance, Frontend Designs, Backend Designs, Backend Algorithm, API Integrations, Peer Code Review",
      "Helping to build new product in the company such as Motor Loan",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Idential.xyz",
    description:
      "Idential is building the infrastructure to issue micro-credentials and make them searchable in a curated & verifiable way.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: idential,
    source_code_link: "https://www.idential.xyz/",
  },
  {
    name: "Anthony's London",
    description:
      "Anthony’s London is popular menswear in London. This admin site is to help managing orders from clients",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "PostgreSQL",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: anthonyLondon,
    source_code_link: "https://www.anthonyscollections.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
