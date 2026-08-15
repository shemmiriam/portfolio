import {
  SiPython, SiDjango, SiReact, SiVueDotJs,
  SiDocker, SiGit, SiPostman, SiJava, SiTypescript
} from "react-icons/si";
import { DiTerminal } from "react-icons/di";

export const SkillIcons = {
  "Python": SiPython,
  "Django": SiDjango,
  "React": SiReact,
  "Vue 3": SiVueDotJs,
  "Docker": SiDocker,
  "Git / GitHub": SiGit,
  "Postman": SiPostman,
  "Java": SiJava,
  "TypeScript": SiTypescript,
  "default": DiTerminal,
};

export const Skills = [
  {
    slug: "python",
    Component: SiPython,
    title: "Python",
    Description: () => <>Primary language for AI/ML pipelines, backend APIs, and automation — used in production across OpenCHS, a government KMS, and the containerized AI pipeline.</>,
  },
  {
    slug: "django-fastapi",
    Component: SiDjango,
    title: "Django & FastAPI",
    Description: () => <>Backend engineering for REST APIs, government integrations, and multi-tenant SaaS platforms. Django for complex data systems, FastAPI for high-performance AI services.</>,
  },
  {
    slug: "ai-ml",
    Component: DiTerminal,
    title: "AI / ML",
    Description: () => <>Production AI: Whisper ASR (speech-to-text, 99+ languages), NLLB translation, FLAN-T5/Mistral summarization, spaCy NLP, Celery task queuing, GPU-accelerated processing.</>,
  },
  {
    slug: "vue",
    Component: SiVueDotJs,
    title: "Vue 3",
    Description: () => <>Frontend for OpenCHS and related platforms, including a generic Vue 3 component library (openchs-components) deployed across East Africa.</>,
  },
  {
    slug: "java",
    Component: SiJava,
    title: "Java / Spring Boot",
    Description: () => <>Enterprise backend development — Azui Billing system: customer portals, DTO-based APIs, database constraint enforcement, and integration engineering.</>,
  },
  {
    slug: "docker-integrations",
    Component: SiDocker,
    title: "Docker & Integrations",
    Description: () => <>Containerized production deployments and REST API integrations with government systems (Uganda MGLSD, Kenya CPIMS, KRA eTIMS), OAuth2, JWT, and SSL/TLS.</>,
  },
];
