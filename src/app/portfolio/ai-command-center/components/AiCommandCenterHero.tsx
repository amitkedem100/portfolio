import { BadgeList, splitBadges } from "@/app/portfolio/components/BadgeList";
import { AiCommandCenterHeroPlaylistVideo } from "./AiCommandCenterHeroPlaylistVideo";
import "./AiCommandCenterHero.css";

const HERO_BACKGROUND_VIDEO = "/videos/AI-Command-Center/background.mp4";
const HERO_PRODUCT_VIDEO_1 = "/videos/AI-Command-Center/hero-1.mp4";
const HERO_PRODUCT_VIDEO_2 = "/videos/AI-Command-Center/hero-2.mp4";
const HERO_KEYWORDS = "AI Operations · Complex System · Operational UX · 2026";

type AiCommandCenterHeroProps = {
  title: string;
  description: string;
};

export function AiCommandCenterHero({
  title,
  description,
}: AiCommandCenterHeroProps) {
  return (
    <header className="ai-cc-hero" aria-labelledby="ai-cc-hero-title">
      <div className="ai-cc-hero__bg" aria-hidden>
        <video
          className="ai-cc-hero__bg-video"
          src={HERO_BACKGROUND_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="ai-cc-hero__bg-fallback" />
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
        </div>

        <div className="ai-cc-hero__media" role="group" aria-label="AI Command Center hero media">
          <div className="ai-cc-hero__media-frame">
            <AiCommandCenterHeroPlaylistVideo
              className="ai-cc-hero__media-video"
              firstSrc={HERO_PRODUCT_VIDEO_1}
              secondSrc={HERO_PRODUCT_VIDEO_2}
              ariaLabel="AI Command Center product walkthrough"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
