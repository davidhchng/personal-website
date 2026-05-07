"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectItem {
  name: string;
  description: string;
  tags: string[];
  url: string;
  video?: string;
  event?: string;
}

const VIDEO_PROJECTS: ProjectItem[] = [
  {
    name: "ShoulderCoach: Basketball Decision Assistant",
    description:
      "Full-stack coaching tool routing late-game decisions through 8 deterministic statistical engines across 880,000+ clutch events from 5 NBA seasons. Includes a Shot Form Analyzer that uses MediaPipe Pose and OpenCV to score 5 biomechanical metrics from uploaded video — returning an annotated skeleton overlay with GPT-4o coaching feedback.",
    tags: ["FastAPI", "SQLite", "MediaPipe", "OpenCV", "Next.js", "GPT-4o", "Railway", "Vercel"],
    url: "https://shoulder-coach-1.vercel.app",
    video: "/exampleShoulderCoach.mov",
  },
  {
    name: "MiniMemo: Analysis & Report Creator",
    description:
      "Full-stack deployed tool that auto-classifies columns and generates statistical insights across 6 analysis types (group deviation, skewness, outlier detection, correlation, time trend). Supports 6 file formats up to 200k rows with SHA256-keyed LRU caching and an optional LLM narrative layer.",
    tags: ["Python", "FastAPI", "Pandas", "Next.js", "TypeScript"],
    url: "https://github.com/davidhchng/MiniMemo",
    video: "/MiniMemoExample.mov",
  },
];

const DATA_PROJECTS: ProjectItem[] = [
  {
    name: "Vancouver Business Registration Market Analysis",
    description:
      "Processed 130,000+ City of Vancouver business registration records. Designed statistical metrics quantifying market concentration, closure risk, and business entry recency across neighbourhoods and business types.",
    tags: ["Python", "Pandas"],
    url: "https://github.com/davidhchng/Vancouver-Business-Registration-Analysis",
  },
  {
    name: "Palo Alto EV Charging Station Utilization Analysis",
    description:
      "Analyzed 259,000+ EV charging session records. Engineered metrics identifying usage concentration and behavioral differences. Generated recommendations for capacity expansion and demand-shifting strategies.",
    tags: ["SQL", "Tableau", "Python", "Pandas"],
    url: "https://github.com/davidhchng/ev-charging-station-analysis",
  },
  {
    name: "PLAICRAFT AI Learning & Demographic Analysis",
    description:
      "Cleaned and validated participant-level survey data for an AI education research initiative. Analyzed relationships between demographics and learning outcomes to evaluate program effectiveness.",
    tags: ["R", "Tidyverse"],
    url: "https://github.com/davidhchng",
  },
];

const HACKATHONS: ProjectItem[] = [
  {
    name: "BridgeCare",
    event: "HackTheCoast 2026",
    description:
      "Nearly 6M Canadians lack a family doctor. BridgeCare lets patients chat with AI, generating summaries for real doctors to review and respond — no waiting room, no travel, just faster care.",
    tags: ["React", "TypeScript", "Express.js", "OpenAI", "SQLite", "Tailwind"],
    url: "https://devpost.com/software/bridgecare-we91ha",
  },
  {
    name: "AlignU",
    event: "HackCamp 2025",
    description:
      "Feeling overwhelmed with the endless amount of UBC clubs? AlignU lets you swipe through clubs to find your fit. Build your profile, get personalized matches, and discover events happening on campus.",
    tags: ["React", "TypeScript", "OpenAI", "Vite", "Tailwind"],
    url: "https://devpost.com/software/alignu",
  },
  {
    name: "Feedle",
    event: "HelloHacks 2025",
    description:
      "Feedle curates your social feed by aesthetic: filter, preview, and caption your photos to match the vibe of your vision.",
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://devpost.com/software/feedle",
  },
];

function ArrowIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0, color: "rgba(0,0,0,0.22)" }}>
      <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function ProjectCard({ project, index, onClick }: { project: ProjectItem; index: number; onClick: () => void }) {
  return (
    <motion.div
      className="project-card"
      onClick={onClick}
      style={{ padding: 18, borderRadius: 4 }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.42, ease: "easeOut", delay: index * 0.07 }}
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 380, damping: 28 } }}
    >
      {project.video && (
        <div style={{ aspectRatio: "16/9", overflow: "hidden", background: "#000", marginBottom: 13, borderRadius: 3 }}>
          <video
            src={project.video}
            autoPlay muted loop playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.88 }}
          />
        </div>
      )}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "#1D1D1F", lineHeight: 1.4 }}>{project.name}</span>
        <ArrowIcon />
      </div>
      {project.event && (
        <p style={{ fontSize: 9, color: "#86868B", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5 }}>
          {project.event}
        </p>
      )}
      <p className="project-desc-clamp" style={{ fontSize: 11, color: "#6E6E73", lineHeight: 1.6, marginBottom: 10 }}>
        {project.description}
      </p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {project.tags.slice(0, 4).map(tag => (
          <span key={tag} style={{ fontSize: 9, color: "#86868B", border: "1px solid rgba(0,0,0,0.08)", padding: "2px 7px" }}>
            {tag}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span style={{ fontSize: 9, color: "#ADADB3" }}>+{project.tags.length - 4}</span>
        )}
      </div>
    </motion.div>
  );
}

function Modal({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.24)",
        backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.97 }}
        transition={{ duration: 0.26, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "#F5F5F7",
          border: "1px solid rgba(0,0,0,0.09)",
          borderRadius: 14,
          maxWidth: 540,
          width: "100%",
          maxHeight: "86vh",
          overflowY: "auto",
          padding: 32,
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <button
            onClick={onClose}
            style={{
              background: "rgba(0,0,0,0.06)", border: "none", cursor: "pointer",
              width: 26, height: 26, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, color: "#6E6E73", lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {project.video && (
          <div style={{ aspectRatio: "16/9", overflow: "hidden", borderRadius: 9, marginBottom: 24, background: "#000" }}>
            <video
              src={project.video}
              autoPlay muted loop playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}

        <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1D1D1F", letterSpacing: "-0.02em", lineHeight: 1.25, marginBottom: 8 }}>
          {project.name}
        </h3>
        {project.event && (
          <p style={{ fontSize: 10, color: "#86868B", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            {project.event}
          </p>
        )}

        <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.7, marginBottom: 20 }}>
          {project.description}
        </p>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 26 }}>
          {project.tags.map(tag => (
            <span key={tag} style={{ fontSize: 10, color: "#86868B", border: "1px solid rgba(0,0,0,0.1)", padding: "3px 9px" }}>
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            fontSize: 11, color: "#1D1D1F", textDecoration: "none",
            border: "1px solid rgba(0,0,0,0.18)", padding: "8px 18px",
            borderRadius: 7, letterSpacing: "0.02em",
          }}
        >
          View Project
          <ArrowIcon />
        </a>
      </motion.div>
    </motion.div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#86868B", marginBottom: 14 }}
    >
      {children}
    </motion.p>
  );
}

export default function ProjectsPanel() {
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>
        <div className="projects-grid-video">
          {VIDEO_PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} onClick={() => setSelected(p)} />
          ))}
        </div>

        <div>
          <SectionLabel>Analysis & Research</SectionLabel>
          <div className="projects-grid-small">
            {DATA_PROJECTS.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} onClick={() => setSelected(p)} />
            ))}
          </div>
        </div>

        <div>
          <SectionLabel>Hackathons & Datathons</SectionLabel>
          <div className="projects-grid-small">
            {HACKATHONS.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} onClick={() => setSelected(p)} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && <Modal key="modal" project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
