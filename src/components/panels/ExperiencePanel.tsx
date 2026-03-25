"use client";

import { ReactNode } from "react";

interface Role {
  org: string;
  role: string;
  period: string;
  location: string;
  bullets: ReactNode[];
}

const LEADERSHIP: Role[] = [
  {
    role: "Technical Director",
    org: "UBC Undergraduate Statistics Society",
    period: "Oct 2025 — Present",
    location: "Vancouver, BC",
    bullets: [
      "Generated and curated a real-world dataset for the Dataverse Datathon used by 60+ participants.",
      "Led a Data Science 100 final exam review workshop for 30+ students covering statistical reasoning and data analysis workflows.",
      "Evaluated 60+ datathon submissions assessing analytical methodology, data quality, and clarity of insights.",
    ],
  },
  {
    role: "Web Development & Event Lead",
    org: "UBC STEM Fellowship",
    period: "Oct 2025 — Present",
    location: "Surrey, BC",
    bullets: [
      <>Designed and deployed the organization website: <a href="https://ubcstemfellowship.com" target="_blank" rel="noopener noreferrer" className="text-white/70 underline underline-offset-2 hover:text-white transition-colors duration-200">ubcstemfellowship.com</a></>,
      "Evaluated 125+ high-school applications for Research Exploration Opportunities (REO).",
      "Designed and judged a STEM case competition for 70+ participants evaluating analytical reasoning.",
    ],
  },
];

const WORK: Role[] = [
  {
    role: "Barista",
    org: "Starbucks",
    period: "Aug 2025 — Present",
    location: "Surrey, BC",
    bullets: [
      "Customer service in a fast-paced environment with high daily volumes.",
      "Trained and supported new hires on procedures, POS systems, and service standards.",
    ],
  },
  {
    role: "Team Lead",
    org: "New York Fries",
    period: "Jul 2022 — Aug 2025",
    location: "Surrey, BC",
    bullets: [
      "Supervised crew task distribution during peak service hours.",
      "Trained new employees on food prep, safety standards, and customer service.",
      "Contributed to a top-performing BC store achieving 9% annual sales growth.",
    ],
  },
];

function RoleItem({ item }: { item: Role }) {
  return (
    <li className="flex gap-4">
      <div className="flex flex-col items-center pt-1 flex-shrink-0">
        <div className="w-1.5 h-1.5 rounded-full bg-white/25" />
        <div className="w-px flex-1 bg-white/6 mt-1.5" />
      </div>
      <div className="pb-5">
        <div className="flex items-baseline justify-between gap-2 mb-0.5">
          <span className="text-white text-sm font-medium">{item.role}</span>
          <span className="text-white/28 text-[10px] tracking-wider flex-shrink-0 tabular-nums">{item.period}</span>
        </div>
        <p className="text-white/42 text-xs mb-2">{item.org} · {item.location}</p>
        <ul className="space-y-1">
          {item.bullets.map((b, i) => (
            <li key={i} className="text-white/55 text-xs leading-relaxed">
              — {b}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function ExperiencePanel() {
  return (
    <div className="space-y-6">
      <ul className="space-y-1">
        {LEADERSHIP.map((item) => <RoleItem key={item.org} item={item} />)}
      </ul>

      <div className="border-t border-white/10 pt-5">
        <p className="text-white/30 text-[10px] tracking-widest uppercase mb-4">Additional Work</p>
        <ul className="space-y-1">
          {WORK.map((item) => <RoleItem key={item.org} item={item} />)}
        </ul>
      </div>
    </div>
  );
}
