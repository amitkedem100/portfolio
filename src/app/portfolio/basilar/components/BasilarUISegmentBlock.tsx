import "@/app/portfolio/components/ProjectVideoHero.css";
import { BasilarUISegmentPlaylistVideo } from "@/app/portfolio/basilar/components/BasilarUISegmentPlaylistVideo";
import "./BasilarUISegmentBlock.css";

export type BasilarUISegmentContent = {
  id: string;
  label: string;
  title: string;
  description: string;
  deviceVideoSrc: string;
  deviceVideoAriaLabel: string;
  /* Two clips in one device — alternates on ended (Shuttles) */
  deviceVideoPlaylist?: readonly [string, string];
  /* Wider UI capture: phone frame + contain so full frame stays visible */
  mediaPresentation?: "phone" | "live-feed";
};

type BasilarUISegmentBlockProps = {
  segment: BasilarUISegmentContent;
  reverse?: boolean;
};

/* Shared two-column UI block: text + device video (zig-zag via reverse) */
export function BasilarUISegmentBlock({ segment, reverse = false }: BasilarUISegmentBlockProps) {
  const isLiveFeedMedia = segment.mediaPresentation === "live-feed";
  const liveFeedVideoExtraClass = isLiveFeedMedia ? "basilar-live-feed-device-video" : "";
  const playlist = segment.deviceVideoPlaylist;
  const usePlaylist = Boolean(playlist?.length === 2);

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

      <div className="basilar-ui-segment__media">
        {usePlaylist && playlist ? (
          <BasilarUISegmentPlaylistVideo
            firstSrc={playlist[0]}
            secondSrc={playlist[1]}
            ariaLabel={segment.deviceVideoAriaLabel}
          />
        ) : (
          <div className="project-video-hero-device-wrap basilar-ui-segment__device-wrap">
            <div className="project-video-hero-device basilar-ui-segment__device">
              <video
                className={["project-video-hero-device-video", liveFeedVideoExtraClass]
                  .filter(Boolean)
                  .join(" ")}
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
