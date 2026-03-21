"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionId } from "@/types";

// ─── CarTrunkOpen ─────────────────────────────────────────────────────────────
// Rear view of the 2011 Lancer ES.
// isOpen=false → static rear view with clickable trunk hotspot
// isOpen=true  → trunk lid animates open (About section revealed)
// ─────────────────────────────────────────────────────────────────────────────

interface CarTrunkOpenProps {
  isOpen?: boolean;
  onSectionClick?: (id: SectionId) => void;
}

export default function CarTrunkOpen({ isOpen = true, onSectionClick }: CarTrunkOpenProps) {
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
      <ellipse cx="450" cy="435" rx="262" ry="11" fill="black" opacity="0.5" />

      {/* ═══════════════════════════════════════════════════════════════════
          REAR BODY SHELL
          Outer width ≈ x:198–702. Height: roof y:135 to bumper y:375.
          ═══════════════════════════════════════════════════════════════════ */}

      {/* Main outer body */}
      <path
        d="
          M 235 375
          L 218 358
          L 208 332
          C 205 318 202 300 200 282
          L 198 242
          C 198 224 200 210 204 200
          L 214 186
          L 248 172
          L 310 160
          C 350 154 395 150 450 150
          C 505 150 550 154 590 160
          L 652 172
          L 686 186
          L 696 200
          C 700 210 702 224 702 242
          L 700 282
          C 698 300 695 318 692 332
          L 682 358
          L 665 375
          Z
        "
        fill="white"
      />

      {/* ── Rear window ─────────────────────────────────────────────────── */}
      <path
        d="
          M 318 158
          L 360 152
          L 450 150
          L 540 152
          L 582 158
          L 594 172
          C 598 184 600 200 598 212
          L 596 228
          L 450 232
          L 304 228
          L 302 212
          C 300 200 302 184 306 172
          Z
        "
        fill="#0E0E0E"
      />

      {/* ── Roof / spoiler base area ─────────────────────────────────────── */}
      <rect x="300" y="135" width="300" height="20" rx="0" fill="white" />

      {/* ── C-pillar sides ───────────────────────────────────────────────── */}
      <path d="M 198 242 L 200 200 L 212 184 L 248 170 L 310 158 L 302 212 L 302 228 L 198 228 Z" fill="white" />
      <path d="M 702 242 L 700 200 L 688 184 L 652 170 L 590 158 L 598 212 L 598 228 L 702 228 Z" fill="white" />

      {/* ── Trunk lid opening (dark cavity) ─────────────────────────────── */}
      <path
        d="M 304 228 L 596 228 L 590 320 L 310 320 Z"
        fill="#070707"
        stroke="#181818"
        strokeWidth="1"
      />
      {/* Trunk interior — subtle depth suggestion */}
      <rect x="318" y="240" width="264" height="70" fill="#0A0A0A" />

      {/* ── ANIMATED TRUNK LID ───────────────────────────────────────────── */}
      <motion.g
        initial={{ rotate: 0 }}
        animate={{ rotate: isOpen ? -54 : 0 }}
        transition={{ duration: isOpen ? 1.0 : 0, ease: [0.25, 0.46, 0.45, 0.94], delay: isOpen ? 0.08 : 0 }}
        style={{ transformOrigin: "450px 228px" }}
      >
        {/* Trunk lid panel */}
        <path d="M 304 228 L 596 228 L 590 320 L 310 320 Z" fill="white" />
        {/* Trunk lid center crease */}
        <line x1="450" y1="229" x2="450" y2="319" stroke="#EBEBEB" strokeWidth="1" />
        {/* Trunk handle / release area */}
        <rect x="416" y="295" width="68" height="8" rx="4" fill="#D2D2D2" />
        {/* License plate recess */}
        <rect x="388" y="270" width="124" height="28" rx="0" fill="#E8E8E8" stroke="#D5D5D5" strokeWidth="0.5" />
        {/* Lid inner surface (slightly off-white when open) */}
        <path d="M 308 230 L 592 230 L 586 318 L 314 318 Z" fill="none" stroke="#F0F0F0" strokeWidth="0.5" opacity="0.3" />
      </motion.g>

      {/* ── TAILLIGHTS ───────────────────────────────────────────────────── */}
      {/* Left taillight cluster — horizontal, spanning from edge to trunk */}
      <path
        d="
          M 198 242
          L 302 238
          L 304 228
          L 284 225
          L 210 230
          L 198 236
          Z
        "
        fill="#CC1100"
      />
      {/* Left taillight inner (bright section) */}
      <path
        d="M 200 240 L 290 236 L 292 228 L 218 232 L 202 237 Z"
        fill="#FF3311"
        opacity="0.5"
      />
      {/* Left taillight divider */}
      <line x1="198" y1="240" x2="302" y2="236" stroke="#AA0000" strokeWidth="1" />
      {/* Left reverse light */}
      <rect x="240" y="238" width="40" height="10" fill="#F0F0F0" opacity="0.75" />

      {/* Right taillight cluster */}
      <path
        d="
          M 702 242
          L 598 238
          L 596 228
          L 616 225
          L 690 230
          L 702 236
          Z
        "
        fill="#CC1100"
      />
      <path d="M 700 240 L 610 236 L 608 228 L 682 232 L 698 237 Z" fill="#FF3311" opacity="0.5" />
      <line x1="702" y1="240" x2="598" y2="236" stroke="#AA0000" strokeWidth="1" />
      <rect x="520" y="238" width="40" height="10" fill="#F0F0F0" opacity="0.75" />

      {/* ── REAR BUMPER ─────────────────────────────────────────────────── */}
      <path
        d="
          M 218 320
          L 208 332
          L 206 348
          L 210 360
          L 222 368
          L 235 375
          L 665 375
          L 678 368
          L 690 360
          L 694 348
          L 692 332
          L 682 320
          L 590 320
          L 310 320
          Z
        "
        fill="#E8E8E8"
      />

      {/* Bumper lower center opening (trapezoidal, Lancer style) */}
      <path d="M 340 330 L 560 330 L 554 368 L 346 368 Z" fill="#141414" />
      {/* Bumper lower bar */}
      <rect x="342" y="350" width="216" height="6" fill="#2A2A2A" />

      {/* Exhaust tips */}
      <ellipse cx="392" cy="368" rx="13" ry="7" fill="#3A3A3A" />
      <ellipse cx="392" cy="368" rx="8" ry="4.5" fill="#1A1A1A" />
      <ellipse cx="508" cy="368" rx="13" ry="7" fill="#3A3A3A" />
      <ellipse cx="508" cy="368" rx="8" ry="4.5" fill="#1A1A1A" />

      {/* Rear fog light */}
      <rect x="218" y="338" width="24" height="14" rx="1" fill="#880000" opacity="0.85" />

      {/* ── SPOILER ──────────────────────────────────────────────────────── */}
      {/* Left post */}
      <rect x="335" y="214" width="6" height="18" rx="1" fill="#E0E0E0" />
      {/* Right post */}
      <rect x="559" y="214" width="6" height="18" rx="1" fill="#E0E0E0" />
      {/* Blade top */}
      <path
        d="M 320 215 C 330 205 355 200 450 200 C 545 200 570 205 580 215 L 578 220 L 450 220 L 322 220 Z"
        fill="white"
      />
      {/* Blade underside */}
      <path
        d="M 320 220 C 355 224 400 226 450 226 C 500 226 545 224 580 220 L 568 222 L 450 224 L 332 222 Z"
        fill="#E6E6E6"
      />

      {/* ── WHEELS (rear face, both visible) ─────────────────────────────── */}
      {/* Left rear wheel */}
      <circle cx="270" cy="402" r="52" fill="#1C1C1C" />
      <circle cx="270" cy="402" r="38" fill="#272727" />
      {[90, 162, 234, 306, 18].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return <line key={i} x1={270 + 11 * Math.cos(rad)} y1={402 + 11 * Math.sin(rad)} x2={270 + 36 * Math.cos(rad)} y2={402 + 36 * Math.sin(rad)} stroke="#565656" strokeWidth="6" strokeLinecap="round" />;
      })}
      <circle cx="270" cy="402" r="9" fill="#3A3A3A" stroke="#5A5A5A" strokeWidth="1.5" />
      <circle cx="270" cy="402" r="4" fill="#4A4A4A" />

      {/* Right rear wheel */}
      <circle cx="630" cy="402" r="52" fill="#1C1C1C" />
      <circle cx="630" cy="402" r="38" fill="#272727" />
      {[90, 162, 234, 306, 18].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return <line key={i} x1={630 + 11 * Math.cos(rad)} y1={402 + 11 * Math.sin(rad)} x2={630 + 36 * Math.cos(rad)} y2={402 + 36 * Math.sin(rad)} stroke="#565656" strokeWidth="6" strokeLinecap="round" />;
      })}
      <circle cx="630" cy="402" r="9" fill="#3A3A3A" stroke="#5A5A5A" strokeWidth="1.5" />
      <circle cx="630" cy="402" r="4" fill="#4A4A4A" />

      {/* ── Trunk lid hotspot — visible only when trunk is closed ─────────── */}
      {!isOpen && (
        <>
          <path
            d="M 304 228 L 596 228 L 590 320 L 310 320 Z"
            fill={hovered ? "rgba(255,255,255,0.05)" : "transparent"}
            stroke={hovered ? "rgba(255,255,255,0.4)" : "transparent"}
            strokeWidth="1.5"
            style={{ cursor: "pointer" }}
            onClick={() => onSectionClick?.("about")}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />
          {hovered && (
            <text x="450" y="222" fill="rgba(255,255,255,0.65)" fontSize="9.5"
              textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" letterSpacing="2.5">
              ABOUT
            </text>
          )}
        </>
      )}
    </svg>
  );
}
