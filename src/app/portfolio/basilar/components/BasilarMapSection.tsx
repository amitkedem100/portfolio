import "@/app/portfolio/components/ProjectVideoHero.css";
import "@/app/portfolio/components/ProjectTextSection.css";
import "./BasilarMapSection.css";

const MAP_VIDEO = "/videos/basilar/map.mp4";

/* Centered stack: label + title + copy, then device video below */
export function BasilarMapSection() {
  return (
    <section
      className="basilar-page-section basilar-page-ui-map project-text-section"
      aria-labelledby="basilar-map-title"
    >
      <div className="project-text-section-inner basilar-map-ui-inner">
        <p className="basilar-ui-segment__label">Map</p>
        <h3 id="basilar-map-title" className="basilar-ui-segment__title">
          Location Layout
        </h3>
        <p className="basilar-ui-segment__description basilar-map-ui-lead">
          Never get lost at Basilar! Easily see where you are and track your surroundings. Dynamic zones
          update as more people park, so you can stay oriented in crowded areas.
        </p>

        <div className="basilar-map-ui-video-wrap">
          <div className="project-video-hero-device-wrap basilar-map-ui-device-wrap">
            <div className="project-video-hero-device basilar-map-ui-device">
              <video
                className="project-video-hero-device-video"
                src={MAP_VIDEO}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Basilar map and location layout"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
