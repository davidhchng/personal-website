"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import ProjectMedia from "./ProjectMedia";
import ProjectModal from "./ProjectModal";
import { CATEGORIES, CATEGORY_CAPTION, PROJECTS, Project, ProjectCategory } from "@/lib/content";
import { actions } from "@/lib/store";

// Display order for "All" is tuned so the 3-col grid packs with no holes.
const ALL_ORDER = ["starbucks", "vanbizreg", "paloalto", "shouldercoach", "minimemo", "plaicraft", "bridgecare", "alignu", "feedle"];
const FEATURED = new Set(["starbucks", "shouldercoach", "alignu"]);

function ArrowIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden className="card-arrow">
      <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function ProjectCard({ p, featured }: { p: Project; featured: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    if (e.pointerType === "mouse") {
      el.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * 4}deg) rotateY(${(x - 0.5) * 5}deg) translateY(-4px)`;
    }
  };
  const onLeave = () => { ref.current!.style.transform = ""; };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className={featured ? "span-2" : undefined}
    >
      <div
        ref={ref}
        className={`project-card${featured ? " is-featured" : ""}`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onClick={() => actions.openProject(p.id)}
        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); actions.openProject(p.id); } }}
        role="button"
        tabIndex={0}
        aria-label={`Open ${p.name}`}
        data-cursor="Open"
        style={{ transition: "transform .4s cubic-bezier(.2,.7,.2,1), border-color .25s ease, box-shadow .35s ease", height: "100%" }}
      >
        <div className="card-media">
          <ProjectMedia p={p} featured={featured} />
        </div>
        <div className="card-body">
          {p.event && <p className="eyebrow" style={{ fontSize: 10, color: "var(--accent)", marginBottom: 8 }}>{p.event}</p>}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
            <h3 style={{ fontSize: featured ? 22 : 16, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.25 }}>{p.name}</h3>
            <span style={{ color: "var(--subtle)", marginTop: 4 }}><ArrowIcon /></span>
          </div>
          <p className={featured ? undefined : "project-desc-clamp"} style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, marginBottom: 16 }}>
            {featured && p.description.length > 300 ? p.description.slice(0, p.description.lastIndexOf(".", 300) + 1) : p.description}
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: "auto" }}>
            {p.tags.slice(0, featured ? 6 : 4).map(t => <span key={t} className="tag">{t}</span>)}
            {p.tags.length > (featured ? 6 : 4) && <span className="tag" style={{ borderStyle: "dashed" }}>+{p.tags.length - (featured ? 6 : 4)}</span>}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const list = useMemo(() => {
    if (filter === "all") return ALL_ORDER.map(id => PROJECTS.find(p => p.id === id)!).filter(Boolean);
    return PROJECTS.filter(p => p.category === filter);
  }, [filter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: PROJECTS.length };
    PROJECTS.forEach(p => { c[p.category] = (c[p.category] ?? 0) + 1; });
    return c;
  }, []);

  const caption = filter !== "all" ? CATEGORY_CAPTION[filter] : undefined;

  return (
    <section id="projects" className="section-pad" style={{ scrollMarginTop: 20 }}>
      <div className="wrap">
        <SectionHeader index="02" title="Projects" />

        <LayoutGroup>
          <div role="tablist" aria-label="Filter projects" className="filter-row">
            {CATEGORIES.map(c => {
              const active = filter === c.id;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(c.id)}
                  className="chip"
                  style={{ color: active ? "var(--bg)" : undefined, borderColor: active ? "transparent" : undefined }}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      style={{ position: "absolute", inset: 0, borderRadius: 999, background: "var(--fg)" }}
                    />
                  )}
                  <span style={{ position: "relative" }}>{c.label}</span>
                  <span style={{ position: "relative", fontSize: 10, opacity: 0.6, fontVariantNumeric: "tabular-nums" }}>{counts[c.id]}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {caption && (
              <motion.p
                key={filter}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ fontSize: 14, color: "var(--subtle)", maxWidth: 560, marginBottom: 24, lineHeight: 1.6 }}
              >
                {caption}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.div layout className="projects-grid" style={{ gridAutoFlow: "dense" }}>
            <AnimatePresence mode="popLayout">
              {list.map(p => (
                <ProjectCard key={p.id} p={p} featured={filter === "all" && FEATURED.has(p.id)} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      <ProjectModal />

      <style>{`
        .filter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
        @media (max-width: 640px) {
          .filter-row { flex-wrap: nowrap; overflow-x: auto; margin: 0 -20px 24px; padding: 0 20px 4px; scrollbar-width: none; }
          .filter-row::-webkit-scrollbar { display: none; }
        }
        .project-card { display: flex; flex-direction: column; cursor: pointer; }
        .card-media { position: relative; aspect-ratio: 16 / 10; overflow: hidden; border-bottom: 1px solid var(--line); }
        .card-media video, .card-media img { transition: transform .8s cubic-bezier(.2,.7,.2,1); }
        .project-card:hover .card-media video { transform: scale(1.04); }
        .card-body { padding: 20px 20px 22px; display: flex; flex-direction: column; flex: 1; position: relative; z-index: 3; }
        .card-arrow { transition: transform .3s cubic-bezier(.2,.7,.2,1); }
        .project-card:hover .card-arrow { transform: translate(2px, -2px) scale(1.2); color: var(--accent); }
        @media (min-width: 1001px) {
          .project-card.is-featured { flex-direction: row; }
          .project-card.is-featured .card-media { aspect-ratio: auto; flex: 1.35; min-height: 340px; border-bottom: none; border-right: 1px solid var(--line); }
          .project-card.is-featured .card-body { flex: 1; padding: 28px; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
