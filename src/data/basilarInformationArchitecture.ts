import type { InformationArchitectureSectionProps } from "@/app/portfolio/components/InformationArchitectureSection";

export const basilarInformationArchitectureProps: InformationArchitectureSectionProps = {
  title: "Information Architecture",
  intro:
    "To address the identified pain points, the app structure was designed to simplify navigation, reduce friction, and centralize key services.",
  decisionsTitle: "Key Structure Decisions",
  decisions: [
    "Core features are accessible directly from the homepage to reduce navigation depth",
    "Transportation and ticketing are prioritized due to their impact on user flow",
    "Real-time features are embedded within each section to reduce context switching",
  ],
};
