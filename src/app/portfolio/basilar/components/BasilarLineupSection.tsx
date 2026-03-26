import "@/app/portfolio/components/ProjectTextSection.css";
import {
  BasilarUISegmentBlock,
  type BasilarUISegmentContent,
} from "@/app/portfolio/basilar/components/BasilarUISegmentBlock";
import "./BasilarLineupSection.css";

const LINEUP_SEGMENT: BasilarUISegmentContent = {
  id: "lineup",
  label: "Lineup",
  title: "The Beat of the Festival",
  description:
    "Check your favorite artists' set times to make sure you don't miss them. With a packed three-day schedule, it's easy to forget when your idols are playing.",
  deviceVideoSrc: "/videos/basilar/Lineup.mp4",
  deviceVideoAriaLabel: "Basilar lineup and set times",
};

export function BasilarLineupSection() {
  return (
    <section
      className="basilar-page-section basilar-page-ui-lineup project-text-section"
      aria-labelledby="basilar-ui-segment-title-lineup"
    >
      <div className="project-text-section-inner">
        <BasilarUISegmentBlock segment={LINEUP_SEGMENT} reverse />
      </div>
    </section>
  );
}
