"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

// 30° between each of 7 sections
const SECTION_ANGLES: number[] = [-90, -60, -30, 0, 30, 60, 90];
const SECTION_COUNT = SECTION_ANGLES.length;

// Midpoints between adjacent sections
const THRESHOLDS = [-75, -45, -15, 15, 45, 75];

function angleToSection(deg: number): number {
  if (deg < THRESHOLDS[0]) return 0;
  if (deg < THRESHOLDS[1]) return 1;
  if (deg < THRESHOLDS[2]) return 2;
  if (deg < THRESHOLDS[3]) return 3;
  if (deg < THRESHOLDS[4]) return 4;
  if (deg < THRESHOLDS[5]) return 5;
  return 6;
}

interface SteeringWheelProps {
  sectionIndex: number;
  onSectionChange: (index: number) => void;
}

export default function SteeringWheel({ sectionIndex, onSectionChange }: SteeringWheelProps) {
  const containerRef      = useRef<HTMLDivElement>(null);
  const isDragging        = useRef(false);
  const hasMoved          = useRef(false);
  const tapClientX        = useRef(0);
  const lastTapTime       = useRef(0);
  const dragStartAngle    = useRef(0);
  const dragStartRotation = useRef(0);
  const rotation          = useMotionValue(SECTION_ANGLES[0]);

  // Sync externally-driven changes (keyboard / panels) — skip during drag
  useEffect(() => {
    if (isDragging.current) return;
    animate(rotation, SECTION_ANGLES[sectionIndex], {
      type: "spring",
      stiffness: 170,
      damping: 22,
    });
  }, [sectionIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const getPointerAngle = (clientX: number, clientY: number): number => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    return (
      Math.atan2(
        clientY - (rect.top  + rect.height / 2),
        clientX - (rect.left + rect.width  / 2)
      ) * (180 / Math.PI)
    );
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDragging.current        = true;
    hasMoved.current          = false;
    tapClientX.current        = e.clientX;
    dragStartAngle.current    = getPointerAngle(e.clientX, e.clientY);
    dragStartRotation.current = rotation.get();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const currentAngle = getPointerAngle(e.clientX, e.clientY);
    let delta = currentAngle - dragStartAngle.current;
    if (delta >  180) delta -= 360;
    if (delta < -180) delta += 360;

    if (Math.abs(delta) > 6) hasMoved.current = true;

    const clamped = Math.max(-105, Math.min(105, dragStartRotation.current + delta));
    rotation.set(clamped);

    // Live section update — dashboard responds as you spin
    onSectionChange(angleToSection(clamped));
  };

  const snapToNearest = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (!hasMoved.current) {
      const now = Date.now();
      const isDoubleTap = now - lastTapTime.current < 350;
      lastTapTime.current = now;

      if (isDoubleTap) {
        // Double-tap anywhere → return to first section (About)
        animate(rotation, SECTION_ANGLES[0], { type: "spring", stiffness: 170, damping: 22 });
        onSectionChange(0);
        return;
      }

      // Single tap — left half = prev, right half = next
      if (!containerRef.current) return;
      const rect    = containerRef.current.getBoundingClientRect();
      const current = angleToSection(rotation.get());
      const nextIdx = tapClientX.current > rect.left + rect.width / 2
        ? Math.min(SECTION_COUNT - 1, current + 1)
        : Math.max(0, current - 1);
      animate(rotation, SECTION_ANGLES[nextIdx], { type: "spring", stiffness: 170, damping: 22 });
      onSectionChange(nextIdx);
      return;
    }

    // Drag release — snap to nearest angle
    const current    = rotation.get();
    const nearestIdx = SECTION_ANGLES.reduce(
      (best, angle, idx) =>
        Math.abs(angle - current) < Math.abs(SECTION_ANGLES[best] - current) ? idx : best,
      0
    );
    animate(rotation, SECTION_ANGLES[nearestIdx], { type: "spring", stiffness: 170, damping: 22 });
    onSectionChange(nearestIdx);
  };

  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
    if (delta > 20)  onSectionChange(Math.min(SECTION_COUNT - 1, sectionIndex + 1));
    if (delta < -20) onSectionChange(Math.max(0, sectionIndex - 1));
  };

  return (
    <div className="flex flex-col items-center gap-5">

      {/* Wheel */}
      <div
        ref={containerRef}
        className="cursor-grab active:cursor-grabbing transition-[filter] duration-200 hover:brightness-125"
        style={{ width: "min(230px, 90%)", aspectRatio: "1" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={snapToNearest}
        onPointerCancel={snapToNearest}
        onWheel={handleWheel}
      >
        <motion.svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ rotate: rotation, width: "100%", height: "100%", display: "block" }}
        >
          {/* Outer ring */}
          <circle cx="100" cy="100" r="88" stroke="#646464" strokeWidth="16" />

          {/* Inner accent ring */}
          <circle cx="100" cy="100" r="76" stroke="#3c3c3c" strokeWidth="1.5" />

          {/*
            Spokes — 120° apart, hub edge r=16, outer end r=78
              Top:          (100, 84) → (100, 22)
              Bottom-right: (100+0.866×16, 100+0.5×16) = (113.9, 108) → (100+0.866×78, 100+0.5×78) = (167.5, 139)
              Bottom-left:  (86.1, 108) → (32.5, 139)
          */}
          <line x1="100"  y1="84"  x2="100"  y2="22"  stroke="#646464" strokeWidth="9" strokeLinecap="round" />
          <line x1="113.9" y1="108" x2="167.5" y2="139" stroke="#646464" strokeWidth="9" strokeLinecap="round" />
          <line x1="86.1"  y1="108" x2="32.5"  y2="139" stroke="#646464" strokeWidth="9" strokeLinecap="round" />

          {/* Center hub */}
          <circle cx="100" cy="100" r="16" fill="#282828" stroke="#565656" strokeWidth="2" />

          {/* Hub detail */}
          <circle cx="100" cy="100" r="5.5" fill="#383838" />
        </motion.svg>
      </div>

      {/* Instructions */}
      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="text-white/60 text-[10px] tracking-[0.18em] uppercase">
          drag · tap sides · scroll
        </p>
        <p className="text-white/32 text-[9px] tracking-[0.15em] uppercase">
          ← → keys · 1–6 to jump · double-tap to reset
        </p>
      </div>

    </div>
  );
}
