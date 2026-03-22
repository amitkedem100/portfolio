import "./page.css";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import type { Project } from "@/app/portfolio/types/portfolio.types";
import { ProjectHero } from "../components/ProjectHero";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const project: Project | null = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="project-page portfolio-page-inner-grid">
      <section className="project-page-section project-page-hero">
        <ProjectHero title={project.title} summary={project.summary} />
      </section>
      <section className="project-page-section project-page-content-area">
        <h2 className="project-page-heading">Project content</h2>
        <div className="project-page-content">
          <p>{project.content}</p>
        </div>
      </section>
    </div>
  );
}

