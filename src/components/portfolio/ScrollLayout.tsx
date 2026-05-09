"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
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


function SectionContent({ id, isMobile }: { id: string; isMobile: boolean }) {
  const px = isMobile ? "0 24px" : "0 64px";
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{ paddingTop: 0, paddingLeft: isMobile ? 24 : 64, paddingRight: isMobile ? 24 : 64, paddingBottom: 120 }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {id === "about" && (
          <>
            <AboutPanel />
            <div style={{ marginTop: 56, paddingTop: 40, borderTop: "1px solid rgba(0,0,0,0.07)" }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6E6E73", marginBottom: 24 }}>
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
            <div style={{ marginTop: 56, paddingTop: 40, borderTop: "1px solid rgba(0,0,0,0.07)" }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6E6E73", marginBottom: 24 }}>
                Volunteering
              </p>
              <VolunteeringPanel />
            </div>
          </>
        )}
        {id === "skills"  && <SkillsPanel />}
        {id === "contact" && <ContactPanel />}
      </div>
    </motion.div>
  );
}

export default function ScrollLayout() {
  const [current,  setCurrent]  = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollTo = useCallback((idx: number) => {
    const container = scrollRef.current;
    const el = sectionRefs.current[idx];
    if (!container || !el) return;
    container.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onScroll = () => {
      const pivot = container.scrollTop + container.clientHeight * 0.35;
      let active = 0;
      sectionRefs.current.forEach((el, i) => {
        if (el && el.offsetTop <= pivot) active = i;
      });
      setCurrent(active);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") scrollTo(Math.min(current + 1, SECTIONS.length - 1));
      if (e.key === "ArrowUp"   || e.key === "ArrowLeft")  scrollTo(Math.max(current - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, scrollTo]);

  const section = SECTIONS[current];

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "#F5F5F7", position: "relative" }}>

      {/* Nav */}
      <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, height: NAV_H,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: isMobile ? "0 24px" : "0 64px",
          background: "rgba(245,245,247,0.9)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          zIndex: 100,
        }}
      >
        <button onClick={() => scrollTo(0)} style={{
          background: "none", border: "none", cursor: "pointer", padding: 0,
          fontSize: 13, fontWeight: 500, color: "#1D1D1F", letterSpacing: "0.01em",
        }}>
          David Chang
        </button>

        {!isMobile && (
          <div style={{ display: "flex", gap: 32 }}>
            {SECTIONS.slice(1).map((s, i) => {
              const idx = i + 1;
              const active = current === idx;
              return (
                <button key={s.id} onClick={() => scrollTo(idx)} style={{
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

        {isMobile && current > 0 && (
          <span style={{ fontSize: 11, color: "#86868B", letterSpacing: "0.05em" }}>
            {section.label}
          </span>
        )}
      </nav>

      {/* Scroll container */}
      <div ref={scrollRef} style={{ height: "100vh", overflowY: "auto" }}>

        {/* Intro */}
        <section
          ref={el => { sectionRefs.current[0] = el; }}
          style={{
            minHeight: "100vh", paddingTop: NAV_H,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            position: "relative",
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
            <img
              src="/coverphoto.png"
              alt="David (Hanmin) Chang"
              style={{
                width: isMobile ? 230 : 320,
                height: isMobile ? 288 : 400,
                objectFit: "cover",
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,0.08)",
                marginBottom: isMobile ? 28 : 36,
                display: "block",
              }}
            />
            <h1 style={{
              fontSize: isMobile ? "2.4rem" : "clamp(2.6rem, 5vw, 3.8rem)",
              fontWeight: 700, color: "#1D1D1F",
              letterSpacing: "-0.04em", lineHeight: 1.04,
              marginBottom: 16,
            }}>
              David (Hanmin) Chang
            </h1>
            <p style={{ fontSize: isMobile ? 14 : 16, color: "#6E6E73", fontWeight: 500, letterSpacing: "0.02em", marginBottom: 12 }}>
              Statistics · University of British Columbia
            </p>
            <p style={{ fontSize: 13, color: "#86868B", lineHeight: 1.7, marginBottom: 36, maxWidth: 360 }}>
              Hi, this is David, and welcome to my portfolio! Enjoy your stay.
            </p>
            <div style={{ display: "flex", gap: isMobile ? 20 : 26 }}>
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

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            onClick={() => scrollTo(1)}
            style={{
              position: "absolute",
              bottom: isMobile ? 56 : 44,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 9, color: "#ADADB3", letterSpacing: "0.22em", textTransform: "uppercase" }}>
              Scroll
            </span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: "#ADADB3", fontSize: 13 }}
            >
              ↓
            </motion.span>
          </motion.div>
        </section>

        {/* Content sections */}
        {SECTIONS.slice(1).map((s, i) => (
          <section
            key={s.id}
            ref={el => { sectionRefs.current[i + 1] = el; }}
            style={{ paddingTop: NAV_H + 52 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{
                padding: isMobile ? "0 24px 16px" : "0 64px 20px",
                display: "flex", alignItems: "center", gap: 12,
              }}
            >
              <span style={{ fontSize: 11, color: "#ADADB3", letterSpacing: "0.15em", fontWeight: 400 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div style={{ width: 18, height: 1, background: "rgba(0,0,0,0.12)" }} />
              <span style={{ fontSize: 15, fontWeight: 700, color: "#1D1D1F", letterSpacing: "-0.01em" }}>
                {s.label}
              </span>
            </motion.div>

            <SectionContent id={s.id} isMobile={isMobile} />
          </section>
        ))}

        <div style={{ height: 40 }} />
      </div>


    </div>
  );
}
