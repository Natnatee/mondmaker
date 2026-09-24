import type { Metadata } from "next";

import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { get_projects_data, is_demo_project } from "@/lib/projects_loader";

const site_url = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site_url),
  title: "Website Demos | MondMaker",
  description:
    "รวมเว็บไซต์ตัวอย่างที่กดทดลองได้จริง ทั้งร้านอาหาร ท่องเที่ยว โรงแรม คลินิก ออกแบบภายใน ร้านเกม รถมือสอง และแดชบอร์ด ข้อมูลทั้งหมดเป็นเดโม",
  openGraph: {
    title: "Website Demos | MondMaker",
    description: "รวมเว็บไซต์ตัวอย่างที่กดลองได้จริง — ชมไอเดียและเปิดเดโมของ MondMaker ในที่เดียว",
    type: "website",
  },
};

export default function DemosPage() {
  const demo_projects = get_projects_data().filter((project) => is_demo_project(project) && project.demoUrl);
  const preview_projects = demo_projects.filter((project) => project.media.thumbnail).slice(0, 2);

  return (
    <div className="page-wrapper demos-page">
      <Navbar />
      <main>
        <section className="demos-hero" aria-labelledby="demos-heading">
          <div className="container">
            <div className="demos-hero-topline">
              <span>MONDMAKER / THE DEMO COLLECTION</span>
              <span>{String(demo_projects.length).padStart(2, "0")} INTERACTIVE CONCEPTS</span>
            </div>
            <div className="demos-hero-layout">
              <div className="demos-hero-copy">
                <span className="demos-eyebrow"><span className="demos-live-dot" /> IDEAS YOU CAN ACTUALLY EXPLORE</span>
                <h1 id="demos-heading">ไอเดียที่<br /><em>กดเล่นได้จริง.</em></h1>
                <p>จากร้านอาหารถึงเว็บท่องเที่ยว จากคลินิกถึงแดชบอร์ด — ลองดูงานออกแบบและฟังก์ชันในแบบที่ใช้งานได้จริง</p>
                <a className="demos-primary-link" href="#explore-demos">สำรวจเว็บเดโม <span aria-hidden="true">↗</span></a>
              </div>
              <div className="demos-hero-previews" aria-hidden="true">
                {preview_projects.map((project, index) => (
                  <div className={`demos-preview-window demos-preview-window-${index + 1}`} key={project.id}>
                    <div className="demos-window-bar"><span className="demos-window-dots">● ● ●</span><span>{project.title.split(" — ")[0]}</span></div>
                    <Image src={project.media.thumbnail} alt="" width={1440} height={810} sizes="(max-width: 980px) 75vw, 420px" loading={index === 0 ? "eager" : "lazy"} />
                  </div>
                ))}
                <div className="demos-preview-stamp">EXPLORE<br /><span>THE IDEAS</span><b aria-hidden="true">✳</b></div>
              </div>
            </div>
            <div className="demos-hero-bottom">
              <span>DESIGNED TO BE SEEN. BUILT TO BE TRIED.</span>
              <a href="#explore-demos">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </section>

        <section className="demos-collection" id="explore-demos" aria-labelledby="demos-collection-heading">
          <div className="container">
            <div className="demos-collection-header">
              <div><span className="demos-section-label">{"// THE COLLECTION"}</span><h2 id="demos-collection-heading">เลือกเว็บที่อยากลอง<span>.</span></h2></div>
              <p>{demo_projects.length} เว็บไซต์ตัวอย่าง<br />หลากหลายสไตล์ กดลองได้ทุกเว็บ</p>
            </div>
            {demo_projects.length > 0 ? (
              <div className="demos-showcase-grid">
                {demo_projects.map((project, index) => (
                  <article className="demos-showcase-card" key={project.id}>
                    <a className="demos-card-visual" href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`เปิดเว็บไซต์ตัวอย่าง ${project.title} ในแท็บใหม่`}>
                      <div className="demos-window-bar"><span className="demos-window-dots">● ● ●</span><span>{project.title.split(" — ")[0]}</span></div>
                      {project.media.thumbnail ? (
                        <Image src={project.media.thumbnail} alt={`ภาพหน้าจอของ ${project.title}`} width={1440} height={810} sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 560px" loading="lazy" />
                      ) : (
                        <div className="demos-card-placeholder" aria-hidden="true"><span>{project.title.split(" — ")[0]}</span><b>↗</b></div>
                      )}
                      <span className="demos-card-image-label">LIVE PREVIEW <span aria-hidden="true">↗</span></span>
                    </a>
                    <div className="demos-card-body">
                      <div className="demos-card-meta"><span>{String(index + 1).padStart(2, "0")} / {project.tags[1] ?? "Website"}</span><span className="demos-card-badge">DEMO</span></div>
                      <h3>{project.title.replace(/ Demo$/, "")}</h3>
                      <p>{project.summary}</p>
                      <a className="demos-card-link" href={project.demoUrl} target="_blank" rel="noopener noreferrer">เปิดเว็บไซต์ตัวอย่าง <span aria-hidden="true">↗</span></a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="demos-empty">กำลังเตรียมเว็บไซต์ตัวอย่างเพิ่มเติม</p>
            )}
            <p className="demos-disclaimer">ทุกโปรเจกต์ในหน้านี้เป็นเทมเพลตและเว็บไซต์ตัวอย่างเพื่อแสดงงานออกแบบและฟังก์ชัน ไม่ใช่ผลงานที่มีผู้ว่าจ้าง ข้อมูลสินค้า ราคา การจอง และธุรกรรมเป็นข้อมูลจำลอง</p>
          </div>
        </section>

        <section className="demos-outro">
          <div className="container demos-outro-inner">
            <div><span className="demos-section-label">{"// YOUR IDEA COULD BE NEXT"}</span><h2>มีไอเดียของคุณเอง<span>?</span></h2><p>เว็บตัวอย่างเป็นเพียงจุดเริ่มต้น มาคุยกันว่าเว็บไซต์ของคุณควรทำอะไรได้บ้าง</p></div>
            <a className="demos-primary-link" href="https://line.me/ti/p/~0973355322" target="_blank" rel="noopener noreferrer">คุยเรื่องโปรเจกต์ <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
