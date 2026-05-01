"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AboutPanel        from "@/components/panels/AboutPanel";
import ProjectsPanel     from "@/components/panels/ProjectsPanel";
import SkillsPanel       from "@/components/panels/SkillsPanel";
import ExperiencePanel   from "@/components/panels/ExperiencePanel";
import VolunteeringPanel from "@/components/panels/VolunteeringPanel";
import HobbiesPanel      from "@/components/panels/HobbiesPanel";
import ContactPanel      from "@/components/panels/ContactPanel";

type CardId = "about" | "projects" | "skills" | "experience" | "contact" | "hobbies" | "volunteering";

const PANELS: Record<CardId, React.ComponentType> = {
  about:        AboutPanel,
  projects:     ProjectsPanel,
  skills:       SkillsPanel,
  experience:   ExperiencePanel,
  contact:      ContactPanel,
  hobbies:      HobbiesPanel,
  volunteering: VolunteeringPanel,
};

const LABELS: Record<CardId, string> = {
  about:        "About",
  projects:     "Projects",
  skills:       "Skills",
  experience:   "Experience",
  contact:      "Contact",
  hobbies:      "Interests",
  volunteering: "Volunteering",
};

const card = {
  background: "#FFFFFF",
  border: "1px solid rgba(0,0,0,0.07)",
  borderRadius: 16,
  padding: 20,
  overflow: "hidden" as const,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#86868B", marginBottom: 12 }}>
      {children}
    </p>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 10, color: "#86868B", border: "1px solid rgba(0,0,0,0.08)", padding: "2px 8px", borderRadius: 3 }}>
      {children}
    </span>
  );
}

// ── Card preview content ────────────────────────────────────────────────────

function HeroPreview() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <SectionLabel>Portfolio · 2026</SectionLabel>
        <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, color: "#1D1D1F", letterSpacing: "-0.02em", lineHeight: 1.08, marginBottom: 14 }}>
          David Chang
        </h1>
        <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.65, maxWidth: 280 }}>
          Statistics undergraduate at UBC building data pipelines, analytical tools, and full-stack products.
        </p>
      </div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" as const }}>
        {[
          { label: "GitHub",   href: "https://github.com/davidhchng" },
          { label: "LinkedIn", href: "https://linkedin.com/in/david-chang-b56696316" },
          { label: "Email",    href: "mailto:davidhchang75@gmail.com" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            style={{ fontSize: 11, color: "#86868B", textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.14)", paddingBottom: 1 }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

function AboutPreview() {
  return (
    <>
      <SectionLabel>About</SectionLabel>
      <p style={{ fontSize: 12, color: "#6E6E73", lineHeight: 1.65 }}>
        Stats undergrad at UBC interested in data science, reproducible analytical workflows, and AI-assisted tooling.
      </p>
    </>
  );
}

function ContactPreview() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <SectionLabel>Contact</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { label: "Email",    value: "davidhchang75@gmail.com" },
          { label: "GitHub",   value: "github.com/davidhchng" },
          { label: "LinkedIn", value: "david-chang-b56696316" },
        ].map(({ label, value }) => (
          <div key={label}>
            <p style={{ fontSize: 9, color: "#ADADB3", letterSpacing: "0.15em", textTransform: "uppercase" as const, marginBottom: 3 }}>{label}</p>
            <p style={{ fontSize: 11, color: "#6E6E73" }}>{value}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "auto", paddingTop: 16 }}>
        <p style={{ fontSize: 11, color: "#ADADB3" }}>Langley, BC</p>
      </div>
    </div>
  );
}

function SkillsPreview() {
  return (
    <>
      <SectionLabel>Skills</SectionLabel>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 5 }}>
        {["Python", "R", "SQL", "Next.js", "FastAPI", "Pandas"].map(s => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>
    </>
  );
}

function ProjectsPreview() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
        <video
          autoPlay muted loop playsInline
          src="/exampleShoulderCoach.mov"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      <div style={{ padding: "14px 0 0", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexShrink: 0 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: "#1D1D1F" }}>Projects</p>
          <p style={{ fontSize: 10, color: "#86868B", marginTop: 2 }}>5 projects · 3 hackathons</p>
        </div>
        <p style={{ fontSize: 11, color: "#ADADB3" }}>View all →</p>
      </div>
    </div>
  );
}

