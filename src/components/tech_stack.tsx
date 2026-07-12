"use client";

import { useState } from "react";

interface Skill {
  name: string;
  logo: string;
}

interface TechCategory {
  category: string;
  skills: Skill[];
}

// ── ข้อมูลเฉพาะทางฝั่ง IoT & MCU (ใช้โลโก้สถาปัตยกรรมชิปและค่ายผู้ผลิตที่เป็นทางการ) ──
const iot_hardware: Skill[] = [
  { name: "ESP32 (C3/C6 / S3-CAM)", logo: "https://cdn.simpleicons.org/espressif/E02E2B" },
  { name: "STM32 (F103C6T6 / F401C6T6)", logo: "https://cdn.simpleicons.org/stmicroelectronics/032347" },
  { name: "CH32V003 (RISC-V MCU)", logo: "https://cdn.simpleicons.org/riscv/F12821" }, // โลโก้ RISC-V สีส้มทางการ
  { name: "PY32F002A (ARM Cortex-M0+)", logo: "https://cdn.simpleicons.org/arm/0091BA" }, // โลโก้ ARM ทางการ
  { name: "Raspberry Pi 4 Model B", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
  { name: "Orange Pi Zero 2W (SBC)", logo: "" } // Fallback to 🍊
];

const iot_protocols: Skill[] = [
  { name: "MQTT & WebSockets", logo: "https://cdn.simpleicons.org/mqtt/660066" },
  { name: "ESP-NOW", logo: "https://cdn.simpleicons.org/espressif/E02E2B" }, // ใช้โลโก้ Espressif ผู้คิดค้นโปรโตคอลนี้
  { name: "Bluetooth Low Energy (BLE)", logo: "https://cdn.simpleicons.org/bluetooth/0082FC" },
  { name: "Thread / Matter", logo: "https://cdn.simpleicons.org/matter/E60028" },
  { name: "HTTPS", logo: "https://cdn.simpleicons.org/letsencrypt/003A70" } // ใช้โลโก้ Let's Encrypt ผู้ออกใบรับรอง SSL/HTTPS หลัก
];

const iot_tools: Skill[] = [
  { name: "PlatformIO / Arduino IDE", logo: "https://cdn.simpleicons.org/arduino/00979D" },
  { name: "STM32Cube (MX / IDE)", logo: "https://cdn.simpleicons.org/stmicroelectronics/032347" }, // โลโก้ STMicroelectronics ค่ายแม่
  { name: "Keil uVision5", logo: "https://cdn.simpleicons.org/arm/0091BA" } // โลโก้ ARM บริษัทแม่ของ Keil
];

// ── ข้อมูลภาพรวมหมวดหมู่อื่นๆ ──
const other_tech_categories: TechCategory[] = [
  {
    category: "AI & Computer Vision",
    skills: [
      { name: "Acoustic ML (CNN/HeAR)", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "OpenCV", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
      { name: "MediaPipe (Hand/Pose)", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Speech AI (Whisper/Vosk)", logo: "" }
    ]
  },
  {
    category: "Full-Stack Web Development",
    skills: [
      { name: "Next.js / React (TypeScript)", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "FastAPI / Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "Node.js (Express)", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "PostgreSQL & SQLite (Turso)", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Drizzle ORM & Supabase", logo: "https://cdn.simpleicons.org/supabase/3ECF8E" }
    ]
  },
  {
    category: "DevOps & Automation",
    skills: [
      { name: "Docker & Docker Compose", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "n8n Workflow Automation", logo: "https://cdn.simpleicons.org/n8n/FF6C37" },
      { name: "GitHub Actions (CI/CD)", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Cloudflare & Nginx Proxy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg" },
      { name: "Linux Server (Ubuntu)", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" }
    ]
  }
];

function TechIcon({ name, src }: { name: string; src: string }) {
  const [error, setError] = useState(false);

  // ตรรกะคุมฟิลเตอร์เปลี่ยนสีให้กับม้วนเส้นพลาสติก
  const getFilamentStyle = (techName: string) => {
    const lower = techName.toLowerCase();
    if (lower.includes("pla")) return { filter: "hue-rotate(330deg) saturate(1.8)" }; // สีส้มแดงสะดุดตา
    if (lower.includes("petg")) return { filter: "hue-rotate(120deg) saturate(1.6)" }; // สีเขียวโปร่งแสง
    if (lower.includes("tpu")) return { filter: "hue-rotate(45deg) saturate(2)" }; // สีเหลืองสดใส
    if (lower.includes("pc")) return { filter: "grayscale(100%) brightness(1.4)" }; // สีขาวใสเกรดวิศวกรรม
    return undefined;
  };

  const getEmoji = (tech: string) => {
    const lower = tech.toLowerCase();
    if (lower.includes("mqtt") || lower.includes("websocket") || lower.includes("esp-now") || lower.includes("thread") || lower.includes("matter")) return "📡";
    if (lower.includes("speech") || lower.includes("whisper")) return "🎙️";
    if (lower.includes("orcaslicer")) return "🐋"; // ใช้ปลาวาฬเพชฌฆาตสำหรับ OrcaSlicer
    if (lower.includes("fusion") || lower.includes("autodesk") || lower.includes("cad")) return "📐"; // ไม้บรรทัดสามเหลี่ยมสำหรับออกแบบ CAD
    if (lower.includes("3d") || lower.includes("printing") || lower.includes("slicer") || lower.includes("keil") || lower.includes("uvision")) return "🛠️";
    if (lower.includes("supabase") || lower.includes("drizzle")) return "⚡";
    if (lower.includes("n8n")) return "🤖";
    if (lower.includes("esp32") || lower.includes("stm32") || lower.includes("ch32") || lower.includes("py32")) return "🔌";
    if (lower.includes("raspberry")) return "🍓";
    if (lower.includes("orange")) return "🍊";
    if (lower.includes("bluetooth") || lower.includes("ble")) return "🔵";
    if (lower.includes("wifi") || lower.includes("network")) return "📶";
    if (lower.includes("https") || lower.includes("ssl")) return "🔒";
    if (lower.includes("cube") || lower.includes("stm32cube")) return "💻";
    
    // 3D Printing Emojis
    if (lower.includes("pla") || lower.includes("petg") || lower.includes("tpu") || lower.includes("pc") || lower.includes("filament")) return "🧵";
    if (lower.includes("ศิลป์") || lower.includes("ตกแต่ง")) return "🎨";
    if (lower.includes("อะไหล่") || lower.includes("กลไก")) return "⚙️";
    if (lower.includes("เคส") || lower.includes("กล่องหุ้ม")) return "📦";
    return "⚙️";
  };

  const filamentStyle = getFilamentStyle(name);

  if (error || !src) {
    return (
      <span 
        style={{ 
          fontSize: "1.05rem", 
          display: "inline-flex", 
          alignItems: "center", 
          justifyContent: "center", 
          width: "20px", 
          height: "20px",
          ...filamentStyle // ใส่สีสันให้กับม้วนเส้นพลาสติก
        }}
      >
        {getEmoji(name)}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={`${name} icon`}
      className="tech-icon"
      onError={() => setError(true)}
    />
  );
}

export default function TechStack({ category }: { category?: string }) {
  let display_stacks: TechCategory[] = [];
  let section_title = "ทักษะและความเชี่ยวชาญ";
  let section_label = "// Technical Expertise";

  if (category === "smart-iot") {
    // ── ฝั่ง IoT หน้าเจาะลึก: จัดกลุ่มเป็น 3 การ์ดใหญ่ (Hardware, Protocol, Tool) ──
    display_stacks = [
      { category: "Hardware", skills: iot_hardware },
      { category: "Protocol", skills: iot_protocols },
      { category: "Tool", skills: iot_tools }
    ];
    section_title = "เทคโนโลยี IoT & Embedded Systems";
    section_label = "// IoT Spec Categories";
  } else if (category === "web-automation") {
    display_stacks = other_tech_categories;
    section_title = "เครื่องมือและซอฟต์แวร์ที่เกี่ยวข้อง";
    section_label = "// Software & AI Tech Stack";
  } else if (category === "3d-printing") {
    // ── ฝั่ง 3D Printing: จัดกลุ่มเป็น 3 การ์ดหลัก (Filament, Tool, Production Work) ──
    const print_filaments = [
      { name: "PLA / PLA+ (งานโครงสร้างทั่วไป)", logo: "" }, // ส่งว่างเพื่อให้แสดงผลม้วนเส้นด้ายเปลี่ยนสี
      { name: "PETG (เหนียว ทนความร้อน/สารเคมี)", logo: "" },
      { name: "TPU (พลาสติกยาง ยืดหยุ่นทนแรงบิด)", logo: "" },
      { name: "PC (ทนความร้อนสูงและแรงกระแทกขั้นสุด)", logo: "" }
    ];
    
    const print_tools = [
      { name: "Autodesk Fusion 360 (CAD)", logo: "" }, // Fallback to 📐 (ไม้บรรทัดสามเหลี่ยมเขียนแบบ)
      { name: "Blender (3D Case Modeling)", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
      { name: "OrcaSlicer (G-code Generator)", logo: "" } // Fallback to 🐋 (ปลาวาฬเพชฌฆาต)
    ];

    const print_works = [
      { name: "งานโมเดลตกแต่งและศิลปกรรมสร้างสรรค์", logo: "" },
      { name: "ชิ้นส่วนและอะไหล่กลไกเกรดวิศวกรรม", logo: "" },
      { name: "เคสและกล่องหุ้มอุปกรณ์อิเล็กทรอนิกส์", logo: "" }
    ];

    display_stacks = [
      { category: "Filament", skills: print_filaments },
      { category: "Tool", skills: print_tools },
      { category: "Production Work", skills: print_works }
    ];
    section_title = "เทคโนโลยีและการขึ้นรูปชิ้นงาน 3D";
    section_label = "// 3D Printing Categories";
  } else {
    // ── หน้าแรก (ภาพรวมทั้งหมด): ดึงตัวแทนทักษะเด่นๆ ──
    const iot_overview_skills = [
      { name: "ESP32 & STM32 MCUs", logo: "https://cdn.simpleicons.org/espressif/E02E2B" },
      { name: "Raspberry Pi & Orange Pi", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
      { name: "PlatformIO / Keil uVision5", logo: "https://cdn.simpleicons.org/arduino/00979D" },
      { name: "MQTT & ESP-NOW Protocols", logo: "https://cdn.simpleicons.org/mqtt/660066" },
      { name: "Thread / Matter & BLE", logo: "https://cdn.simpleicons.org/matter/E60028" }
    ];

    display_stacks = [
      { category: "Smart IoT & Embedded", skills: iot_overview_skills },
      ...other_tech_categories
    ];
  }

  return (
    <section className="tech-stack-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{section_label}</span>
          <h2 className="section-title">{section_title}</h2>
        </div>

        <div className="tech-stack-grid">
          {display_stacks.map((cat, catIdx) => (
            <div key={catIdx} className="tech-stack-category">
              <h3 className="tech-stack-category-title">
                {cat.category}
                <span className="title-accent">// 0{catIdx + 1}</span>
              </h3>
              <div className="tech-stack-list">
                {cat.skills.map((skill, skillIdx) => (
                  <div key={skillIdx} className="tech-item">
                    <TechIcon name={skill.name} src={skill.logo} />
                    <span className="tech-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
