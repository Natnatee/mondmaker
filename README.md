This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Portfolio Demo Screenshots

โปรเจกต์เว็บตัวอย่างถูกเพิ่มใน `src/data/projects_data.json` พร้อมป้าย **Demo** บนการ์ด:

- BITE CLUB: https://store-food-beta.vercel.app/
- NOVA Dashboard: https://ecommerce-analytics-tau.vercel.app/
- ROAM: https://roam-seven-tan.vercel.app/
- SHIFT: https://shift-lac-rho.vercel.app/
- RESPAWN: https://respawn123.vercel.app/
- Serein Hotel: https://hotel-bice-sigma.vercel.app/
- AUREL Clinic: https://clinic-ten-ochre.vercel.app/
- FORME Studio: https://forme-beige.vercel.app/

สร้างภาพหน้าปก desktop 16:9 และภาพ gallery desktop/mobile ด้วย Playwright (รันจาก Git Bash ที่โฟลเดอร์ `mondmaker`) หลังติดตั้ง Playwright และ Chromium แล้ว:

```bash
node scripts/capture_demo_screenshots.mjs serein-hotel aurel-clinic forme-studio
pnpm build
```

ระบุชื่อโปรเจกต์เพื่อแคปเฉพาะเว็บที่ต้องการ หรือรัน `node scripts/capture_demo_screenshots.mjs` เพื่อแคปทุกเว็บใหม่ หากยังไม่มี Playwright ให้ติดตั้งครั้งเดียวด้วย `pnpm add -D playwright` และ `pnpm exec playwright install chromium` ก่อน

สคริปต์บันทึกภาพใน `public/projects/<project-id>/thumbnail/demo.png` และ `public/projects/<project-id>/gallery/` โดย `project-id` ต้องตรงกับชื่อโฟลเดอร์ ตัว loader จะอ่านภาพจากโฟลเดอร์และนำไปแสดงบนการ์ด/แกลเลอรี; ถ้ายังไม่แคป โปรเจกต์นั้นจะแสดงภาพ fallback ตรวจภาพก่อน deploy MondMaker ใหม่ การ capture ต้องเชื่อมต่ออินเทอร์เน็ตเพื่อเข้าถึงเว็บ Vercel

## Demo Gallery

แชร์หน้า `/demos` เมื่อต้องการให้ลูกค้าดูเทมเพลตทั้งหมดในลิงก์เดียว หน้าเดโมแสดงเฉพาะโปรเจกต์ที่มีแท็ก `Demo` และ `demoUrl` กดภาพหรือปุ่มเพื่อเปิดเว็บตัวอย่างในแท็บใหม่ ส่วนหน้า `/web-automation`, `/smart-iot`, `/3d-printing` และผลงานเด่นหน้าแรกจะไม่แสดงโปรเจกต์เดโม เพื่อไม่ให้สับสนกับผลงานจริง หน้า `/demos` มีภาพ Open Graph สำหรับพรีวิวลิงก์เมื่อแชร์บนโซเชียล

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
