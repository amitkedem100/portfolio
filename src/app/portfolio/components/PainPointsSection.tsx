import type { ReactNode } from "react";
import "./ProjectTextSection.css";
import "./PainPointsSection.css";

export type PainPointBlock = {
  id: string;
  /** Single narrative: former title woven in + body; use <strong> sparingly */
  content: ReactNode;
};

export type PainPointsGroup = {
  id: string;
  personaName: string;
  personaRole: string;
  points: PainPointBlock[];
};

export type PainPointsSectionProps = {
  title: string;
  intro?: string;
  groups: PainPointsGroup[];
  className?: string;
};

/* Pain points as numbered lists (same pattern as Overview problems) */
export function PainPointsSection({
  title,
  intro,
  groups,
  className = "",
}: PainPointsSectionProps) {
  const titleId = "pain-points-section-title";
  const hasIntro = intro != null && intro !== "";

  return (
    <section
      className={`pain-points-section project-text-section ${className}`.trim()}
      aria-labelledby={titleId}
    >
      <div className="project-text-section-inner">
        <div className="project-text-section-inner--prose">
          <header
            className={
              hasIntro
                ? "pain-points-section-header"
                : "pain-points-section-header pain-points-section-header--no-intro"
            }
          >
            <h2 id={titleId} className="pain-points-section-title">
              {title}
            </h2>
            {hasIntro ? <p className="pain-points-section-intro">{intro}</p> : null}
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
                  <span className="pain-points-group-name">{group.personaName}</span>{" "}
                  <span className="pain-points-group-role">{group.personaRole}</span>
                </h3>

                <ol className="pain-points-problem-list">
                  {group.points.map((point) => (
                    <li key={point.id}>
                      <span className="pain-points-problem-list__text">{point.content}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
