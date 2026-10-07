"use client";

import { useEffect, useRef } from "react";

// Grid of dots that bulge away from the cursor, breathe with a slow wave and
// ripple outward on click. Pauses when off-screen or the tab is hidden.

const GAP = 26;
const RADIUS = 150;

export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0, h = 0, cols = 0, rows = 0;
    let mx = -9999, my = -9999, tmx = -9999, tmy = -9999;
    let ripples: { x: number; y: number; t: number }[] = [];
    let rgb = "29,29,31";
    let running = false, visible = true, raf = 0;

    const readColor = () => {
      rgb = getComputedStyle(document.documentElement).getPropertyValue("--dot").trim() || rgb;
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / GAP) + 1;
      rows = Math.ceil(h / GAP) + 1;
      if (!running) draw(performance.now());
    };

    const draw = (now: number) => {
      mx += (tmx - mx) * 0.15;
      my += (tmy - my) * 0.15;
      const t = now / 1000;
      ctx.clearRect(0, 0, w, h);
      ripples = ripples.filter(r => t - r.t < 1.6);
      const ox = (w - (cols - 1) * GAP) / 2;
      const oy = (h - (rows - 1) * GAP) / 2;

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          let x = ox + i * GAP, y = oy + j * GAP;
          const wave = reduce ? 0 : Math.sin(i * 0.35 + j * 0.25 - t * 1.2) * 0.5 + 0.5;
          let f = 0;
          const dx = x - mx, dy = y - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < RADIUS) {
            f = 1 - d / RADIUS;
            f = f * f * (3 - 2 * f); // smoothstep
            const push = f * 16 / (d || 1);
            x += dx * push; y += dy * push;
          }
          for (const r of ripples) {
            const age = t - r.t;
            const rr = age * 520;
            const rdx = x - r.x, rdy = y - r.y;
            const rd = Math.sqrt(rdx * rdx + rdy * rdy);
            const band = 1 - Math.abs(rd - rr) / 40;
            if (band > 0) {
              const k = band * (1 - age / 1.6);
              f = Math.max(f, k);
              x += (rdx / (rd || 1)) * k * 8; y += (rdy / (rd || 1)) * k * 8;
            }
          }
          // fade toward the center so text stays legible
          const cx = (x - w / 2) / (w / 2), cy = (y - h / 2) / (h / 2);
          const vignette = Math.min(1, 0.35 + Math.sqrt(cx * cx + cy * cy) * 0.75);
          const a = (0.07 + wave * 0.07) * vignette + f * 0.55;
          const s = 1 + f * 1.8;
          ctx.fillStyle = `rgba(${rgb},${a.toFixed(3)})`;
          ctx.fillRect(x - s / 2, y - s / 2, s, s);
        }
      }
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      tmx = e.clientX - r.left; tmy = e.clientY - r.top;
      if (mx < -1000) { mx = tmx; my = tmy; }
    };
    const onLeave = () => { tmx = -9999; tmy = -9999; };
    const onDown = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const y = e.clientY - r.top;
      if (y < 0 || y > r.height) return;
      ripples.push({ x: e.clientX - r.left, y, t: performance.now() / 1000 });
      if (ripples.length > 4) ripples.shift();
    };
    const onVis = () => (document.hidden ? stop() : start());

    readColor();
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); });
    io.observe(canvas);
    const mo = new MutationObserver(() => { readColor(); if (!running) draw(performance.now()); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      stop(); ro.disconnect(); io.disconnect(); mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}
