"use client";

import { useState, useEffect } from "react";

interface ProjectData {
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
  techSpecs: {
    embedded: string[];
    web: string[];
    design3D: string[];
    automation: string[];
  };
  features: string[];
}

function get_tag_class(tag: string): string {
  const tag_lower = tag.toLowerCase();
  if (tag_lower.includes("iot") || tag_lower.includes("embedded")) return "iot";
  if (tag_lower.includes("web") || tag_lower.includes("next") || tag_lower.includes("pwa"))
    return "web";
  if (tag_lower.includes("3d") || tag_lower.includes("printing")) return "printing";
  if (tag_lower.includes("ai") || tag_lower.includes("automation")) return "automation";
  return "web";
}

export default function ProjectCard({ project }: { project: ProjectData }) {
  const [is_modal_open, setIs_modal_open] = useState(false);
  const [selected_review_img, setSelected_review_img] = useState<string | null>(null);

  // ดักจับการกดปุ่ม Escape และล็อกการ Scroll พื้นหลังเมื่อเปิด Modal
  useEffect(() => {
    const handle_keydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selected_review_img) {
          setSelected_review_img(null);
        } else {
          setIs_modal_open(false);
        }
      }
    };

    if (is_modal_open || selected_review_img) {
      window.addEventListener("keydown", handle_keydown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handle_keydown);
      document.body.style.overflow = "";
    };
  }, [is_modal_open, selected_review_img]);

  return (
    <>
      <article 
        className={`project-card ${project.category}`}
        onClick={() => setIs_modal_open(true)}
      >
        {/* ── ด้านหน้าการ์ด (Default View) ── */}
        <div className="project-card-front">
          <div className="project-card-image">
            {project.media.thumbnail ? (
              <img
                src={project.media.thumbnail}
                alt={project.title}
                loading="lazy"
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background:
                    project.category === "smart-iot"
                      ? "linear-gradient(135deg, rgba(2,132,199,0.15), rgba(2,50,80,0.4))"
                      : project.category === "web-automation"
                        ? "linear-gradient(135deg, rgba(79,70,229,0.15), rgba(40,20,80,0.4))"
                        : "linear-gradient(135deg, rgba(219,39,119,0.15), rgba(80,20,50,0.4))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.5rem",
                }}
              >
                {project.category === "smart-iot"
                  ? "⚡"
                  : project.category === "web-automation"
                    ? "🌐"
                    : "🔧"}
              </div>
            )}
          </div>

          <div className="project-card-body">
            <h3 className="project-card-title">{project.title}</h3>
            <p className="project-card-outcome">{project.businessOutcome}</p>
          </div>
        </div>

        {/* ── แผ่น Overlay ด้านหลัง (Hover View) ── */}
        <div className="project-card-overlay">
          <button className="project-card-overlay-btn">
            ดูรายละเอียดโปรเจกต์ ➔
          </button>
        </div>
      </article>

      {/* ── Modal แสดงรายละเอียดโปรเจกต์แบบพรีเมียม ── */}
      {is_modal_open && (
        <div 
          className="project-detail-modal"
          onClick={() => setIs_modal_open(false)}
        >
          <div 
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="modal-header">
              <div className="modal-header-info">
                <h3 className="modal-project-title">{project.title}</h3>
                <p className="modal-project-summary">{project.summary}</p>
              </div>
              <button 
                className="modal-close-btn"
                onClick={() => setIs_modal_open(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="modal-body">
              {/* ฝั่งซ้าย: Outcome & Features */}
              <div>
                {project.businessOutcome && (
                  <div className="modal-section">
                    <span className="modal-section-title">Business Outcome</span>
                    <div className="modal-outcome-box">
                      {project.businessOutcome}
                    </div>
                  </div>
                )}

                {project.features && project.features.length > 0 && (
                  <div className="modal-section">
                    <span className="modal-section-title">Key Features</span>
                    <ul className="features-list">
                      {project.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* ฝั่งขวา: Tech Stack & Client Feedbacks */}
              <div>
                {/* Tech Specs */}
                <div className="modal-section">
                  <span className="modal-section-title">Tech Specs</span>
                  <div className="modal-specs-group">
                    {project.techSpecs.embedded && project.techSpecs.embedded.length > 0 && (
                      <div className="modal-spec-category">
                        <span className="modal-spec-category-title embedded">// Embedded & Hardware</span>
                        <div className="modal-spec-chips">
                          {project.techSpecs.embedded.map((spec) => (
                            <span key={spec} className="modal-spec-chip">{spec}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.techSpecs.web && project.techSpecs.web.length > 0 && (
                      <div className="modal-spec-category">
                        <span className="modal-spec-category-title web">// Web & Software</span>
                        <div className="modal-spec-chips">
                          {project.techSpecs.web.map((spec) => (
                            <span key={spec} className="modal-spec-chip">{spec}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.techSpecs.design3D && project.techSpecs.design3D.length > 0 && (
                      <div className="modal-spec-category">
                        <span className="modal-spec-category-title design3D">// 3D Design & Printing</span>
                        <div className="modal-spec-chips">
                          {project.techSpecs.design3D.map((spec) => (
                            <span key={spec} className="modal-spec-chip">{spec}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.techSpecs.automation && project.techSpecs.automation.length > 0 && (
                      <div className="modal-spec-category">
                        <span className="modal-spec-category-title automation">// Integration & Automation</span>
                        <div className="modal-spec-chips">
                          {project.techSpecs.automation.map((spec) => (
                            <span key={spec} className="modal-spec-chip">{spec}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Client Feedbacks */}
                {project.media.reviewImages && project.media.reviewImages.length > 0 && (
                  <div className="modal-section">
                    <span className="modal-section-title">Client Feedbacks</span>
                    <div className="modal-review-gallery">
                      {project.media.reviewImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="modal-review-item"
                          onClick={() => setSelected_review_img(img)}
                          style={{ cursor: "zoom-in" }}
                        >
                          <img
                            src={img}
                            alt={`รีวิวจากลูกค้า ${idx + 1}`}
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            {project.demoUrl && (
              <div className="modal-footer">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar-cta-btn"
                >
                  เยี่ยมชมเว็บไซต์จริง ↗
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Lightbox Modal แสดงภาพรีวิวขนาดใหญ่ ── */}
      {selected_review_img && (
        <div
          className="review-lightbox"
          onClick={() => setSelected_review_img(null)}
        >
          {/* ปุ่มกากบาทขวาบน */}
          <button
            className="lightbox-close-btn"
            onClick={(e) => {
              e.stopPropagation();
              setSelected_review_img(null);
            }}
          >
            ✕
          </button>

          {/* คอนเทนเนอร์รูปภาพ */}
          <div
            className="lightbox-img-container"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected_review_img}
              alt="Client review enlarged feedback"
            />
          </div>
        </div>
      )}
    </>
  );
}

