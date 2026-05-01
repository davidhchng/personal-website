"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SectionId } from "@/types";
import AboutPanel        from "@/components/panels/AboutPanel";
import ProjectsPanel     from "@/components/panels/ProjectsPanel";
import SkillsPanel       from "@/components/panels/SkillsPanel";
import ExperiencePanel   from "@/components/panels/ExperiencePanel";
import VolunteeringPanel from "@/components/panels/VolunteeringPanel";
import HobbiesPanel      from "@/components/panels/HobbiesPanel";
import ContactPanel      from "@/components/panels/ContactPanel";

const PANEL_MAP: Partial<Record<SectionId, React.ComponentType>> = {
  about:        AboutPanel,
  projects:     ProjectsPanel,
  skills:       SkillsPanel,
  experience:   ExperiencePanel,
  volunteering: VolunteeringPanel,
  hobbies:      HobbiesPanel,
  contact:      ContactPanel,
};

const SECTION_LABELS: Partial<Record<SectionId, string>> = {
  about:        "About",
  projects:     "Projects",
  skills:       "Skills",
  experience:   "Experience",
  volunteering: "Volunteering",
  hobbies:      "Hobbies",
  contact:      "Contact",
};

const contentVariants = {
  enter:  (d: number) => ({ opacity: 0, x: d * 28 }),
  center: { opacity: 1, x: 0 },
  exit:   (d: number) => ({ opacity: 0, x: d * -28 }),
};

interface DashboardScreenProps {
  sectionId:    SectionId;
  sectionIndex: number;
  direction:    1 | -1;
}

export default function DashboardScreen({ sectionId, sectionIndex, direction }: DashboardScreenProps) {
  const Panel = PANEL_MAP[sectionId];

  return (
    <div
      className="w-full h-full flex flex-col rounded-xl overflow-hidden"
      style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] tracking-[0.2em] tabular-nums font-light" style={{ color: "#86868B" }}>
            {String(sectionIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-[10px]" style={{ color: "rgba(0,0,0,0.15)" }}>/</span>
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "#1D1D1F" }}>
            {SECTION_LABELS[sectionId]}
          </span>
        </div>

        {/* Pulsing live indicator */}
        <motion.div
          animate={{ opacity: [1, 0.25, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "rgba(0,0,0,0.2)" }}
        />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto min-h-0 px-5 py-4" style={{ position: "relative" }}>
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={sectionId}
            custom={direction}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.15, ease: "easeInOut" }}
            style={{ position: "absolute", width: "100%" }}
          >
            {Panel && <Panel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
