"use client";

import { useState } from "react";

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

function get_all_specs(specs: ProjectData["techSpecs"]): string[] {
  return [
    ...specs.embedded,
    ...specs.web,
    ...specs.design3D,
    ...specs.automation,
  ].filter(Boolean);
}

export default function ProjectCard({ project }: { project: ProjectData }) {
  const all_specs = get_all_specs(project.techSpecs);
  const [selected_review_img, setSelected_review_img] = useState<string | null>(null);

  return (
    <>
      <article className="project-card">
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
            <div className="project-card-tags">
              {project.tags.map((tag) => (
                <span key={tag} className={`tag ${get_tag_class(tag)}`}>
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="project-card-title">{project.title}</h3>
            <p className="project-card-outcome">{project.businessOutcome}</p>
          </div>
        </div>

        {/* ── แผ่น Overlay ด้านหลัง (Hover View) ── */}
        <div className="project-card-overlay">
          <div className="overlay-content-wrapper">
            <div className="overlay-header">
              <span className="overlay-project-title">{project.title}</span>
              <p className="overlay-project-summary">{project.summary}</p>
            </div>

            <div className="overlay-details">
              {/* Tech Stack */}
              {all_specs.length > 0 && (
                <div className="overlay-section">
                  <span className="overlay-section-label">// Tech Stack</span>
                  <div className="project-card-specs">
                    {all_specs.map((spec) => (
                      <span key={spec} className="spec-chip">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* แชทรีวิวจากลูกค้า */}
              {project.media.reviewImages && project.media.reviewImages.length > 0 && (
                <div className="overlay-section">
                  <span className="overlay-section-label">// Client Feedbacks</span>
                  <div className="overlay-review-gallery">
                    {project.media.reviewImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="overlay-review-item"
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

          {/* ปุ่มลิงก์เว็บจริง */}
          {project.demoUrl && (
            <div className="overlay-footer-action">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-cta-btn"
                style={{ width: "100%", justifyContent: "center" }}
              >
                เยี่ยมชมเว็บไซต์จริง ↗
              </a>
            </div>
          )}
        </div>
      </article>

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
