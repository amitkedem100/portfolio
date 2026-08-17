import type { Metadata } from "next";
import { PortfolioShell } from "@/app/portfolio/journey/PortfolioShell";
import { pathMetadata } from "@/app/portfolio/journey/pathMetadata";
import { type JourneyOrigin } from "@/app/portfolio/journey/portfolioJourney";
import { HomeContactSection } from "@/app/portfolio/home/components/HomeContactSection";
import { HomeHeroFullBleed } from "@/app/portfolio/home/components/HomeHeroFullBleed";
import { NICHE_HOME_HERO_CONTENT } from "@/app/portfolio/home/components/homeHeroContent";
import { SelectedWorkSection } from "@/app/portfolio/home/components/SelectedWorkSection";
import { ScrollToSelectedWork } from "@/app/portfolio/home/ScrollToSelectedWork";
import "@/app/portfolio/home/page.css";

const LANDING_COPY: Record<
  JourneyOrigin,
  { title: string; description: string }
> = {
  "product-operations": {
    title: "Amit Kedem | Product Operations",
    description:
      "Product operations design work by Amit Kedem — selected case studies for this professional context.",
  },
  "customer-operations": {
    title: "Amit Kedem | Customer Operations",
    description:
      "Customer operations design work by Amit Kedem — selected case studies for this professional context.",
  },
  "ai-workflows": {
    title: "Amit Kedem | AI Workflows",
    description:
      "AI workflow design work by Amit Kedem — selected case studies for this professional context.",
  },
};

export function nicheLandingMetadata(origin: JourneyOrigin): Metadata {
  const copy = LANDING_COPY[origin];
  return pathMetadata(`/${origin}`, {
    title: copy.title,
    description: copy.description,
  });
}

type NicheLandingPageProps = {
  origin: JourneyOrigin;
};

export function NicheLandingPage({ origin }: NicheLandingPageProps) {
  return (
    <PortfolioShell>
      <HomeHeroFullBleed content={NICHE_HOME_HERO_CONTENT[origin]} />
      <div className="home-page portfolio-page-inner-grid">
        <ScrollToSelectedWork />
        <SelectedWorkSection />
        <div className="home-page-reveal-item home-page-reveal-item--contact">
          <HomeContactSection />
        </div>
      </div>
    </PortfolioShell>
  );
}
