import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProjectCard from "@/components/project_card";
import HomeHero3D from "@/components/home_hero_3d";
import TechStack from "@/components/tech_stack";
import { get_projects_data } from "@/lib/projects_loader";

function AnimatedText({ text, startDelay }: { text: string; startDelay: number }) {
  let charCount = 0;
  return (
    <>
      {text.split(" ").map((word, wordIdx, arr) => {
        const letters = word.split("").map((char) => {
          const delay = startDelay + charCount * 0.03;
          charCount++;
          return (
            <span
              key={charCount}
              className="hero-letter"
              style={{ animationDelay: `${delay}s` }}
            >
              {char}
            </span>
          );
        });

        const spaceDelay = startDelay + charCount * 0.03;
        if (wordIdx < arr.length - 1) {
          charCount++;
        }

        return (
          <span key={wordIdx} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {letters}
            {wordIdx < arr.length - 1 && (
              <span className="hero-letter" style={{ animationDelay: `${spaceDelay}s` }}>
                &nbsp;
              </span>
            )}
          </span>
        );
      })}
    </>
  );
}

export default function Home() {
  const projects_data = get_projects_data();
  // กรองแสดงผลเฉพาะโปรเจกต์เด่นที่หน้าแรก
  const featured_projects = projects_data.filter((p) => p.featured);

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* ── Hero Section ── */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="dot animate-pulse" />
                Available for New Projects
              </div>
              <h1>
                สวัสดีครับ ผมชื่อ <span className="gradient-text">ม่อน</span>
                <br />
                <span className="animated-text-container">
                  <AnimatedText text="MondMaker" startDelay={0} />
                </span>
              </h1>
              <p className="hero-subtitle">
                ผู้เชี่ยวชาญด้าน Smart IoT, ระบบ AI Automation และงานออกแบบ 3D
                ผมผสานวิศวกรรมฮาร์ดแวร์และซอฟต์แวร์เพื่อสร้างโซลูชันที่จับต้องได้จริง
              </p>
              <div className="hero-cta">
                <a href="#contact" className="btn btn-primary">
                  <span>คุยงานโปรเจกต์ ➔</span>
                </a>
                <Link href="/smart-iot" className="btn btn-secondary">
                  <span>ดูผลงาน IoT</span>
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <HomeHero3D />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 Main Cards Section ── */}
      <section className="section bg-subtle">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-label">// Areas of Expertise</span>
            <h2 className="section-title">หมวดหมู่ผลงานหลัก</h2>
          </div>
          <div className="category-grid">
            <Link href="/smart-iot" className="category-card iot">
              <img src="/3-main-card/iot.jpg" alt="Smart IoT & Embedded" className="category-card-bg" />
              <div className="category-card-overlay"></div>
              <h3>Smart IoT & Embedded</h3>
            </Link>
            <Link href="/web-automation" className="category-card web">
              <img src="/3-main-card/web.jpg" alt="Web & AI Automation" className="category-card-bg" />
              <div className="category-card-overlay"></div>
              <h3>Web & AI Automation</h3>
            </Link>
            <Link href="/3d-printing" className="category-card printing">
              <img src="/3-main-card/3d.jpg" alt="3D Design & Production" className="category-card-bg" />
              <div className="category-card-overlay"></div>
              <h3>3D Design & Production</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Projects Section ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">// Featured Work</span>
            <h2 className="section-title">โปรเจกต์ที่โดดเด่น</h2>
          </div>
          <div className="projects-grid">
            {featured_projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="view-more-container">
            <p className="view-more-text">ค้นหาผลงานเพิ่มเติมแยกตามความสนใจ:</p>
            <div className="view-more-buttons">
              <Link href="/smart-iot" className="btn-view-more">
                <span>Smart IoT & Hardware ➔</span>
              </Link>
              <Link href="/web-automation" className="btn-view-more">
                <span>Web & AI Automation ➔</span>
              </Link>
              <Link href="/3d-printing" className="btn-view-more">
                <span>3D Design & Production ➔</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Stack & Skills Section ── */}
      <TechStack />

      <Footer />
    </div>
  );
}
