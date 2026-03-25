"use client";

import { useId, useRef, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

// 30° between each of 7 sections
const SECTION_ANGLES: number[] = [-90, -60, -30, 0, 30, 60, 90];
const SECTION_COUNT = SECTION_ANGLES.length;
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
  compact?: boolean;
}

export default function SteeringWheel({ sectionIndex, onSectionChange, compact = false }: SteeringWheelProps) {
  const uid = useId().replace(/:/g, "_");
  const containerRef      = useRef<HTMLDivElement>(null);
  const isDragging        = useRef(false);
  const hasMoved          = useRef(false);
  const tapClientX        = useRef(0);
  const lastTapTime       = useRef(0);
  const dragStartAngle    = useRef(0);
  const dragStartRotation = useRef(0);
  const rotation          = useMotionValue(SECTION_ANGLES[0]);

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
        animate(rotation, SECTION_ANGLES[0], { type: "spring", stiffness: 170, damping: 22 });
        onSectionChange(0);
        return;
      }
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

  const ringGradId   = `${uid}ring`;
  const spokeGradId  = `${uid}spoke`;
  const hubGradId    = `${uid}hub`;
  const hubDotGradId = `${uid}hubdot`;

  return (
    <div className="flex flex-col items-center gap-3 md:gap-5">
      {/* Wheel — perspective container gives the 3D tilt */}
      <div
        ref={containerRef}
        className="cursor-grab active:cursor-grabbing hover:brightness-125 transition-[filter] duration-200"
        style={{
          width: compact ? "min(148px, 72%)" : "min(230px, 90%)",
          aspectRatio: "1",
          touchAction: "none",
        }}
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
          style={{
            rotate: rotation,
            filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.95))",
            width: "100%",
            height: "100%",
            display: "block",
          }}
        >
          <defs>
            {/* Ring — lighter at top, darker at bottom (simulates round grip in overhead light) */}
            <linearGradient id={ringGradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#969696" />
              <stop offset="38%"  stopColor="#646464" />
              <stop offset="100%" stopColor="#323232" />
            </linearGradient>
            {/* Spokes — same lighting direction */}
            <linearGradient id={spokeGradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#848484" />
              <stop offset="100%" stopColor="#3a3a3a" />
            </linearGradient>
            {/* Hub — radial highlight to simulate a convex surface */}
            <radialGradient id={hubGradId} cx="38%" cy="32%" r="68%">
              <stop offset="0%"   stopColor="#787878" />
              <stop offset="55%"  stopColor="#2a2a2a" />
              <stop offset="100%" stopColor="#121212" />
            </radialGradient>
            {/* Hub centre dot */}
            <radialGradient id={hubDotGradId} cx="35%" cy="30%" r="70%">
              <stop offset="0%"   stopColor="#606060" />
              <stop offset="100%" stopColor="#1c1c1c" />
            </radialGradient>
          </defs>

          {/* Outer grip ring */}
          <circle cx="100" cy="100" r="86" stroke={`url(#${ringGradId})`} strokeWidth="14" />

          {/* Inner accent ring */}
          <circle cx="100" cy="100" r="79" stroke="#3a3a3a" strokeWidth="1" />

          {/* Top spoke */}
          <line x1="100"  y1="72"  x2="100"  y2="24"  stroke={`url(#${spokeGradId})`} strokeWidth="10" strokeLinecap="round" />
          {/* Bottom-right spoke */}
          <line x1="119"  y1="113" x2="167"  y2="141" stroke={`url(#${spokeGradId})`} strokeWidth="10" strokeLinecap="round" />
          {/* Bottom-left spoke */}
          <line x1="81"   y1="113" x2="33"   y2="141" stroke={`url(#${spokeGradId})`} strokeWidth="10" strokeLinecap="round" />

          {/* Centre hub */}
          <circle cx="100" cy="100" r="26" fill={`url(#${hubGradId})`} stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

          {/* Hub detail dot */}
          <circle cx="100" cy="100" r="9" fill={`url(#${hubDotGradId})`} />
        </motion.svg>
      </div>

      {/* Instructions */}
      <div className="flex flex-col items-center gap-1 md:gap-1.5 text-center">
        <p className="text-white/60 text-[9px] md:text-[10px] tracking-[0.18em] uppercase">
          drag · tap sides · scroll
        </p>
        <p className="text-white/32 text-[8px] md:text-[9px] tracking-[0.12em] uppercase">
          ← → keys · 1–7 to jump · double-tap to reset
        </p>
      </div>
    </div>
  );
}
