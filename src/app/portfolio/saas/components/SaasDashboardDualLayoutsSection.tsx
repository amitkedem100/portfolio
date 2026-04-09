import "@/app/portfolio/components/ProjectTextSection.css";
import { SaasStackedMediaBlock } from "@/app/portfolio/saas/components/SaasStackedMediaBlock";
import "./SaasDashboardDualLayoutsSection.css";

export function SaasDashboardDualLayoutsSection() {
  return (
    <section
      className="saas-page-section saas-dashboard-dual-layouts project-text-section"
      aria-labelledby="saas-dashboard-dual-layouts-title"
    >
      <div className="project-text-section-inner">
        <div className="saas-dashboard-dual-layouts__inner">
          <SaasStackedMediaBlock
            label="User-Level Adaptation"
            title="Tailored Views for Different Roles"
            titleId="saas-dashboard-dual-layouts-title"
            paragraphs={[
              "Two distinct layouts support different decision-making needs.",
              "The executive view focuses on cross-site visibility and trends over time, with global filters and comparisons. The site-level view provides a more focused perspective, highlighting real-time activity, operational metrics, and immediate risks within a specific site.",
            ]}
            media={<div className="saas-dashboard-dual-layouts__media-placeholder" aria-label="Dual layouts media placeholder" />}
          />
        </div>
      </div>
    </section>
  );
}
