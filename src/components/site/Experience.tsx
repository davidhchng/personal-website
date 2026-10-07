"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { LEADERSHIP, Role, VOLUNTEERING, WORK } from "@/lib/content";

function Timeline({ title, roles, first = false }: { title: string; roles: Role[]; first?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });

  return (
    <div ref={ref} style={{ paddingTop: first ? 0 : 56 }}>
      <motion.p
        className="h-sub"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: 26 }}
      >
        {title}
      </motion.p>
      <div style={{ position: "relative" }}>
        {/* track + scroll-driven fill */}
        <div style={{ position: "absolute", left: 22, top: 22, bottom: 30, width: 1, background: "var(--line)" }} />
        <motion.div style={{ position: "absolute", left: 22, top: 22, bottom: 30, width: 1, background: "var(--accent)", scaleY: fill, transformOrigin: "top" }} />
        <ul style={{ listStyle: "none" }}>
          {roles.map((r, i) => {
            const now = r.period.includes("Present");
            return (
              <motion.li
                key={r.org + r.role}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
                className="role-row"
              >
                <span className="role-logo" style={{ borderColor: now ? "var(--accent)" : "var(--line)" }}>
                  {r.logo && <img src={r.logo} alt={`${r.org} logo`} loading="lazy" />}
                </span>
                <div className="role-body">
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)", fontWeight: 650, letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: 10 }}>
                      {r.role}
                      {now && (
                        <span style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", background: "var(--accent-soft)", borderRadius: 999, padding: "3px 8px", fontWeight: 700 }}>
                          Now
                        </span>
                      )}
                    </span>
                    <span style={{ fontSize: 13, color: "var(--subtle)", fontVariantNumeric: "tabular-nums", letterSpacing: "0.03em" }}>{r.period}</span>
                  </div>
                  <p style={{ fontSize: 15, color: "var(--subtle)", marginTop: 4 }}>
                    <span className="role-org">{r.org}</span> · {r.location}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-pad" style={{ scrollMarginTop: 20 }}>
      <div className="wrap">
        <SectionHeader index="01" title="Experience" />
        <div style={{ maxWidth: 860 }}>
          <Timeline title="Work" roles={WORK} first />
          <Timeline title="Leadership" roles={LEADERSHIP} />
          <Timeline title="Volunteering" roles={VOLUNTEERING} />
        </div>
      </div>
      <style>{`
        .role-row { position: relative; display: flex; gap: 20px; align-items: flex-start; padding: 0 0 26px; }
        .role-logo {
          position: relative; z-index: 1; width: 44px; height: 44px; flex-shrink: 0;
          border-radius: 12px; border: 1px solid; background: #fff; overflow: hidden;
          display: flex; align-items: center; justify-content: center; padding: 6px;
          transition: transform .3s cubic-bezier(.2,.7,.2,1), box-shadow .3s ease;
        }
        .role-logo img { width: 100%; height: 100%; object-fit: contain; display: block; }
        .role-body { flex: 1; min-width: 0; padding: 4px 14px 10px; margin: -4px -14px 0; border-radius: 12px; transition: background-color .25s ease, transform .25s ease; }
        .role-row:hover .role-body { background: var(--accent-soft); transform: translateX(4px); }
        .role-row:hover .role-logo { transform: scale(1.08) rotate(-3deg); box-shadow: var(--shadow); }
        .role-row:hover .role-org { color: var(--fg); }
        .role-org { transition: color .2s ease; }
      `}</style>
    </section>
  );
}
