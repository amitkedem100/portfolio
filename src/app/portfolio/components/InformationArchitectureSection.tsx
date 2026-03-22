import "./ProjectTextSection.css";
import "./InformationArchitectureSection.css";
import { InformationArchitectureDiagram } from "./InformationArchitectureDiagram";
import { InformationArchitectureInteractionHint } from "./InformationArchitectureInteractionHint";
import { InformationArchitectureMobileCarousel } from "./InformationArchitectureMobileCarousel";

export type InformationArchitectureSectionProps = {
  title: string;
  intro: string;
  decisionsTitle: string;
  decisions: string[];
  className?: string;
};

export function InformationArchitectureSection({
  title,
  intro,
  decisionsTitle,
  decisions,
  className = "",
}: InformationArchitectureSectionProps) {
  const titleId = "ia-section-title";

  return (
    <section
      className={`ia-section project-text-section ${className}`.trim()}
      aria-labelledby={titleId}
    >
      <div className="project-text-section-inner">
        <header className="ia-section-header">
          <h2 id={titleId} className="ia-section-title">
            {title}
          </h2>
          <p className="ia-section-intro">{intro}</p>
        </header>

        <div className="ia-section-diagram-wrap">
          <InformationArchitectureInteractionHint />
          <div className="ia-section-diagram-desktop">
            <InformationArchitectureDiagram />
          </div>
          <div className="ia-section-diagram-mobile">
            <InformationArchitectureMobileCarousel />
          </div>
        </div>

        <div className="ia-section-decisions">
          <h3 className="ia-section-decisions-title">{decisionsTitle}</h3>
          <ul className="ia-section-decisions-list">
            {decisions.map((item, i) => (
              <li key={`ia-decision-${i}`}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
