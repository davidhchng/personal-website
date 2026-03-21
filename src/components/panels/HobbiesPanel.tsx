"use client";

// ─── HobbiesPanel ─────────────────────────────────────────────────────────────
// TO REPLACE: swap the hobby entries below with your real interests.
// Keep the descriptions honest and human — this section humanizes the portfolio.
// ─────────────────────────────────────────────────────────────────────────────

interface HobbyItem {
  name: string;
  detail: string;
  tags: string[];
}

// ← REPLACE THIS with your actual hobbies/interests
const HOBBIES: HobbyItem[] = [
  {
    name: "Cars",
    detail: "Daily driving a white 2011 Mitsubishi Lancer ES. Currently: planning mods I'll never actually do.",
    tags: ["JDM", "DSM", "4B11T someday"],
  },
  {
    name: "Photography",
    detail: "Film when I have patience. Digital when I don't. Subjects: cars, streets, whatever's interesting.",
    tags: ["35mm", "street", "cars obviously"],
  },
  {
    name: "Building things",
    detail: "Side projects at midnight. Custom keyboards. If it can be overengineered, it will be.",
    tags: ["side projects", "keyboards", "too many tabs"],
  },
  {
    name: "Music",
    detail: "Genre varies by road conditions. Freeway → anything loud. City → depends.",
    tags: ["shuffle enjoyer"],
  },
];

export default function HobbiesPanel() {
  return (
    <div className="space-y-6">
      {HOBBIES.map((hobby) => (
        <div key={hobby.name} className="group">
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-white text-sm font-medium">{hobby.name}</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>
          <p className="text-white/55 text-xs leading-relaxed mb-2">
            {hobby.detail}
          </p>
          <div className="flex gap-2 flex-wrap">
            {hobby.tags.map((tag) => (
              <span
                key={tag}
                className="text-white/30 text-[10px] border border-white/10 px-2 py-0.5 rounded-sm"
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
