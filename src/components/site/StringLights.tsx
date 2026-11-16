// A strand of fairy lights hung along the underside of the nav. Pure SVG + CSS:
// each segment is one sag of wire with a bulb at its low point, repeated past
// the widest screen and clipped. Bulbs twinkle on staggered delays.
const COLORS = ["#E23B4A", "#F2C14E", "#3FA36B", "#4F8FE0"];
const SEGMENTS = 48;

export default function StringLights() {
  return (
    <div aria-hidden className="lights">
      {Array.from({ length: SEGMENTS }, (_, i) => {
        const c = COLORS[i % COLORS.length];
        return (
          <svg key={i} width="64" height="26" viewBox="0 0 64 26" className="lights-seg">
            <path d="M0 2 Q32 14 64 2" fill="none" stroke="var(--fg)" strokeOpacity="0.35" strokeWidth="1.2" />
            <rect x="29.5" y="7" width="5" height="4" rx="1" fill="var(--fg)" fillOpacity="0.45" />
            <ellipse
              className="lights-bulb"
              cx="32" cy="16" rx="3.6" ry="5.4"
              fill={c}
              style={{ color: c, animationDelay: `${(i * 0.37) % 2.4}s` }}
            />
          </svg>
        );
      })}
      <style>{`
        .lights {
          position: absolute; top: 100%; left: 0; right: 0; height: 26px;
          display: flex; overflow: hidden; pointer-events: none;
        }
        .lights-seg { flex-shrink: 0; overflow: visible; }
        .lights-bulb {
          filter: drop-shadow(0 0 4px currentColor);
          animation: twinkle 2.4s ease-in-out infinite;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; filter: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lights-bulb { animation: none; }
        }
      `}</style>
    </div>
  );
}
