"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { actions, useStore } from "@/lib/store";

// A tiny basketball physics toy that lives inside the hero.
// Balls and the loop are managed imperatively so React never re-renders per frame.

const R = 22;           // ball radius
const G = 2000;         // gravity px/s²
const RIM = 30;         // rim half-width
const MAX_BALLS = 3;

interface Ball {
  el: HTMLDivElement;
  x: number; y: number; vx: number; vy: number; rot: number;
  dragging: boolean;
  history: { x: number; y: number; t: number }[];
}

const BALL_SVG = `
<svg viewBox="0 0 44 44" width="44" height="44" aria-hidden="true">
  <defs><radialGradient id="bb" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#F59A4A"/><stop offset="1" stop-color="#C85A12"/></radialGradient></defs>
  <circle cx="22" cy="22" r="21" fill="url(#bb)" stroke="#2A1505" stroke-width="1.2"/>
  <g fill="none" stroke="#2A1505" stroke-width="1.2">
    <path d="M1 22h42"/><path d="M22 1v42"/>
    <path d="M7 7c6 5 6 25 0 30"/><path d="M37 7c-6 5-6 25 0 30"/>
  </g>
</svg>`;

export default function Hoops() {
  const spawnCount = useStore(s => s.balls);
  const [active, setActive] = useState(false);
  const [score, setScore] = useState(0);
  const [swish, setSwish] = useState(0);
  const [hoop, setHoop] = useState({ x: 0, y: 0 });
  const layerRef = useRef<HTMLDivElement>(null);
  const balls = useRef<Ball[]>([]);
  const dims = useRef({ w: 0, h: 0, hx: 0, hy: 0 });
  const raf = useRef(0);
  const firstSpawn = useRef(true);

  const layout = useCallback(() => {
    const el = layerRef.current;
    if (!el) return;
    const w = el.clientWidth, h = el.clientHeight;
    const mobile = w < 640;
    const hx = w - (mobile ? 78 : 190);
    const hy = h * (mobile ? 0.22 : 0.34);
    dims.current = { w, h, hx, hy };
    setHoop({ x: hx, y: hy });
  }, []);

  const spawn = useCallback(() => {
    const layer = layerRef.current;
    if (!layer) return;
    layout();
    const { w, hx } = dims.current;
    const lr = layer.getBoundingClientRect();
    const btn = document.getElementById("bucks-btn")?.getBoundingClientRect();
    const x = btn ? btn.left + btn.width / 2 - lr.left : w / 2;
    const y = btn ? btn.top - lr.top - R : 200;

    const el = document.createElement("div");
    el.innerHTML = BALL_SVG;
    el.dataset.cursor = "Drag";
    el.style.cssText = `position:absolute;left:0;top:0;width:${R * 2}px;height:${R * 2}px;pointer-events:auto;touch-action:none;will-change:transform;filter:drop-shadow(0 6px 10px rgba(0,0,0,.25));`;
    layer.appendChild(el);

    const ball: Ball = { el, x, y, vx: (hx - x) * 0.55, vy: -1050, rot: 0, dragging: false, history: [] };

    el.addEventListener("pointerdown", e => {
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      ball.dragging = true;
      ball.history = [];
    });
    el.addEventListener("pointermove", e => {
      if (!ball.dragging) return;
      const r = layer.getBoundingClientRect();
      ball.x = e.clientX - r.left;
      ball.y = e.clientY - r.top;
      const t = performance.now();
      ball.history.push({ x: ball.x, y: ball.y, t });
      if (ball.history.length > 6) ball.history.shift();
    });
    const release = () => {
      if (!ball.dragging) return;
      ball.dragging = false;
      const hst = ball.history;
      if (hst.length >= 2) {
        const a = hst[0], b = hst[hst.length - 1];
        const dt = Math.max((b.t - a.t) / 1000, 0.016);
        const cap = 3200;
        ball.vx = Math.max(-cap, Math.min(cap, (b.x - a.x) / dt));
        ball.vy = Math.max(-cap, Math.min(cap, (b.y - a.y) / dt));
      } else { ball.vx = 0; ball.vy = 0; }
    };
    el.addEventListener("pointerup", release);
    el.addEventListener("pointercancel", release);

    balls.current.push(ball);
    if (balls.current.length > MAX_BALLS) balls.current.shift()!.el.remove();
  }, [layout]);

  // physics loop
  useEffect(() => {
    if (!active) return;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const { w, h, hx, hy } = dims.current;
      const floor = h - 6;
      const bx = hx + RIM + 12;                 // backboard x
      const bTop = hy - 78, bBot = hy + 10;

      for (const b of balls.current) {
        const px = b.x, py = b.y;
        if (!b.dragging) {
          b.vy += G * dt;
          b.vx *= 0.999;
          b.x += b.vx * dt;
          b.y += b.vy * dt;

          if (b.y + R > floor) {
            b.y = floor - R;
            b.vy = Math.abs(b.vy) < 90 ? 0 : -b.vy * 0.66;
            b.vx *= 0.86;
          }
          if (b.x - R < 0) { b.x = R; b.vx = Math.abs(b.vx) * 0.7; }
          if (b.x + R > w) { b.x = w - R; b.vx = -Math.abs(b.vx) * 0.7; }
          if (b.y < -h) { b.y = -h; b.vy = 0; }

          // rim endpoints are small circular colliders
          for (const rx of [hx - RIM, hx + RIM]) {
            const dx = b.x - rx, dy = b.y - hy;
            const d = Math.hypot(dx, dy);
            if (d < R + 3 && d > 0) {
              const nx = dx / d, ny = dy / d;
              b.x = rx + nx * (R + 3); b.y = hy + ny * (R + 3);
              const vn = b.vx * nx + b.vy * ny;
              if (vn < 0) { b.vx -= 1.55 * vn * nx; b.vy -= 1.55 * vn * ny; }
            }
          }
          // backboard (approached from the left)
          if (b.y > bTop - R * 0.5 && b.y < bBot + R * 0.5 && b.x + R > bx && px + R <= bx + 8) {
            b.x = bx - R; b.vx = -Math.abs(b.vx) * 0.6;
          }
          // scored: crossed the rim plane downward between the rim edges
          if (py < hy && b.y >= hy && b.vy > 0 && b.x > hx - RIM + 4 && b.x < hx + RIM - 4) {
            setScore(s => s + 2);
            setSwish(s => s + 1);
            b.vx *= 0.4;
          }
        }
        b.rot += (b.vx * dt) / R;
        b.el.style.transform = `translate3d(${b.x - R}px, ${b.y - R}px, 0) rotate(${b.rot}rad)`;
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [active]);

  useEffect(() => {
    if (spawnCount === 0) return;
    setActive(true);
    // wait a frame so the layer is laid out before measuring
    requestAnimationFrame(() => {
      spawn();
      if (firstSpawn.current) {
        firstSpawn.current = false;
        actions.toast("Drag the ball and throw it at the hoop");
      }
    });
  }, [spawnCount, spawn]);

  useEffect(() => {
    window.addEventListener("resize", layout);
    return () => window.removeEventListener("resize", layout);
  }, [layout]);

  useEffect(() => {
    if (swish === 1) actions.toast("Swish! Fear the Deer.");
    else if (swish > 0 && swish % 5 === 0) actions.toast(`${swish} buckets. Giannis would be proud.`);
  }, [swish]);

  const end = () => {
    balls.current.forEach(b => b.el.remove());
    balls.current = [];
    setActive(false);
    setScore(0);
    setSwish(0);
  };

  return (
    <div ref={layerRef} aria-hidden={!active} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 20, overflow: "hidden" }}>
      <AnimatePresence>
        {active && (
          <motion.div
            key="hoop"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{ position: "absolute", left: hoop.x - 60, top: hoop.y - 92, width: 120, height: 160 }}
          >
            <svg width="120" height="160" viewBox="0 0 120 160" style={{ overflow: "visible" }}>
              {/* backboard */}
              <rect x="101" y="12" width="5" height="90" rx="2" fill="var(--fg)" opacity="0.85" />
              <rect x="80" y="42" width="21" height="2.5" fill="var(--fg)" opacity="0.6" />
              {/* net */}
              <motion.g
                key={swish}
                initial={{ scaleY: 1 }}
                animate={{ scaleY: [1, 1.35, 0.92, 1] }}
                transition={{ duration: 0.5 }}
                style={{ originY: "92px", originX: "60px" }}
                stroke="var(--subtle)" strokeWidth="1.2" fill="none"
              >
                <path d="M30 92 L38 128 L82 128 L90 92" />
                <path d="M40 92 L46 128 M50 92 L53 128 M60 92 L60 128 M70 92 L67 128 M80 92 L74 128" />
                <path d="M33 104 L87 104 M36 116 L84 116" />
              </motion.g>
              {/* rim */}
              <rect x="27" y="90" width="66" height="4" rx="2" fill="#E2552B" />
            </svg>
            <div style={{
              position: "absolute", top: -26, left: 0, right: 0, textAlign: "center",
              fontSize: 11, letterSpacing: "0.16em", fontWeight: 700, color: "var(--accent)",
            }}>
              <motion.span key={score} initial={{ scale: 1.6 }} animate={{ scale: 1 }} style={{ display: "inline-block" }}>
                {score} PTS
              </motion.span>
            </div>
            <button
              onClick={end}
              style={{
                position: "absolute", top: 140, left: 18, pointerEvents: "auto",
                fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                background: "var(--bg-elev)", border: "1px solid var(--line)", color: "var(--subtle)",
                borderRadius: 999, padding: "4px 10px", cursor: "pointer", whiteSpace: "nowrap",
              }}
            >
              End game ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
