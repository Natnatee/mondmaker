import { ImageResponse } from "next/og";
import raw_projects_data from "@/data/projects_data.json";

export const alt = "MondMaker Website Demos — ideas you can actually explore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const demo_count = raw_projects_data.filter((project) => project.tags.includes("Demo")).length;

  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "68px 75px", background: "#0c172b", color: "#ffffff", position: "relative", overflow: "hidden" }}>
      <div style={{ display: "flex", position: "absolute", top: -140, right: -85, width: 620, height: 620, border: "1px solid #6297dc55", borderRadius: 620, background: "#19355b" }} />
      <div style={{ display: "flex", position: "absolute", top: -50, right: 35, width: 390, height: 390, border: "1px solid #a8ebff80", borderRadius: 390, background: "#284775" }} />
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", position: "relative", alignItems: "center" }}>
        <span style={{ fontSize: 28, fontWeight: 800 }}>MondMaker<span style={{ color: "#9fe8ff" }}>✳</span></span>
        <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: 3, color: "#b8d2ed" }}>{String(demo_count).padStart(2, "0")} LIVE CONCEPTS</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
        <span style={{ fontSize: 84, lineHeight: 1.05, fontWeight: 800, letterSpacing: -4 }}>Ideas you can</span>
        <span style={{ fontSize: 84, lineHeight: 1.05, fontWeight: 800, letterSpacing: -4, color: "#a8ebff" }}>actually explore.</span>
        <span style={{ fontSize: 26, color: "#d6e5f4", marginTop: 22 }}>Website demos built to be seen. And tried.</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", position: "relative", borderTop: "1px solid #ffffff50", paddingTop: 22, width: "100%", color: "#b8d2ed", fontSize: 17, letterSpacing: 2 }}>
        <span>FOOD / TRAVEL / DESIGN / TECH / MORE</span>
        <span>DEMO COLLECTION ↗</span>
      </div>
    </div>,
    { ...size },
  );
}
