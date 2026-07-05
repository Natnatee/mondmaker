import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/data/projects.json";

export default function WebAutomationPage() {
  const webProjects = projectsData.filter(
    (p) => p.category === "web-automation"
  );

  return (
    <div className="page-wrapper">
      <Navbar />

      <section className="hero">
        <div className="container">
          <div className="hero-badge" style={{ borderColor: "rgba(123, 97, 255, 0.3)", color: "var(--color-web)" }}>
            <span className="dot" style={{ background: "var(--color-web)" }} />
            Web & AI Automation
          </div>
          <h1>
            เว็บแอปอัจฉริยะ
            <br />
            <span className="gradient-text">ระบบอัตโนมัติที่ทำงานแทนคุณ</span>
          </h1>
          <p className="hero-subtitle">
            พัฒนาเว็บแอปด้วย Next.js ต่อระบบ n8n Automation, AI Agent
            และแดชบอร์ดที่ทำงาน 24 ชั่วโมง
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">// Web & AI Projects</span>
            <h2 className="section-title">ผลงาน Web & AI Automation</h2>
          </div>
          {webProjects.length > 0 ? (
            <div className="projects-grid">
              {webProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "var(--text-muted)" }}>
              กำลังเพิ่มผลงาน...
            </p>
          )}
          <div style={{ textAlign: "center", marginTop: "var(--space-3xl)" }}>
            <Link href="/" style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
              ← กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
