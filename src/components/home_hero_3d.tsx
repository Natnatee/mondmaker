"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";

export default function HomeHero3D() {
  const [is_loaded, set_is_loaded] = useState(false);
  const [script_ready, set_script_ready] = useState(false);
  const [glitch_text, set_glitch_text] = useState("CONNECTING_NEURAL_LINK...");
  const viewer_ref = useRef<HTMLElement | null>(null);

  // เปลี่ยนข้อความสำหรับธีม Clean Tech ฟ้า-ขาว
  useEffect(() => {
    if (is_loaded) return;
    const texts = [
      "ESTABLISHING_DATA_LINK...",
      "INITIALIZING_3D_ENGINE...",
      "LOADING_MESH_GEOMETRY...",
      "OPTIMIZING_TEXTURES...",
      "ENGAGING_3D_CANVAS..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      set_glitch_text(texts[i]);
    }, 1000);
    return () => clearInterval(interval);
  }, [is_loaded]);

  // ตรวจจับว่า model-viewer script โหลดเสร็จหรือยัง (กรณีกลับมาหน้านี้หลังจากเปลี่ยนหน้า)
  useEffect(() => {
    if (typeof window === "undefined") return;

    let is_active = true;

    if (window.customElements?.get("model-viewer")) {
      set_script_ready(true);
    } else {
      window.customElements?.whenDefined("model-viewer").then(() => {
        if (is_active) {
          set_script_ready(true);
        }
      });
    }

    return () => {
      is_active = false;
    };
  }, []);

  useEffect(() => {
    if (!script_ready) return;

    const el = viewer_ref.current;
    if (!el) return;

    const handle_load = () => set_is_loaded(true);

    el.addEventListener("load", handle_load);

    if ((el as any).loaded) {
      set_is_loaded(true);
    }

    return () => el.removeEventListener("load", handle_load);
  }, [script_ready]);

  return (
    <div
      style={{
        width: "100%",
        height: "450px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* โหลดสคริปต์ของ model-viewer จาก CDN */}
      <Script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"
        strategy="afterInteractive"
        onLoad={() => set_script_ready(true)}
      />

      {/* ธีม Clean Tech ฟ้า-ขาว */}
      {!is_loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(2, 132, 199, 0.15)",
            borderRadius: "var(--radius-lg)",
            fontFamily: "var(--font-mono, monospace)",
            padding: "20px",
            boxShadow: "0 10px 30px rgba(2, 132, 199, 0.05)",
          }}
        >
          {/* ส่วนแสดงสัญลักษณ์แบบ Minimal Sci-Fi */}
          <div
            style={{
              position: "relative",
              marginBottom: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* วงแหวนสะท้อนแสงสีฟ้าอ่อน */}
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                border: "2px solid rgba(2, 132, 199, 0.08)",
                position: "absolute",
              }}
            />
            {/* เส้นสแกนเรดาร์สีฟ้า */}
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                border: "2px solid transparent",
                borderTop: "2px solid #0284c7",
                borderRight: "2px solid #38bdf8",
                position: "absolute",
                animation: "clean_spin 1.2s cubic-bezier(0.5, 0.1, 0.1, 0.9) infinite",
              }}
            />
            {/* จุดศูนย์กลางกะพริบเบาๆ */}
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#0284c7",
                boxShadow: "0 0 10px rgba(2, 132, 199, 0.6)",
                animation: "clean_pulse 1.5s ease-in-out infinite",
              }}
            />
          </div>

          {/* ข้อความ Clean Tech */}
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <div
              style={{
                fontSize: "0.8rem",
                color: "#0284c7",
                fontWeight: 700,
                letterSpacing: "4px",
                animation: "text_flicker 2s infinite",
              }}
            >
              [ SYSTEM_CORE: ONLINE ]
            </div>

            <div
              style={{
                fontSize: "0.75rem",
                color: "#64748b",
                letterSpacing: "1px",
                fontWeight: 500,
              }}
            >
              {glitch_text}
              <span className="blinking-cursor">_</span>
            </div>
          </div>

          {/* ตกแต่งมุมกรอบสไตล์ Clean Lab */}
          <div style={{ position: "absolute", top: "12px", left: "12px", width: "10px", height: "10px", borderTop: "2px solid #0284c7", borderLeft: "2px solid #0284c7", opacity: 0.5 }} />
          <div style={{ position: "absolute", top: "12px", right: "12px", width: "10px", height: "10px", borderTop: "2px solid #0284c7", borderRight: "2px solid #0284c7", opacity: 0.5 }} />
          <div style={{ position: "absolute", bottom: "12px", left: "12px", width: "10px", height: "10px", borderBottom: "2px solid #0284c7", borderLeft: "2px solid #0284c7", opacity: 0.5 }} />
          <div style={{ position: "absolute", bottom: "12px", right: "12px", width: "10px", height: "10px", borderBottom: "2px solid #0284c7", borderRight: "2px solid #0284c7", opacity: 0.5 }} />
        </div>
      )}

      {/* model-viewer - ซ่อนจนกว่าจะโหลดเสร็จ */}
      <model-viewer
        ref={viewer_ref as any}
        src="/3d-model/360_sphere_robot (1).glb"
        alt="360 Sphere Robot 3D Model by MondMaker"
        loading="eager"
        reveal="auto"
        auto-rotate
        autoplay
        camera-controls
        disable-zoom
        touch-action="none"
        shadow-intensity="1.5"
        shadow-softness="0.6"
        camera-orbit="0deg 75deg 105%"
        min-camera-orbit="auto auto auto"
        max-camera-orbit="auto auto auto"
        style={{
          width: "100%",
          height: "100%",
          outline: "none",
          "--poster-color": "transparent",
          opacity: is_loaded ? 1 : 0,
          transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        } as React.CSSProperties}
      />

      {/* CSS Animations */}
      <style>{`
        @keyframes clean_spin {
          to { transform: rotate(360deg); }
        }
        @keyframes clean_pulse {
          0%, 100% { transform: scale(0.85); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes text_flicker {
          0%, 100% { opacity: 0.8; }
          45%, 55% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .blinking-cursor {
          animation: cursor_blink 0.8s infinite;
        }
        @keyframes cursor_blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
