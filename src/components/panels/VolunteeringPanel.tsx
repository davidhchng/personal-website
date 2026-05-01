"use client";

interface VolRole {
  role: string;
  org: string;
  period: string;
  location: string;
  bullets: string[];
}

const VOLUNTEERING: VolRole[] = [
  {
    role: "Workshop Coordinator",
    org: "UBC Nutrikids",
    period: "Sep 2024 — Dec 2024",
    location: "Vancouver, BC",
    bullets: [
      "Designed and delivered an interactive nutrition education workshop for ~30 elementary students.",
      "Collaborated with program coordinators to develop lesson plans and engaging activities.",
      "Communicated scientific concepts in an accessible format for young learners.",
    ],
  },
  {
    role: "Tutor",
    org: "Mary Jane Shannon Homework Program",
    period: "Oct 2023 — Dec 2023",
    location: "Surrey, BC",
    bullets: [
      "Tutored ~20 elementary students weekly in mathematics, reading, and general coursework.",
      "Provided individualized academic support reinforcing foundational learning skills.",
      "Encouraged engagement and confidence in problem solving through guided instruction.",
    ],
  },
];

export default function VolunteeringPanel() {
  return (
    <div>
      <ul className="space-y-1">
        {VOLUNTEERING.map((item) => (
          <li key={item.org} className="flex gap-4">
            <div className="flex flex-col items-center pt-1 flex-shrink-0">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.15)" }} />
              <div className="w-px flex-1 mt-1.5" style={{ background: "rgba(0,0,0,0.05)" }} />
            </div>
            <div className="pb-6">
              <div className="flex items-baseline justify-between gap-2 mb-0.5">
                <span className="text-sm font-medium" style={{ color: "#1D1D1F" }}>{item.role}</span>
                <span className="text-[10px] tracking-wider flex-shrink-0 tabular-nums" style={{ color: "#86868B" }}>{item.period}</span>
              </div>
              <p className="text-xs mb-2" style={{ color: "#86868B" }}>{item.org} · {item.location}</p>
              <ul className="space-y-1">
                {item.bullets.map((b, i) => (
                  <li key={i} className="text-xs leading-relaxed" style={{ color: "#6E6E73" }}>— {b}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
