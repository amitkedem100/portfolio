import "@/app/portfolio/components/ProjectTextSection.css";
import { SaasStackedMediaBlock } from "@/app/portfolio/saas/components/SaasStackedMediaBlock";
import "./SaasDashboardOverviewSection.css";

const DASHBOARD_OVERVIEW_VIDEO = encodeURI("/videos/Astra/Dashboard main starter.mp4");

export function SaasDashboardOverviewSection() {
  return (
    <section
      className="saas-page-section saas-dashboard-overview project-text-section"
      aria-labelledby="saas-dashboard-overview-title"
    >
      <div className="project-text-section-inner">
        <SaasStackedMediaBlock
          label="Dashboard"
          title="Operational Awareness, Reimagined"
          titleId="saas-dashboard-overview-title"
          revealText
          paragraphs={[
            "The dashboard presents real-time and historical safety data through a structured yet flexible layout.",
            "By combining key metrics, alerts, and contextual insights, it enables both executives and site teams to quickly understand the current state, identify risks, and take action.",
          ]}
          media={
            <div className="saas-dashboard-overview__media">
              <video
                className="saas-dashboard-overview__media-video"
                src={DASHBOARD_OVERVIEW_VIDEO}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Astra dashboard overview"
              />
            </div>
          }
        />
      </div>
    </section>
  );
}
