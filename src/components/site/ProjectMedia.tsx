"use client";

import LazyVideo from "./LazyVideo";
import { Project } from "@/lib/content";

export default function ProjectMedia({ p, featured = false }: { p: Project; featured?: boolean }) {
  if (p.video) {
    const portrait = p.videoOrientation === "portrait";
    return (
      <div style={{ position: "absolute", inset: 0, background: "#0b0b0b", overflow: "hidden" }}>
        {portrait && (
          <img src={p.poster} alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "blur(24px) brightness(0.6)", transform: "scale(1.2)" }} />
        )}
        <LazyVideo src={p.video} poster={p.poster} fit={portrait ? "contain" : "cover"} style={{ position: "relative", objectPosition: featured ? "center" : "top center" }} />
      </div>
    );
  }
  // Typographic tile for projects without footage
  return (
    <div style={{
      position: "absolute", inset: 0, overflow: "hidden",
      background: "linear-gradient(135deg, #3A5A66 0%, #16222B 100%)",
      display: "flex", alignItems: "flex-end", padding: 22,
    }}>
      <svg aria-hidden viewBox="0 0 200 120" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.35 }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x={8 + i * 13.5} width="8" y={120 - (20 + ((i * 37) % 80))} height={20 + ((i * 37) % 80)} fill="#DCE9EC" rx="1.5" />
        ))}
      </svg>
      <span className="serif" style={{ position: "relative", color: "#DCE9EC", fontSize: 44, lineHeight: 1 }}>
        {p.tags[0]} <span style={{ opacity: 0.6 }}>×</span> {p.tags[1]}
      </span>
    </div>
  );
}
