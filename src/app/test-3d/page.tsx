"use client";

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// หลีกเลี่ยงข้อผิดพลาดของ TypeScript เมื่อใช้ Web Component <model-viewer> ใน JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

// รายการโมเดลทดสอบ
const test_models = [
  {
    name: "Astronaut (โมเดลตัวอย่างออนไลน์จาก Google)",
    url: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
  },
  {
    name: "Robot Dance (4.2 MB - แนะนำ)",
    url: "/3d-model/robot_dance.glb",
  },
  {
    name: "Cheerful Robot (8.8 MB)",
    url: "/3d-model/cheerful_robot.glb",
  },
  {
    name: "360 Sphere Robot (1.0 MB)",
    url: "/3d-model/360_sphere_robot (1).glb",
  },
  {
    name: "Reap the Whirlwind (87.4 MB - ไฟล์ขนาดใหญ่มาก ระวังกระตุก!)",
    url: "/3d-model/reap_the_whirlwind.glb",
  },
];

export default function Test3DPage() {
  const [selected_model, set_selected_model] = useState(test_models[0]);
  const [is_rotating, set_is_rotating] = useState(true);
  const [animation_active, set_animation_active] = useState(true);

  return (
    <div className="page-wrapper">
      {/* โหลดสคริปต์ของ model-viewer จาก Google CDN */}
      <Script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"
        strategy="afterInteractive"
      />

      <Navbar />

      <section className="section" style={{ paddingTop: "calc(var(--space-4xl) + 40px)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">// 3D Testing Lab</span>
            <h2 className="section-title">ห้องทดสอบโมเดล 3D แบบโต้ตอบ</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "var(--space-2xl)",
              alignItems: "start",
            }}
          >
            {/* ── ส่วนแสดงผลโมเดล 3D ── */}
            <div
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-md)",
                boxShadow: "var(--shadow-card)",
                height: "550px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* model-viewer Component */}
              <model-viewer
                src={selected_model.url}
                alt="MondMaker Interactive 3D Model Viewer"
                ar
                camera-controls
                touch-action="pan-y"
                auto-rotate={is_rotating ? "" : undefined}
                autoplay={animation_active ? "" : undefined}
                shadow-intensity="1"
                shadow-softness="0.5"
                style={{
                  width: "100%",
                  height: "100%",
                  background: "radial-gradient(circle, #f8fafc 0%, #e2e8f0 100%)",
                  borderRadius: "var(--radius-md)",
                }}
              />
            </div>

            {/* ── ส่วนแผงควบคุม (Settings Sidebar) ── */}
            <div
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-xl)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <h3 style={{ marginBottom: "var(--space-md)", fontWeight: 700 }}>
                แผงควบคุมโมเดล
              </h3>

              {/* เลือกโมเดล */}
              <div style={{ marginBottom: "var(--space-lg)" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                    marginBottom: "var(--space-xs)",
                  }}
                >
                  เลือกโมเดล 3D
                </label>
                <select
                  value={selected_model.url}
                  onChange={(e) => {
                    const found = test_models.find((m) => m.url === e.target.value);
                    if (found) set_selected_model(found);
                  }}
                  style={{
                    width: "100%",
                    padding: "var(--space-sm) var(--space-md)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-subtle)",
                    backgroundColor: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  {test_models.map((model) => (
                    <option key={model.url} value={model.url}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* การหมุนโมเดล */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "var(--space-md)",
                }}
              >
                <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  หมุนโมเดลอัตโนมัติ
                </span>
                <button
                  onClick={() => set_is_rotating(!is_rotating)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid var(--border-subtle)",
                    backgroundColor: is_rotating ? "var(--accent-1)" : "var(--bg-primary)",
                    color: is_rotating ? "#ffffff" : "var(--text-primary)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all var(--transition-fast)",
                  }}
                >
                  {is_rotating ? "เปิดอยู่" : "ปิดอยู่"}
                </button>
              </div>

              {/* สลับ Animation */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "var(--space-xl)",
                }}
              >
                <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  เล่นอนิเมชัน (เช่น ท่าเต้น)
                </span>
                <button
                  onClick={() => set_animation_active(!animation_active)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid var(--border-subtle)",
                    backgroundColor: animation_active ? "var(--accent-1)" : "var(--bg-primary)",
                    color: animation_active ? "#ffffff" : "var(--text-primary)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all var(--transition-fast)",
                  }}
                >
                  {animation_active ? "เล่น" : "หยุด"}
                </button>
              </div>

              <div
                style={{
                  padding: "var(--space-md)",
                  backgroundColor: "rgba(2, 132, 199, 0.05)",
                  border: "1px solid var(--border-accent)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                }}
              >
                <strong style={{ color: "var(--accent-1)", display: "block", marginBottom: "4px" }}>
                  💡 แนะนำวิธีทดสอบ:
                </strong>
                1. ก๊อปปี้ไฟล์โมเดลหุ่นยนต์ 3D ของคุณที่มีนามสกุล <code>.glb</code><br />
                2. นำไปวางในเครื่องที่โฟลเดอร์ <code>public/3d-model/</code><br />
                3. ตั้งชื่อไฟล์ว่า <code>robot.glb</code><br />
                4. สลับตัวเลือกโมเดลด้านบนเป็น <strong>Robot</strong> เพื่อดูการทำงานจริงได้ทันทีครับ!
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "var(--space-3xl)" }}>
            <Link href="/" style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
              ← กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
