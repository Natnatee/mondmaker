import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const project_root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output_dir = path.join(project_root, "marketing-assets", "demo-posters");
const image_ids = ["bite-club", "roam", "respawn", "serein-hotel", "aurel-clinic", "forme-studio", "nova-ecommerce-dashboard"];
const posters = [
  {
    filename: "demo_overview.jpg",
    headline: "เว็บสวย",
    highlight: "กดเล่นได้จริง.",
    description: "รวมเว็บตัวอย่างหลายสไตล์ เลือกดูแบบที่ชอบ",
    background: "#f9f5ea",
    foreground: "#17243b",
    accent: "#d93223",
    glow: "#f7d2a4",
    stamp: "#ffdb70",
    screens: [
      { id: "bite-club", label: "BITE CLUB" },
      { id: "respawn", label: "RESPAWN" },
      { id: "roam", label: "ROAM" },
    ],
  },
  {
    filename: "demo_premium.jpg",
    headline: "อยากได้เว็บ",
    highlight: "ลุคพรีเมียม?",
    description: "โรงแรม คลินิก สตูดิโอ — ลองดูหน้าตาก่อน",
    background: "#0d1b2d",
    foreground: "#ffffff",
    accent: "#9ce8f7",
    glow: "#305479",
    stamp: "#c2f4e8",
    screens: [
      { id: "serein-hotel", label: "SEREIN HOTEL" },
      { id: "forme-studio", label: "FORME STUDIO" },
      { id: "aurel-clinic", label: "AUREL CLINIC" },
    ],
  },
  {
    filename: "demo_commerce.jpg",
    headline: "เว็บขายของ",
    highlight: "ให้คนอยากกด.",
    description: "ร้านอาหาร ร้านเกม และแดชบอร์ด — ลองดูได้เลย",
    background: "#efeffa",
    foreground: "#1b1841",
    accent: "#5845cb",
    glow: "#c3b9f5",
    stamp: "#c7f3e2",
    screens: [
      { id: "respawn", label: "RESPAWN" },
      { id: "bite-club", label: "BITE CLUB" },
      { id: "nova-ecommerce-dashboard", label: "NOVA" },
    ],
  },
];

