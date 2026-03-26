import "@/app/portfolio/components/ProjectTextSection.css";
import {
  BasilarUISegmentBlock,
  type BasilarUISegmentContent,
} from "@/app/portfolio/basilar/components/BasilarUISegmentBlock";
import "./BasilarFoodSection.css";

const FOOD_SEGMENT: BasilarUISegmentContent = {
  id: "food",
  label: "Food",
  title: "Easy Food Navigation",
  description:
    "The food area section highlights options for vegans and vegetarians, with meals available across three restaurants. It helps attendees easily navigate the busy food area, especially after dancing or late at night, ensuring a smooth and relaxing experience.",
  deviceVideoSrc: "/videos/basilar/food-area.mp4",
  deviceVideoAriaLabel: "Basilar food area navigation",
};

export function BasilarFoodSection() {
  return (
    <section
      className="basilar-page-section basilar-page-ui-food project-text-section"
      aria-labelledby="basilar-ui-segment-title-food"
    >
      <div className="project-text-section-inner">
        <BasilarUISegmentBlock segment={FOOD_SEGMENT} />
      </div>
    </section>
  );
}
