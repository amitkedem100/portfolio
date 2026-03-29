import type { InformationArchitectureSectionProps } from "@/app/portfolio/components/InformationArchitectureSection";

export const basilarInformationArchitectureProps: InformationArchitectureSectionProps = {
  title: "Information Architecture",
  intro:
    "To address the identified pain points, the app structure was designed to simplify navigation, reduce friction, and centralize key services.",
  decisionsTitle: "Key Structure Decisions",
  decisions: [
    <>
      The experience is divided into six clear sections, enabling{" "}
      <strong>fast orientation with minimal learning</strong>.
    </>,
    <>
      <strong>Tickets, Shuttles, and Tokens</strong> support{" "}
      <strong>essential event actions</strong>, while the remaining sections enhance comfort, trust,
      and overall experience.
    </>,
  ],
};
