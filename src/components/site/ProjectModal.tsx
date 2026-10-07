"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES, PROJECTS } from "@/lib/content";
import { actions, useStore } from "@/lib/store";
import ProjectMedia from "./ProjectMedia";

export default function ProjectModal() {
  const id = useStore(s => s.projectId);
  const idx = PROJECTS.findIndex(p => p.id === id);
  const p = idx >= 0 ? PROJECTS[idx] : null;
  const dir = useRef(1);
  const closeRef = useRef<HTMLButtonElement>(null);

  const go = (d: number) => {
    dir.current = d;
    actions.openProject(PROJECTS[(idx + d + PROJECTS.length) % PROJECTS.length].id);
  };

  useEffect(() => {
    if (!p) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") actions.closeProject();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus?.({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!p, idx]);

  const portrait = p?.videoOrientation === "portrait";
  const category = CATEGORIES.find(c => c.id === p?.category)?.label;

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={actions.closeProject}
          style={{
            position: "fixed", inset: 0, zIndex: 300,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "max(16px, 3vh) 16px",
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={p.name}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={e => e.stopPropagation()}
            style={{
              position: "relative", width: "100%", maxWidth: 980, maxHeight: "100%",
              background: "var(--bg)", color: "var(--fg)",
              border: "1px solid var(--line-strong)", borderRadius: 22,
              boxShadow: "var(--shadow-lg)", overflow: "hidden", display: "flex", flexDirection: "column",
            }}
          >
            {/* top bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px 12px 22px", borderBottom: "1px solid var(--line)", gap: 12 }}>
              <span className="eyebrow" style={{ fontSize: 10 }}>
                {String(idx + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")} · {category}
              </span>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="chip" style={{ padding: "6px 10px" }} onClick={() => go(-1)} aria-label="Previous project">←</button>
                <button className="chip" style={{ padding: "6px 10px" }} onClick={() => go(1)} aria-label="Next project">→</button>
                <button ref={closeRef} className="chip" style={{ padding: "6px 11px" }} onClick={actions.closeProject} aria-label="Close">✕</button>
              </div>
            </div>

            <div style={{ overflowY: "auto" }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: 30 * dir.current }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 * dir.current }}
                  transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <div className={`modal-media${portrait ? " portrait" : ""}`} style={{ position: "relative", background: "#0b0b0b" }}>
                    {p.video ? (
                      <video
                        key={p.video}
                        src={p.video}
                        poster={p.poster}
                        autoPlay muted loop playsInline controls
                        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                      />
                    ) : (
                      <ProjectMedia p={p} />
                    )}
                  </div>

                  <div className="modal-body">
                    <div>
                      {p.event && <p className="eyebrow" style={{ color: "var(--accent)", marginBottom: 10 }}>{p.event}</p>}
                      <h3 style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>
                        {p.name}
                      </h3>
                      <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.75 }}>{p.description}</p>
                    </div>
                    <aside style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                      <div>
                        <p className="eyebrow" style={{ fontSize: 10, marginBottom: 10 }}>Built with</p>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {p.tags.map(t => <span key={t} className="tag" style={{ fontSize: 11 }}>{t}</span>)}
                        </div>
                      </div>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="chip"
                        style={{ justifyContent: "center", padding: "12px 18px", background: "var(--fg)", color: "var(--bg)", borderColor: "var(--fg)", textDecoration: "none", fontSize: 13 }}
                      >
                        View Project <span aria-hidden>↗</span>
                      </a>
                    </aside>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <style>{`
            .modal-media { height: min(56vh, 551px); }
            .modal-media.portrait { height: min(56vh, 520px); }
            @media (max-width: 720px) { .modal-media:not(.portrait) { height: auto; aspect-ratio: 16 / 9; } }
            .modal-body { display: grid; grid-template-columns: 1fr 240px; gap: 40px; padding: 30px 30px 34px; }
            @media (max-width: 720px) { .modal-body { grid-template-columns: 1fr; gap: 26px; padding: 22px 20px 26px; } }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
