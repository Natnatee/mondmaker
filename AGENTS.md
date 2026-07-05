<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# MondMaker Workspace Rules

กฎระเบียบและมาตรฐานการเขียนโค้ดสำหรับโปรเจกต์ MondMaker ที่ AI Agent ทุกตัวต้องปฏิบัติตามอย่างเคร่งครัด:

## 🏷️ มาตรฐานการตั้งชื่อ (Naming Conventions)
*   **ชื่อโฟลเดอร์ (Folder Names)**: ใช้ **Kebab-case** เสมอ (คั่นด้วยเครื่องหมายขีดกลาง `-`)
    *   *ตัวอย่าง*: `smart-iot`, `web-automation`, `components`
*   **ชื่อไฟล์ (File Names)**: ใช้ **Snake-case** เสมอ (คั่นด้วยเครื่องหมายขีดล่าง `_`)
    *   *ตัวอย่าง*: `project_card.tsx`, `navbar.tsx`, `projects_data.json`
*   **ชื่อตัวแปรและฟังก์ชัน (Variables & Functions)**: ใช้ **Snake-case** เสมอ (คั่นด้วยเครื่องหมายขีดล่าง `_`)
    *   *ตัวอย่าง*: `const project_list = [...]`, `function get_tag_class() {}`
*   **ชื่อ React Components**: ใช้ **PascalCase** ตามมาตรฐานของ React (เพื่อให้คอมไพเลอร์รู้ว่าเป็น Component) แต่ชื่อไฟล์ของ Component นั้นต้องเป็น Snake-case
    *   *ตัวอย่าง*: Component ชื่อ `ProjectCard` แต่อยู่ในไฟล์ `project_card.tsx`

## 🎨 สไตล์และการจัดแต่งหน้าจอ (Styling Rules)
*   **ใช้ Vanilla CSS เท่านั้น**: ห้ามใช้ Tailwind CSS (เว้นแต่ผู้ใช้จะสั่งเปลี่ยนในอนาคต)
*   ใช้ไฟล์ `src/app/globals.css` สำหรับเก็บตัวแปร CSS Variables, Design System Tokens และ Core CSS หลัก
*   จัดลำดับความลื่นไหลและเอฟเฟกต์ (Micro-animations, Glassmorphism, 3D Tilt) ให้ดูหรูหราพรีเมียมเสมอ

## 💾 การจัดการข้อมูล (Data Management)
*   **No Database & Auth for Phase 1**: จัดเก็บข้อมูลพอร์ตโฟลิโอและโปรเจกต์ทั้งหมดในไฟล์ JSON แบบโครงสร้างพร้อมใช้งานภายใต้โฟลเดอร์ `src/data/` (เช่น `projects_data.json`) เพื่อเตรียมพร้อมในการโยกย้ายขึ้นระบบฐานข้อมูลจริง (Turso) ในภายหลัง

## 🐚 กฎการทำงานร่วมกับเทอร์มินัล (Terminal Rule)
*   **ห้ามรันคำสั่งเทอร์มินัลเองทุกกรณี**: ห้ามรันคำสั่ง เช่น `pnpm`, `git`, `npm` ผ่านเครื่องมืออัตโนมัติ ให้จัดเตรียมสคริปต์หรือคำสั่งที่ถูกต้องให้ผู้ใช้ก๊อปปี้ไปวางใน Git Bash ด้วยตนเองเสมอ
