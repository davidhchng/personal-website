"use client";

// ─── SkillsPanel ──────────────────────────────────────────────────────────────
// Revealed when the hood opens.
//
// TO REPLACE: update the skill categories and items below.
// TO EXTEND: add more categories — the layout will adapt automatically.
// ─────────────────────────────────────────────────────────────────────────────

interface SkillGroup {
  category: string;
  items: string[];
}

// ← REPLACE THIS with your actual skills
const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages",
    items: ["TypeScript", "Python", "Rust", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "FastAPI", "PostgreSQL", "Redis"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "AWS", "Vercel"],
  },
];

// ← REPLACE THIS with your actual experience timeline
const EXPERIENCE = [
  {
    role: "Software Engineer",        // ← REPLACE
    org: "Company / Project",         // ← REPLACE
    period: "2023 — Present",         // ← REPLACE
  },
  {
    role: "Previous Role",            // ← REPLACE
    org: "Previous Company",          // ← REPLACE
    period: "2021 — 2023",            // ← REPLACE
  },
];

export default function SkillsPanel() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6 leading-tight">
        Skills
      </h2>

      {/* Skills grid */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-10">
        {SKILL_GROUPS.map((group) => (
          <div key={group.category}>
            <p className="text-white/30 text-xs tracking-widest uppercase mb-2">
              {group.category}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item} className="text-white/70 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Experience timeline */}
      <div className="border-t border-white/10 pt-6">
        <p className="text-white/30 text-xs tracking-widest uppercase mb-4">
          Experience
        </p>
        <ul className="space-y-4">
          {EXPERIENCE.map((exp, i) => (
            <li key={i} className="flex justify-between items-baseline">
              <div>
                <p className="text-white/80 text-sm font-medium">{exp.role}</p>
                <p className="text-white/40 text-xs mt-0.5">{exp.org}</p>
              </div>
              <span className="text-white/30 text-xs flex-shrink-0 ml-4">
                {exp.period}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
