import { PainPointsSection } from "@/app/portfolio/components/PainPointsSection";
import { basilarPainPointsSectionProps } from "@/data/basilarPainPoints";
import "./BasilarPainPointsSection.css";

export function BasilarPainPointsSection() {
  return (
    <PainPointsSection
      {...basilarPainPointsSectionProps}
      className="basilar-page-section basilar-painpoints-section"
    />
  );
}
