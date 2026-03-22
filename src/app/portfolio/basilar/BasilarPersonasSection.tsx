import { PersonasSection } from "@/app/portfolio/components/PersonasSection";
import { basilarPersonasSectionProps } from "@/data/basilarPersonas";

/* Basilar project: wires structured persona copy into the shared PersonasSection */
export function BasilarPersonasSection() {
  return (
    <PersonasSection
      {...basilarPersonasSectionProps}
      className="basilar-page-section basilar-page-personas"
    />
  );
}
