"use client";

import { useEffect, useRef } from "react";

// Dot + lagging ring. Ring grows over interactive elements and can show a
// label from [data-cursor="Label"]. All motion is written straight to the DOM
// in one rAF loop — no React renders per frame.

export default function Cursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");

    const dot = dotRef.current!, ring = ringRef.current!, label = labelRef.current!;
    let mx = -100, my = -100, rx = -100, ry = -100;
    let scale = 1, targetScale = 1, visible = false, down = false;
    let raf = 0;

    const updateTarget = (t: Element | null) => {
      const hit = t?.closest?.("a, button, [data-cursor], input, [role='button']") as HTMLElement | null;
      const text = hit?.dataset.cursor ?? "";
      if (label.textContent !== text) label.textContent = text;
      targetScale = text ? 3.2 : hit ? 1.9 : 1;
      ring.classList.toggle("is-label", !!text);
    };
    const onMove = (e: PointerEvent) => {
      mx = e.clientX; my = e.clientY;
      if (!visible) { visible = true; rx = mx; ry = my; dot.style.opacity = "1"; ring.style.opacity = "1"; }
      updateTarget(e.target as Element | null);
    };
    // content moves under a still pointer while scrolling
    const onScroll = () => { if (visible) updateTarget(document.elementFromPoint(mx, my)); };
    const onLeave = () => { visible = false; dot.style.opacity = "0"; ring.style.opacity = "0"; };
    const onDown = () => { down = true; };
    const onUp = () => { down = false; };

    const loop = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      scale += ((down ? targetScale * 0.8 : targetScale) - scale) * 0.2;
      dot.style.transform  = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      label.style.transform = `scale(${1 / scale})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-dot, .cursor-ring { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 10000; opacity: 0; transition: opacity .2s ease; }
        .cursor-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--fg); }
        .cursor-ring { width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--fg); display: flex; align-items: center; justify-content: center; mix-blend-mode: difference; border-color: #fff; transition: opacity .2s ease, background-color .25s ease; }
        .cursor-ring.is-label { mix-blend-mode: normal; background: var(--fg); border-color: var(--fg); }
        .cursor-ring span { font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--bg); white-space: nowrap; }
      `}</style>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden><span ref={labelRef} /></div>
    </>
  );
}
