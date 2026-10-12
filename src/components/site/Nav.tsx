"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { SECTIONS } from "@/lib/content";
import { actions } from "@/lib/store";

export default function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", y => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    // hide on scroll down, reveal on scroll up
    setHidden(y > 400 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  useEffect(() => {
    const els = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      entries => {
        // pick the entry nearest the top third of the viewport
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length) setActive(visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0].target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach(el => io.observe(el));
    const onTop = () => { if (window.scrollY < window.innerHeight * 0.5) setActive(null); };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onTop); };
  }, []);

  const activeLabel = SECTIONS.find(s => s.id === active)?.label;

  return (
    <motion.nav
      initial={{ y: -70 }}
      animate={{ y: hidden ? -70 : 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 36 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px) saturate(1.4)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
        transition: "background-color .3s ease, border-color .3s ease",
      }}
    >
      <div className="wrap" style={{ height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <button
          onClick={() => actions.scrollTo("top")}
          aria-label="Back to top"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 10 }}
        >
          <span style={{
            width: 26, height: 26, borderRadius: 8, background: "var(--fg)", color: "var(--bg)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, letterSpacing: "-0.04em",
          }}>DC</span>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.01em" }}>David Chang</span>
          {activeLabel && (
            <motion.span
              key={activeLabel}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="nav-mobile-only"
              style={{ fontSize: 12, color: "var(--subtle)" }}
            >
              / {activeLabel}
            </motion.span>
          )}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div className="nav-desktop-only" style={{ display: "flex", gap: 2, marginRight: 8 }}>
            {SECTIONS.map(s => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => actions.scrollTo(s.id)}
                  aria-current={isActive ? "true" : undefined}
                  style={{
                    position: "relative", background: "none", border: "none", cursor: "pointer",
                    padding: "7px 13px", fontSize: 12, letterSpacing: "0.03em",
                    color: isActive ? "var(--fg)" : "var(--subtle)", transition: "color .2s ease",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      style={{ position: "absolute", inset: 0, borderRadius: 999, background: "var(--accent-soft)", border: "1px solid var(--line)" }}
                    />
                  )}
                  <span style={{ position: "relative" }}>{s.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => actions.setPalette(true)}
            aria-label="Open command palette"
            className="chip"
            style={{ padding: "6px 10px", gap: 6 }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="nav-desktop-only kbd" style={{ border: "none", padding: 0 }}>⌘K</span>
          </button>

          <button onClick={actions.toggleTheme} aria-label="Toggle dark mode" className="chip theme-toggle" style={{ padding: 7 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <g className="sun">
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
                  <line key={a} x1="12" y1="2.5" x2="12" y2="4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" transform={`rotate(${a} 12 12)`} />
                ))}
              </g>
              <path className="moon" d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <motion.div
        style={{
          position: "absolute", left: 0, right: 0, bottom: -1, height: 2,
          background: "linear-gradient(90deg, var(--accent), var(--blue))",
          transformOrigin: "0% 50%", scaleX: progress,
        }}
      />

      <style>{`
        .theme-toggle .moon { display: none; }
        :root[data-theme="dark"] .theme-toggle .sun { display: none; }
        :root[data-theme="dark"] .theme-toggle .moon { display: inline; }
        .nav-mobile-only { display: none; }
        @media (max-width: 760px) {
          .nav-desktop-only { display: none !important; }
          .nav-mobile-only { display: inline; }
        }
      `}</style>
    </motion.nav>
  );
}
