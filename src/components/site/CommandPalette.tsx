"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { actions, useStore } from "@/lib/store";
import { LINKS, PROJECTS, SECTIONS } from "@/lib/content";

interface Item {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: string;
  run: () => void;
}

function buildItems(): Item[] {
  return [
    { id: "top", group: "Navigate", label: "Home", icon: "⌂", run: () => actions.scrollTo("top") },
    ...SECTIONS.map(s => ({
      id: `nav-${s.id}`, group: "Navigate", label: s.label, icon: "→", run: () => actions.scrollTo(s.id),
    })),
    ...PROJECTS.map(p => ({
      id: `p-${p.id}`, group: "Projects", label: p.name, hint: p.event ?? p.tags.slice(0, 2).join(" · "), icon: "◆",
      run: () => actions.openProject(p.id),
    })),
    { id: "copy", group: "Actions", label: "Copy email address", hint: LINKS.email.value, icon: "⧉", run: () => actions.copyEmail(LINKS.email.value) },
    { id: "theme", group: "Actions", label: "Toggle dark mode", icon: "◐", run: () => actions.toggleTheme() },
    { id: "ball", group: "Actions", label: "Shoot some hoops", hint: "Bucks in 6", icon: "◎", run: () => { actions.scrollTo("top"); actions.spawnBall(); } },
    { id: "gh", group: "Links", label: "GitHub", hint: LINKS.github.value, icon: "↗", run: () => window.open(LINKS.github.href, "_blank", "noopener") },
    { id: "li", group: "Links", label: "LinkedIn", hint: "david-chang", icon: "↗", run: () => window.open(LINKS.linkedin.href, "_blank", "noopener") },
    { id: "mail", group: "Links", label: "Send an email", icon: "@", run: () => { window.location.href = LINKS.email.href; } },
  ];
}

// Loose subsequence match: "spc" matches "Starbucks Predictor ..."
function score(q: string, text: string): number {
  if (!q) return 1;
  const t = text.toLowerCase();
  const idx = t.indexOf(q);
  if (idx >= 0) return 100 - idx;
  let ti = 0;
  for (const ch of q) {
    ti = t.indexOf(ch, ti);
    if (ti < 0) return 0;
    ti++;
  }
  return 1;
}

export default function CommandPalette() {
  const open = useStore(s => s.paletteOpen);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const items = useMemo(buildItems, []);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return items
      .map(it => ({ it, s: Math.max(score(query, it.label), score(query, `${it.group} ${it.hint ?? ""}`) * 0.5) }))
      .filter(r => r.s > 0)
      .sort((a, b) => (query ? b.s - a.s : 0))
      .map(r => r.it);
  }, [q, items]);

  // Global shortcut: ⌘K / Ctrl+K, or "/" when not typing
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest?.("input, textarea, [contenteditable]");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        actions.togglePalette();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ(""); setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => { setActive(0); }, [q]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = (it: Item | undefined) => {
    if (!it) return;
    actions.setPalette(false);
    // let the palette close before scrolling / opening modals
    setTimeout(it.run, 120);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); run(results[active]); }
    else if (e.key === "Escape") { actions.setPalette(false); }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="palette"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => actions.setPalette(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 500,
            background: "rgba(0,0,0,0.28)",
            backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
            display: "flex", justifyContent: "center", alignItems: "flex-start",
            padding: "min(18vh, 140px) 16px 16px",
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 500, damping: 34 }}
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%", maxWidth: 580,
              background: "var(--bg-elev)", color: "var(--fg)",
              border: "1px solid var(--line-strong)", borderRadius: 16,
              boxShadow: "var(--shadow-lg)", overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderBottom: "1px solid var(--line)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ color: "var(--subtle)", flexShrink: 0 }}>
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                value={q}
                onChange={e => setQ(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search projects, sections, actions…"
                aria-label="Search"
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 15, color: "var(--fg)", fontFamily: "inherit" }}
              />
              <span className="kbd">esc</span>
            </div>
            <div ref={listRef} style={{ maxHeight: "min(52vh, 420px)", overflowY: "auto", padding: 8 }}>
              {results.length === 0 && (
                <p style={{ padding: "28px 12px", textAlign: "center", fontSize: 13, color: "var(--subtle)" }}>
                  Nothing matches “{q}”.
                </p>
              )}
              {results.map((it, i) => {
                // results are score-sorted while searching, so group headers only make sense unfiltered
                const header = !q.trim() && it.group !== lastGroup ? it.group : null;
                lastGroup = it.group;
                const isActive = i === active;
                return (
                  <div key={it.id}>
                    {header && (
                      <p style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--faint)", padding: "10px 10px 6px", fontWeight: 600 }}>
                        {header}
                      </p>
                    )}
                    <button
                      data-idx={i}
                      onMouseMove={() => setActive(i)}
                      onClick={() => run(it)}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", gap: 12,
                        padding: "10px 10px", borderRadius: 10, border: "none", textAlign: "left",
                        background: isActive ? "var(--accent-soft)" : "transparent",
                        color: isActive ? "var(--fg)" : "var(--muted)",
                        cursor: "pointer", fontSize: 14, position: "relative",
                      }}
                    >
                      <span style={{
                        width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: "1px solid var(--line)", fontSize: 12,
                        color: isActive ? "var(--accent)" : "var(--subtle)",
                      }}>{it.icon}</span>
                      <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.label}</span>
                      {it.hint && <span style={{ fontSize: 11, color: "var(--faint)", whiteSpace: "nowrap" }}>{it.hint}</span>}
                      {isActive && <span className="kbd">↵</span>}
                    </button>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 16, padding: "10px 18px", borderTop: "1px solid var(--line)", fontSize: 11, color: "var(--subtle)" }}>
              <span><span className="kbd">↑</span> <span className="kbd">↓</span> navigate</span>
              <span><span className="kbd">↵</span> select</span>
              <span style={{ marginLeft: "auto" }}><span className="kbd">⌘</span> <span className="kbd">K</span> toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
