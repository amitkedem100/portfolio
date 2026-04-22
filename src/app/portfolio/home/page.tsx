import "./page.css";
import { CursorZone } from "@/app/portfolio/components/CursorZone";
import { ProjectCard } from "@/app/portfolio/components/ProjectCard";
import { HomeHero } from "./components/HomeHero";
import { ScrollToSelectedWork } from "./ScrollToSelectedWork";
import { AdditionalWorkSection } from "./components/AdditionalWorkSection";

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
            imageSrc="/images/SaaS/astra-card-cover.png"
            imageAlt="Astra project"
            href="/portfolio/saas"
            imagePosition="right"
          />
        </CursorZone>
        <CursorZone variant="viewProject">
          <ProjectCard
            title="Basilar"
            description="A mobile product for multi-day festival logistics. Entry, transport, food, navigation, and real-time updates."
            keywords="Mobile UX · Festival Experience · Product"
            imageSrc="/images/basilar/basilar-card-cover.png"
            imageAlt="Basilar project"
            href="/portfolio/basilar"
            imagePosition="left"
          />
        </CursorZone>
      </section>
      <AdditionalWorkSection />
    </div>
  );
}

