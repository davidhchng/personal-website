"use client";

// ─── ContactPanel ─────────────────────────────────────────────────────────────
// Revealed when the passenger door opens.
//
// TO REPLACE: update email, links, and any social handles below.
// ─────────────────────────────────────────────────────────────────────────────

interface ContactLink {
  label: string;
  href: string;
  value: string;
}

// ← REPLACE THIS with your real contact info
const LINKS: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:you@example.com", // ← REPLACE
    value: "you@example.com",        // ← REPLACE
  },
  {
    label: "GitHub",
    href: "https://github.com/yourhandle", // ← REPLACE
    value: "github.com/yourhandle",         // ← REPLACE
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/yourhandle", // ← REPLACE
    value: "linkedin.com/in/yourhandle",         // ← REPLACE
  },
];

export default function ContactPanel() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4 leading-tight">
        Contact
      </h2>
      <p className="text-white/40 text-sm leading-relaxed mb-10">
        {/* ← REPLACE: your contact message */}
        I&apos;m open to interesting conversations, collaborations, and opportunities.
        Best reached by email.
      </p>

      <ul className="space-y-6">
        {LINKS.map((link) => (
          <li key={link.label}>
            <p className="text-white/30 text-xs tracking-widest uppercase mb-1">
              {link.label}
            </p>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="
                text-white text-sm
                border-b border-white/20
                hover:border-white/60
                transition-colors duration-200
                pb-0.5
              "
            >
              {link.value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
