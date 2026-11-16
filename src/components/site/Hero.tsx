"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import DotField from "./DotField";
import Hoops from "./Hoops";
import Magnetic from "./Magnetic";
import { LINKS } from "@/lib/content";
import { actions } from "@/lib/store";

const EASE = [0.2, 0.7, 0.2, 1] as const;

function useVancouverTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { timeZone: "America/Vancouver", hour: "numeric", minute: "2-digit" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function TiltPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5), py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 180, damping: 18 });
  const sy = useSpring(py, { stiffness: 180, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-12, 12]);
  const rotateX = useTransform(sy, [0, 1], [10, -10]);
  const gx = useTransform(sx, v => `${v * 100}%`);
  const gy = useTransform(sy, v => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.38), rgba(255,255,255,0) 55%)`;

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current!.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => { px.set(0.5); py.set(0.5); };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 24, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      style={{ perspective: 900, position: "relative" }}
    >
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        data-cursor="Hi!"
        className="hero-photo"
        style={{
          rotateX, rotateY, transformStyle: "preserve-3d",
          position: "relative", borderRadius: 4, overflow: "hidden",
          border: "1px solid var(--line)", boxShadow: "var(--shadow-lg)",
          background: "var(--bg-sunk)",
        }}
      >
        <Image
          src="/v/coverphoto.jpg"
          alt="David (Hanmin) Chang"
          width={900}
          height={1194}
          priority
          sizes="(max-width: 860px) 70vw, 360px"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <motion.div aria-hidden style={{ position: "absolute", inset: 0, background: glare, mixBlendMode: "soft-light", pointerEvents: "none" }} />
      </motion.div>
      <SantaHat />
    </motion.div>
  );
}

// Hung on the portrait's top-left corner, outside the photo's overflow clip.
function SantaHat() {
  return (
    <motion.svg
      aria-hidden
      className="santa-hat"
      viewBox="0 0 120 100"
      initial={{ rotate: -40, y: -30, opacity: 0 }}
      animate={{ rotate: -22, y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 11, delay: 1.1 }}
    >
      <path d="M14 78 C 30 30, 70 8, 104 30 C 92 34, 84 44, 80 58 L 96 78 Z" fill="#C8202F" />
      <path d="M14 78 C 30 30, 70 8, 104 30 C 96 32, 90 36, 86 42 C 70 26, 40 40, 24 78 Z" fill="#E23B4A" />
      <rect x="4" y="70" width="98" height="20" rx="10" fill="#FBF8F2" />
      <circle cx="104" cy="32" r="11" fill="#FBF8F2" />
    </motion.svg>
  );
}

// Masthead name — one word per line, each rising out of its own clipped band.
function RevealLines({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <h1 className="hero-name" aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} aria-hidden className="hero-name-line">
          <motion.span
            initial={{ y: "110%", rotate: 3 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.09 }}
            style={{ display: "inline-block", transformOrigin: "0% 100%" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const time = useVancouverTime();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const fade = (d: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay: d },
  });

  return (
    <section ref={ref} id="top" style={{ position: "relative", minHeight: "100svh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <DotField />
      <Hoops />

      <motion.div
        className="wrap hero-grid"
        style={{ y: contentY, opacity: contentOpacity, flex: 1, position: "relative", zIndex: 1 }}
      >
        <div className="hero-copy">
          <motion.p {...fade(0.15)} className="eyebrow hero-standfirst">
            Computer Science and Statistics · University of British Columbia ·{" "}
            <button
              id="bucks-btn"
              onClick={actions.spawnBall}
              data-cursor="Play"
              title="Click me"
              className="hero-bucks"
            >
              Bucks Fan
            </button>
          </motion.p>

          <RevealLines text="David (Hanmin) Chang" delay={0.25} />

          <motion.p {...fade(0.8)} className="hero-blurb">
            Hi, this is <span className="serif" style={{ fontSize: "1.25em", color: "var(--fg)" }}>David</span>, and welcome to my portfolio! Enjoy your stay, and happy holidays.
          </motion.p>

          <motion.div {...fade(0.9)} className="hero-actions">
            {[LINKS.github, LINKS.linkedin].map(l => (
              <Magnetic key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="chip" style={{ textDecoration: "none", padding: "9px 18px" }}>
                  {l.label} <span aria-hidden>↗</span>
                </a>
              </Magnetic>
            ))}
            <Magnetic>
              <button
                onClick={() => actions.copyEmail(LINKS.email.value)}
                className="chip"
                data-cursor="Copy"
                style={{ padding: "9px 18px", background: "var(--fg)", color: "var(--bg)", borderColor: "var(--fg)" }}
              >
                Email <span aria-hidden>⧉</span>
              </button>
            </Magnetic>
          </motion.div>
        </div>

        <div className="hero-portrait">
          <TiltPhoto />
        </div>
      </motion.div>

      {/* Bottom rail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="wrap hero-rail"
        style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "end", paddingBottom: 26 }}
      >
        <span style={{ fontSize: 11, color: "var(--subtle)", letterSpacing: "0.04em" }}>
          Vancouver, BC{time && <> · <span style={{ fontVariantNumeric: "tabular-nums" }}>{time}</span></>}
        </span>
        <button
          onClick={() => actions.scrollTo("experience")}
          aria-label="Scroll to content"
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
        >
          <span style={{ fontSize: 9, color: "var(--faint)", letterSpacing: "0.3em", textTransform: "uppercase" }}>Scroll</span>
          <span style={{ width: 1, height: 36, background: "var(--line-strong)", position: "relative", overflow: "hidden", display: "block" }}>
            <motion.span
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", inset: 0, background: "var(--fg)", display: "block" }}
            />
          </span>
        </button>
        <button
          onClick={() => actions.setPalette(true)}
          className="hero-rail-k"
          style={{ justifySelf: "end", background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "var(--subtle)", display: "flex", gap: 6, alignItems: "center" }}
        >
          Press <span className="kbd">⌘</span><span className="kbd">K</span> to explore
        </button>
      </motion.div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
          gap: 56px;
          padding-top: 124px;
          padding-bottom: 24px;
        }
        .hero-copy { min-width: 0; }

        /* Standfirst sits above the name, newspaper-style, on a hairline.
           --muted not --subtle: this 11px line lands on the brightest, least
           scrimmed part of the backdrop, where --subtle drops under 4.5:1. */
        .hero-standfirst {
          display: block;
          color: var(--muted);
          font-size: 11px;
          line-height: 1.7;
          padding-bottom: 14px;
          margin-bottom: 22px;
          border-bottom: 1px solid var(--line);
          text-transform: none;
          letter-spacing: 0.14em;
        }
        .hero-bucks {
          background: none; border: none; padding: 0; cursor: pointer; font: inherit;
          letter-spacing: inherit;
          color: var(--bucks); font-weight: 700;
          border-bottom: 1.5px dashed currentColor;
        }

        .hero-name {
          font-size: clamp(3.2rem, 9.5vw, 7.5rem);
          font-weight: 700;
          letter-spacing: -0.05em;
          line-height: 0.88;
        }
        /* overflow:hidden is what the reveal slides out of, so the band needs
           enough room under the baseline for descenders (the g in Chang) —
           the padding is cancelled by an equal negative margin. */
        .hero-name-line {
          display: block;
          overflow: hidden;
          padding-bottom: 0.22em;
          margin-bottom: -0.22em;
        }
        /* The parenthetical reads as a subhead, not a shout */
        .hero-name-line:nth-child(2) { padding-left: 0.08em; color: var(--muted); }

        .hero-blurb {
          font-size: clamp(15px, 1.4vw, 17px);
          color: var(--subtle);
          line-height: 1.7;
          max-width: 34ch;
          margin: 28px 0 30px;
        }
        .hero-actions { display: flex; gap: 10px; flex-wrap: wrap; }

        .hero-photo { width: clamp(240px, 26vw, 360px); aspect-ratio: 4 / 5; }
        .santa-hat {
          position: absolute; z-index: 2; pointer-events: none;
          width: 42%; left: -14%; top: -15%;
          transform-origin: 70% 80%;
          filter: drop-shadow(0 6px 10px rgba(0,0,0,0.25));
        }

        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 34px;
            align-items: start;
            padding-top: 112px;
            text-align: left;
          }
          .hero-portrait { order: -1; }
          .hero-photo { width: clamp(170px, 42vw, 230px); }
          .santa-hat { left: -6%; top: -14%; width: 38%; }
          .hero-blurb { margin: 22px 0 24px; }
          .hero-rail-k { display: none !important; }
        }
      `}</style>
    </section>
  );
}
