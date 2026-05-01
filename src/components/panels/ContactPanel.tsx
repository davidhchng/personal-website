"use client";

const LINKS = [
  {
    label: "Email",
    href: "mailto:davidhchang75@gmail.com",
    value: "davidhchang75@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/davidhchng",
    value: "github.com/davidhchng",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/david-chang-b56696316",
    value: "linkedin.com/in/david-chang-b56696316",
  },
];

export default function ContactPanel() {
  return (
    <div>
      <p className="text-sm leading-relaxed mb-8" style={{ color: "#6E6E73" }}>
        Open to interesting conversations, data collaborations, and opportunities.
        Best reached by email.
      </p>

      <ul className="space-y-6">
        {LINKS.map((link) => (
          <li key={link.label}>
            <p className="text-[10px] tracking-widest uppercase mb-1.5" style={{ color: "#86868B" }}>
              {link.label}
            </p>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="text-sm pb-0.5 transition-colors duration-200"
              style={{ color: "#1D1D1F", borderBottom: "1px solid rgba(0,0,0,0.15)" }}
            >
              {link.value}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <p className="text-xs" style={{ color: "#86868B" }}>Langley, BC · (236) 975-5855</p>
      </div>
    </div>
  );
}
