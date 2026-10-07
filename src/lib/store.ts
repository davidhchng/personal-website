"use client";

import { useSyncExternalStore } from "react";

// Tiny global store so distant components (palette, skills, hero) can
// open a project, show a toast or spawn a basketball without prop drilling.

interface State {
  projectId: string | null;
  paletteOpen: boolean;
  toast: { id: number; text: string } | null;
  balls: number;            // how many basketballs have been spawned
}

let state: State = { projectId: null, paletteOpen: false, toast: null, balls: 0 };
const listeners = new Set<() => void>();

function set(patch: Partial<State>) {
  state = { ...state, ...patch };
  listeners.forEach(l => l());
}

export function useStore<T>(select: (s: State) => T): T {
  return useSyncExternalStore(
    cb => { listeners.add(cb); return () => listeners.delete(cb); },
    () => select(state),
    () => select(state),
  );
}

let toastTimer: ReturnType<typeof setTimeout> | undefined;

export const actions = {
  openProject: (id: string) => set({ projectId: id }),
  closeProject: () => set({ projectId: null }),
  setPalette: (open: boolean) => set({ paletteOpen: open }),
  togglePalette: () => set({ paletteOpen: !state.paletteOpen }),
  toast: (text: string) => {
    clearTimeout(toastTimer);
    set({ toast: { id: Date.now(), text } });
    toastTimer = setTimeout(() => set({ toast: null }), 2200);
  },
  spawnBall: () => set({ balls: state.balls + 1 }),
  copyEmail: async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      actions.toast("Email copied to clipboard");
    } catch {
      window.location.href = `mailto:${email}`;
    }
  },
  scrollTo: (id: string) => {
    const el = id === "top" ? document.body : document.getElementById(id);
    if (!el) return;
    if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  },
  toggleTheme: () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch {}
    };
    // View Transitions give a smooth cross-fade where supported
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      doc.startViewTransition(apply);
    } else apply();
  },
};
