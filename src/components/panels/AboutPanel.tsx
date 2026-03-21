"use client";

// ─── AboutPanel ───────────────────────────────────────────────────────────────
// Revealed when the trunk opens.
//
// TO REPLACE: update the bio text, name, role, and any links below.
// ─────────────────────────────────────────────────────────────────────────────

export default function AboutPanel() {
  return (
    <div>
      {/* ← REPLACE: your name and title */}
      <h2 className="text-xl font-semibold text-white mb-2 leading-tight">
        David Chang
      </h2>
      <p className="text-white/40 text-sm mb-8 tracking-wide">
        Software Engineer {/* ← REPLACE: your role */}
      </p>

      {/* ← REPLACE: your bio. Keep it short — this is a panel, not a page. */}
      <p className="text-white/70 text-sm leading-relaxed mb-6">
        I build things for the web and occasionally for fun. Currently working on
        problems in [domain]. Previously at [company/school]. I drive a white 2011
        Mitsubishi Lancer ES and I&apos;m not sorry about it.
      </p>

      <p className="text-white/70 text-sm leading-relaxed">
        Outside of code: [hobbies, interests — make it human].
      </p>

      {/* Divider */}
      <div className="border-t border-white/10 mt-8 pt-6">
        <p className="text-white/30 text-xs tracking-widest uppercase mb-4">
          Currently
        </p>
        {/* ← REPLACE: what you're working on right now */}
        <p className="text-white/50 text-sm">
          Building [current project or role] — [one sentence on what it is].
        </p>
      </div>
    </div>
  );
}
