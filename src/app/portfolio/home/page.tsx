import "./page.css";
import { HomeHero } from "./components/HomeHero";

export default function PortfolioHomePage() {
  return (
    <div className="home-page layout-grid">
      <section className="home-page-section home-page-hero">
        <HomeHero />
      </section>
      <section
        className="home-page-section home-page-selected-work-placeholder"
        aria-label="Selected Work"
      />
    </div>
  );
}

