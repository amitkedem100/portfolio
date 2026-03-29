import "@/app/portfolio/components/ProjectTextSection.css";
import {
  BasilarUISegmentBlock,
  type BasilarUISegmentContent,
} from "@/app/portfolio/basilar/components/BasilarUISegmentBlock";
import "./BasilarUserInterfaceSection.css";

const UI_SEGMENTS: BasilarUISegmentContent[] = [
  {
    id: "login",
    label: "Log In",
    title: "Get Connected",
    description:
      "The login screen sets the tone for the entire experience. Designed with a dark, minimal interface, it reflects the festival's atmosphere while maintaining clarity and ease of use. Quick access through Facebook and Google enables a fast, frictionless entry point, allowing users to get connected without interrupting the flow of the event.",
    deviceVideoSrc: "/videos/basilar/Log-in.mp4",
    deviceVideoAriaLabel: "Basilar login flow video",
  },
];

export function BasilarUserInterfaceSection() {
  return (
    <section
      className="basilar-page-section basilar-page-ui project-text-section"
      aria-labelledby="basilar-ui-title"
    >
      <div className="project-text-section-inner">
        <header className="basilar-ui-header">
          <h2 id="basilar-ui-title" className="basilar-ui-title">
            User Interface
          </h2>
          <p className="basilar-ui-intro">
          A clear, intuitive interface designed to support both attendee needs and festival operations.
          </p>
        </header>

        <div className="basilar-ui-segments">
          {UI_SEGMENTS.map((segment, index) => (
            <BasilarUISegmentBlock key={segment.id} segment={segment} reverse={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
