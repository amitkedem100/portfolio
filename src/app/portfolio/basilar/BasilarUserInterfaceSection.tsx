import "@/app/portfolio/components/ProjectTextSection.css";
import "./BasilarUserInterfaceSection.css";

type BasilarUISegment = {
  id: string;
  label: string;
  title: string;
  description: string;
  deviceVideoSrc: string;
  deviceVideoAriaLabel: string;
};

type BasilarUISegmentProps = {
  segment: BasilarUISegment;
  reverse?: boolean;
};

function BasilarUISegmentBlock({ segment, reverse = false }: BasilarUISegmentProps) {
  return (
    <article
      className={reverse ? "basilar-ui-segment basilar-ui-segment--reverse" : "basilar-ui-segment"}
      aria-labelledby={`basilar-ui-segment-title-${segment.id}`}
    >
      <div className="basilar-ui-segment__body">
        <p className="basilar-ui-segment__label">{segment.label}</p>
        <h3 id={`basilar-ui-segment-title-${segment.id}`} className="basilar-ui-segment__title">
          {segment.title}
        </h3>
        <p className="basilar-ui-segment__description">{segment.description}</p>
      </div>

      <div className="basilar-ui-segment__media">
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
      </div>
    </article>
  );
}

const UI_SEGMENTS: BasilarUISegment[] = [
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
            Every design element in the app is crafted to address Basilar&apos;s core challenges, from
            streamlined token workflows to intuitive navigation.
          </p>
          <p className="basilar-ui-intro">
            Together, they create a seamless, high-end experience that supports both attendee needs and
            festival logistics.
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
