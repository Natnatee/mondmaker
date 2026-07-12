import fs from "fs";
import path from "path";
import raw_projects_data from "@/data/projects_data.json";

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  tags: string[];
  businessOutcome: string;
  summary: string;
  media: {
    thumbnail: string;
    gallery: string[];
    reviewImages?: string[];
  };
  demoUrl?: string;
  featured?: boolean;
  techSpecs: {
    embedded: string[];
    web: string[];
    design3D: string[];
    automation: string[];
  };
  features: string[];
}

const SUPPORTED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".bmp"];

export function get_projects_data(): ProjectData[] {
  // ทำการ Deep Copy ข้อมูลเพื่อไม่ให้ไปทับตัวต้นแบบที่แคชไว้ใน Node.js
  const projects: ProjectData[] = JSON.parse(JSON.stringify(raw_projects_data));

  return projects.map((project) => {
    const project_slug = project.id;
    const base_dir = path.join(process.cwd(), "public", "projects", project_slug);

    try {
      // 1. ดึงภาพ Thumbnail (สแกนหาไฟล์รูปแรกที่พบในโฟลเดอร์ thumbnail/)
      const thumbnail_dir = path.join(base_dir, "thumbnail");
      let thumbnail_path = project.media.thumbnail; // ใช้ค่าเดิมจาก JSON เป็นค่าตั้งต้น (Fallback)

      if (fs.existsSync(thumbnail_dir)) {
        const files = fs.readdirSync(thumbnail_dir);
        // ค้นหาไฟล์แรกที่มีนามสกุลรูปภาพตามที่รองรับ
        const img_file = files.find((file) =>
          SUPPORTED_EXTENSIONS.includes(path.extname(file).toLowerCase())
        );
        if (img_file) {
          thumbnail_path = `/projects/${project_slug}/thumbnail/${img_file}`;
        }
      }
      project.media.thumbnail = thumbnail_path;

      // 2. ดึงภาพทั้งหมดในโฟลเดอร์ gallery/
      const gallery_dir = path.join(base_dir, "gallery");
      const gallery_images: string[] = [];

      if (fs.existsSync(gallery_dir)) {
        const files = fs.readdirSync(gallery_dir);
        files.forEach((file) => {
          if (SUPPORTED_EXTENSIONS.includes(path.extname(file).toLowerCase())) {
            gallery_images.push(`/projects/${project_slug}/gallery/${file}`);
          }
        });
      }
      // หากในโฟลเดอร์มีรูปภาพ ให้ใช้ค่าจากโฟลเดอร์เป็นหลัก
      if (gallery_images.length > 0) {
        project.media.gallery = gallery_images;
      }

      // 3. ดึงภาพทั้งหมดในโฟลเดอร์ review/
      const review_dir = path.join(base_dir, "review");
      const review_images: string[] = [];

      if (fs.existsSync(review_dir)) {
        const files = fs.readdirSync(review_dir);
        files.forEach((file) => {
          if (SUPPORTED_EXTENSIONS.includes(path.extname(file).toLowerCase())) {
            review_images.push(`/projects/${project_slug}/review/${file}`);
          }
        });
      }
      // หากในโฟลเดอร์มีรูปรีวิว ให้ใช้ค่าจากโฟลเดอร์เป็นหลัก
      if (review_images.length > 0) {
        project.media.reviewImages = review_images;
      }
    } catch (error) {
      console.error(`Error loading dynamic images for project: ${project_slug}`, error);
    }

    return project;
  });
}
