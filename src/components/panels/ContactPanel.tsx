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
      <p className="text-white/55 text-sm leading-relaxed mb-8">
        Open to interesting conversations, data collaborations, and opportunities.
        Best reached by email.
      </p>

      <ul className="space-y-6">
        {LINKS.map((link) => (
          <li key={link.label}>
            <p className="text-white/32 text-[10px] tracking-widest uppercase mb-1.5">
              {link.label}
            </p>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="text-white text-sm border-b border-white/20 hover:border-white/60 transition-colors duration-200 pb-0.5"
            >
              {link.value}
            </a>
          </li>
        ))}
      </ul>

      <div className="border-t border-white/10 mt-8 pt-5">
        <p className="text-white/28 text-xs">Langley, BC · (236) 975-5855</p>
      </div>
    </div>
  );
}
