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

  return (
    <article className="project-card">
      <div className="project-card-image">
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
        <p className="project-card-summary">{project.summary}</p>
        {all_specs.length > 0 && (
          <div className="project-card-specs">
            {all_specs.slice(0, 6).map((spec) => (
              <span key={spec} className="spec-chip">
                {spec}
              </span>
            ))}
            {all_specs.length > 6 && (
              <span className="spec-chip">+{all_specs.length - 6}</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
