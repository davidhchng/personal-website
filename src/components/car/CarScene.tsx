"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ActiveSection, SectionId } from "@/types";

// Car states
import CarIdle     from "./states/CarIdle";
import CarDoorOpen from "./states/CarDoorOpen";
import CarTrunkOpen from "./states/CarTrunkOpen";
import CarHoodOpen from "./states/CarHoodOpen";
import CarPassDoor from "./states/CarPassDoor";

// Content panels
import ContentPanel    from "@/components/panels/ContentPanel";
import ProjectsPanel   from "@/components/panels/ProjectsPanel";
import AboutPanel      from "@/components/panels/AboutPanel";
import SkillsPanel     from "@/components/panels/SkillsPanel";
import ContactPanel    from "@/components/panels/ContactPanel";

// ─── CarScene ────────────────────────────────────────────────────────────────
// Two-axis state machine:
//
//   currentView: "side" | "front" | "rear"
//     — changed by left/right arrows
//     — changing view resets activeSection
//
//   activeSection: SectionId | null
//     — set by clicking a car part hotspot
//     — null = no panel open; car shows in "ready" state for that view
//
// View → available hotspots → section
//   side  → driver door → "projects"
//   side  → passenger door → "contact"
//   front → hood → "skills"
//   rear  → trunk → "about"
//
// Arrow behavior:
//   side  → left=rear,  right=front
//   rear  → right=side  (left hidden)
//   front → left=side   (right hidden)
// ─────────────────────────────────────────────────────────────────────────────

type View = "side" | "front" | "rear";

const PANEL_MAP: Partial<Record<SectionId, React.ComponentType>> = {
  projects: ProjectsPanel,
  about:    AboutPanel,
  skills:   SkillsPanel,
  contact:  ContactPanel,
};

const carTransition = {
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  exit:       { opacity: 0 },
  transition: { duration: 0.3, ease: "easeInOut" },
};

function ArrowButton({
  direction,
  label,
  onClick,
}: {
  direction: "left" | "right";
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={label}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.15 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center gap-2 text-white/25 hover:text-white/75 transition-colors duration-300 group"
    >
      <svg
        width="18" height="18" viewBox="0 0 20 20" fill="none"
        style={{ transform: direction === "right" ? "scaleX(-1)" : "none" }}
      >
        <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="
        text-white/0 group-hover:text-white/35
        text-[10px] tracking-widest uppercase
        transition-colors duration-300
        whitespace-nowrap
        [writing-mode:vertical-lr]
        rotate-180
      ">
        {label}
      </span>
    </motion.button>
  );
}

export default function CarScene() {
  const [currentView, setCurrentView]     = useState<View>("side");
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);

  const handleViewChange = (v: View) => {
    setCurrentView(v);
    setActiveSection(null);
  };

  const handleSectionClick = (id: SectionId) => setActiveSection(id);
  const handleClose        = () => setActiveSection(null);

  // Arrow visibility & targets
  const panelOpen     = activeSection !== null;
  const showLeftArrow  = !panelOpen && (currentView === "side" || currentView === "front");
  const showRightArrow = !panelOpen && (currentView === "side" || currentView === "rear");

  const leftLabel  = currentView === "front" ? "Side" : "Rear";
  const rightLabel = currentView === "rear"  ? "Side" : "Front";

  const handleLeft  = () => handleViewChange(currentView === "front" ? "side" : "rear");
  const handleRight = () => handleViewChange(currentView === "rear"  ? "side" : "front");

  // Determine which car component + key to render
  // Key only changes when the component *type* changes (triggers crossfade).
  // Within front/rear views, the same component handles open/closed via props.
  let stateKey: string;
  if (currentView === "side") {
    if (activeSection === "projects") stateKey = "side-door";
    else if (activeSection === "contact") stateKey = "side-passdoor";
    else stateKey = "side-idle";
  } else {
    stateKey = currentView; // "front" or "rear" — component stays, just props change
  }

  const PanelContent = activeSection ? PANEL_MAP[activeSection] : null;

  function renderCar() {
    if (currentView === "side") {
      if (activeSection === "projects") return <CarDoorOpen />;
      if (activeSection === "contact")  return <CarPassDoor />;
      return <CarIdle onSectionClick={handleSectionClick} />;
    }
    if (currentView === "front") {
      return (
        <CarHoodOpen
          isOpen={activeSection === "skills"}
          onSectionClick={handleSectionClick}
        />
      );
    }
    // rear
    return (
      <CarTrunkOpen
        isOpen={activeSection === "about"}
        onSectionClick={handleSectionClick}
      />
    );
  }

  return (
    <div className="car-scene relative w-full flex flex-col items-center justify-center">

      {/* ── Car row: left arrow + car + right arrow ──────────────────────── */}
      <div className="relative w-full flex items-center justify-center gap-4 md:gap-8">

        {/* Left arrow */}
        <div className="flex-shrink-0 w-8 flex items-center justify-center" style={{ minHeight: "180px" }}>
          <AnimatePresence>
            {showLeftArrow && (
              <ArrowButton key="left" direction="left" label={leftLabel} onClick={handleLeft} />
            )}
          </AnimatePresence>
        </div>

        {/* Car viewport */}
        <div className="relative flex-1 max-w-3xl" style={{ aspectRatio: "1200/520" }}>
          <AnimatePresence mode="wait">
            <motion.div key={stateKey} {...carTransition} className="absolute inset-0">
              {renderCar()}
            </motion.div>
          </AnimatePresence>

          {/* Back / close button — visible when a panel is open */}
          <AnimatePresence>
            {panelOpen && (
              <motion.button
                key="back-btn"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={handleClose}
                className="
                  absolute top-3 left-3 z-20
                  text-white/30 hover:text-white/70
                  text-[10px] tracking-widest uppercase
                  transition-colors duration-200
                  flex items-center gap-1.5
                "
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M8 5H2M2 5L5 2M2 5L5 8" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                Close
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        <div className="flex-shrink-0 w-8 flex items-center justify-center" style={{ minHeight: "180px" }}>
          <AnimatePresence>
            {showRightArrow && (
              <ArrowButton key="right" direction="right" label={rightLabel} onClick={handleRight} />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── View indicator ─────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.p
          key={currentView}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-white/20 text-[10px] tracking-[0.25em] uppercase"
        >
          {currentView === "side"  && "Side — click a door"}
          {currentView === "front" && "Front — click the hood"}
          {currentView === "rear"  && "Rear — click the trunk"}
        </motion.p>
      </AnimatePresence>

      {/* ── Content panel ──────────────────────────────────────────────── */}
      <ContentPanel
        isOpen={panelOpen}
        sectionId={activeSection ?? "projects"}
        onClose={handleClose}
      >
        {PanelContent && <PanelContent />}
      </ContentPanel>
    </div>
  );
}
