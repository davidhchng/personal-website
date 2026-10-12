"use client";

import { MotionValue, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { RIDGE } from "@/lib/ridge";

// The real skyline from the photo, drawn three times at three depths and pinned
// to the bottom of the viewport. Scrolling pans the layers sideways at different
// rates, so the page reads as a traverse along the range — the mountain is the
// page's horizon, not a picture behind it.

// Cropped to the band the skyline actually occupies, plus body below it.
const TOP = 250;
const BOTTOM = 620;
const COPIES = 4;

/** Mirror every other copy so the ends meet and the strip tiles without a seam. */
function copyTransform(i: number) {
  const flip = i % 2 === 1;
  return `translate(${i * RIDGE.viewW + (flip ? RIDGE.viewW : 0)} 0) scale(${flip ? -1 : 1} 1)`;
}

// Travelling (COPIES - 1) viewports walks the whole strip past exactly once over
// the length of the page; nearer layers cover more of it.
const TRAVEL = ((COPIES - 1) / COPIES) * 100;

// It is one skyline three times over, so each layer gets its own `span` — the
// viewports one copy occupies. Different wavelengths plus different pan rates
// make them read as separate ranges rather than one shape offset three ways.
// Heights are set outright (preserveAspectRatio="none") to flatten the trace
// into a horizon; the stroke stays even because of vector-effect.
const LAYERS = [
  // `alpha` is the fill's opacity at the base of the layer, where it is strongest.
  // `start` pre-pans each strip so the first screen opens on the tall right-hand
  // peaks rather than the flat left end of the trace. start + TRAVEL*pan must
  // stay under 100 or the strip runs out before the page does.
  { tone: "var(--ridge-far)",  line: "var(--ridge-line-soft)", alpha: 0.24, pan: 0.26, start: 8,  bottom: "20vh", height: 230, span: 2.4, width: 1 },
  { tone: "var(--ridge-mid)",  line: "var(--ridge-line-soft)", alpha: 0.24, pan: 0.55, start: 14, bottom: "9vh",  height: 280, span: 1.8, width: 1 },
  { tone: "var(--ridge-near)", line: "var(--ridge-line)",      alpha: 0.18, pan: 1.0,  start: 18, bottom: "-4vh", height: 330, span: 1.25, width: 1.25 },
];

function Layer({ index, x }: { index: number; x: MotionValue<string> | string }) {
  const l = LAYERS[index];
  const gradId = `ridge-body-${index}`;
  return (
    <motion.div className="ridge-layer" style={{ bottom: l.bottom, x, color: l.tone }}>
      <svg
        viewBox={`0 ${TOP} ${RIDGE.viewW * COPIES} ${BOTTOM - TOP}`}
        preserveAspectRatio="none"
        style={{ width: `${COPIES * 100 * l.span}%`, height: l.height, display: "block" }}
      >
        <defs>
          {/* Transparent at the crest so text crossing the skyline keeps its
              contrast — only the traced line reads up there. */}
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="55%" stopColor="currentColor" stopOpacity={0.35 * l.alpha} />
            <stop offset="100%" stopColor="currentColor" stopOpacity={l.alpha} />
          </linearGradient>
        </defs>
        {Array.from({ length: COPIES }).map((_, c) => (
          <g key={c} transform={copyTransform(c)}>
            <path d={`${RIDGE.path}L${RIDGE.viewW} ${BOTTOM}L0 ${BOTTOM}Z`} fill={`url(#${gradId})`} />
            <path
              d={RIDGE.path}
              fill="none"
              stroke={l.line}
              strokeWidth={l.width}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </svg>
    </motion.div>
  );
}

export default function RidgeHorizon() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();

  // One useTransform per layer, at the top level — LAYERS is a fixed-length
  // constant, so the hook order never changes.
  const x0 = useTransform(scrollYProgress, [0, 1], [`${-LAYERS[0].start}%`, `${-(LAYERS[0].start + TRAVEL * LAYERS[0].pan)}%`]);
  const x1 = useTransform(scrollYProgress, [0, 1], [`${-LAYERS[1].start}%`, `${-(LAYERS[1].start + TRAVEL * LAYERS[1].pan)}%`]);
  const x2 = useTransform(scrollYProgress, [0, 1], [`${-LAYERS[2].start}%`, `${-(LAYERS[2].start + TRAVEL * LAYERS[2].pan)}%`]);

  return (
    <div className="ridge" aria-hidden>
      <Layer index={0} x={reduce ? `${-LAYERS[0].start}%` : x0} />
      <Layer index={1} x={reduce ? `${-LAYERS[1].start}%` : x1} />
      <Layer index={2} x={reduce ? `${-LAYERS[2].start}%` : x2} />

      <style>{`
        .ridge {
          position: fixed;
          inset: auto 0 0 0;
          height: 62vh;
          z-index: -1;
          pointer-events: none;
          overflow: hidden;
        }
        .ridge-layer {
          position: absolute;
          left: 0;
          width: 100%;
        }
        @media (max-width: 640px) {
          .ridge { height: 48vh; }
        }
      `}</style>
    </div>
  );
}
