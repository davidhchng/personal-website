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
    <div className="flex items-center justify-center gap-3 md:gap-5 pt-3 md:pt-4">
      {sections.map((section, idx) => {
        const isActive = idx === sectionIndex;
        return (
          <button
            key={section.id}
            onClick={() => onSectionChange(idx)}
            className="flex flex-col items-center gap-1.5 group"
          >
            <motion.div
              animate={{
                width: isActive ? 22 : 5,
                backgroundColor: isActive
                  ? "rgba(0,0,0,0.75)"
                  : "rgba(0,0,0,0.15)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ height: 2, borderRadius: 1 }}
            />
            <span
              className={`hidden md:block text-[9px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                isActive
                  ? "text-[#1D1D1F]"
                  : "text-black/25 group-hover:text-black/50"
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
