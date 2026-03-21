"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { SectionId } from "@/types";

interface ContentPanelProps {
  isOpen: boolean;
  sectionId: SectionId;
  children: ReactNode;
  onClose: () => void;
}

// ─── ContentPanel ─────────────────────────────────────────────────────────────
// Reusable black panel that slides up and fades in over the car.
// All section panels are rendered inside this wrapper.
//
// TO CUSTOMIZE: adjust the panel size, position, and animation variants below.
// The panel is intentionally unstyled (black bg, white text) per the design spec.
// ─────────────────────────────────────────────────────────────────────────────

const panelVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94], // custom ease — smooth deceleration
    },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.97,
    transition: {
      duration: 0.3,
      ease: [0.55, 0, 1, 0.45],
    },
  },
};

export default function ContentPanel({
  isOpen,
  sectionId,
  children,
  onClose,
}: ContentPanelProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop — clicking outside closes the panel */}
          <motion.div
            key={`backdrop-${sectionId}`}
            className="fixed inset-0 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key={`panel-${sectionId}`}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            // Panel is centered horizontally, positioned in upper portion of screen
            // TO CUSTOMIZE: adjust these classes for different panel positions
            className="
              fixed z-40
              left-1/2 top-1/2
              -translate-x-1/2 -translate-y-1/2
              w-full max-w-lg
              mx-auto
              bg-black border border-white/10
              px-10 py-10
            "
            style={{
              // Sharp corners — no border-radius per design spec (minimal/Apple-like)
              borderRadius: 0,
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="
                absolute top-5 right-5
                text-white/40 hover:text-white
                transition-colors duration-200
                text-xs tracking-widest uppercase
                flex items-center gap-2
              "
              aria-label="Close panel"
            >
              <span>Close</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" />
                <line x1="11" y1="1" x2="1" y2="11" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            {/* Section content is injected here */}
            <div className="mt-2">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
