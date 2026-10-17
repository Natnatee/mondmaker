import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const project_root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source_root = path.resolve(project_root, "../3d-model");
const collections = [
  ["bat", "44611_0.jpg"],
  ["chameleon", "44633_0.jpg"],
  ["clawn", "440_0.jpg"],
  ["clicker", "44636_0.jpg"],
  ["ghost-click", "44186_0.jpg"],
  ["ghost-light", "44626_0.jpg"],
];

for (const [slug, cover_name] of collections) {
  const source_dir = path.join(source_root, slug);
  const output_dir = path.join(project_root, "public/projects", `3d-${slug}`);
  await fs.mkdir(path.join(output_dir, "thumbnail"), { recursive: true });
  await fs.mkdir(path.join(output_dir, "gallery"), { recursive: true });
  await sharp(path.join(source_dir, cover_name)).rotate().resize(1200, 900, { fit: "inside", withoutEnlargement: true }).webp({ quality: 85 }).toFile(path.join(output_dir, "thumbnail/cover.webp"));
  const photos = (await fs.readdir(source_dir)).filter((name) => /\.jpe?g$/i.test(name)).sort();
  for (const [index, name] of photos.entries()) {
    await sharp(path.join(source_dir, name)).rotate().resize(1600, 1600, { fit: "inside", withoutEnlargement: true }).webp({ quality: 85 }).toFile(path.join(output_dir, "gallery", `photo_${String(index + 1).padStart(2, "0")}.webp`));
  }
  console.log(`${slug}: cover + ${photos.length} gallery photos`);
}
