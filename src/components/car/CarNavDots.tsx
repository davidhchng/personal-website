"use client";

import { motion } from "framer-motion";
import { ActiveSection, SectionId } from "@/types";
import { SECTIONS } from "@/lib/sections";

interface CarNavDotsProps {
  activeSection: ActiveSection;
  onSelect: (id: SectionId | null) => void;
}

// ─── CarNavDots ───────────────────────────────────────────────────────────────
// Bottom-center navigation dots. One dot per section + one for the idle state.
// Clicking a dot is an alternative to clicking the car part directly.
// ─────────────────────────────────────────────────────────────────────────────

export default function CarNavDots({ activeSection, onSelect }: CarNavDotsProps) {
  return (
    <div className="flex items-center gap-4">
      {/* Idle / home dot */}
      <button
        onClick={() => onSelect(null)}
        aria-label="Return to home"
        className="relative flex items-center justify-center w-8 h-8 group"
      >
        <motion.div
          animate={{
            scale: activeSection === null ? 1 : 0.6,
            backgroundColor:
              activeSection === null ? "#ffffff" : "rgba(255,255,255,0.25)",
          }}
          transition={{ duration: 0.3 }}
          className="w-1.5 h-1.5 rounded-full"
        />
        {/* Tooltip */}
        <span className="
          absolute bottom-full mb-2 left-1/2 -translate-x-1/2
          text-white/40 text-xs tracking-widest uppercase whitespace-nowrap
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          pointer-events-none
        ">
          Home
        </span>
      </button>

      {/* Section dots */}
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          onClick={() => onSelect(section.id)}
          aria-label={`Open ${section.label}`}
          className="relative flex items-center justify-center w-8 h-8 group"
        >
          <motion.div
            animate={{
              scale: activeSection === section.id ? 1 : 0.6,
              backgroundColor:
                activeSection === section.id
                  ? "#ffffff"
                  : "rgba(255,255,255,0.25)",
            }}
            transition={{ duration: 0.3 }}
            className="w-1.5 h-1.5 rounded-full"
          />
          {/* Tooltip */}
          <span className="
            absolute bottom-full mb-2 left-1/2 -translate-x-1/2
            text-white/40 text-xs tracking-widest uppercase whitespace-nowrap
            opacity-0 group-hover:opacity-100 transition-opacity duration-200
            pointer-events-none
          ">
            {section.label}
          </span>
        </button>
      ))}
    </div>
  );
}
