import type { Metadata } from "next";
import "./page.css";
import { HomeHeroFullBleed } from "./components/HomeHeroFullBleed";
import { ScrollToSelectedWork } from "./ScrollToSelectedWork";
/* More Projects (AdditionalWorkSection) is intentionally unmounted temporarily.
   Component, styles, data, assets, and scroll helpers remain intact for easy restore. */
import { HomeContactSection } from "./components/HomeContactSection";
import { HomeIntroGate } from "./components/HomeIntroGate";
import { SelectedWorkSection } from "./components/SelectedWorkSection";
import { pathMetadata } from "@/app/portfolio/journey/pathMetadata";

export const metadata: Metadata = pathMetadata("/portfolio/home", {
  title: "Amit Kedem | Portfolio",
  description: "Product Designer portfolio by Amit Kedem",
});

export default function PortfolioHomePage() {
  return (
    <HomeIntroGate>
      <HomeHeroFullBleed />
      <div className="home-page portfolio-page-inner-grid">
        <ScrollToSelectedWork />
        <SelectedWorkSection />
        <div className="home-page-reveal-item home-page-reveal-item--contact">
          <HomeContactSection />
        </div>
      </div>
    </HomeIntroGate>
  );
}
