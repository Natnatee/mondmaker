import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/data/projects.json";

export default function SmartIotPage() {
  const iotProjects = projectsData.filter((p) => p.category === "smart-iot");

  return (
    <div className="page-wrapper">
      <Navbar />

      <section className="hero">
        <div className="container">
          <div className="hero-badge" style={{ borderColor: "rgba(0, 212, 255, 0.3)", color: "var(--color-iot)" }}>
            <span className="dot" style={{ background: "var(--color-iot)" }} />
            Smart IoT & Embedded
          </div>
          <h1>
            ฮาร์ดแวร์อัจฉริยะ
            <br />
            <span className="gradient-text">เชื่อมโลกจริง สู่คลาวด์</span>
          </h1>
          <p className="hero-subtitle">
            ออกแบบวงจร เขียนเฟิร์มแวร์ ESP32 / STM32
            ส่งข้อมูลเซนเซอร์เข้าคลาวด์แบบเรียลไทม์
            พร้อมระบบแจ้งเตือนอัจฉริยะ
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">// IoT Projects</span>
            <h2 className="section-title">ผลงาน IoT & Embedded</h2>
          </div>
          {iotProjects.length > 0 ? (
            <div className="projects-grid">
              {iotProjects.map((project) => (
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
