"use client";

interface Project {
  name: string;
  description: string;
  tags: string[];
  url: string;
  video?: string; // URL to mp4, or "" for placeholder
}

interface HackProject {
  name: string;
  event: string;
  description: string;
  tags: string[];
  url: string;
}

const PROJECTS: Project[] = [
  {
    name: "ShoulderCoach — Basketball Decision Assistant",
    description:
      "Full-stack coaching tool routing late-game decisions through 8 deterministic statistical engines across 880,000+ clutch events from 5 NBA seasons. Includes a Shot Form Analyzer that uses MediaPipe Pose and OpenCV to score 5 biomechanical metrics from uploaded video — returning an annotated skeleton overlay with GPT-4o coaching feedback.",
    tags: ["FastAPI", "SQLite", "MediaPipe", "OpenCV", "Next.js", "GPT-4o", "Railway", "Vercel"],
    url: "https://shoulder-coach-1.vercel.app",
    video: "/exampleShoulderCoach.mov",
  },
  {
    name: "MiniMemo — Analysis & Report Creator",
    description:
      "Full-stack deployed tool that auto-classifies columns and generates statistical insights across 6 analysis types (group deviation, skewness, outlier detection, correlation, time trend). Supports 6 file formats up to 200k rows with SHA256-keyed LRU caching and an optional LLM narrative layer.",
    tags: ["Python", "FastAPI", "Pandas", "Next.js", "TypeScript"],
    url: "https://github.com/davidhchng/MiniMemo",
    video: "/MiniMemoExample.mov",
  },
  {
    name: "Vancouver Business Registration Market Analysis",
    description:
      "Processed 130,000+ City of Vancouver business registration records. Designed statistical metrics quantifying market concentration, closure risk, and business entry recency across neighbourhoods and business types.",
    tags: ["Python", "Pandas"],
    url: "https://github.com/davidhchng/Vancouver-Business-Registration-Analysis",
  },
  {
    name: "Palo Alto EV Charging Station Utilization Analysis",
    description:
      "Analyzed 259,000+ EV charging session records. Engineered metrics identifying usage concentration and behavioral differences. Generated recommendations for capacity expansion and demand-shifting strategies.",
    tags: ["SQL", "Tableau", "Python", "Pandas"],
    url: "https://github.com/davidhchng/ev-charging-station-analysis",
  },
  {
    name: "PLAICRAFT AI Learning & Demographic Analysis",
    description:
      "Cleaned and validated participant-level survey data for an AI education research initiative. Analyzed relationships between demographics and learning outcomes to evaluate program effectiveness.",
    tags: ["R", "Tidyverse"],
    url: "https://github.com/davidhchng",
  },
];

const HACKATHONS: HackProject[] = [
  {
    name: "BridgeCare",
    event: "HackTheCoast 2026",
    description:
      "Nearly 6M Canadians lack a family doctor. BridgeCare lets patients chat with AI, generating summaries for real doctors to review and respond — no waiting room, no travel, just faster care.",
    tags: ["React", "TypeScript", "Express.js", "OpenAI", "SQLite", "Tailwind"],
    url: "https://devpost.com/software/bridgecare-we91ha",
  },
  {
    name: "AlignU",
    event: "HackCamp 2025",
    description:
      "Feeling overwhelmed with the endless amount of UBC clubs? AlignU lets you swipe through clubs to find your fit. Build your profile, get personalized matches, and discover events happening on campus.",
    tags: ["React", "TypeScript", "OpenAI", "Vite", "Tailwind"],
    url: "https://devpost.com/software/alignu",
  },
  {
    name: "Feedle",
    event: "HelloHacks 2025",
    description:
      "Feedle curates your social feed by aesthetic: filter, preview, and caption your photos to match the vibe of your vision.",
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://devpost.com/software/feedle",
  },
];

function ArrowIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-white/20 group-hover:text-white/60 transition-colors duration-200 flex-shrink-0 mt-0.5">
      <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function VideoPreview({ src }: { src: string }) {
  if (src) {
    return (
      <div className="relative w-full aspect-video mb-3 border border-white/10 overflow-hidden bg-black">
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
    );
  }

  // Placeholder
  return (
    <div className="relative w-full aspect-video mb-3 border border-white/10 overflow-hidden bg-white/[0.02] flex items-center justify-center">
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      {/* play button */}
      <div className="relative flex flex-col items-center gap-2 opacity-20 group-hover:opacity-40 transition-opacity duration-200">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="13" stroke="white" strokeWidth="1" />
          <path d="M11 9.5L20 14L11 18.5V9.5Z" fill="white" />
        </svg>
        <span className="text-white text-[9px] tracking-widest uppercase">Preview</span>
      </div>
    </div>
  );
}

export default function ProjectsPanel() {
  return (
    <div className="space-y-8">
      {/* Main projects */}
      <ul className="space-y-10">
        {PROJECTS.map((project, i) => (
          <li key={project.name} className="group">
            {i !== 0 && <div className="w-full border-t border-white/10 mb-10" />}
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="block">
              {project.video !== undefined && <VideoPreview src={project.video} />}
              <div className="flex items-start justify-between gap-3 mb-1">
                <span className="text-white text-sm font-medium group-hover:text-white/70 transition-colors duration-200 leading-snug">
                  {project.name}
                </span>
                <ArrowIcon />
              </div>
              <p className="text-white/50 text-xs leading-relaxed mb-2">{project.description}</p>
              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-white/35 text-[10px] border border-white/12 px-2 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>

      {/* Hackathons & Datathons */}
      <div className="border-t border-white/10 pt-6">
        <p className="text-white/30 text-[10px] tracking-widest uppercase mb-5">Hackathons & Datathons</p>
        <ul className="space-y-6">
          {HACKATHONS.map((h) => (
            <li key={h.name} className="group">
              <a href={h.url} target="_blank" rel="noopener noreferrer" className="block">
                <div className="flex items-start justify-between gap-3 mb-0.5">
                  <span className="text-white text-sm font-medium group-hover:text-white/70 transition-colors duration-200 leading-snug">
                    {h.name}
                  </span>
                  <ArrowIcon />
                </div>
                <p className="text-white/28 text-[10px] tracking-wider mb-1.5">{h.event}</p>
                <p className="text-white/50 text-xs leading-relaxed mb-2">{h.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {h.tags.map((tag) => (
                    <span key={tag} className="text-white/30 text-[10px] border border-white/10 px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
