"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AboutPanel        from "@/components/panels/AboutPanel";
import ProjectsPanel     from "@/components/panels/ProjectsPanel";
import SkillsPanel       from "@/components/panels/SkillsPanel";
import ExperiencePanel   from "@/components/panels/ExperiencePanel";
import VolunteeringPanel from "@/components/panels/VolunteeringPanel";
import HobbiesPanel      from "@/components/panels/HobbiesPanel";
import ContactPanel      from "@/components/panels/ContactPanel";

const NAV_H = 52;

const SECTIONS = [
  { id: "intro",      label: null         },
  { id: "about",      label: "About"      },
  { id: "projects",   label: "Projects"   },
  { id: "experience", label: "Experience" },
  { id: "skills",     label: "Skills"     },
  { id: "contact",    label: "Contact"    },
];

const variants = {
  enter:  (d: number) => ({ opacity: 0, x: d > 0 ?  60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -60 :  60 }),
};

// ── Section body ────────────────────────────────────────────────────────────

function SectionBody({ id, isMobile }: { id: string; isMobile: boolean }) {
  const px = isMobile ? "0 20px" : "0 48px";
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: px }}>
      <div style={{ maxWidth: 680, margin: "0 auto", paddingTop: isMobile ? 20 : 28, paddingBottom: 64 }}>
        {id === "about" && (
          <>
            <AboutPanel />
            <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(0,0,0,0.07)" }}>
              <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#86868B", marginBottom: 20 }}>
                Interests
              </p>
              <HobbiesPanel />
            </div>
          </>
        )}
        {id === "projects"   && <ProjectsPanel />}
        {id === "experience" && (
          <>
            <ExperiencePanel />
            <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(0,0,0,0.07)" }}>
              <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#86868B", marginBottom: 20 }}>
                Volunteering
              </p>
              <VolunteeringPanel />
            </div>
          </>
        )}
        {id === "skills"  && <SkillsPanel />}
        {id === "contact" && <ContactPanel />}
      </div>
    </div>
  );
}

// ── Main layout ─────────────────────────────────────────────────────────────

