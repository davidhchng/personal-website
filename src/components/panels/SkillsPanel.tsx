"use client";

const SKILL_GROUPS = [
  {
    category: "Programming",
    items: ["Python", "R", "SQL", "Java", "C++"],
  },
  {
    category: "Data Tools",
    items: ["Pandas", "Tidyverse", "Tableau", "Excel", "Databricks", "Scikit-learn", "Apache Spark"],
  },
  {
    category: "Other Tools",
    items: ["Git", "Version Control"],
  },
];

const COURSEWORK = [
  "Statistical Inference for Data Science",
  "Software Construction",
  "Data Structures and Algorithms",
  "Multivariable Calculus",
  "Linear Algebra",
  "Intro to Data Science",
  "Systematic Program Design",
];

export default function SkillsPanel() {
  return (
    <div className="space-y-7">
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {SKILL_GROUPS.map((group) => (
          <div key={group.category}>
            <p className="text-[10px] tracking-widest uppercase mb-2.5" style={{ color: "#86868B" }}>
              {group.category}
            </p>
            <ul className="space-y-1.5">
              {group.items.map((item) => (
                <li key={item} className="text-sm" style={{ color: "#1D1D1F" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-3" style={{ color: "#86868B" }}>
          Relevant Coursework
        </p>
        <ul className="space-y-2">
          {COURSEWORK.map((c) => (
            <li key={c} className="text-xs" style={{ color: "#6E6E73" }}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
