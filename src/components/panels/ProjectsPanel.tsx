"use client";

interface Project {
  name: string;
  description: string;
  tags: string[];
  url?: string;
}

const PROJECTS: Project[] = [
  {
    name: "MiniMemo — Analysis & Report Creator",
    description:
      "Full-stack deployed tool that auto-classifies columns and generates statistical insights across 6 analysis types (group deviation, skewness, outlier detection, correlation, time trend). Supports 6 file formats up to 200k rows with SHA256-keyed LRU caching and an optional LLM narrative layer.",
    tags: ["Python", "FastAPI", "Pandas", "Next.js", "TypeScript"],
    url: "https://github.com/davidhchng",
  },
  {
    name: "Vancouver Business Registration Market Analysis",
    description:
      "Processed 130,000+ City of Vancouver business registration records. Designed statistical metrics quantifying market concentration, closure risk, and business entry recency across neighbourhoods and business types.",
    tags: ["Python", "Pandas"],
    url: "https://github.com/davidhchng",
  },
  {
    name: "Palo Alto EV Charging Station Utilization Analysis",
    description:
      "Analyzed 259,000+ EV charging session records. Engineered metrics identifying usage concentration and behavioral differences. Generated recommendations for capacity expansion and demand-shifting strategies.",
    tags: ["SQL", "Tableau", "Python", "Pandas"],
    url: "https://github.com/davidhchng",
  },
  {
    name: "PLAICRAFT AI Learning & Demographic Analysis",
    description:
      "Cleaned and validated participant-level survey data for an AI education research initiative. Analyzed relationships between demographics and learning outcomes to evaluate program effectiveness.",
    tags: ["R", "Tidyverse"],
    url: "https://github.com/davidhchng",
  },
];

export default function ProjectsPanel() {
  return (
    <div className="space-y-8">
      {/* Main projects */}
      <ul className="space-y-7">
        {PROJECTS.map((project) => (
          <li key={project.name} className="group">
            <a href={project.url ?? "#"} target="_blank" rel="noopener noreferrer" className="block">
              <div className="flex items-start justify-between gap-3 mb-1">
                <span className="text-white text-sm font-medium group-hover:text-white/70 transition-colors duration-200 leading-snug">
                  {project.name}
                </span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-white/20 group-hover:text-white/60 transition-colors duration-200 flex-shrink-0 mt-0.5">
                  <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" />
                </svg>
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
        <p className="text-white/30 text-[10px] tracking-widest uppercase mb-4">Hackathons & Datathons</p>
        <p className="text-white/25 text-xs italic">
          Projects coming soon — UBC BizTech HelloHacks, BOLT First Byte Datathon, nwPlus Hackcamp 2025, SUS HackTheCoast 2026
        </p>
      </div>
    </div>
  );
}
