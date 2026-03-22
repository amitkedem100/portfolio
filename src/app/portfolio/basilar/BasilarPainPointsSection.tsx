import { PainPointsSection } from "@/app/portfolio/components/PainPointsSection";
import { basilarPainPointsSectionProps } from "@/data/basilarPainPoints";

export function BasilarPainPointsSection() {
  return (
    <PainPointsSection
      {...basilarPainPointsSectionProps}
      className="basilar-page-section basilar-painpoints-section"
    />
  );
}
