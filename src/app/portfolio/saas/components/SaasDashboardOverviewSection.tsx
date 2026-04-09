import "@/app/portfolio/components/ProjectTextSection.css";
import { SaasStackedMediaBlock } from "@/app/portfolio/saas/components/SaasStackedMediaBlock";
import "./SaasDashboardOverviewSection.css";

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
          paragraphs={[
            "The dashboard presents real-time and historical safety data through a structured yet flexible layout.",
            "By combining key metrics, alerts, and contextual insights, it enables both executives and site teams to quickly understand the current state, identify risks, and take action.",
          ]}
          media={<div className="saas-dashboard-overview__media-placeholder" aria-label="Dashboard overview media placeholder" />}
        />
      </div>
    </section>
  );
}
