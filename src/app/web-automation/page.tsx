import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProjectCard from "@/components/project_card";
import TechStack from "@/components/tech_stack";
import { get_projects_data } from "@/lib/projects_loader";

export default function WebAutomationPage() {
  const projects_data = get_projects_data();
  const web_projects = projects_data.filter(
    (p) => p.category === "web-automation"
  );

  return (
    <div className="page-wrapper">
      <Navbar />

      <section className="hero">
        <div className="container">
          <div className="hero-badge" style={{ borderColor: "rgba(79, 70, 229, 0.3)", color: "var(--color-web)" }}>
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
          {web_projects.length > 0 ? (
            <div className="projects-grid">
              {web_projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "var(--text-muted)" }}>
              กำลังเพิ่มผลงาน...
            </p>
          )}
        </div>
      </section>

      {/* ── Tech Stack & Skills Section ── */}
      <TechStack category="web-automation" />

      <section>
        <div className="container">
          <div style={{ textAlign: "center", marginTop: "var(--space-xl)", marginBottom: "var(--space-2xl)" }}>
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
