"use client";

interface Role {
  org: string;
  role: string;
  period: string;
  location: string;
}

const LEADERSHIP: Role[] = [
  {
    role: "Technical Director",
    org: "UBC Undergraduate Statistics Society",
    period: "Oct 2025 — Present",
    location: "Vancouver, BC",
  },
  {
    role: "Web Developer",
    org: "UBC STEM Fellowship",
    period: "Oct 2025 — Present",
    location: "Surrey, BC",
  },
];

const WORK: Role[] = [
  {
    role: "Barista Trainer",
    org: "Starbucks",
    period: "Aug 2025 — Present",
    location: "Surrey, BC",
  },
  {
    role: "Team Lead",
    org: "New York Fries",
    period: "Jul 2022 — Aug 2025",
    location: "Surrey, BC",
  },
];

function RoleItem({ item }: { item: Role }) {
  return (
    <li className="flex gap-5">
      <div className="flex flex-col items-center pt-1.5 flex-shrink-0">
        <div className="w-2 h-2 rounded-full" style={{ background: "rgba(0,0,0,0.18)" }} />
        <div className="w-px flex-1 mt-2" style={{ background: "rgba(0,0,0,0.07)" }} />
      </div>
      <div className="pb-9">
        <div className="flex items-baseline justify-between gap-3 mb-1">
          <span className="text-base font-semibold" style={{ color: "#1D1D1F" }}>{item.role}</span>
          <span className="text-xs tracking-wider flex-shrink-0 tabular-nums" style={{ color: "#86868B" }}>{item.period}</span>
        </div>
        <p className="text-sm" style={{ color: "#86868B" }}>{item.org} · {item.location}</p>
      </div>
    </li>
  );
}

export default function ExperiencePanel() {
  return (
    <div className="space-y-10">
      <ul className="space-y-2">
        {LEADERSHIP.map((item) => <RoleItem key={item.org} item={item} />)}
      </ul>

      <div className="pt-8" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <p style={{ fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "#1D1D1F", marginBottom: 24 }}>
          Leadership
        </p>
        <ul className="space-y-2">
          {WORK.map((item) => <RoleItem key={item.org} item={item} />)}
        </ul>
      </div>
    </div>
  );
}
