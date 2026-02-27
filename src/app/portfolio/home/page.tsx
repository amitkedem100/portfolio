import Link from "next/link";
import "./page.css";
import { getProjects } from "@/data/projects";
import type { ProjectMeta } from "@/app/portfolio/types/portfolio.types";
import { HomeHero } from "./components/HomeHero";

export default function PortfolioHomePage() {
  const projects: ProjectMeta[] = getProjects();

  return (
    <div className="home-page">
      <section className="home-page-section">
        <HomeHero />
      </section>
      <section className="home-page-section" aria-label="Projects">
        <h2 className="home-page-heading">Projects</h2>
        <ul className="home-page-project-list">
          {projects.map((project) => (
            <li key={project.slug} className="home-page-project-item">
              <h3 className="home-page-project-title">
                <Link href={`/portfolio/project/${project.slug}`}>
                  {project.title}
                </Link>
              </h3>
              <p className="home-page-project-summary">{project.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

