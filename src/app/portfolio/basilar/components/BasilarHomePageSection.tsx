import "@/app/portfolio/components/ProjectTextSection.css";
import {
  BasilarUISegmentBlock,
  type BasilarUISegmentContent,
} from "@/app/portfolio/basilar/components/BasilarUISegmentBlock";
import "./BasilarHomePageSection.css";

const HOME_SEGMENT: BasilarUISegmentContent = {
  id: "home",
  label: "Home Page",
  title: "Hands On",
  description:
    "The homepage features six intuitive categories, a personalized greeting, and quick notifications at the top. A side menu handles essential details like legal info, keeping the experience clean and easy to navigate.",
  deviceVideoSrc: "/images/basilar/home-page.mp4",
  deviceVideoAriaLabel: "Basilar home page walkthrough",
};

/* Mirrored UI block: video left, text right (same segment component as User Interface section) */
export function BasilarHomePageSection() {
  return (
    <section
      className="basilar-page-section basilar-page-ui-home project-text-section"
      aria-labelledby="basilar-ui-segment-title-home"
    >
      <div className="project-text-section-inner">
        <BasilarUISegmentBlock segment={HOME_SEGMENT} reverse />
      </div>
    </section>
  );
}
