"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionId } from "@/types";

// ─── CarHoodOpen ──────────────────────────────────────────────────────────────
// Front view of the 2011 Lancer ES.
// isOpen=false → static front view with clickable hood hotspot
// isOpen=true  → hood animates open (Skills section revealed)
// ─────────────────────────────────────────────────────────────────────────────

interface CarHoodOpenProps {
  isOpen?: boolean;
  onSectionClick?: (id: SectionId) => void;
}

export default function CarHoodOpen({ isOpen = true, onSectionClick }: CarHoodOpenProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <svg
      viewBox="0 0 900 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* ── Ground shadow ───────────────────────────────────────────────── */}
      <ellipse cx="450" cy="435" rx="248" ry="11" fill="black" opacity="0.5" />

      {/* ═══════════════════════════════════════════════════════════════════
          FRONT BODY SHELL
          ═══════════════════════════════════════════════════════════════════ */}

      {/* Windshield + roof (partial, above hood hinge) */}
      <path
        d="
          M 268 175
          C 268 168 275 148 284 136
          L 315 115
          L 450 110
          L 585 115
          L 616 136
          C 625 148 632 168 632 175
          L 614 188
          L 450 192
          L 286 188
          Z
        "
        fill="#0E0E0E"
      />
      {/* Roof cap */}
      <rect x="282" y="108" width="336" height="22" rx="0" fill="white" />
      {/* A-pillar left */}
      <path d="M 268 175 L 284 112 L 284 130 L 272 182 Z" fill="white" />
      {/* A-pillar right */}
      <path d="M 632 175 L 616 112 L 616 130 L 628 182 Z" fill="white" />

      {/* Upper front face (body panel between windshield base and headlights) */}
      <path
        d="
          M 256 188
          L 286 188
          L 450 192
          L 614 188
          L 644 188
          L 656 208
          L 656 250
          L 450 254
          L 244 250
          L 244 208
          Z
        "
        fill="white"
      />

      {/* ── Engine bay (visible when hood is open) ───────────────────────── */}
      <path
        d="M 260 205 L 640 205 L 646 252 L 254 252 Z"
        fill="#050505"
        stroke="#1A1A1A"
        strokeWidth="1"
      />
      {/* Engine bay detail */}
      <rect x="310" y="218" width="280" height="26" fill="#0C0C0C" />
      <rect x="355" y="222" width="80" height="16" rx="1" fill="#141414" />
      <rect x="465" y="222" width="80" height="16" rx="1" fill="#141414" />
      <line x1="310" y1="230" x2="590" y2="230" stroke="#1A1A1A" strokeWidth="1" />

      {/* ── ANIMATED HOOD ────────────────────────────────────────────────── */}
      <motion.g
        initial={{ rotateX: 0 }}
        animate={{ rotateX: isOpen ? -50 : 0 }}
        transition={{ duration: isOpen ? 1.0 : 0, ease: [0.25, 0.46, 0.45, 0.94], delay: isOpen ? 0.08 : 0 }}
        style={{ transformOrigin: "450px 205px", transformBox: "fill-box" }}
      >
        <path d="M 260 205 L 640 205 L 646 252 L 254 252 Z" fill="white" />
        {/* Hood center crease */}
        <line x1="450" y1="206" x2="450" y2="251" stroke="#EBEBEB" strokeWidth="2" />
        {/* Hood character lines (slight curves near edges) */}
        <path d="M 290 210 C 350 208 420 207 450 207" stroke="#E8E8E8" strokeWidth="1" fill="none" />
        <path d="M 610 210 C 550 208 480 207 450 207" stroke="#E8E8E8" strokeWidth="1" fill="none" />
      </motion.g>

      {/* ── HEADLIGHTS — Angular, Lancer signature ───────────────────────── */}
      {/* Left headlight cluster */}
      {/*
        The 2011 Lancer headlight:
        - Sweeps inward sharply from outer edge
        - Has a pointed inner corner near the grille
        - Multi-projector design
      */}
      <path
        d="
          M 244 210
          L 264 206
          L 296 206
          L 318 212
          L 322 242
          L 298 252
          L 254 252
          L 242 242
          Z
        "
        fill="#FFEEBB"
        opacity="0.9"
      />
      {/* Headlight inner chrome border */}
      <path
        d="M 244 210 L 264 206 L 296 206 L 318 212 L 322 242 L 298 252 L 254 252 L 242 242 Z"
        fill="none" stroke="#C8C8C8" strokeWidth="1.5"
      />
      {/* Main projector (lower-outer) */}
      <ellipse cx="270" cy="232" rx="16" ry="14" fill="none" stroke="#C8A030" strokeWidth="1.5" />
      <ellipse cx="270" cy="232" rx="8" ry="7" fill="#FFEEBB" opacity="0.7" />
      {/* Secondary projector */}
      <ellipse cx="302" cy="224" rx="11" ry="10" fill="none" stroke="#C8A030" strokeWidth="1.2" />
      <ellipse cx="302" cy="224" rx="5" ry="4.5" fill="#FFEEBB" opacity="0.6" />
      {/* DRL strip — horizontal at top */}
      <path d="M 248 212 L 294 208" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      {/* Sharp inner corner accent */}
      <path d="M 314 214 L 320 228 L 316 244" stroke="#D0A028" strokeWidth="1" fill="none" opacity="0.6" />

      {/* Right headlight cluster (mirrored) */}
      <path
        d="
          M 656 210
          L 636 206
          L 604 206
          L 582 212
          L 578 242
          L 602 252
          L 646 252
          L 658 242
          Z
        "
        fill="#FFEEBB"
        opacity="0.9"
      />
      <path
        d="M 656 210 L 636 206 L 604 206 L 582 212 L 578 242 L 602 252 L 646 252 L 658 242 Z"
        fill="none" stroke="#C8C8C8" strokeWidth="1.5"
      />
      <ellipse cx="630" cy="232" rx="16" ry="14" fill="none" stroke="#C8A030" strokeWidth="1.5" />
      <ellipse cx="630" cy="232" rx="8" ry="7" fill="#FFEEBB" opacity="0.7" />
      <ellipse cx="598" cy="224" rx="11" ry="10" fill="none" stroke="#C8A030" strokeWidth="1.2" />
      <ellipse cx="598" cy="224" rx="5" ry="4.5" fill="#FFEEBB" opacity="0.6" />
      <path d="M 652 212 L 606 208" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      <path d="M 586 214 L 580 228 L 584 244" stroke="#D0A028" strokeWidth="1" fill="none" opacity="0.6" />

      {/* ── CENTER GRILLE AREA ───────────────────────────────────────────── */}
      {/* Body panel between headlights (center bridge) */}
      <rect x="318" y="206" width="264" height="46" fill="white" />
      {/* Upper grille opening — narrow horizontal slot */}
      <rect x="322" y="250" width="256" height="8" rx="0" fill="#111" />

      {/* ── LOWER BUMPER / MAIN GRILLE ───────────────────────────────────── */}
      {/*
        The Lancer's most distinctive feature: very wide trapezoidal grille
        opening. Wider at the bottom, narrower at the top.
      */}
      <path
        d="
          M 254 252
          L 646 252
          L 660 278
          L 668 318
          L 656 356
          L 440 362
          L 244 356
          L 232 318
          L 240 278
          Z
        "
        fill="#E6E6E6"
      />

      {/* Main grille opening — large trapezoidal black opening */}
      <path
        d="M 296 262 L 604 262 L 618 310 L 282 310 Z"
        fill="#0D0D0D"
      />
      {/* Grille horizontal bars */}
      <line x1="286" y1="276" x2="614" y2="276" stroke="#222" strokeWidth="2.5" />
      <line x1="283" y1="290" x2="617" y2="290" stroke="#222" strokeWidth="2.5" />
      <line x1="281" y1="304" x2="619" y2="304" stroke="#222" strokeWidth="2.5" />

      {/* Mitsubishi 3-diamond logo — centered on grille */}
      <g transform="translate(450 288)">
        <path d="M 0,-14 L 9,-2 L 0,3 L -9,-2 Z" fill="white" opacity="0.9" />
        <path d="M -11,-2 L -2,12 L -11,17 L -20,3 Z" fill="white" opacity="0.9" />
        <path d="M 11,-2 L 20,3 L 11,17 L 2,12 Z" fill="white" opacity="0.9" />
      </g>

      {/* Front lip / lower bumper chin */}
      <path d="M 246 356 L 654 356 L 658 370 L 242 370 Z" fill="#D8D8D8" />
      {/* Center lower vent */}
      <rect x="340" y="316" width="220" height="16" rx="0" fill="#111" />
      <line x1="340" y1="324" x2="560" y2="324" stroke="#1E1E1E" strokeWidth="2" />

      {/* Front fog light housings */}
      <rect x="248" y="322" width="40" height="18" rx="2" fill="#FFEEBB" opacity="0.6" />
      <ellipse cx="268" cy="331" rx="12" ry="8" fill="none" stroke="#C8A030" strokeWidth="1" />
      <rect x="612" y="322" width="40" height="18" rx="2" fill="#FFEEBB" opacity="0.6" />
      <ellipse cx="632" cy="331" rx="12" ry="8" fill="none" stroke="#C8A030" strokeWidth="1" />

      {/* ── FRONT WHEELS ────────────────────────────────────────────────── */}
      {/* Left wheel */}
      <circle cx="276" cy="410" r="55" fill="#1C1C1C" />
      <circle cx="276" cy="410" r="40" fill="#272727" />
      {[90, 162, 234, 306, 18].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return <line key={i} x1={276 + 11 * Math.cos(rad)} y1={410 + 11 * Math.sin(rad)} x2={276 + 38 * Math.cos(rad)} y2={410 + 38 * Math.sin(rad)} stroke="#565656" strokeWidth="6" strokeLinecap="round" />;
      })}
      <circle cx="276" cy="410" r="9" fill="#3A3A3A" stroke="#5A5A5A" strokeWidth="1.5" />
      <circle cx="276" cy="410" r="4" fill="#4A4A4A" />

      {/* Right wheel */}
      <circle cx="624" cy="410" r="55" fill="#1C1C1C" />
      <circle cx="624" cy="410" r="40" fill="#272727" />
      {[90, 162, 234, 306, 18].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return <line key={i} x1={624 + 11 * Math.cos(rad)} y1={410 + 11 * Math.sin(rad)} x2={624 + 38 * Math.cos(rad)} y2={410 + 38 * Math.sin(rad)} stroke="#565656" strokeWidth="6" strokeLinecap="round" />;
      })}
      <circle cx="624" cy="410" r="9" fill="#3A3A3A" stroke="#5A5A5A" strokeWidth="1.5" />
      <circle cx="624" cy="410" r="4" fill="#4A4A4A" />

      {/* Wheel arch inner panels */}
      <path d="M 228 358 C 228 320 324 318 324 358" fill="white" />
      <path d="M 232 358 C 232 326 320 324 320 358" fill="#F0F0F0" />
      <path d="M 576 358 C 576 318 672 320 672 358" fill="white" />
      <path d="M 580 358 C 580 324 668 326 668 358" fill="#F0F0F0" />

      {/* ── Hood hotspot — visible only when hood is closed ──────────────── */}
      {!isOpen && (
        <>
          <path
            d="M 254 205 L 646 205 L 646 252 L 254 252 Z"
            fill={hovered ? "rgba(255,255,255,0.05)" : "transparent"}
            stroke={hovered ? "rgba(255,255,255,0.4)" : "transparent"}
            strokeWidth="1.5"
            style={{ cursor: "pointer" }}
            onClick={() => onSectionClick?.("skills")}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />
          {hovered && (
            <text x="450" y="198" fill="rgba(255,255,255,0.65)" fontSize="9.5"
              textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" letterSpacing="2.5">
              SKILLS
            </text>
          )}
        </>
      )}
    </svg>
  );
}
