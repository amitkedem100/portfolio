import { BasilarUISegmentRevealBody } from "@/app/portfolio/basilar/components/BasilarUISegmentRevealBody";
import "@/app/portfolio/basilar/components/BasilarUISegmentBlock.css";
import "@/app/portfolio/components/ProjectVideoHero.css";
import "@/app/portfolio/components/ProjectTextSection.css";
import "./BasilarWaveAFriendSection.css";

const WAVE_FRIEND_VIDEO = encodeURI("/videos/basilar/wave a friend.mp4");

/* Horizontal segment: device left, copy right (row-reverse) */
export function BasilarWaveAFriendSection() {
  return (
    <section
      className="basilar-page-section basilar-page-ui-wave-friend project-text-section"
      aria-labelledby="basilar-wave-friend-title"
    >
      <div className="project-text-section-inner">
        <article
          className="basilar-ui-segment basilar-ui-segment--reverse basilar-wave-friend-segment"
          aria-labelledby="basilar-wave-friend-title"
        >
          <BasilarUISegmentRevealBody className="basilar-wave-friend-segment__body">
            <h3 id="basilar-wave-friend-title" className="basilar-ui-segment__title">
              Wave a friend
            </h3>
            <p className="basilar-ui-segment__description">
              In a loud, crowded area with booming music? Simply share your location with friends directly
              through the Basilar app—no phone call needed, just a quick, easy way to meet up.
            </p>
          </BasilarUISegmentRevealBody>

          <div className="basilar-ui-segment__media">
            <div className="project-video-hero-device-wrap basilar-ui-segment__device-wrap">
              <div className="project-video-hero-device basilar-ui-segment__device basilar-wave-friend-device">
                <video
                  className="project-video-hero-device-video"
                  src={WAVE_FRIEND_VIDEO}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Basilar wave a friend — share location with friends"
                />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
