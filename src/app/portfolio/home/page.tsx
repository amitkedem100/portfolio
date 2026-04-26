import "./page.css";
import { CursorZone } from "@/app/portfolio/components/CursorZone";
import { ProjectCard } from "@/app/portfolio/components/ProjectCard";
import { HomeHeroFullBleed } from "./components/HomeHeroFullBleed";
import { ScrollToSelectedWork } from "./ScrollToSelectedWork";
import { AdditionalWorkSection } from "./components/AdditionalWorkSection";
import { HomeContactSection } from "./components/HomeContactSection";
import { HomeIntroGate } from "./components/HomeIntroGate";

export default function PortfolioHomePage() {
  return (
    <HomeIntroGate>
      <HomeHeroFullBleed />
      <div className="home-page portfolio-page-inner-grid">
        <ScrollToSelectedWork />
        <section
          id="selected-work"
          className="home-page-section home-page-selected-work home-page-reveal-item home-page-reveal-item--selected"
          aria-label="Selected Work"
        >
          <CursorZone variant="viewProject">
            <ProjectCard
              title="Astra"
              description="A safety intelligence platform designed to monitor, analyze, and improve construction site safety through AI-driven insights and real-time reporting."
              keywords="SaaS Platform · Safety Analytics · AI Monitoring · 2026"
              imageSrc="/images/SaaS/astra-card-cover-v4.png"
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
              imageSrc="/images/basilar/basilar-card-cover-v3.png"
              imageAlt="Basilar project"
              href="/portfolio/basilar"
              imagePosition="left"
            />
          </CursorZone>
        </section>
        <div className="home-page-reveal-item home-page-reveal-item--additional">
          <AdditionalWorkSection />
        </div>
        <div className="home-page-reveal-item home-page-reveal-item--contact">
          <HomeContactSection />
        </div>
      </div>
    </HomeIntroGate>
  );
}

