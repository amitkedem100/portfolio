import "./ProjectVideoHero.css";
import { BadgeList, splitBadges } from "./BadgeList";

export type ProjectVideoHeroProps = {
  title: string;
  description: string;
  meta: string;
  backgroundVideoSrc: string;
  deviceVideoSrc: string;
  deviceVideoAriaLabel?: string;
};

export function ProjectVideoHero({
  title,
  description,
  meta,
  backgroundVideoSrc,
  deviceVideoSrc,
  deviceVideoAriaLabel = "Product walkthrough video",
}: ProjectVideoHeroProps) {
  return (
    <header className="project-video-hero" aria-labelledby="project-video-hero-title">
      <div className="project-video-hero-bg">
        <video
          className="project-video-hero-bg-video"
          src={backgroundVideoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
        <div className="project-video-hero-bg-fallback" />
        <div className="project-video-hero-bg-scrim" />
      </div>

      <div className="project-video-hero-stack">
        <div className="project-video-hero-text">
          <h1 id="project-video-hero-title" className="project-video-hero-title">
            {title}
          </h1>
          <p className="project-video-hero-description">{description}</p>
          <div className="project-video-hero-meta">
            <BadgeList items={splitBadges(meta)} />
          </div>
        </div>

        <div className="project-video-hero-device-wrap">
          <div className="project-video-hero-device">
            <video
              className="project-video-hero-device-video"
              src={deviceVideoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={deviceVideoAriaLabel}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
