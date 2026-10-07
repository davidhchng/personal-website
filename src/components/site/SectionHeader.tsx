"use client";

import { motion } from "framer-motion";

export default function SectionHeader({ index, title, aside }: { index: string; title: string; aside?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 56 }}>
      <div>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}
        >
          <span style={{ color: "var(--accent)" }}>{index}</span>
          <span style={{ width: 28, height: 1, background: "var(--line-strong)", display: "inline-block" }} />
          {title}
        </motion.p>
        <h2 className="h-section" aria-label={title}>
          <span aria-hidden style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.1em", marginBottom: "-0.1em" }}>
            <motion.span
              initial={{ y: "105%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
              style={{ display: "inline-block" }}
            >
              {title}
            </motion.span>
          </span>
        </h2>
      </div>
      {aside}
    </div>
  );
}
