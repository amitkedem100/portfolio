import "@/app/portfolio/basilar/components/BasilarUISegmentBlock.css";
import "@/app/portfolio/components/ProjectVideoHero.css";
import "@/app/portfolio/components/ProjectTextSection.css";
import "./BasilarSosSection.css";

const SOS_VIDEO = "/videos/basilar/SOS.mp4";

/* Horizontal segment: copy left, device right */
export function BasilarSosSection() {
  return (
    <section
      className="basilar-page-section basilar-page-ui-sos project-text-section"
      aria-labelledby="basilar-sos-title"
    >
      <div className="project-text-section-inner">
        <article className="basilar-ui-segment basilar-sos-segment" aria-labelledby="basilar-sos-title">
          <div className="basilar-ui-segment__body basilar-sos-segment__body">
            <h3 id="basilar-sos-title" className="basilar-sos-title">
              SOS: Stay Safe
            </h3>
            <p className="basilar-ui-segment__description">
              In a busy festival environment, safety is key. Use the SOS feature to{" "}
              <span className="basilar-sos-highlight">alert staff if you need help</span>
              {", ensuring you're never alone if things get tricky. Set boundaries, stay confident, and enjoy your time at Basilar with peace of mind."}
            </p>
          </div>

          <div className="basilar-ui-segment__media">
            <div className="project-video-hero-device-wrap basilar-ui-segment__device-wrap">
              <div className="project-video-hero-device basilar-ui-segment__device basilar-sos-device">
                <video
                  className="project-video-hero-device-video"
                  src={SOS_VIDEO}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Basilar SOS — stay safe, alert staff"
                />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
