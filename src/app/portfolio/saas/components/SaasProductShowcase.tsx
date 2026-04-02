import "./SaasProductShowcase.css";

const SHOWCASE_BG = "/images/saas/showcase-environment.png";
/* Placeholder until asset is added under public/videos/Astra/ */
const SHOWCASE_DESKTOP_VIDEO = "/videos/Astra/showcase-desktop.mp4";

/* Photo background + desktop video (same visual language as hero desktop frame; Basilar-style scrim on image) */
export function SaasProductShowcase() {
  return (
    <div className="saas-product-showcase">
      <div className="saas-product-showcase-bg" aria-hidden>
        <img
          className="saas-product-showcase-bg-img"
          src={SHOWCASE_BG}
          alt=""
          decoding="async"
          loading="lazy"
        />
        <div className="saas-product-showcase-scrim" />
      </div>

      <div className="saas-product-showcase-desktop-layer">
        <div className="saas-product-showcase-desktop-frame">
          <video
            className="saas-product-showcase-desktop-video"
            src={SHOWCASE_DESKTOP_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Astra product interface walkthrough"
          />
        </div>
      </div>
    </div>
  );
}
