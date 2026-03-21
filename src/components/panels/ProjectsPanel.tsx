"use client";

// ─── ProjectsPanel ────────────────────────────────────────────────────────────
// Revealed when the driver door opens.
//
// TO REPLACE: swap the placeholder project data below with real projects.
// Each project item follows the ProjectItem shape — add as many as needed.
// ─────────────────────────────────────────────────────────────────────────────

interface ProjectItem {
  name: string;
  description: string;
  tags: string[];
  url?: string; // TO REPLACE: add real URLs
}

// ← REPLACE THIS with your actual projects
const PROJECTS: ProjectItem[] = [
  {
    name: "Project Alpha",
    description: "A short description of what this project does and why it matters.",
    tags: ["TypeScript", "React", "Next.js"],
    url: "#",
  },
  {
    name: "Project Beta",
    description: "Another project — tools, motivation, outcome.",
    tags: ["Python", "FastAPI"],
    url: "#",
  },
  {
    name: "Project Gamma",
    description: "One more thing built and shipped.",
    tags: ["Rust", "WebAssembly"],
    url: "#",
  },
];

export default function ProjectsPanel() {
  return (
    <div>
      {/* Section heading */}
      <h2 className="text-xl font-semibold text-white mb-6 leading-tight">
        Projects
      </h2>

      {/* Project list */}
      <ul className="space-y-7">
        {PROJECTS.map((project) => (
          <li key={project.name} className="group">
            <a
              href={project.url ?? "#"}
              className="block"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-white text-sm font-medium group-hover:text-white/70 transition-colors duration-200">
                  {project.name}
                </span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className="text-white/20 group-hover:text-white/60 transition-colors duration-200 flex-shrink-0 ml-3"
                >
                  <path
                    d="M1 9L9 1M9 1H3M9 1V7"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </div>
              <p className="text-white/40 text-xs leading-relaxed mb-2">
                {project.description}
              </p>
              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-white/30 text-xs border border-white/10 px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
