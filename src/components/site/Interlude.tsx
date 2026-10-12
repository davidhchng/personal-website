"use client";

import { motion } from "framer-motion";
import Marquee from "./Marquee";
import { RIDGE } from "@/lib/ridge";

// The source. RidgeHorizon has been drawing this skyline as a line all the way
// down the page; here the photo it was traced from finally appears, and the
// trace draws itself back on top — landing exactly on the real ridge, because
// both use the photo's own coordinate space.
export default function Interlude({ items }: { items: string[] }) {
  return (
    <section className="interlude" aria-hidden>
      <svg
        className="interlude-svg"
        viewBox={`0 0 ${RIDGE.viewW} ${RIDGE.viewH}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <image
          href="/v/mountains.jpg"
          width={RIDGE.viewW}
          height={RIDGE.viewH}
          preserveAspectRatio="none"
        />
        {/* Dark underlay first: the crest runs against bright hazy sky, so a white
            line alone disappears. The shadow gives it an edge to read against. */}
        <motion.path
          d={RIDGE.path}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ filter: "drop-shadow(0 0 3px rgba(0,0,0,0.65))" }}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ pathLength: { duration: 1.8, ease: [0.2, 0.7, 0.2, 1] }, opacity: { duration: 0.3 } }}
        />
      </svg>

      <div className="interlude-scrim" />

      <div className="interlude-marquee">
        <Marquee items={items} />
      </div>

      <style>{`
        .interlude {
          position: relative;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          height: clamp(380px, 62vh, 620px);
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          margin-top: 120px;
          background: var(--bg-sunk);
        }
        .interlude-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .interlude-scrim {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to bottom, rgba(13,20,26,0.30) 0%, rgba(13,20,26,0) 26%),
            linear-gradient(to top, rgba(13,20,26,0.88) 0%, rgba(13,20,26,0.45) 18%, rgba(13,20,26,0) 44%);
        }
        /* Re-point the tokens Marquee reads so it sits legibly on the photo */
        .interlude-marquee {
          position: relative;
          width: 100%;
          --fg: #FFFFFF;
          --faint: rgba(255, 255, 255, 0.72);
          --line: rgba(255, 255, 255, 0.16);
          --accent: #8FD8E4;
          text-shadow: 0 1px 14px rgba(0, 0, 0, 0.45);
        }
        @media (max-width: 640px) {
          .interlude { margin-top: 88px; }
        }
      `}</style>
    </section>
  );
}
