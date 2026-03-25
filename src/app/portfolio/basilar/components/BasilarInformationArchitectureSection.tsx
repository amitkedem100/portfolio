import { InformationArchitectureSection } from "@/app/portfolio/components/InformationArchitectureSection";
import { basilarInformationArchitectureProps } from "@/data/basilarInformationArchitecture";
import "./BasilarInformationArchitectureSection.css";

export function BasilarInformationArchitectureSection() {
  return (
    <InformationArchitectureSection
      {...basilarInformationArchitectureProps}
      className="basilar-page-section basilar-page-ia"
    />
  );
}
