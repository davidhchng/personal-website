"use client";

const HOBBIES = [
  {
    name: "Cars",
    detail: "I drive a Mitsubishi Lancer 2011 ES, and it's my baby.",
    tags: ["JDM", "Lancer", "4B11T someday"],
  },
  {
    name: "Ultimate Frisbee",
    detail: "Played for Vortex 2024, and we came 12th in Canada!",
    tags: ["outdoor", "pickup", "Vortex"],
  },
  {
    name: "NBA Analytics",
    detail: "I love Shai, but not as much as Lebron.",
    tags: ["advanced metrics", "basketball"],
  },
  {
    name: "AI-assisted workflows",
    detail: "",
    tags: ["LLMs", "automation", "tooling"],
  },
];

export default function HobbiesPanel() {
  return (
    <div className="space-y-6">
      {HOBBIES.map((hobby) => (
        <div key={hobby.name}>
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-sm font-medium" style={{ color: "#1D1D1F" }}>{hobby.name}</span>
            <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.06)" }} />
          </div>
          {hobby.detail && (
            <p className="text-xs leading-relaxed mb-2" style={{ color: "#6E6E73" }}>{hobby.detail}</p>
          )}
          <div className="flex gap-2 flex-wrap">
            {hobby.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5"
                style={{ color: "#86868B", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
