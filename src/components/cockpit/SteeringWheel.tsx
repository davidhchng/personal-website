"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

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

  return (
    <div className="flex flex-col items-center gap-3 md:gap-5">
      <div
        ref={containerRef}
        className="cursor-grab active:cursor-grabbing"
        style={{
          width: compact ? "min(130px, 72%)" : "min(200px, 90%)",
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
          style={{ rotate: rotation, width: "100%", height: "100%", display: "block" }}
        >
          {/* Outer ring */}
          <circle cx="100" cy="100" r="84" stroke="rgba(0,0,0,0.13)" strokeWidth="1.5" />
          {/* Inner ring */}
          <circle cx="100" cy="100" r="70" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
          {/* Indicator dot at 12 o'clock */}
          <circle cx="100" cy="16" r="4" fill="rgba(0,0,0,0.5)" />
          {/* Centre dot */}
          <circle cx="100" cy="100" r="3" fill="rgba(0,0,0,0.1)" />
        </motion.svg>
      </div>

      <div className="flex flex-col items-center gap-1 md:gap-1.5 text-center">
        <p className="text-[10px] md:text-[10px] tracking-[0.18em] uppercase" style={{ color: "#86868B" }}>
          drag · tap sides · scroll
        </p>
        <p className="text-[8px] md:text-[9px] tracking-[0.12em] uppercase" style={{ color: "#ADADB3" }}>
          ← → keys · 1–7 to jump · double-tap to reset
        </p>
      </div>
    </div>
  );
}
