import "./ProjectTextSection.css";
import "./PainPointsSection.css";

export type PainPointBlock = {
  id: string;
  title: string;
  description: string;
};

export type PainPointsGroup = {
  id: string;
  personaTitle: string;
  points: PainPointBlock[];
};

export type PainPointsSectionProps = {
  title: string;
  intro: string;
  groups: PainPointsGroup[];
  className?: string;
};

/* Story-driven pain points by persona group — editorial, no cards */
export function PainPointsSection({
  title,
  intro,
  groups,
  className = "",
}: PainPointsSectionProps) {
  const titleId = "pain-points-section-title";

  return (
    <section
      className={`pain-points-section project-text-section ${className}`.trim()}
      aria-labelledby={titleId}
    >
      <div className="project-text-section-inner">
        <header className="pain-points-section-header">
          <h2 id={titleId} className="pain-points-section-title">
            {title}
          </h2>
          <p className="pain-points-section-intro">{intro}</p>
        </header>

        <div className="pain-points-section-groups">
          {groups.map((group, groupIndex) => (
            <div
              key={group.id}
              className={
                groupIndex > 0
                  ? "pain-points-group pain-points-group--divided"
                  : "pain-points-group"
              }
              aria-labelledby={`pain-points-group-${group.id}`}
            >
              <h3
                id={`pain-points-group-${group.id}`}
                className="pain-points-group-title"
              >
                {group.personaTitle}
              </h3>

              <div className="pain-points-group-items">
                {group.points.map((point) => (
                  <div
                    key={point.id}
                    className="pain-points-item"
                  >
                    <h4 className="pain-points-item-title">{point.title}</h4>
                    <p className="pain-points-item-description">{point.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
