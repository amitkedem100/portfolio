import "./page.css";
import { CursorZone } from "@/app/portfolio/components/CursorZone";
import { ProjectCard } from "@/app/portfolio/components/ProjectCard";
import { HomeHero } from "./components/HomeHero";

export default function PortfolioHomePage() {
  return (
    <div className="home-page layout-grid">
      <section className="home-page-section home-page-hero">
        <HomeHero />
      </section>
      <section
        className="home-page-section home-page-selected-work"
        aria-label="Selected Work"
      >
        <CursorZone variant="viewProject">
          <ProjectCard
            title="Project title placeholder"
            description="A short description of the project in a few concise sentences. This block can be replaced easily when connecting real project data."
            keywords="UX · Mobile App · Concept"
            imageAlt="Project cover"
            href="/portfolio/project/placeholder"
            imagePosition="right"
          />
        </CursorZone>
        <CursorZone variant="viewProject">
          <ProjectCard
            title="Second project placeholder"
            description="Another featured project with placeholder copy. Layout alternates so the image appears on the left for visual variety."
            keywords="UI · Web · Design System"
            imageAlt="Second project cover"
            href="/portfolio/project/placeholder-2"
            imagePosition="left"
          />
        </CursorZone>
        <CursorZone variant="viewProject">
          <ProjectCard
            title="Third project placeholder"
            description="A third card to complete the alternating pattern. Same component, different content and image position."
            keywords="Research · Strategy · Prototype"
            imageAlt="Third project cover"
            href="/portfolio/project/placeholder-3"
            imagePosition="right"
          />
        </CursorZone>
      </section>
    </div>
  );
}

