"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { PROJECTS } from "@/lib/content";

// Totals derived from the project write-ups:
// 880K clutch events + 300K transactions + 259K EV sessions + 130K registrations
const STATS = [
  { to: 1.5,              decimals: 1, suffix: "M+", label: "data records analyzed" },
  { to: PROJECTS.length,  decimals: 0, suffix: "",   label: "projects shipped" },
  { to: 3,                decimals: 0, suffix: "",   label: "hackathons built at" },
  { to: 82,               decimals: 0, suffix: "%",  label: "best model test accuracy" },
];

function Counter({ to, decimals, suffix }: { to: number; decimals: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: setVal });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>{val.toFixed(decimals)}{suffix}</span>;
}

export default function Stats() {
  return (
    <section aria-label="At a glance" className="wrap" style={{ paddingTop: 40 }}>
      <div className="stats-grid">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
            style={{ padding: "28px 24px", borderLeft: i ? "1px solid var(--line)" : "none" }}
            className="stat-cell"
          >
            <div style={{ fontSize: "clamp(2.2rem, 4.4vw, 3.6rem)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1 }}>
              <Counter {...s} />
            </div>
            <p style={{ marginTop: 10, fontSize: 12, color: "var(--subtle)", letterSpacing: "0.02em" }}>{s.label}</p>
          </motion.div>
        ))}
      </div>
      <style>{`
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        @media (max-width: 760px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .stat-cell:nth-child(3) { border-left: none !important; }
          .stat-cell:nth-child(n+3) { border-top: 1px solid var(--line); }
          .stat-cell { padding: 22px 16px !important; }
        }
      `}</style>
    </section>
  );
}
