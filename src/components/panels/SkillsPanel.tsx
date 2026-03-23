"use client";

const SKILL_GROUPS = [
  {
    category: "Programming",
    items: ["Python", "R", "SQL", "Java"],
  },
  {
    category: "Data Tools",
    items: ["Pandas", "Tidyverse", "Tableau", "Excel"],
  },
  {
    category: "Web & APIs",
    items: ["Next.js", "TypeScript", "FastAPI"],
  },
  {
    category: "Other Tools",
    items: ["Git", "Version Control"],
  },
];

const COURSEWORK = [
  { name: "Integral Calculus",        grade: "94%" },
  { name: "Intro to Data Science",    grade: "89%" },
  { name: "Systematic Program Design", grade: "90%" },
];

export default function SkillsPanel() {
  return (
    <div className="space-y-7">
      {/* Skills grid */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {SKILL_GROUPS.map((group) => (
          <div key={group.category}>
            <p className="text-white/35 text-[10px] tracking-widest uppercase mb-2.5">
              {group.category}
            </p>
            <ul className="space-y-1.5">
              {group.items.map((item) => (
                <li key={item} className="text-white/72 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Relevant coursework */}
      <div className="border-t border-white/10 pt-5">
        <p className="text-white/35 text-[10px] tracking-widest uppercase mb-3">
          Relevant Coursework
        </p>
        <ul className="space-y-2">
          {COURSEWORK.map((c) => (
            <li key={c.name} className="flex justify-between items-baseline">
              <span className="text-white/65 text-xs">{c.name}</span>
              <span className="text-white/35 text-xs font-medium tabular-nums ml-4">{c.grade}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
