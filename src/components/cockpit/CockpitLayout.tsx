"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionId } from "@/types";
import SteeringWheel   from "./SteeringWheel";
import DashboardScreen from "./DashboardScreen";
import ControlStrip    from "./ControlStrip";

const COCKPIT_SECTIONS: { id: SectionId; label: string }[] = [
  { id: "about",      label: "About"      },
  { id: "projects",   label: "Projects"   },
  { id: "skills",     label: "Skills"     },
  { id: "experience", label: "Experience" },
  { id: "hobbies",    label: "Hobbies"    },
  { id: "contact",    label: "Contact"    },
];

export default function CockpitLayout() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [direction, setDirection]       = useState<1 | -1>(1);
  const activeSection = COCKPIT_SECTIONS[sectionIndex];

  const handleSectionChange = (newIdx: number) => {
    if (newIdx === sectionIndex) return;
    setDirection(newIdx > sectionIndex ? 1 : -1);
    setSectionIndex(newIdx);
  };

  // Keyboard: ← / → to step, 1–6 to jump directly
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")
        handleSectionChange(Math.max(0, sectionIndex - 1));
      if (e.key === "ArrowRight" || e.key === "ArrowDown")
        handleSectionChange(Math.min(COCKPIT_SECTIONS.length - 1, sectionIndex + 1));
      const num = parseInt(e.key);
      if (num >= 1 && num <= COCKPIT_SECTIONS.length)
        handleSectionChange(num - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sectionIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="w-screen h-screen flex flex-col overflow-hidden select-none"
      style={{ background: "#000" }}
    >

      {/* ── Windshield ───────────────────────────────────────────────────────── */}
      <div
        className="w-full flex-shrink-0 flex flex-col items-center justify-center gap-2.5"
        style={{
          height: "26vh",
          background: "linear-gradient(to bottom, #1d1d1d 0%, #181818 70%, #141414 100%)",
        }}
      >
        <h1 className="text-3xl font-bold tracking-[0.35em] uppercase text-white/90">
          David Chang
        </h1>

        {/* Active section — slides in the direction of travel */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.span
            key={activeSection.id}
            custom={direction}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 18 }),
              center: { opacity: 1, x: 0 },
              exit:  (d: number) => ({ opacity: 0, x: d * -18 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="text-[10px] tracking-[0.45em] uppercase font-light"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {activeSection.label}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ── Dashboard lip — the physical raised edge ──────────────────────────── */}
      <div
        className="w-full flex-shrink-0"
        style={{
          height: "11px",
          background: "linear-gradient(to bottom, #070707, #0e0e0e)",
          borderTop: "1px solid rgba(255,255,255,0.09)",
        }}
      />

      {/* ── Cockpit row ──────────────────────────────────────────────────────── */}
      <div
        className="flex-1 min-h-0 flex"
        style={{ background: "#111", padding: "2.5rem 4rem" }}
      >

        {/* Left: Steering wheel */}
        <div
          className="flex-shrink-0 flex items-center justify-center"
          style={{ width: "36%" }}
        >
          <SteeringWheel
            sectionIndex={sectionIndex}
            onSectionChange={handleSectionChange}
          />
        </div>

        {/* Center: Dashboard + control strip */}
        <div className="flex flex-col" style={{ width: "40%" }}>
          <div className="flex-1 min-h-0">
            <DashboardScreen
              sectionId={activeSection.id}
              sectionIndex={sectionIndex}
              direction={direction}
            />
          </div>
          <ControlStrip
            sections={COCKPIT_SECTIONS}
            sectionIndex={sectionIndex}
            onSectionChange={handleSectionChange}
          />
        </div>

        {/* Right: vertical section navigator */}
        <div
          className="flex-shrink-0 flex items-center justify-end"
          style={{ width: "24%", paddingRight: "0.5rem" }}
        >
          <div className="flex flex-col gap-3">
            {COCKPIT_SECTIONS.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => handleSectionChange(idx)}
                className="flex items-center gap-2.5 group"
              >
                <motion.div
                  animate={{
                    width: idx === sectionIndex ? 18 : 4,
                    backgroundColor:
                      idx === sectionIndex
                        ? "rgba(255,255,255,0.70)"
                        : "rgba(255,255,255,0.14)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ height: 1.5, borderRadius: 1, flexShrink: 0 }}
                />
                <span
                  className={`text-[9px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                    idx === sectionIndex
                      ? "text-white/62"
                      : "text-white/20 group-hover:text-white/44"
                  }`}
                >
                  {section.label}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
