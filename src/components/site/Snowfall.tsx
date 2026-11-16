"use client";

import { useEffect, useRef } from "react";

// Full-viewport snow on one canvas. Flake colour comes from --snow so it reads
// in both themes (icy blue on the light page, white at night). Sits above the
// content with pointer-events off; reduced-motion users get none at all.
export default function Snowfall() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, raf = 0;
    let rgb = "255, 255, 255";

    const readColor = () => {
      rgb = getComputedStyle(document.documentElement).getPropertyValue("--snow").trim() || rgb;
    };

    type Flake = { x: number; y: number; r: number; vy: number; drift: number; phase: number; a: number };
    let flakes: Flake[] = [];
    const make = (y?: number): Flake => ({
      x: Math.random() * w,
      y: y ?? Math.random() * h,
      r: 0.8 + Math.random() * 2.4,
      vy: 0.35 + Math.random() * 0.9,
      drift: 0.3 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
      a: 0.35 + Math.random() * 0.5,
    });

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Density scales with area, capped so phones stay light
      const n = Math.min(160, Math.round((w * h) / 9000));
      flakes = Array.from({ length: n }, () => make());
    };

    let t = 0;
    const frame = () => {
      t += 0.01;
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        // Bigger flakes are nearer: they fall faster
        f.y += f.vy * (0.6 + f.r / 3);
        f.x += Math.sin(t * f.drift + f.phase) * 0.45;
        if (f.y - f.r > h) Object.assign(f, make(-6));
        if (f.x < -6) f.x = w + 6; else if (f.x > w + 6) f.x = -6;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${f.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(frame);
    };

    // Re-read the colour when the theme toggles
    const mo = new MutationObserver(readColor);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    readColor();
    resize();
    raf = requestAnimationFrame(frame);
    addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 90 }}
    />
  );
}
