import "./page.css";
import { CursorZone } from "@/app/portfolio/components/CursorZone";
import { ProjectCard } from "@/app/portfolio/components/ProjectCard";
import { HomeHero } from "./components/HomeHero";
import { ScrollToSelectedWork } from "./ScrollToSelectedWork";

export default function PortfolioHomePage() {
  return (
    <div className="home-page portfolio-page-inner-grid">
      <ScrollToSelectedWork />
      <section className="home-page-section home-page-hero">
        <HomeHero />
      </section>
      <section
        id="selected-work"
        className="home-page-section home-page-selected-work"
        aria-label="Selected Work"
      >
        <CursorZone variant="viewProject">
          <ProjectCard
            title="Astra"
            description="A safety intelligence platform designed to monitor, analyze, and improve construction site safety through AI-driven insights and real-time reporting."
            keywords="SaaS Platform · Safety Analytics · AI Monitoring · 2026"
            imageAlt="Astra project"
            href="/portfolio/saas"
            imagePosition="right"
          />
        </CursorZone>
        <CursorZone variant="viewProject">
          <ProjectCard
            title="Command Center"
            description="An operations and monitoring experience — clarity under load and scalable information architecture (content in progress)."
            keywords="UX · Complex Systems · Dashboard"
            imageAlt="Command Center project"
            href="/portfolio/command-center"
            imagePosition="left"
          />
        </CursorZone>
        <CursorZone variant="viewProject">
          <ProjectCard
            title="Basilar"
            description="A mobile product for multi-day festival logistics. Entry, transport, food, navigation, and real-time updates."
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

