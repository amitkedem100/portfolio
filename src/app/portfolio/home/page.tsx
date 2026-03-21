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
            title="Basilar"
            description="A mobile product for multi-day festival logistics — entry, transport, food, navigation, and real-time updates."
            keywords="Mobile UX · Festival Experience · Product"
            imageAlt="Basilar project"
            href="/portfolio/basilar"
            imagePosition="right"
          />
        </CursorZone>
      </section>
    </div>
  );
}

