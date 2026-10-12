"use client";

import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import SectionHeader from "./SectionHeader";
import { LINKS, LOCATION_LINE } from "@/lib/content";
import { actions } from "@/lib/store";

const EASE = [0.2, 0.7, 0.2, 1] as const;

const ICONS: Record<string, React.ReactNode> = {
  GitHub: (
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" fill="currentColor" />
  ),
  LinkedIn: (
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" fill="currentColor" />
  ),
};

export default function Contact() {
  return (
    <section id="contact" className="section-pad" style={{ scrollMarginTop: 20, paddingBottom: 0 }}>
      <div className="wrap section-grid">
        <SectionHeader index="04" title="Contact" />

        <div className="contact-grid">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="contact-email"
          >
            <p className="eyebrow" style={{ fontSize: 10, marginBottom: 14 }}>{LINKS.email.label}</p>
            <a href={LINKS.email.href} className="link-underline" style={{ fontSize: "clamp(1.15rem, 2.3vw, 1.9rem)", fontWeight: 700, letterSpacing: "-0.03em", textDecoration: "none", overflowWrap: "anywhere" }}>
              {LINKS.email.value}
            </a>
            <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
              <Magnetic>
                <button
                  onClick={() => actions.copyEmail(LINKS.email.value)}
                  className="chip"
                  style={{ padding: "11px 20px", background: "var(--fg)", color: "var(--bg)", borderColor: "var(--fg)", fontSize: 13 }}
                >
                  Copy email ⧉
                </button>
              </Magnetic>
              <Magnetic>
                <a href={LINKS.email.href} className="chip" style={{ padding: "11px 20px", textDecoration: "none", fontSize: 13 }}>
                  Say hello ✉
                </a>
              </Magnetic>
            </div>
          </motion.div>

          {[LINKS.github, LINKS.linkedin].map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.08 * (i + 1) }}
              className="contact-card"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden className="contact-icon">{ICONS[l.label]}</svg>
              <span className="eyebrow" style={{ fontSize: 10, marginTop: "auto" }}>{l.label}</span>
              <span style={{ fontSize: 15, color: "var(--muted)", overflowWrap: "anywhere" }}>{l.value}</span>
              <span className="contact-arrow" aria-hidden>↗</span>
            </motion.a>
          ))}
        </div>
      </div>

      <div className="wrap">
        <footer style={{ marginTop: 120, padding: "28px 0 36px", borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", fontSize: 12, color: "var(--subtle)" }}>
          <span>{LOCATION_LINE}</span>
          <span>© {new Date().getFullYear()} David (Hanmin) Chang</span>
          <button onClick={() => actions.scrollTo("top")} className="link-underline" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "var(--subtle)" }}>
            Back to top ↑
          </button>
        </footer>
      </div>

      <style>{`
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .contact-email { grid-column: span 2; }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; }
          .contact-email { grid-column: span 1; }
        }
        .contact-email { padding: 28px; border: 1px solid var(--line); border-radius: 18px; background: var(--bg-elev); }
        .contact-card {
          position: relative; display: flex; flex-direction: column; gap: 12px; justify-content: flex-start;
          min-height: 200px; padding: 28px; border: 1px solid var(--line); border-radius: 18px;
          text-decoration: none; background: var(--bg-elev); overflow: hidden;
          transition: border-color .25s ease, transform .35s cubic-bezier(.2,.7,.2,1), background-color .3s ease;
        }
        .contact-card:hover { border-color: var(--line-strong); transform: translateY(-4px); background: var(--accent-soft); }
        .contact-icon { color: var(--fg); transition: transform .35s cubic-bezier(.2,.7,.2,1), color .2s ease; }
        .contact-card:hover .contact-icon { transform: scale(1.12) rotate(-6deg); color: var(--accent); }
        .contact-arrow { position: absolute; top: 22px; right: 24px; font-size: 22px; color: var(--subtle); transition: transform .35s cubic-bezier(.2,.7,.2,1), color .2s ease; }
        .contact-card:hover .contact-arrow { transform: translate(4px, -4px) rotate(0deg) scale(1.15); color: var(--accent); }
      `}</style>
    </section>
  );
}
