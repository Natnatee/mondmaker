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
  };
  techSpecs: {
    embedded: string[];
    web: string[];
    design3D: string[];
    automation: string[];
  };
  features: string[];
}

function getTagClass(tag: string): string {
  const lower = tag.toLowerCase();
  if (lower.includes("iot") || lower.includes("embedded")) return "iot";
  if (lower.includes("web") || lower.includes("next") || lower.includes("pwa"))
    return "web";
  if (lower.includes("3d") || lower.includes("printing")) return "printing";
  if (lower.includes("ai") || lower.includes("automation")) return "automation";
  return "web";
}

function getAllSpecs(specs: ProjectData["techSpecs"]): string[] {
  return [
    ...specs.embedded,
    ...specs.web,
    ...specs.design3D,
    ...specs.automation,
  ].filter(Boolean);
}

export default function ProjectCard({ project }: { project: ProjectData }) {
  const specs = getAllSpecs(project.techSpecs);

  return (
    <article className="project-card">
      <div className="project-card-image">
        {/* Placeholder gradient when no real image */}
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              project.category === "smart-iot"
                ? "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,50,80,0.4))"
                : project.category === "web-automation"
                  ? "linear-gradient(135deg, rgba(123,97,255,0.15), rgba(40,20,80,0.4))"
                  : "linear-gradient(135deg, rgba(255,107,181,0.15), rgba(80,20,50,0.4))",
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
      </div>
      <div className="project-card-body">
        <div className="project-card-tags">
          {project.tags.map((tag) => (
            <span key={tag} className={`tag ${getTagClass(tag)}`}>
              {tag}
            </span>
          ))}
        </div>
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-outcome">{project.businessOutcome}</p>
        <p className="project-card-summary">{project.summary}</p>
        {specs.length > 0 && (
          <div className="project-card-specs">
            {specs.slice(0, 6).map((spec) => (
              <span key={spec} className="spec-chip">
                {spec}
              </span>
            ))}
            {specs.length > 6 && (
              <span className="spec-chip">+{specs.length - 6}</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
