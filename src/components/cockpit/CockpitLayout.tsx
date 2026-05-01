"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionId } from "@/types";
import SteeringWheel   from "./SteeringWheel";
import DashboardScreen from "./DashboardScreen";
import ControlStrip    from "./ControlStrip";

const COCKPIT_SECTIONS: { id: SectionId; label: string }[] = [
  { id: "about",        label: "About"        },
  { id: "projects",     label: "Projects"     },
  { id: "skills",       label: "Skills"       },
  { id: "experience",   label: "Experience"   },
  { id: "volunteering", label: "Volunteering" },
  { id: "hobbies",      label: "Hobbies"      },
  { id: "contact",      label: "Contact"      },
];

export default function CockpitLayout() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [direction, setDirection]       = useState<1 | -1>(1);
  const [compact, setCompact]           = useState(false);
  const activeSection = COCKPIT_SECTIONS[sectionIndex];

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setCompact(mq.matches);
    const h = (e: MediaQueryListEvent) => setCompact(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const handleSectionChange = (newIdx: number) => {
    if (newIdx === sectionIndex) return;
    setDirection(newIdx > sectionIndex ? 1 : -1);
    setSectionIndex(newIdx);
  };

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
      style={{ background: "#F5F5F7" }}
    >
      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <div
        className="w-full flex-shrink-0 flex flex-col items-center justify-center gap-2 h-[15vh] md:h-[22vh]"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
      >
        <h1 className="text-2xl md:text-3xl font-semibold tracking-[0.25em] uppercase" style={{ color: "#1D1D1F" }}>
          David Chang
        </h1>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.span
            key={activeSection.id}
            custom={direction}
            variants={{
              enter:  (d: number) => ({ opacity: 0, x: d * 18 }),
              center: { opacity: 1, x: 0 },
              exit:   (d: number) => ({ opacity: 0, x: d * -18 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="text-[9px] md:text-[10px] tracking-[0.45em] uppercase font-light"
            style={{ color: "#86868B" }}
          >
            {activeSection.label}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ── Cockpit row ──────────────────────────────────────────────────────── */}
      <div
        className="flex-1 min-h-0 flex flex-col md:flex-row p-4 md:px-16 md:py-10"
        style={{ background: "#F5F5F7" }}
      >
        {/* Steering wheel */}
        <div className="flex-shrink-0 flex items-center justify-center pb-3 md:pb-0 md:w-[36%]">
          <SteeringWheel
            sectionIndex={sectionIndex}
            onSectionChange={handleSectionChange}
            compact={compact}
          />
        </div>

        {/* Dashboard + control strip */}
        <div className="flex-1 min-h-0 flex flex-col md:flex-none md:w-[40%]">
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

        {/* Right: vertical section navigator — desktop only */}
        <div className="hidden md:flex flex-shrink-0 items-center justify-end md:w-[24%] pr-2">
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
                        ? "rgba(0,0,0,0.7)"
                        : "rgba(0,0,0,0.12)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ height: 1.5, borderRadius: 1, flexShrink: 0 }}
                />
                <span
                  className={`text-[9px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                    idx === sectionIndex
                      ? "text-[#1D1D1F]"
                      : "text-black/25 group-hover:text-black/50"
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
