import "@/app/portfolio/components/ProjectVideoHero.css";
import "./BasilarUISegmentBlock.css";

export type BasilarUISegmentContent = {
  id: string;
  label: string;
  title: string;
  description: string;
  deviceVideoSrc: string;
  deviceVideoAriaLabel: string;
  secondaryDeviceVideoSrc?: string;
  secondaryDeviceVideoAriaLabel?: string;
  /* Wider UI capture: phone frame + contain so full frame stays visible */
  mediaPresentation?: "phone" | "live-feed";
};

type BasilarUISegmentBlockProps = {
  segment: BasilarUISegmentContent;
  reverse?: boolean;
};

/* Shared two-column UI block: text + device video (zig-zag via reverse) */
export function BasilarUISegmentBlock({ segment, reverse = false }: BasilarUISegmentBlockProps) {
  const hasSecondary = Boolean(segment.secondaryDeviceVideoSrc);
  const isLiveFeedMedia = segment.mediaPresentation === "live-feed";
  const articleClassName = [
    reverse ? "basilar-ui-segment basilar-ui-segment--reverse" : "basilar-ui-segment",
    isLiveFeedMedia ? "basilar-ui-segment--live-feed-media" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={articleClassName} aria-labelledby={`basilar-ui-segment-title-${segment.id}`}>
      <div className="basilar-ui-segment__body">
        <p className="basilar-ui-segment__label">{segment.label}</p>
        <h3 id={`basilar-ui-segment-title-${segment.id}`} className="basilar-ui-segment__title">
          {segment.title}
        </h3>
        <p className="basilar-ui-segment__description">{segment.description}</p>
      </div>

      <div
        className={
          hasSecondary
            ? "basilar-ui-segment__media basilar-ui-segment__media--stacked"
            : "basilar-ui-segment__media"
        }
      >
        {hasSecondary ? (
          <div className="basilar-ui-segment__stack">
            <div className="project-video-hero-device-wrap basilar-ui-segment__device-wrap basilar-ui-segment__device-wrap--stack-left">
              <div className="project-video-hero-device basilar-ui-segment__device">
                <video
                  className="project-video-hero-device-video"
                  src={segment.deviceVideoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={segment.deviceVideoAriaLabel}
                />
              </div>
            </div>
            <div className="project-video-hero-device-wrap basilar-ui-segment__device-wrap basilar-ui-segment__device-wrap--stack-right">
              <div className="project-video-hero-device basilar-ui-segment__device">
                <video
                  className="project-video-hero-device-video"
                  src={segment.secondaryDeviceVideoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={segment.secondaryDeviceVideoAriaLabel ?? "Secondary screen"}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="project-video-hero-device-wrap basilar-ui-segment__device-wrap">
            <div className="project-video-hero-device basilar-ui-segment__device">
              <video
                className="project-video-hero-device-video"
                src={segment.deviceVideoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={segment.deviceVideoAriaLabel}
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
