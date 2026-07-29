import Image from "next/image";
import { BadgeList, splitBadges } from "@/app/portfolio/components/BadgeList";
import "./AiCommandCenterHero.css";

const HERO_COVER = "/images/AI-Command-Center/ai-command-center-card-cover.png";
const HERO_KEYWORDS = "AI Operations · Complex System · Operational UX · 2026";

type AiCommandCenterHeroProps = {
  title: string;
  description: string;
  role: string;
};

export function AiCommandCenterHero({
  title,
  description,
  role,
}: AiCommandCenterHeroProps) {
  return (
    <header className="ai-cc-hero" aria-labelledby="ai-cc-hero-title">
      <div className="ai-cc-hero__bg" aria-hidden>
        <div className="ai-cc-hero__bg-tone" />
        <div className="ai-cc-hero__bg-scrim" />
      </div>

      <div className="ai-cc-hero__content">
        <div className="ai-cc-hero__text">
          <h1 id="ai-cc-hero-title" className="ai-cc-hero__title">
            {title}
          </h1>
          <div className="ai-cc-hero__tags">
            <BadgeList items={splitBadges(HERO_KEYWORDS)} />
          </div>
          <p className="ai-cc-hero__description">{description}</p>
          <p className="ai-cc-hero__role">
            <span className="ai-cc-hero__role-label">Role</span>
            <span className="ai-cc-hero__role-value">{role}</span>
          </p>
        </div>

        <div className="ai-cc-hero__media" role="group" aria-label="AI Command Center hero media">
          <div className="ai-cc-hero__media-frame">
            {/* Future hero video: replace the Image below with
                <video className="ai-cc-hero__media-video" src="/videos/AI-Command-Center/hero.mp4"
                       autoPlay muted loop playsInline preload="metadata"
                       poster={HERO_COVER} aria-label="AI Command Center product walkthrough" /> */}
            <Image
              className="ai-cc-hero__media-image"
              src={HERO_COVER}
              alt="AI-powered operational command center interface"
              fill
              sizes="(max-width: 768px) 96vw, min(1180px, 96vw)"
              priority
            />
          </div>
        </div>
      </div>
    </header>
  );
}
