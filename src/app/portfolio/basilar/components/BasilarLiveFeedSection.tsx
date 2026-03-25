import "@/app/portfolio/components/ProjectTextSection.css";
import {
  BasilarUISegmentBlock,
  type BasilarUISegmentContent,
} from "@/app/portfolio/basilar/components/BasilarUISegmentBlock";
import "./BasilarLiveFeedSection.css";

const LIVE_FEED_SEGMENT: BasilarUISegmentContent = {
  id: "live-feed",
  label: "Live Feed",
  title: "Live Festival Updates!",
  description:
    "The feature provides real-time updates and important announcements, keeping attendees informed through daily highlights and organizer messages. This helps users stay aware of key moments, schedule changes, and unexpected updates throughout the event.",
  deviceVideoSrc: "/images/basilar/Live-feed.mp4",
  deviceVideoAriaLabel: "Basilar live feed updates",
  mediaPresentation: "live-feed",
};

export function BasilarLiveFeedSection() {
  return (
    <section
      className="basilar-page-section basilar-page-ui-live-feed project-text-section"
      aria-labelledby="basilar-ui-segment-title-live-feed"
    >
      <div className="project-text-section-inner">
        <BasilarUISegmentBlock segment={LIVE_FEED_SEGMENT} />
      </div>
    </section>
  );
}
