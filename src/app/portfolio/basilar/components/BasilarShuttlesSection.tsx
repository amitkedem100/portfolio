import "@/app/portfolio/components/ProjectTextSection.css";
import {
  BasilarUISegmentBlock,
  type BasilarUISegmentContent,
} from "@/app/portfolio/basilar/components/BasilarUISegmentBlock";
import "./BasilarShuttlesSection.css";

const SHUTTLES_SEGMENT: BasilarUISegmentContent = {
  id: "shuttles",
  label: "Shuttles",
  title: "Seamless Travel",
  description:
    "Basilar shuttles are part of the festival experience, offering a smooth ride to and from the venue. With clear Arrival and Departure tabs, users can quickly check schedules and purchase tickets without interrupting the flow of the event.",
  deviceVideoSrc: "/images/basilar/arrival-departure 1.mp4",
  deviceVideoAriaLabel: "Basilar shuttle arrival flow",
  secondaryDeviceVideoSrc: "/images/basilar/arrival-departure 2.mp4",
  secondaryDeviceVideoAriaLabel: "Basilar shuttle departure flow",
};

export function BasilarShuttlesSection() {
  return (
    <section
      className="basilar-page-section basilar-page-ui-shuttles project-text-section"
      aria-labelledby="basilar-ui-segment-title-shuttles"
    >
      <div className="project-text-section-inner">
        <BasilarUISegmentBlock segment={SHUTTLES_SEGMENT} reverse />
      </div>
    </section>
  );
}
