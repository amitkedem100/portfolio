import Image from "next/image";
import { BasilarUISegmentRevealBody } from "@/app/portfolio/basilar/components/BasilarUISegmentRevealBody";
import "@/app/portfolio/components/ProjectTextSection.css";
import "./BasilarDroppedPinSection.css";

const DROP_PIN_VIDEO = encodeURI("/videos/basilar/drop pin.mp4");
const DROP_PIN_ILLUSTRATION = "/images/basilar/drop-pin-illustration.png";
/* Source asset is square (757×757); layout must keep 1:1 — no fixed short height */
const DROP_PIN_ILLUSTRATION_SIZE = 757 as const;

/* Text left; square video + illustration on the right (video left of image) */
export function BasilarDroppedPinSection() {
  return (
    <section
      className="basilar-page-section basilar-page-ui-dropped-pin project-text-section"
      aria-labelledby="basilar-dropped-pin-title"
    >
      <div className="project-text-section-inner">
        <article
          className="basilar-ui-segment basilar-dropped-pin-segment"
          aria-labelledby="basilar-dropped-pin-title"
        >
          <BasilarUISegmentRevealBody className="basilar-dropped-pin-segment__body">
            <h3 id="basilar-dropped-pin-title" className="basilar-ui-segment__title">
              Dropped pin
            </h3>
            <p className="basilar-ui-segment__description">
              Pin important spots like your tent and car for quick access. Easily find your way back, even in
              busy areas, and share your location with new friends.
            </p>
          </BasilarUISegmentRevealBody>

          <div className="basilar-ui-segment__media basilar-dropped-pin-segment__media">
            <div
              className="basilar-dropped-pin-visuals"
              role="group"
              aria-label="Dropped pin — square capture and distance markers"
            >
              <div className="basilar-dropped-pin-video-wrap">
                <video
                  className="basilar-dropped-pin-video"
                  src={DROP_PIN_VIDEO}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Basilar dropped pin screen"
                />
              </div>
              <div className="basilar-dropped-pin-illustration-wrap">
                {/* Rounded panel — same height as video square, slightly inset vs illustration */}
                <div className="basilar-dropped-pin-illustration-bg" aria-hidden="true" />
                <Image
                  className="basilar-dropped-pin-illustration"
                  src={DROP_PIN_ILLUSTRATION}
                  alt=""
                  width={DROP_PIN_ILLUSTRATION_SIZE}
                  height={DROP_PIN_ILLUSTRATION_SIZE}
                  sizes="(max-width: 768px) min(240px, 72vw) min(300px, 36vw)"
                />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
