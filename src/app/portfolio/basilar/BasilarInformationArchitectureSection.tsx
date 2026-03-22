import { InformationArchitectureSection } from "@/app/portfolio/components/InformationArchitectureSection";
import { basilarInformationArchitectureProps } from "@/data/basilarInformationArchitecture";

export function BasilarInformationArchitectureSection() {
  return (
    <InformationArchitectureSection
      {...basilarInformationArchitectureProps}
      className="basilar-page-section basilar-page-ia"
    />
  );
}
