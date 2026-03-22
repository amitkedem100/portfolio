import "./ProjectVideoHero.css";
import "./BasilarProductShowcase.css";

type BasilarProductShowcaseProps = {
  backgroundImageSrc: string;
  deviceVideoSrc: string;
  deviceVideoAriaLabel?: string;
};

/* Visual-only block: photo background + same device frame as ProjectVideoHero */
export function BasilarProductShowcase({
  backgroundImageSrc,
  deviceVideoSrc,
  deviceVideoAriaLabel = "Product interface walkthrough",
}: BasilarProductShowcaseProps) {
  return (
    <div className="basilar-product-showcase">
      <div className="basilar-product-showcase-bg" aria-hidden>
        <img
          className="basilar-product-showcase-bg-img"
          src={backgroundImageSrc}
          alt=""
          decoding="async"
          loading="lazy"
        />
        <div className="basilar-product-showcase-scrim" />
      </div>

      <div className="basilar-product-showcase-device-layer">
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
    </div>
  );
}
