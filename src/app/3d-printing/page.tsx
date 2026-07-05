import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/data/projects.json";

export default function ThreeDPrintingPage() {
  const printProjects = projectsData.filter(
    (p) => p.category === "3d-printing"
  );

  return (
    <div className="page-wrapper">
      <Navbar />

      <section className="hero">
        <div className="container">
          <div className="hero-badge" style={{ borderColor: "rgba(255, 107, 181, 0.3)", color: "var(--color-3d)" }}>
            <span className="dot" style={{ background: "var(--color-3d)" }} />
            3D Design & Production
          </div>
          <h1>
            ออกแบบและผลิต
            <br />
            <span className="gradient-text">ชิ้นงาน 3D เชิงวิศวกรรม</span>
          </h1>
          <p className="hero-subtitle">
            ออกแบบ CAD ด้วย Fusion 360 พิมพ์เคสบอร์ดและโครงสร้างผลิตภัณฑ์
            ด้วยความแม่นยำ พร้อมเลือกวัสดุให้เหมาะกับการใช้งานจริง
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">// 3D Projects</span>
            <h2 className="section-title">ผลงาน 3D Design & Production</h2>
          </div>
          {printProjects.length > 0 ? (
            <div className="projects-grid">
              {printProjects.map((project) => (
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
