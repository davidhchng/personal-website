"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

// Infinite CSS marquee; scroll speed adds a subtle skew so it feels physical.
export default function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { stiffness: 120, damping: 30 });
  const skewX = useTransform(velocity, [-2500, 0, 2500], [8, 0, -8], { clamp: true });

  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden style={{ overflow: "hidden", padding: "22px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <motion.div style={{ skewX }}>
        <div className={`marquee-track${reverse ? " reverse" : ""}`}>
          {row.map((t, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 28, paddingRight: 28, whiteSpace: "nowrap" }}>
              <span style={{ fontSize: "clamp(1.6rem, 3.6vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: i % 2 ? "var(--faint)" : "var(--fg)" }}>
                {i % 3 === 1 ? <span className="serif" style={{ fontWeight: 400 }}>{t}</span> : t}
              </span>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
