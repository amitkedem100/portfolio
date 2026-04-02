import { PersonasSection } from "@/app/portfolio/components/PersonasSection";
import { saasPersonasSectionProps } from "@/data/saasPersonas";
import "./SaasPersonasSection.css";

/* Astra / SaaS: wires persona copy into the shared PersonasSection (same structure as Basilar) */
export function SaasPersonasSection() {
  return (
    <PersonasSection
      {...saasPersonasSectionProps}
      className="saas-page-section saas-page-personas"
    />
  );
}
