import Image from "next/image";
import "@/app/portfolio/components/ProjectTextSection.css";
import "./SaasStackedMediaBlock.css";
import "./SaasDashboardWidgetsSection.css";

const LIVE_INCIDENT_VIDEO = encodeURI("/videos/Astra/Live Incident example.mp4");
const KEY_FINDINGS_LIST_IMG = encodeURI("/images/SaaS/key findings1.png");

type WidgetSegment = {
  id: string;
  label: string;
  title: string;
  description: string;
  /** Standard segment: single image in media column (text left, image right when not reversed) */
  mediaImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    sizes: string;
  };
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
    mediaImage: {
      src: KEY_FINDINGS_LIST_IMG,
      alt: "Company-level key findings list in Astra",
      width: 569,
      height: 371,
      sizes: "(max-width: 768px) 92vw, min(560px, 38vw)",
    },
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
        <header className="saas-dashboard-widgets__header">
          <h2 id="saas-dashboard-widgets-title" className="saas-dashboard-widgets__title">
            Widget Deep Dive
          </h2>
          <p className="saas-dashboard-widgets__intro">Focused Widgets, Actionable Decisions</p>
        </header>

        <div className="saas-dashboard-widgets__segments">
          {WIDGET_SEGMENTS.map((segment, index) => {
            if (segment.id === "live-incident") {
              return (
                <article
                  key={segment.id}
                  className="saas-stacked-media-block"
                  aria-labelledby={`saas-dashboard-widget-title-${segment.id}`}
                >
                  <header className="saas-stacked-media-block__header project-text-section-inner--prose">
                    <p className="saas-stacked-media-block__label">{segment.label}</p>
                    <h3
                      id={`saas-dashboard-widget-title-${segment.id}`}
                      className="saas-stacked-media-block__title"
                    >
                      {segment.title}
                    </h3>
                  </header>
                  <div className="saas-stacked-media-block__description project-text-section-inner--prose">
                    <p>{segment.description}</p>
                  </div>
                  <div className="saas-stacked-media-block__media-wrap">
                    <div className="saas-dashboard-widget-live-incident__frame">
                      <video
                        className="saas-dashboard-widget-live-incident__video"
                        src={LIVE_INCIDENT_VIDEO}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label="Live incident widget in Astra"
                      />
                    </div>
                  </div>
                </article>
              );
            }

            /* Key Findings only: image left, text right (row-reverse). Others: alternating by index */
            const reverse =
              segment.id === "key-findings" ? true : index % 2 === 1;
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
                  {segment.mediaImage ? (
                    <div className="saas-dashboard-widget-segment__media-frame">
                      <Image
                        className="saas-dashboard-widget-segment__media-img"
                        src={segment.mediaImage.src}
                        alt={segment.mediaImage.alt}
                        width={segment.mediaImage.width}
                        height={segment.mediaImage.height}
                        sizes={segment.mediaImage.sizes}
                      />
                    </div>
                  ) : (
                    <div className="saas-dashboard-widget-segment__media-placeholder" aria-label={`${segment.title} media placeholder`} />
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
