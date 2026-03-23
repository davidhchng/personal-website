"use client";

const HOBBIES = [
  {
    name: "Cars",
    detail: "Daily driving a white 2011 Mitsubishi Lancer ES. Planning mods I'll probably never do.",
    tags: ["JDM", "Lancer", "4B11T someday"],
  },
  {
    name: "Ultimate Frisbee",
    detail: "Outdoor pickup games when the weather is cooperating. Occasionally when it isn't.",
    tags: ["outdoor", "pickup"],
  },
  {
    name: "NBA Analytics",
    detail: "Second-screening games while building player stat models in my head. Advanced metrics defender.",
    tags: ["data", "basketball", "advanced metrics"],
  },
  {
    name: "AI-assisted workflows",
    detail: "Actually using it, not just talking about it. Automating the boring parts so the interesting parts can stay interesting.",
    tags: ["LLMs", "automation", "tooling"],
  },
  {
    name: "Building things",
    detail: "Side projects at midnight. Custom keyboards. If it can be overengineered, it will be.",
    tags: ["side projects", "keyboards", "too many tabs open"],
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
          <p className="text-white/55 text-xs leading-relaxed mb-2">{hobby.detail}</p>
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
