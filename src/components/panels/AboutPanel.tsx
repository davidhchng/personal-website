"use client";

export default function AboutPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1" style={{ color: "#1D1D1F" }}>David Chang</h2>
        <p className="text-xs tracking-wide" style={{ color: "#86868B" }}>Statistics · University of British Columbia · Langley, BC</p>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>
        Statistics undergraduate at UBC interested in data science education and reproducible
        analytical workflows. I build end-to-end data pipelines, lead workshops, and help
        newcomers learn practical tools like version control, data analysis, and collaborative
        research practices.
      </p>

      <div className="pt-5 space-y-3" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <p className="text-[10px] tracking-widest uppercase" style={{ color: "#86868B" }}>Education</p>
        <div className="flex justify-between items-baseline">
          <div>
            <p className="text-sm font-medium" style={{ color: "#1D1D1F" }}>B.Sc. Statistics</p>
            <p className="text-xs mt-0.5" style={{ color: "#86868B" }}>University of British Columbia</p>
          </div>
          <span className="text-xs flex-shrink-0 ml-4" style={{ color: "#86868B" }}>Expected May 2028</span>
        </div>
        <div className="space-y-1 pt-1">
          <p className="text-xs" style={{ color: "#6E6E73" }}>Joseph Chung Scholarship — $5,000</p>
          <p className="text-xs" style={{ color: "#6E6E73" }}>BC Achievement Scholarship — $1,250</p>
        </div>
      </div>

      <div className="pt-5 space-y-2" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <p className="text-[10px] tracking-widest uppercase" style={{ color: "#86868B" }}>Currently</p>
        <p className="text-xs leading-relaxed" style={{ color: "#6E6E73" }}>
          Technical Director @ UBC Undergraduate Statistics Society
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "#6E6E73" }}>
          Web Development & Event Lead @ UBC STEM Fellowship
        </p>
      </div>
    </div>
  );
}
