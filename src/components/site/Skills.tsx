"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { COURSEWORK, HACKATHONS, SKILL_GROUPS } from "@/lib/content";

export default function Skills() {
  return (
    <section id="skills" className="section-pad" style={{ scrollMarginTop: 20 }}>
      <div className="wrap section-grid">
        <SectionHeader index="03" title="Skills" />

        <div>
        {[...SKILL_GROUPS, { category: "Hackathons", items: HACKATHONS }].map((g, gi) => (
          <motion.div
            key={g.category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
            style={{ marginBottom: 36 }}
          >
            <p className="eyebrow" style={{ marginBottom: 14 }}>{g.category}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {g.items.map(item => (
                <span key={item} className="skill-chip">{item}</span>
              ))}
            </div>
          </motion.div>
        ))}

        <div style={{ marginTop: 72, paddingTop: 40, borderTop: "1px solid var(--line)" }}>
          <p className="h-sub" style={{ marginBottom: 24 }}>Relevant Coursework</p>
          <ol className="course-list">
            {COURSEWORK.map((c, i) => (
              <motion.li
                key={c}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <span style={{ fontSize: 11, color: "var(--faint)", fontVariantNumeric: "tabular-nums", width: 24 }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="course-name">{c}</span>
              </motion.li>
            ))}
          </ol>
        </div>
        </div>
      </div>

      <style>{`
        .skill-chip {
          font-size: 15px; font-weight: 600; padding: 10px 18px; border-radius: 999px;
          border: 1px solid var(--line); background: var(--bg-elev); letter-spacing: -0.01em;
          transition: background-color .2s ease, color .2s ease, border-color .2s ease, transform .2s cubic-bezier(.2,.7,.2,1);
        }
        .skill-chip:hover { transform: translateY(-2px); background: var(--fg); color: var(--bg); border-color: var(--fg); }
        .course-list { list-style: none; display: grid; grid-template-columns: 1fr 1fr; column-gap: 48px; }
        .course-list li { display: flex; align-items: baseline; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--line); }
        .course-name { font-size: 15px; color: var(--muted); transition: color .2s ease, transform .25s cubic-bezier(.2,.7,.2,1); display: inline-block; }
        .course-list li:hover .course-name { color: var(--fg); transform: translateX(6px); }
        @media (max-width: 640px) { .course-list { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
