import { ImageCarousel } from "@/app/portfolio/components/ImageCarousel";
import "@/app/portfolio/components/ProjectTextSection.css";
import { SaasStackedMediaBlock } from "@/app/portfolio/saas/components/SaasStackedMediaBlock";
import "./SaasDashboardDualLayoutsSection.css";

const SITE_LEVEL_SCREENSHOT = encodeURI("/images/SaaS/SiteLevel screenshot.png");
const EXECUTIVE_LEVEL_SCREENSHOT = encodeURI("/images/SaaS/ExecutiveLevel screenshot.png");

const DASHBOARD_DUAL_LAYOUT_SLIDES = [
  {
    src: SITE_LEVEL_SCREENSHOT,
    alt: "Astra site-level dashboard layout",
    width: 1024,
    height: 512,
  },
  {
    src: EXECUTIVE_LEVEL_SCREENSHOT,
    alt: "Astra executive-level dashboard layout",
    width: 1024,
    height: 512,
  },
];

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
            media={
              <ImageCarousel
                className="saas-dashboard-dual-layouts__carousel"
                slides={DASHBOARD_DUAL_LAYOUT_SLIDES}
                sizes="(max-width: 768px) 92vw, 1180px"
              />
            }
          />
        </div>
      </div>
    </section>
  );
}
