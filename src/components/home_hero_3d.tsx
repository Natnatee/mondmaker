"use client";

import Script from "next/script";

// ป้องกันปัญหา TypeScript กับ Web Component ของ Google <model-viewer>
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

export default function HomeHero3D() {
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
      />

      <model-viewer
        src="/3d-model/cheerful_robot.glb"
        alt="Cheerful Robot 3D Model by MondMaker"
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
        }}
      />
    </div>
  );
}
