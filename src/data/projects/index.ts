import rawProjects from "./projects.json";
import type {
  Project,
  ProjectMeta,
} from "@/app/portfolio/types/portfolio.types";

const projects = rawProjects as ProjectMeta[];

export function getProjects(): ProjectMeta[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | null {
  const match = projects.find((project) => project.slug === slug);

  if (!match) {
    return null;
  }

  const project: Project = {
    ...match,
    content: "Placeholder project content.",
  };

  return project;
}

