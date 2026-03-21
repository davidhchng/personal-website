"use client";

// ─── ExperiencePanel ──────────────────────────────────────────────────────────
// TO REPLACE: swap the placeholder entries with your actual work history.
// ─────────────────────────────────────────────────────────────────────────────

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

// ← REPLACE THIS with your actual experience
const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Company A",
    role: "Software Engineer",
    period: "2023 — Present",
    description: "What you built, what you shipped, what you improved. Keep it tight.",
  },
  {
    company: "Company B",
    role: "Software Engineer Intern",
    period: "2022",
    description: "What you worked on and what you learned.",
  },
  {
    company: "University / School",
    role: "B.S. Computer Science",
    period: "2019 — 2023",
    description: "Relevant coursework, projects, or research.",
  },
];

export default function ExperiencePanel() {
  return (
    <div>
      <ul className="space-y-7">
        {EXPERIENCE.map((item) => (
          <li key={item.company} className="flex gap-4">
            {/* Timeline dot */}
            <div className="flex flex-col items-center pt-1 flex-shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="w-px flex-1 bg-white/5 mt-1.5" />
            </div>

            <div className="pb-6">
              <div className="flex items-baseline justify-between gap-2 mb-0.5">
                <span className="text-white text-sm font-medium">{item.role}</span>
                <span className="text-white/25 text-[10px] tracking-wider flex-shrink-0">{item.period}</span>
              </div>
              <p className="text-white/40 text-xs mb-2 tracking-wide">{item.company}</p>
              <p className="text-white/50 text-xs leading-relaxed">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
