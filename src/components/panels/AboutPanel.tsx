"use client";

export default function AboutPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">David Chang</h2>
        <p className="text-white/45 text-xs tracking-wide">Statistics · University of British Columbia · Langley, BC</p>
      </div>

      <p className="text-white/70 text-sm leading-relaxed">
        Statistics undergraduate at UBC interested in data science education and reproducible
        analytical workflows. I build end-to-end data pipelines, lead workshops, and help
        newcomers learn practical tools like version control, data analysis, and collaborative
        research practices.
      </p>

      <p className="text-white/70 text-sm leading-relaxed">
        I drive a white 2011 Mitsubishi Lancer ES and I&apos;m not sorry about it.
      </p>

      <div className="border-t border-white/10 pt-5 space-y-3">
        <p className="text-white/30 text-[10px] tracking-widest uppercase">Education</p>
        <div className="flex justify-between items-baseline">
          <div>
            <p className="text-white/80 text-sm font-medium">B.Sc. Statistics</p>
            <p className="text-white/40 text-xs mt-0.5">University of British Columbia</p>
          </div>
          <span className="text-white/30 text-xs flex-shrink-0 ml-4">Expected May 2028</span>
        </div>
        <div className="space-y-1 pt-1">
          <p className="text-white/50 text-xs">Joseph Chung Scholarship — $5,000</p>
          <p className="text-white/50 text-xs">BC Achievement Scholarship — $1,250</p>
        </div>
      </div>

      <div className="border-t border-white/10 pt-5 space-y-2">
        <p className="text-white/30 text-[10px] tracking-widest uppercase">Currently</p>
        <p className="text-white/55 text-xs leading-relaxed">
          Technical Director @ UBC Undergraduate Statistics Society
        </p>
        <p className="text-white/55 text-xs leading-relaxed">
          Web Development & Event Lead @ UBC STEM Fellowship
        </p>
      </div>
    </div>
  );
}
