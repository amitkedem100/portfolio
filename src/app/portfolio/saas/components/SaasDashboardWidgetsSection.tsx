import "@/app/portfolio/components/ProjectTextSection.css";
import "./SaasDashboardWidgetsSection.css";

type WidgetSegment = {
  id: string;
  label: string;
  title: string;
  description: string;
};

const WIDGET_SEGMENTS: WidgetSegment[] = [
  {
    id: "live-incident",
    label: "Live Incident",
    title: "Immediate Visibility When It Matters Most",
    description:
      "A dedicated real-time widget appears dynamically during active incidents, providing a shared operational view across roles. It structures the event into three measurable stages - response, handling, and closure - enabling clear tracking, accountability, and post-event analysis.",
  },
  {
    id: "key-findings",
    label: "Insights",
    title: "Key Findings",
    description:
      "Actionable insights derived from aggregated data highlight where attention is needed most. Whether at the company or site level, these findings guide decision-making, reinforce safety priorities, and help define actionable goals.",
  },
  {
    id: "high-risk-workers",
    label: "Risk Detection",
    title: "High-Risk Workers",
    description:
      "Identifies workers with recurring safety issues, allowing site teams to address risks at an individual level. This helps prevent negative behavioral patterns from spreading and supports targeted interventions before issues escalate.",
  },
  {
    id: "suggested-patrol-time",
    label: "Optimization",
    title: "Suggested Patrol Time",
    description:
      "Analyzes incident patterns to recommend optimal patrol times. This allows safety managers to align their presence with peak risk periods, improving efficiency and increasing the impact of on-site supervision.",
  },
  {
    id: "company-sites-map",
    label: "Spatial Awareness",
    title: "Company Sites Map",
    description:
      "A visual overview of all company sites, displaying their current status through clear state indicators - closed, active, or with live incidents. This provides leadership with an immediate understanding of operational conditions across locations.",
  },
];

export function SaasDashboardWidgetsSection() {
  return (
    <section
      className="saas-page-section saas-dashboard-widgets project-text-section"
      aria-labelledby="saas-dashboard-widgets-title"
    >
      <div className="project-text-section-inner">
        <header className="saas-dashboard-widgets__header project-text-section-inner--prose">
          <p className="saas-dashboard-widgets__label">Widget Deep Dive</p>
          <h2 id="saas-dashboard-widgets-title" className="saas-dashboard-widgets__title">
            Focused Widgets, Actionable Decisions
          </h2>
        </header>

        <div className="saas-dashboard-widgets__segments">
          {WIDGET_SEGMENTS.map((segment, index) => {
            const reverse = index % 2 === 1;
            return (
              <article
                key={segment.id}
                className={`saas-dashboard-widget-segment${reverse ? " saas-dashboard-widget-segment--reverse" : ""}`}
                aria-labelledby={`saas-dashboard-widget-title-${segment.id}`}
              >
                <div className="saas-dashboard-widget-segment__body">
                  <p className="saas-dashboard-widget-segment__label">{segment.label}</p>
                  <h3 id={`saas-dashboard-widget-title-${segment.id}`} className="saas-dashboard-widget-segment__title">
                    {segment.title}
                  </h3>
                  <p className="saas-dashboard-widget-segment__description">{segment.description}</p>
                </div>

                <div className="saas-dashboard-widget-segment__media">
                  <div className="saas-dashboard-widget-segment__media-placeholder" aria-label={`${segment.title} media placeholder`} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
