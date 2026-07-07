"use client";

interface VolRole {
  role: string;
  org: string;
  period: string;
  location: string;
}

const VOLUNTEERING: VolRole[] = [
  {
    role: "Workshop Coordinator",
    org: "UBC Nutrikids",
    period: "Sep 2024 — Dec 2024",
    location: "Vancouver, BC",
  },
  {
    role: "Tutor",
    org: "Mary Jane Shannon Homework Program",
    period: "Oct 2023 — Dec 2023",
    location: "Surrey, BC",
  },
];

export default function VolunteeringPanel() {
  return (
    <div>
      <ul className="space-y-2">
        {VOLUNTEERING.map((item) => (
          <li key={item.org} className="flex gap-5">
            <div className="flex flex-col items-center pt-1.5 flex-shrink-0">
              <div className="w-2 h-2 rounded-full" style={{ background: "rgba(0,0,0,0.18)" }} />
              <div className="w-px flex-1 mt-2" style={{ background: "rgba(0,0,0,0.07)" }} />
            </div>
            <div className="pb-9 flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-3 mb-1">
                <span className="text-base font-semibold" style={{ color: "#1D1D1F" }}>{item.role}</span>
                <span className="text-xs tracking-wider flex-shrink-0 tabular-nums" style={{ color: "#86868B" }}>{item.period}</span>
              </div>
              <p className="text-sm" style={{ color: "#86868B" }}>{item.org} · {item.location}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