function escape_html(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function image_frame(screen, position, images) {
  return `<div class="screen screen-${position}">
    <div class="browser-bar"><span class="browser-dots">● ● ●</span><span>${escape_html(screen.label)}</span><span class="browser-arrow">↗</span></div>
    <img src="data:image/png;base64,${images.get(screen.id)}" alt="${escape_html(screen.label)}" />
  </div>`;
}

function poster_html(poster, images, fonts, demo_count) {
  return `<!doctype html><html lang="th"><head><meta charset="utf-8"><style>
    @font-face{font-family:Kanit;src:url(data:font/ttf;base64,${fonts.regular}) format('truetype');font-weight:400}
    @font-face{font-family:Kanit;src:url(data:font/ttf;base64,${fonts.bold}) format('truetype');font-weight:700}
    @font-face{font-family:Kanit;src:url(data:font/ttf;base64,${fonts.extra}) format('truetype');font-weight:800}
    *{box-sizing:border-box}html,body{margin:0;width:1080px;height:1350px;overflow:hidden}
    body{font-family:Kanit, sans-serif}
    .poster{position:relative;width:1080px;height:1350px;overflow:hidden;background:${poster.background};color:${poster.foreground}}
    .poster::before{content:'';position:absolute;width:860px;height:860px;right:-350px;top:165px;border-radius:50%;background:${poster.glow};opacity:.48;filter:blur(65px)}
    .poster::after{content:'';position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(currentColor 1px,transparent 1px);background-size:36px 36px;opacity:.035}
    .topbar{position:absolute;z-index:8;top:55px;left:65px;right:65px;display:flex;align-items:center;justify-content:space-between}
    .brand{font-family:Kanit,sans-serif;font-size:30px;font-weight:800;letter-spacing:-1.5px;line-height:1}
    .brand i{color:${poster.accent};font-style:normal}
    .top-note{font-family:Kanit,sans-serif;font-size:15px;font-weight:700;letter-spacing:1.8px;opacity:.75}
    .intro{position:absolute;z-index:8;top:145px;left:65px;right:65px}
    .eyebrow{font-size:16px;font-weight:700;letter-spacing:2.5px;color:${poster.accent}}
    h1{font-size:90px;line-height:1.06;letter-spacing:-3px;font-weight:800;margin:20px 0 12px}
    h1 em{font-style:normal;color:${poster.accent}}
    .subtitle{font-size:24px;line-height:1.45;font-weight:400;opacity:.83;margin:0}
    .stage{position:absolute;z-index:3;left:0;top:440px;width:1080px;height:790px}
    .screen{position:absolute;overflow:hidden;background:#fff;border:2px solid #ffffffd9;border-radius:17px;box-shadow:0 30px 75px #02061670}
    .screen-0{left:88px;top:8px;width:865px;height:487px;transform:rotate(-3deg);z-index:1}
    .screen-1{left:42px;top:415px;width:685px;height:387px;transform:rotate(5deg);z-index:2}
    .screen-2{right:45px;top:480px;width:504px;height:284px;transform:rotate(-6deg);z-index:3}
    .browser-bar{height:36px;padding:0 15px;display:flex;align-items:center;justify-content:space-between;gap:10px;color:#33455e;background:#f7f9fd;font-size:14px;font-weight:700;letter-spacing:.9px}
    .browser-dots{font-size:11px;letter-spacing:2px;color:#a7b6c9;white-space:nowrap}
    .browser-arrow{font-size:19px;line-height:1;color:${poster.accent}}
    .screen img{display:block;width:100%;height:calc(100% - 36px);object-fit:cover;object-position:top}
    .stamp{position:absolute;z-index:6;right:70px;top:350px;width:126px;height:126px;border-radius:50%;background:${poster.stamp};color:#17243b;display:flex;flex-direction:column;justify-content:center;align-items:center;transform:rotate(12deg);box-shadow:0 10px 30px #05071535;border:3px solid #ffffffaf}
    .stamp strong{font-size:31px;line-height:1;font-weight:800}.stamp span{font-size:14px;font-weight:800;letter-spacing:1.2px}
    .bottom{position:absolute;z-index:9;bottom:0;left:0;right:0;height:114px;padding:22px 65px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid currentColor;background:${poster.background}}
    .button{background:${poster.accent};color:${poster.background};border-radius:8px;padding:12px 22px;font-size:21px;font-weight:700}
    .url{text-align:right;font-weight:700;letter-spacing:.7px;font-size:17px}.url small{display:block;font-weight:400;letter-spacing:1px;opacity:.62;font-size:13px}
  </style></head><body><div class="poster">
    <div class="topbar"><div class="brand">MondMaker<i>✳</i></div><div class="top-note">DEMO COLLECTION / ${demo_count}</div></div>
    <div class="intro"><div class="eyebrow">WEBSITE DESIGN · DEMO PROJECTS</div><h1>${escape_html(poster.headline)}<br><em>${escape_html(poster.highlight)}</em></h1><p class="subtitle">${escape_html(poster.description)}</p></div>
    <div class="stage">${poster.screens.map((screen, index) => image_frame(screen, index, images)).join("")}</div>
    <div class="stamp"><strong>${demo_count}</strong><span>เว็บตัวอย่าง</span></div>
    <div class="bottom"><div class="button">ลองดูเดโม ↗</div><div class="url">mondmaker.com/demo<small>เว็บตัวอย่าง · ไม่ใช่งานลูกค้า</small></div></div>
  </div></body></html>`;
}

const images = new Map();
for (const id of image_ids) {
  const screenshot_path = path.join(project_root, "public", "projects", id, "thumbnail", "demo.png");
  try {
    images.set(id, (await readFile(screenshot_path)).toString("base64"));
  } catch {
    throw new Error(`Missing screenshot: ${screenshot_path}. Run capture_demo_screenshots.mjs for ${id} first.`);
  }
}

const font_dir = path.join(project_root, "scripts", "assets");
const [regular, bold, extra] = await Promise.all(
  ["kanit_regular.ttf", "kanit_bold.ttf", "kanit_extra.ttf"].map(async (name) =>
    (await readFile(path.join(font_dir, name))).toString("base64"),
  ),
);
const fonts = { regular, bold, extra };
const raw_projects_data = JSON.parse(await readFile(path.join(project_root, "src", "data", "projects_data.json"), "utf8"));
const demo_count = String(raw_projects_data.filter((project) => project.tags.includes("Demo") && project.demoUrl).length).padStart(2, "0");

await mkdir(output_dir, { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  for (const poster of posters) {
    const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
    await page.setContent(poster_html(poster, images, fonts, demo_count), { waitUntil: "load" });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(Array.from(document.images, (image) => image.decode()));
    });
    const output_path = path.join(output_dir, poster.filename);
    await page.screenshot({ path: output_path, type: "jpeg", quality: 92, animations: "disabled" });
    await page.close();
    console.log(`Saved ${output_path}`);
  }
} finally {
  await browser.close();
}
