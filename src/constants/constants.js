// ─────────────────────────────────────────────────────────────────────────────
// ALL PORTFOLIO CONTENT IS MANAGED VIA THE CMS AT /admin
// To update content without code: go to yoursite.com/admin
//
// These imports pull from the JSON files in /content/ that the CMS writes to.
// You should never need to edit this file directly.
// ─────────────────────────────────────────────────────────────────────────────

import personalData from '../../content/personal.json';
import projectsData from '../../content/projects.json';
import experienceData from '../../content/experience.json';
import certificationsData from '../../content/certifications.json';
import timelineData from '../../content/timeline.json';
import accomplishmentsData from '../../content/accomplishments.json';

export const personalInfo = {
  name: personalData.name,
  title: personalData.title,
  tagline: personalData.tagline,
  location: personalData.location,
  email: personalData.email,
  github: personalData.github,
  linkedin: personalData.linkedin,
  instagram: personalData.instagram,
  resumeUrl: personalData.resumeUrl,
};

export const heroData = {
  greeting: personalData.heroGreeting,
  headline: personalData.heroHeadline,
  description: personalData.heroDescription,
  cta: "View My Work",
  ctaSecondary: "Download CV",
};

export const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Certifications", href: "#certifications" },
];

export const projects = projectsData.projects;

export const experience = experienceData.experience;

export const certifications = certificationsData.certifications;

export const TimeLineData = timelineData.timeline;

export const accomplishments = accomplishmentsData.accomplishments;

// ─── SKILLS ──────────────────────────────────────────────────────────────────
// Skills are kept here (not in the CMS) because they drive icon rendering.
// To add a skill: add a new entry to the relevant category in /content/personal.json
// and add a matching icon in Skills.js if needed.
export const skills = {
  languages: [
    { name: "Python", level: "Advanced" },
    { name: "JavaScript", level: "Advanced" },
    { name: "TypeScript", level: "Intermediate" },
    { name: "Java", level: "Intermediate" },
    { name: "PHP", level: "Intermediate" },
    { name: "C#", level: "Intermediate" },
    { name: "R", level: "Intermediate" },
  ],
  frontend: [
    { name: "Vue 3", level: "Intermediate" },
    { name: "React", level: "Intermediate" },
    { name: "Next.js", level: "Intermediate" },
    { name: "Vite", level: "Intermediate" },
  ],
  backend: [
    { name: "Django", level: "Advanced" },
    { name: "FastAPI", level: "Intermediate" },
    { name: "Spring Boot", level: "Intermediate" },
    { name: "Node.js", level: "Intermediate" },
    { name: "Laravel", level: "Intermediate" },
  ],
  databases: [
    { name: "PostgreSQL", level: "Intermediate" },
    { name: "MySQL", level: "Intermediate" },
    { name: "MongoDB", level: "Intermediate" },
  ],
  ai_ml: [
    { name: "Whisper ASR", level: "Intermediate" },
    { name: "HuggingFace Transformers", level: "Intermediate" },
    { name: "NLLB (Translation)", level: "Intermediate" },
    { name: "FLAN-T5 / Mistral", level: "Intermediate" },
    { name: "spaCy / NLP", level: "Intermediate" },
    { name: "Celery + Redis (ML queuing)", level: "Intermediate" },
    { name: "TensorFlow / PyTorch", level: "Beginner/Exploring" },
    { name: "Data Science / Jupyter", level: "Intermediate" },
  ],
  integrations: [
    { name: "REST APIs", level: "Advanced" },
    { name: "OAuth2 / JWT", level: "Intermediate" },
    { name: "RabbitMQ", level: "Intermediate" },
    { name: "Swagger / OpenAPI", level: "Intermediate" },
    { name: "SSL/TLS & API Security", level: "Intermediate" },
    { name: "Postman", level: "Advanced" },
  ],
  tools: [
    { name: "Git / GitHub", level: "Advanced" },
    { name: "Docker", level: "Intermediate" },
    { name: "Linux / Ubuntu / WSL", level: "Intermediate" },
    { name: "Label Studio", level: "Intermediate" },
    { name: "VS Code", level: "Advanced" },
    { name: "Jupyter / Conda", level: "Intermediate" },
  ],
};