export default function PortfolioLayout() {
  const [current,  setCurrent]  = useState(0);
  const [dir,      setDir]      = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const cooldown   = useRef(false);
  const touchStart = useRef({ x: 0, y: 0 });

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goTo = (idx: number) => {
    if (idx === current || idx < 0 || idx >= SECTIONS.length) return;
    setDir(idx > current ? 1 : -1);
    setCurrent(idx);
    cooldown.current = true;
    setTimeout(() => { cooldown.current = false; }, 750);
  };

  // Horizontal trackpad swipe → navigate. Vertical → free scroll within panel.
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (cooldown.current) return;
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      if (absX < 30 || absX < absY * 0.8) return;
      goTo(e.deltaX > 0 ? current + 1 : current - 1);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [current]); // eslint-disable-line

  // Left / right arrow keys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(current + 1);
      if (e.key === "ArrowLeft")  goTo(current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current]); // eslint-disable-line

  // Touch swipe — horizontal navigates, vertical scrolls panel freely
  useEffect(() => {
    const onStart = (e: TouchEvent) => {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        goTo(dx < 0 ? current + 1 : current - 1);
      }
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend",   onEnd,   { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend",   onEnd);
    };
  }, [current]); // eslint-disable-line

  const section = SECTIONS[current];

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "#F5F5F7", position: "relative" }}>

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, height: NAV_H,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isMobile ? "0 20px" : "0 48px",
        background: "rgba(245,245,247,0.9)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        zIndex: 100,
      }}>
        <button onClick={() => goTo(0)} style={{
          background: "none", border: "none", cursor: "pointer", padding: 0,
          fontSize: 13, fontWeight: 500, color: "#1D1D1F", letterSpacing: "0.01em",
        }}>
          David Chang
        </button>

        {/* Desktop: all nav links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 28 }}>
            {SECTIONS.slice(1).map((s, i) => {
              const idx = i + 1;
              const active = current === idx;
              return (
                <button key={s.id} onClick={() => goTo(idx)} style={{
                  background: "none", border: "none", cursor: "pointer", padding: 0,
                  fontSize: 11, letterSpacing: "0.05em",
                  color: active ? "#1D1D1F" : "#86868B",
                  fontWeight: active ? 500 : 400,
                  transition: "color 0.18s ease",
                }}>
                  {s.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Mobile: just the current section name */}
        {isMobile && current > 0 && (
          <span style={{ fontSize: 11, color: "#86868B", letterSpacing: "0.05em" }}>
            {section.label}
          </span>
        )}
      </nav>

      {/* ── Sections ─────────────────────────────────────────────────────── */}
      <div style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
        <AnimatePresence custom={dir} initial={false}>

          {current === 0 ? (
            /* ── Intro ────────────────────────────────────────────────── */
            <motion.div
              key="intro"
              custom={dir}
              variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                position: "absolute", inset: 0, paddingTop: NAV_H,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
                style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "center", textAlign: "center",
                  padding: "0 24px",
                }}
              >
                {/* Photo */}
                <img
                  src="/coverphoto.png"
                  alt="David (Hanmin) Chang"
                  style={{
                    width: isMobile ? 200 : 280,
                    height: isMobile ? 250 : 350,
                    objectFit: "cover",
                    borderRadius: 14,
                    border: "1px solid rgba(0,0,0,0.08)",
                    marginBottom: isMobile ? 20 : 28,
                    display: "block",
                  }}
                />

                {/* Name */}
                <h1 style={{
                  fontSize: isMobile ? "2rem" : "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 600, color: "#1D1D1F",
                  letterSpacing: "-0.03em", lineHeight: 1.06,
                  marginBottom: 12,
                }}>
                  David (Hanmin) Chang
                </h1>

                {/* Subtitle */}
                <p style={{ fontSize: isMobile ? 13 : 14, color: "#6E6E73", letterSpacing: "0.03em", marginBottom: 8 }}>
                  Statistics · University of British Columbia
                </p>
                <p style={{ fontSize: 12, color: "#86868B", lineHeight: 1.65, marginBottom: 28, maxWidth: 300 }}>
                  Hi, this is David, and welcome to my portfolio! Enjoy your stay.
                </p>

                {/* Links */}
                <div style={{ display: "flex", gap: isMobile ? 16 : 22 }}>
                  {[
                    { label: "GitHub",   href: "https://github.com/davidhchng" },
                    { label: "LinkedIn", href: "https://linkedin.com/in/david-chang-b56696316" },
                    { label: "Email",    href: "mailto:davidhchang75@gmail.com" },
                  ].map(({ label, href }) => (
                    <a key={label} href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 11, color: "#86868B", textDecoration: "none",
                        borderBottom: "1px solid rgba(0,0,0,0.14)", paddingBottom: 1,
                      }}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Swipe / tap cue */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                onClick={() => goTo(1)}
                style={{
                  position: "absolute",
                  bottom: isMobile ? 56 : 40,
                  display: "flex", alignItems: "center", gap: 8,
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 9, color: "#ADADB3", letterSpacing: "0.22em", textTransform: "uppercase" }}>
                  {isMobile ? "Tap to explore" : "Swipe"}
                </span>
                {!isMobile && (
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
                    style={{ color: "#ADADB3", fontSize: 13 }}
                  >
                    →
                  </motion.span>
                )}
              </motion.div>
            </motion.div>

          ) : (
            /* ── Content section ──────────────────────────────────────── */
            <motion.div
              key={section.id}
              custom={dir}
              variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                position: "absolute", inset: 0, paddingTop: NAV_H,
                display: "flex", flexDirection: "column",
              }}
            >
              {/* Section label */}
              <div style={{
                padding: isMobile ? "16px 20px 12px" : "24px 48px 16px",
                flexShrink: 0, display: "flex", alignItems: "center", gap: 10,
              }}>
                <span style={{ fontSize: 10, color: "#ADADB3", letterSpacing: "0.2em" }}>
                  {String(current).padStart(2, "0")}
                </span>
                <div style={{ width: 14, height: 1, background: "rgba(0,0,0,0.1)" }} />
                <span style={{ fontSize: 10, fontWeight: 500, color: "#1D1D1F", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {section.label}
                </span>
              </div>

              <SectionBody id={section.id} isMobile={isMobile} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ── Progress dots ─────────────────────────────────────────────────── */}
      <div style={{
        position: "fixed",
        bottom: isMobile ? 16 : 22,
        left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: isMobile ? 8 : 6, alignItems: "center", zIndex: 50,
      }}>
        {SECTIONS.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: isMobile ? 8 : 4,
          }}>
            <motion.div
              animate={{
                width: current === i ? 20 : 5,
                backgroundColor: current === i ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.13)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              style={{ height: 2, borderRadius: 1 }}
            />
          </button>
        ))}
      </div>

    </div>
  );
}
