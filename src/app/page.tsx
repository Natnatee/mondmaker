import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/data/projects.json";

export default function Home() {
  return (
    <div className="page-wrapper">
      <Navbar />

      {/* ── Hero Section ── */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">
            <span className="dot" />
            Available for projects
          </div>
          <h1>
            Full-Stack IoT,
            <br />
            <span className="gradient-text">Web & AI Automation</span>
          </h1>
          <p className="hero-subtitle">
            ครบจบที่คนเดียว — จากไอเดียสู่โปรโตไทป์จริง ด้วย 3D Design,
            Embedded IoT และ Web & AI Automation
          </p>

          {/* ── Category Navigation Cards ── */}
          <div className="category-grid">
            <Link href="/smart-iot" className="category-card iot">
              <div className="category-icon">⚡</div>
              <h3>Smart IoT & Embedded</h3>
              <p>
                ออกแบบและเขียนโปรแกรมควบคุมบอร์ด ESP32, STM32
                เชื่อมต่อเซนเซอร์กับคลาวด์แบบเรียลไทม์
              </p>
              <span className="arrow">→</span>
            </Link>

            <Link href="/web-automation" className="category-card web">
              <div className="category-icon">🌐</div>
              <h3>Web & AI Automation</h3>
              <p>
                พัฒนาเว็บแอปด้วย Next.js ต่อระบบ n8n อัตโนมัติ และ AI Agent
                ทำงานแทนคุณ 24 ชม.
              </p>
              <span className="arrow">→</span>
            </Link>

            <Link href="/3d-printing" className="category-card printing">
              <div className="category-icon">🔧</div>
              <h3>3D Design & Production</h3>
              <p>
                ออกแบบ CAD ด้วย Fusion 360 และพิมพ์เคสผลิตภัณฑ์
                ที่แม่นยำเชิงวิศวกรรม พร้อมใช้งานจริง
              </p>
              <span className="arrow">→</span>
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
            {projectsData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
