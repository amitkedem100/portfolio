import "@/app/portfolio/components/ProjectTextSection.css";
import {
  BasilarUISegmentBlock,
  type BasilarUISegmentContent,
} from "@/app/portfolio/basilar/components/BasilarUISegmentBlock";
import "./BasilarTicketsSection.css";

const TICKETS_SEGMENT: BasilarUISegmentContent = {
  id: "tickets",
  label: "Tickets",
  title: "Ready to Scan & Go",
  description:
    "The ticket section is designed for fast, frictionless entry, with clear access to camping details, bracelet information, and scan-ready passes. Color cues help users move quickly through the entry process while reducing confusion and crowding at the gate.",
  deviceVideoSrc: "/images/basilar/Ticket.mp4",
  deviceVideoAriaLabel: "Basilar tickets and scan flow",
};

export function BasilarTicketsSection() {
  return (
    <section
      className="basilar-page-section basilar-page-ui-tickets project-text-section"
      aria-labelledby="basilar-ui-segment-title-tickets"
    >
      <div className="project-text-section-inner">
        <BasilarUISegmentBlock segment={TICKETS_SEGMENT} />
      </div>
    </section>
  );
}
