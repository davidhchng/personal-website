"use client";

import { motion } from "framer-motion";

export default function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <motion.header
      className="section-rail"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <span className="rail-index">{index}</span>
      <h2 className="rail-title">{title}</h2>
    </motion.header>
  );
}
