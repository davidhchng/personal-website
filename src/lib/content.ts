// Single source of truth for everything shown on the site.

export type ProjectCategory = "ml" | "data" | "hackathon" | "ai";

export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  url: string;
  category: ProjectCategory;
  video?: string;
  poster?: string;
  videoOrientation?: "portrait";
  event?: string;
  stat?: { value: string; label: string };
}

export const CATEGORIES: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all",       label: "All" },
  { id: "ml",        label: "Machine Learning" },
  { id: "data",      label: "Data Analysis" },
  { id: "hackathon", label: "Hackathons & Datathons" },
  { id: "ai",        label: "AI-Assisted" },
];

export const CATEGORY_CAPTION: Partial<Record<ProjectCategory, string>> = {
  ai: "Projects where I tested the limits and capabilities of using AI to assist with user experience and analysis.",
};

const v = (name: string) => ({ video: `/v/${name}.mp4`, poster: `/v/${name}.jpg` });

export const PROJECTS: Project[] = [
  {
    id: "starbucks",
    name: "Starbucks Offer Completion Predictor",
    description:
      "Predicts whether a Starbucks customer will complete a promotional offer. Engineered a labeled training set from 300,000+ raw transaction and event log records across 3 data sources, producing 66,501 (customer, offer) pairs. Benchmarked 4 models — Random Forest achieved 82% test accuracy on 12 engineered features. Exported to ONNX and shipped a fully static prediction app on Vercel using onnxruntime-web for live in-browser inference with no backend required.",
    tags: ["Python", "pandas", "scikit-learn", "PyTorch", "ONNX", "onnxruntime-web", "HTML/JS", "Vercel"],
    url: "https://github.com/davidhchng/starbucks-offer-intelligence",
    category: "ml",
    stat: { value: "82%", label: "test accuracy" },
    ...v("starbucks-offer-intel-video"),
  },
  {
    id: "vanbizreg",
    name: "Vancouver Business Registration Market Analysis",
    description:
      "Processed 130,000+ City of Vancouver business registration records. Designed statistical metrics quantifying market concentration, closure risk, and business entry recency across neighbourhoods and business types.",
    tags: ["Python", "Pandas"],
    url: "https://github.com/davidhchng/Vancouver-Business-Registration-Analysis",
    category: "data",
    stat: { value: "130K+", label: "records" },
    ...v("vanbizreg-video"),
  },
  {
    id: "paloalto",
    name: "Palo Alto EV Charging Station Utilization Analysis",
    description:
      "Analyzed 259,000+ EV charging session records. Engineered metrics identifying usage concentration and behavioral differences. Generated recommendations for capacity expansion and demand-shifting strategies.",
    tags: ["SQL", "Tableau", "Python", "Pandas"],
    url: "https://github.com/davidhchng/ev-charging-station-analysis",
    category: "data",
    stat: { value: "259K+", label: "sessions" },
    ...v("palo-alto-video"),
  },
  {
    id: "plaicraft",
    name: "PLAICRAFT AI Learning & Demographic Analysis",
    description:
      "Cleaned and validated participant-level survey data for an AI education research initiative. Analyzed relationships between demographics and learning outcomes to evaluate program effectiveness.",
    tags: ["R", "Tidyverse"],
    url: "https://github.com/davidhchng",
    category: "data",
  },
  {
    id: "bridgecare",
    name: "BridgeCare",
    event: "HackTheCoast 2026",
    description:
      "Nearly 6M Canadians lack a family doctor. BridgeCare lets patients chat with AI, generating summaries for real doctors to review and respond — no waiting room, no travel, just faster care.",
    tags: ["React", "TypeScript", "Express.js", "OpenAI", "SQLite", "Tailwind"],
    url: "https://devpost.com/software/bridgecare-we91ha",
    category: "hackathon",
    videoOrientation: "portrait",
    ...v("bridgecare-video"),
  },
  {
    id: "alignu",
    name: "AlignU",
    event: "HackCamp 2025",
    description:
      "Feeling overwhelmed with the endless amount of UBC clubs? AlignU lets you swipe through clubs to find your fit. Build your profile, get personalized matches, and discover events happening on campus.",
    tags: ["React", "TypeScript", "OpenAI", "Vite", "Tailwind"],
    url: "https://devpost.com/software/alignu",
    category: "hackathon",
    ...v("alignu-video"),
  },
  {
    id: "feedle",
    name: "Feedle",
    event: "HelloHacks 2025",
    description:
      "Feedle curates your social feed by aesthetic: filter, preview, and caption your photos to match the vibe of your vision.",
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://devpost.com/software/feedle",
    category: "hackathon",
    ...v("feedle-video"),
  },
  {
    id: "shouldercoach",
    name: "ShoulderCoach: Basketball Decision Assistant",
    description:
      "Full-stack coaching tool routing late-game decisions through 8 deterministic statistical engines across 880,000+ clutch events from 5 NBA seasons. Includes a Shot Form Analyzer that uses MediaPipe Pose and OpenCV to score 5 biomechanical metrics from uploaded video — returning an annotated skeleton overlay with GPT-4o coaching feedback.",
    tags: ["FastAPI", "SQLite", "MediaPipe", "OpenCV", "Next.js", "GPT-4o", "Railway", "Vercel"],
    url: "https://shoulder-coach-1.vercel.app",
    category: "ai",
    stat: { value: "880K+", label: "clutch events" },
    ...v("shouldercoach"),
  },
  {
    id: "minimemo",
    name: "MiniMemo: Analysis & Report Creator",
    description:
      "Full-stack deployed tool that auto-classifies columns and generates statistical insights across 6 analysis types (group deviation, skewness, outlier detection, correlation, time trend). Supports 6 file formats up to 200k rows with SHA256-keyed LRU caching and an optional LLM narrative layer.",
    tags: ["Python", "FastAPI", "Pandas", "Next.js", "TypeScript"],
    url: "https://github.com/davidhchng/MiniMemo",
    category: "ai",
    stat: { value: "6", label: "analysis types" },
    ...v("MiniMemoExample"),
  },
];

