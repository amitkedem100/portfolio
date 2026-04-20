import "./saas-desktop-video.css";
import "./SaasHeroSection.css";
import { BadgeList } from "@/app/portfolio/components/BadgeList";

const HERO_BACKGROUND_VIDEO = "/videos/Astra/background.mp4";
const HERO_LOGO = encodeURI("/images/SaaS/Astra Logo.svg");

const HERO_TAGS = ["SaaS Platform", "Safety Analytics", "AI Monitoring", "2026"] as const;

export function SaasHeroSection() {
  return (
    <header className="saas-hero" aria-labelledby="saas-hero-title">
      <div className="saas-hero__bg">
        <video
          className="saas-hero__bg-video"
          src={HERO_BACKGROUND_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
        <div className="saas-hero__bg-fallback" />
        <div className="saas-hero__bg-scrim" />
      </div>

      <div className="saas-hero__content">
        <div className="saas-hero__text">
          <h1 id="saas-hero-title" className="saas-hero__title">
            Astra
          </h1>
          <p className="saas-hero__description">
            A safety intelligence platform designed to monitor, analyze, and improve construction site safety
            through AI-driven insights and real-time reporting.
          </p>
          <div className="saas-hero__tags">
            <BadgeList items={[...HERO_TAGS]} />
          </div>
        </div>

        <div className="saas-hero__devices" role="group" aria-label="Astra hero visual">
          <div className="saas-hero__desktop-frame">
            <video
              className="saas-hero__desktop-blur-bg"
              src={HERO_BACKGROUND_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
            />
            <img
              className="saas-hero__desktop-video"
              src={HERO_LOGO}
              alt="Astra logo"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
