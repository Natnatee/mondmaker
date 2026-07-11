import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProjectCard from "@/components/project_card";
import { get_projects_data } from "@/lib/projects_loader";

export default function ThreeDPrintingPage() {
  const projects_data = get_projects_data();
  const print_projects = projects_data.filter(
    (p) => p.category === "3d-printing"
  );

  return (
    <div className="page-wrapper">
      <Navbar />

      <section className="hero">
        <div className="container">
          <div className="hero-badge" style={{ borderColor: "rgba(219, 39, 119, 0.3)", color: "var(--color-3d)" }}>
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

      {/* ── 3D Printer Specs Section ── */}
      <section className="printer-spec-section">
        <div className="container">
          <div className="printer-grid">
            {/* ฝั่งซ้าย: รูปภาพเครื่องพิมพ์ */}
            <div className="printer-image-wrapper">
              <img
                src="/image-main/CentauriCarbon2.webp"
                alt="Centauri Carbon 2 3D Printer"
                loading="lazy"
              />
            </div>

            {/* ฝั่งขวา: รายละเอียดสเปก */}
            <div className="printer-details">
              <div className="printer-title-group">
                <span className="printer-badge">// Hardware Fleet</span>
                <h2 className="printer-name">Centauri Carbon 2</h2>
                <p className="printer-desc">
                  ยกระดับการผลิตเคสอุปกรณ์และชิ้นงานต้นแบบด้วยเครื่องพิมพ์เกรดวิศวกรรมความแม่นยำสูง
                  โครงสร้างระบบปิดที่ควบคุมสภาพแวดล้อมความร้อนได้อย่างสมบูรณ์แบบ
                  เพื่อให้ได้งานที่ตรงสเปกและทนทานที่สุด
                </p>
              </div>

              {/* จุดเด่นทางเทคนิค */}
              <div className="printer-features-grid">
                <div className="printer-feat-card">
                  <div className="printer-feat-title">
                    🔥 <span>หัวฉีดอุณหภูมิสูง 350°C</span>
                  </div>
                  <div className="printer-feat-desc">
                    รองรับความร้อนสูงสุดถึง 350 องศาเซลเซียส สามารถหลอมเหลวและพิมพ์พลาสติกเกรดวิศวกรรมได้อย่างเสถียร
                  </div>
                </div>

                <div className="printer-feat-card">
                  <div className="printer-feat-title">
                    📦 <span>Heated Bed & Chamber</span>
                  </div>
                  <div className="printer-feat-desc">
                    ฐานพิมพ์ร้อน 110°C ร่วมกับห้องพิมพ์แบบปิด ควบคุมอุณหภูมิภายใน ช่วยป้องกันการหดตัวและโก่งตัวของวัสดุความเค้นสูง
                  </div>
                </div>

                <div className="printer-feat-card">
                  <div className="printer-feat-title">
                    📐 <span>Precision Engineering</span>
                  </div>
                  <div className="printer-feat-desc">
                    ความแม่นยำของแกนขยับระดับไมโคร ทำให้ประกอบสลัก เกลียว หรือช่องพอร์ตของเคสบอร์ด IoT ได้พอดีอย่างสมบูรณ์แบบ
                  </div>
                </div>

                <div className="printer-feat-card">
                  <div className="printer-feat-title">
                    💎 <span>ชิ้นงานคุณภาพอุตสาหกรรม</span>
                  </div>
                  <div className="printer-feat-desc">
                    พื้นผิวงานเรียบเนียน โครงสร้างภายในแข็งแรงสูง เหมาะสำหรับการนำไปใช้งานจริงหน้างานวิศวกรรม
                  </div>
                </div>
              </div>

              {/* วัสดุที่รองรับ */}
              <div className="printer-materials">
                <span className="printer-materials-label">Supported Materials:</span>
                <div className="printer-materials-chips">
                  <span className="printer-material-chip" title="สำหรับชิ้นงานทดสอบทั่วไป">PLA / PLA+</span>
                  <span className="printer-material-chip" title="ทนแรงกระแทก เหนียว ทนสารเคมี">PETG</span>
                  <span className="printer-material-chip" title="ยางยืดหยุ่น ทนแรงบิดและซับแรงกระแทกได้ดี">TPU (Flexible)</span>
                  <span className="printer-material-chip" title="แข็งแรงสูง ทนความร้อน ใช้งานกลางแจ้ง">ABS / ASA</span>
                  <span className="printer-material-chip" title="ทนแรงเสียดสี ทนความร้อนสูง ยืดหยุ่นดี">Nylon (PA)</span>
                  <span className="printer-material-chip" title="ผสมผสานคาร์บอนไฟเบอร์ แข็งแกร่งและเบาเป็นพิเศษ">Carbon Fiber (PETG/PA-CF)</span>
                  <span className="printer-material-chip" title="ทนแรงกระแทกสูงมาก ทนความร้อนขั้นสุด โปร่งใส">PC (Polycarbonate)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">// 3D Projects</span>
            <h2 className="section-title">ผลงาน 3D Design & Production</h2>
          </div>
          {print_projects.length > 0 ? (
            <div className="projects-grid">
              {print_projects.map((project) => (
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
