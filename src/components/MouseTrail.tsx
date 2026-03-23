"use client";

import { useEffect, useRef } from "react";

const TRAIL_LEN = 28;
const MAX_RADIUS = 4;

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trail     = useRef<[number, number][]>([]);
  const mouse     = useRef<[number, number]>([0, 0]);
  const raf       = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = [e.clientX, e.clientY];
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      const [mx, my] = mouse.current;

      // Lerp trail head toward the actual cursor — creates the comet lag feel
      if (trail.current.length === 0) {
        trail.current.push([mx, my]);
      } else {
        const [lx, ly] = trail.current[trail.current.length - 1];
        trail.current.push([
          lx + (mx - lx) * 0.38,
          ly + (my - ly) * 0.38,
        ]);
      }
      if (trail.current.length > TRAIL_LEN) trail.current.shift();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.current.forEach(([x, y], i) => {
        const t     = i / (TRAIL_LEN - 1); // 0 = oldest tail, 1 = head
        const r     = t * MAX_RADIUS;
        const alpha = t * 0.45;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.fill();
      });

      raf.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}
