import type { CSSProperties, ReactNode } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": {
        src?: string;
        alt?: string;
        ar?: boolean | string;
        "camera-controls"?: boolean | string;
        "touch-action"?: string;
        "auto-rotate"?: boolean | string;
        autoplay?: boolean | string;
        "shadow-intensity"?: string;
        "shadow-softness"?: string;
        "camera-orbit"?: string;
        "min-camera-orbit"?: string;
        "max-camera-orbit"?: string;
        "disable-zoom"?: boolean | string;
        style?: CSSProperties;
        children?: ReactNode;
        className?: string;
        id?: string;
      } & Record<string, unknown>;
    }
  }
}
