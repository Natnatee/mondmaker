import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const project_root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const demos = [
  {
    slug: "bite-club",
    url: "https://store-food-beta.vercel.app/",
  },
  {
    slug: "nova-ecommerce-dashboard",
    url: "https://ecommerce-analytics-tau.vercel.app/",
  },
  {
    slug: "roam",
    url: "https://roam-seven-tan.vercel.app/",
  },
  {
    slug: "shift",
    url: "https://shift-lac-rho.vercel.app/",
  },
  {
    slug: "respawn",
    url: "https://respawn123.vercel.app/",
  },
  {
    slug: "serein-hotel",
    url: "https://hotel-bice-sigma.vercel.app/",
  },
  {
    slug: "aurel-clinic",
    url: "https://clinic-ten-ochre.vercel.app/",
  },
  {
    slug: "forme-studio",
    url: "https://forme-beige.vercel.app/",
  },
];

const requested_slugs = process.argv.slice(2);
const unknown_slugs = requested_slugs.filter(
  (slug) => !demos.some((demo) => demo.slug === slug),
);
if (unknown_slugs.length > 0) {
  throw new Error(`Unknown demo slug: ${unknown_slugs.join(", ")}`);
}
const selected_demos = requested_slugs.length > 0
  ? demos.filter((demo) => requested_slugs.includes(demo.slug))
  : demos;


async function capture_demo(browser, demo) {
  const output_root = path.join(project_root, "public", "projects", demo.slug);
  const thumbnail_root = path.join(output_root, "thumbnail");
  const gallery_root = path.join(output_root, "gallery");
  await Promise.all([mkdir(thumbnail_root, { recursive: true }), mkdir(gallery_root, { recursive: true })]);

  const desktop = await browser.newPage({ viewport: { width: 1440, height: 810 }, deviceScaleFactor: 1 });
  await desktop.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
  await desktop.addInitScript(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  const desktop_response = await desktop.goto(demo.url, { waitUntil: "domcontentloaded", timeout: 60000 });
  if (desktop_response && !desktop_response.ok()) {
    throw new Error(`Desktop capture failed for ${demo.url}: HTTP ${desktop_response.status()}`);
  }
  await desktop.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await desktop.evaluate(async () => {
    await document.fonts.ready;
    const page_height = document.documentElement.scrollHeight;
    for (let offset = 0; offset < page_height; offset += Math.max(500, innerHeight * 0.8)) {
      window.scrollTo(0, offset);
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
    window.scrollTo(0, 0);
    await Promise.all(Array.from(document.images, (image) => image.decode().catch(() => {})));
  });
  await desktop.addStyleTag({
    content:
      "*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; scroll-behavior: auto !important; }",
  });
  await desktop.waitForTimeout(250);
  const ready_state = await desktop.evaluate(() => document.readyState);
  if (ready_state !== "complete") await desktop.waitForLoadState("load", { timeout: 15000 }).catch(() => {});
  await desktop.screenshot({ path: path.join(thumbnail_root, "demo.png"), animations: "disabled" });
  await desktop.screenshot({
    path: path.join(gallery_root, "desktop_full.png"),
    fullPage: true,
    animations: "disabled",
  });
  await desktop.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await mobile.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
  await mobile.addInitScript(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  const mobile_response = await mobile.goto(demo.url, { waitUntil: "domcontentloaded", timeout: 60000 });
  if (mobile_response && !mobile_response.ok()) {
    throw new Error(`Mobile capture failed for ${demo.url}: HTTP ${mobile_response.status()}`);
  }
  await mobile.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await mobile.evaluate(async () => {
    await document.fonts.ready;
    const page_height = document.documentElement.scrollHeight;
    for (let offset = 0; offset < page_height; offset += Math.max(500, innerHeight * 0.8)) {
      window.scrollTo(0, offset);
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
    window.scrollTo(0, 0);
    await Promise.all(Array.from(document.images, (image) => image.decode().catch(() => {})));
  });
  await mobile.addStyleTag({
    content:
      "*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; scroll-behavior: auto !important; }",
  });
  await mobile.waitForTimeout(250);
  await mobile.screenshot({
    path: path.join(gallery_root, "mobile_full.png"),
    fullPage: true,
    animations: "disabled",
  });
  await mobile.close();
  console.log(`Captured ${demo.url} -> public/projects/${demo.slug}`);
}

const browser = await chromium.launch({ headless: true });
try {
  for (const demo of selected_demos) await capture_demo(browser, demo);
} finally {
  await browser.close();
}
