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
            <span className="text-white text-sm font-medium">{hobby.name}</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>
          {hobby.detail && (
            <p className="text-white/55 text-xs leading-relaxed mb-2">{hobby.detail}</p>
          )}
          <div className="flex gap-2 flex-wrap">
            {hobby.tags.map((tag) => (
              <span key={tag} className="text-white/32 text-[10px] border border-white/10 px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
