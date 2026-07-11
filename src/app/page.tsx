import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProjectCard from "@/components/project_card";
import HomeHero3D from "@/components/home_hero_3d";
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
  return (
    <div className="page-wrapper">
      <Navbar />

      {/* ── Hero Section ── */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-text">
              <div className="hero-badge">
                <span className="dot" />
                Available for projects
              </div>
              <h1>
                <span className="hero-title-line-left" style={{ display: "flex", flexWrap: "wrap" }}>
                  <AnimatedText text="Full-Stack IoT," startDelay={0.1} />
                </span>
                <span className="hero-title-line-right gradient-text" style={{ display: "flex", flexWrap: "wrap" }}>
                  <AnimatedText text="Web & AI Automation" startDelay={0.4} />
                </span>
              </h1>
              <p className="hero-subtitle">
                ครบจบที่เดียว — จากไอเดียสู่โปรโตไทป์จริง ด้วย 3D Design,
                Embedded IoT และ Web & AI Automation
              </p>
            </div>

            {/* ส่วนแสดงหุ่นยนต์ 3D ร่าเริง */}
            <HomeHero3D />
          </div>

          {/* ── Category Navigation Cards ── */}
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
            {projects_data.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
