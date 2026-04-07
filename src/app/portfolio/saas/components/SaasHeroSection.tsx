import "./SaasHeroSection.css";
import "./saas-desktop-video.css";

const HERO_BACKGROUND_VIDEO = "/videos/Astra/background.mp4";
const HERO_DESKTOP_VIDEO = "/videos/saas/hero-desktop.mp4";
const HERO_MOBILE_VIDEO = "/videos/saas/hero-mobile.mp4";

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
          <p className="saas-hero__tags">{HERO_TAGS.join(" \u00b7 ")}</p>
        </div>

        <div className="saas-hero__devices" role="group" aria-label="Desktop and mobile product previews">
          <div className="saas-hero__desktop-frame">
            <video
              className="saas-hero__desktop-video"
              src={HERO_DESKTOP_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Astra desktop product preview"
            />
          </div>

          <div className="saas-hero__mobile-frame">
            <video
              className="saas-hero__mobile-video"
              src={HERO_MOBILE_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Astra mobile product preview"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
