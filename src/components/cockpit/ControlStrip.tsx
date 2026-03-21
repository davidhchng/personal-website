"use client";

import { motion } from "framer-motion";

interface Section {
  id: string;
  label: string;
}

interface ControlStripProps {
  sections: Section[];
  sectionIndex: number;
  onSectionChange: (index: number) => void;
}

export default function ControlStrip({ sections, sectionIndex, onSectionChange }: ControlStripProps) {
  return (
    <div className="flex items-center justify-center gap-6 pt-4">
      {sections.map((section, idx) => {
        const isActive = idx === sectionIndex;
        return (
          <button
            key={section.id}
            onClick={() => onSectionChange(idx)}
            className="flex flex-col items-center gap-2 group"
          >
            {/* Indicator bar */}
            <motion.div
              animate={{
                width: isActive ? 22 : 6,
                backgroundColor: isActive
                  ? "rgba(255,255,255,0.75)"
                  : "rgba(255,255,255,0.25)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ height: 2, borderRadius: 1 }}
            />
            {/* Label */}
            <span
              className={`text-[9px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                isActive
                  ? "text-white/65"
                  : "text-white/32 group-hover:text-white/50"
              }`}
            >
              {section.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