function ExperiencePreview() {
  return (
    <>
      <SectionLabel>Experience</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { role: "Technical Director",    org: "UBC Statistics Society" },
          { role: "Web Dev & Event Lead",  org: "UBC STEM Fellowship" },
          { role: "Barista",               org: "Starbucks" },
        ].map(({ role, org }) => (
          <div key={role}>
            <p style={{ fontSize: 12, fontWeight: 500, color: "#1D1D1F" }}>{role}</p>
            <p style={{ fontSize: 11, color: "#86868B", marginTop: 1 }}>{org}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function HobbiesPreview() {
  return (
    <>
      <SectionLabel>Interests</SectionLabel>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 5 }}>
        {["Cars", "Ultimate Frisbee", "NBA Analytics", "AI workflows"].map(h => (
          <Tag key={h}>{h}</Tag>
        ))}
      </div>
    </>
  );
}

function VolunteeringPreview() {
  return (
    <>
      <SectionLabel>Volunteering</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { role: "Workshop Coordinator", org: "UBC Nutrikids" },
          { role: "Tutor",               org: "Mary Jane Shannon Program" },
        ].map(({ role, org }) => (
          <div key={role}>
            <p style={{ fontSize: 12, fontWeight: 500, color: "#1D1D1F" }}>{role}</p>
            <p style={{ fontSize: 11, color: "#86868B", marginTop: 1 }}>{org}</p>
          </div>
        ))}
      </div>
    </>
  );
}

// ── Main layout ─────────────────────────────────────────────────────────────

export default function BentoLayout() {
  const [expanded, setExpanded] = useState<CardId | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setExpanded(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const Panel = expanded ? PANELS[expanded] : null;

  return (
    <div style={{ background: "#F5F5F7", minHeight: "100vh" }}>
      <div className="bento-grid">

        {/* Hero — identity anchor, not clickable */}
        <div className="bento-card card-hero" style={card}>
          <HeroPreview />
        </div>

        {/* About */}
        <motion.div
          className="bento-card bento-card-clickable card-about"
          style={card}
          whileTap={{ scale: 0.98 }}
          onClick={() => setExpanded("about")}
        >
          <AboutPreview />
        </motion.div>

        {/* Contact */}
        <motion.div
          className="bento-card bento-card-clickable card-contact"
          style={card}
          whileTap={{ scale: 0.98 }}
          onClick={() => setExpanded("contact")}
        >
          <ContactPreview />
        </motion.div>

        {/* Skills */}
        <motion.div
          className="bento-card bento-card-clickable card-skills"
          style={card}
          whileTap={{ scale: 0.98 }}
          onClick={() => setExpanded("skills")}
        >
          <SkillsPreview />
        </motion.div>

        {/* Projects — video fills the card */}
        <motion.div
          className="bento-card bento-card-clickable card-projects"
          style={{ ...card, padding: 0 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setExpanded("projects")}
        >
          <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: 18 }}>
            <ProjectsPreview />
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div
          className="bento-card bento-card-clickable card-experience"
          style={card}
          whileTap={{ scale: 0.98 }}
          onClick={() => setExpanded("experience")}
        >
          <ExperiencePreview />
        </motion.div>

        {/* Hobbies */}
        <motion.div
          className="bento-card bento-card-clickable card-hobbies"
          style={card}
          whileTap={{ scale: 0.98 }}
          onClick={() => setExpanded("hobbies")}
        >
          <HobbiesPreview />
        </motion.div>

        {/* Volunteering */}
        <motion.div
          className="bento-card bento-card-clickable card-volunteering"
          style={card}
          whileTap={{ scale: 0.98 }}
          onClick={() => setExpanded("volunteering")}
        >
          <VolunteeringPreview />
        </motion.div>

      </div>

      {/* ── Expanded modal ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {expanded && Panel && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setExpanded(null)}
              style={{
                position: "fixed", inset: 0,
                background: "rgba(245,245,247,0.72)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                zIndex: 40,
              }}
            />

            {/* Centering shell — flex does the centering, Framer does the animation */}
            <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, pointerEvents: "none" }}>
              <motion.div
                key="panel"
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0,  scale: 1 }}
                exit={{    opacity: 0, y: 8,   scale: 0.98 }}
                transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  pointerEvents: "auto",
                  width: "min(580px, 92vw)",
                  maxHeight: "84vh",
                  background: "#FFFFFF",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 20,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Modal header */}
                <div style={{
                  padding: "15px 20px",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#1D1D1F" }}>
                    {LABELS[expanded]}
                  </span>
                  <button
                    onClick={() => setExpanded(null)}
                    style={{
                      width: 26, height: 26, borderRadius: "50%",
                      background: "rgba(0,0,0,0.05)", border: "none",
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#86868B", fontSize: 12, lineHeight: 1,
                    }}
                  >
                    ✕
                  </button>
                </div>

                {/* Scrollable panel content */}
                <div style={{ overflowY: "auto", flex: 1, padding: "22px 22px 28px" }}>
                  <Panel />
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