export interface Role {
  role: string;
  org: string;
  period: string;
  location: string;
  logo?: string;
}

export const WORK: Role[] = [
  { role: "Analytics Intern",   org: "Tryuu",                               period: "Sep 2026 — Present", location: "Vancouver, BC", logo: "/logos/tryuu.png" },
  { role: "Software Developer", org: "UBC Undergraduate Statistics Society", period: "Oct 2025 — Present", location: "Vancouver, BC", logo: "/logos/ubc.png" },
  { role: "Web Developer",      org: "UBC STEM Fellowship",                 period: "Oct 2025 — Present", location: "Vancouver, BC", logo: "/logos/stemfellowship.png" },
];

export const LEADERSHIP: Role[] = [
  { role: "Jumpstart Orientation Leader", org: "UBC Jumpstart",  period: "Aug 2026 — Sep 2026", location: "Vancouver, BC", logo: "/logos/ubc.png" },
  { role: "Barista Trainer",              org: "Starbucks",      period: "Aug 2025 — Aug 2026", location: "Surrey, BC", logo: "/logos/starbucks.png" },
  { role: "Team Lead",                    org: "New York Fries", period: "Jul 2022 — Aug 2025", location: "Surrey, BC", logo: "/logos/nyf.png" },
];

export const VOLUNTEERING: Role[] = [
  { role: "Workshop Coordinator", org: "UBC Nutrikids",                      period: "Sep 2024 — Dec 2024", location: "Vancouver, BC", logo: "/logos/ubc.png" },
  { role: "Tutor",                org: "Mary Jane Shannon Homework Program", period: "Oct 2023 — Dec 2023", location: "Surrey, BC", logo: "/logos/surreyschools.png" },
];

// Superset of the resume — the resume trims to fit a page, the site doesn't
// have to. Split into four groups rather than the resume's three because long
// single rows wrap badly as chips.
export const SKILL_GROUPS = [
  { category: "Languages", items: ["Python", "Java", "R", "C++", "SQL"] },
  { category: "ML & Data", items: ["PyTorch", "Scikit-learn", "Pandas", "Tidyverse", "Apache Spark", "Databricks", "GPT-4o API"] },
  { category: "Frameworks & Tools", items: ["FastAPI", "Git", "Cursor", "Tableau", "Power BI", "Excel", "Object-Oriented Programming"] },
  { category: "Databases", items: ["PostgreSQL", "SQLite"] },
];

// Kept out of SKILL_GROUPS because the Interlude marquee is built from those —
// event names scrolling among language names would read as noise.
export const HACKATHONS = [
  "UBC BizTech HelloHacks",
  "nwPlus Hackcamp 2025",
  "SUS HackTheCoast 2026",
];

export const COURSEWORK = [
  "Applied Machine Learning",
  "Statistical Inference for Data Science",
  "Intro to Data Science",
  "Data Structures and Algorithms",
  "Software Construction",
  "Systematic Program Design",
  "Linear Algebra",
  "Multivariable Calculus",
  "Integral Calculus",
];

export const LINKS = {
  email:    { label: "Email",    href: "mailto:davidhchang75@gmail.com",                 value: "davidhchang75@gmail.com" },
  github:   { label: "GitHub",   href: "https://github.com/davidhchng",                  value: "github.com/davidhchng" },
  linkedin: { label: "LinkedIn", href: "https://linkedin.com/in/david-chang-b56696316", value: "linkedin.com/in/david-chang-b56696316" },
};

export const LOCATION_LINE = "Vancouver, BC · (236) 975-5855";

export const SECTIONS = [
  { id: "experience", label: "Experience" },
  { id: "projects",   label: "Projects"   },
  { id: "skills",     label: "Skills"     },
  { id: "contact",    label: "Contact"    },
] as const;

/** Projects whose tags mention a skill (case-insensitive). */
export function projectsUsing(skill: string): Project[] {
  const s = skill.toLowerCase();
  return PROJECTS.filter(p => p.tags.some(t => t.toLowerCase() === s));
}
