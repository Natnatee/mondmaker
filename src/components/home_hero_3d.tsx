"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";

export default function HomeHero3D() {
  const [is_loaded, set_is_loaded] = useState(false);
  const [script_ready, set_script_ready] = useState(false);
  const viewer_ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!script_ready) return;

    const el = viewer_ref.current;
    if (!el) return;

    const handle_load = () => set_is_loaded(true);

    // model-viewer fires 'load' when the 3D model is ready
    el.addEventListener("load", handle_load);

    // In case it already loaded before listener attached
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
      }}
    >
      {/* โหลดสคริปต์ของ model-viewer จาก CDN */}
      <Script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"
        strategy="afterInteractive"
        onLoad={() => set_script_ready(true)}
      />

      {/* Loading Skeleton - แสดงระหว่างรอโมเดลโหลด */}
      {!is_loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            zIndex: 2,
          }}
        >
          {/* Pulsing robot silhouette */}
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(2,132,199,0.15) 0%, transparent 70%)",
              animation: "hero3d_pulse 2s ease-in-out infinite",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Spinning ring */}
            <div
              style={{
                width: "60px",
                height: "60px",
                border: "3px solid rgba(2,132,199,0.1)",
                borderTopColor: "var(--accent-1, #0284c7)",
                borderRadius: "50%",
                animation: "hero3d_spin 1s linear infinite",
              }}
            />
          </div>
          <span
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted, #94a3b8)",
              fontWeight: 500,
              letterSpacing: "0.05em",
              animation: "hero3d_fade_text 2s ease-in-out infinite",
            }}
          >
            กำลังโหลดโมเดล 3D...
          </span>
        </div>
      )}

      {/* model-viewer - ซ่อนจนกว่าจะโหลดเสร็จ */}
      <model-viewer
        ref={viewer_ref as any}
        src="/3d-model/cheerful_robot.glb"
        alt="Cheerful Robot 3D Model by MondMaker"
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
          transition: "opacity 0.6s ease-in-out",
        } as React.CSSProperties}
      />

      {/* Keyframe animations */}
      <style>{`
        @keyframes hero3d_pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes hero3d_spin {
          to { transform: rotate(360deg); }
        }
        @keyframes hero3d_fade_text {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
