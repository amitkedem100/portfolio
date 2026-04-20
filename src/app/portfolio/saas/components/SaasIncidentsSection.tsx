import "@/app/portfolio/components/ProjectTextSection.css";
import { SaasStackedMediaBlock } from "@/app/portfolio/saas/components/SaasStackedMediaBlock";
import "./SaasIncidentsSection.css";

const INCIDENTS_PAGE_VIDEO = encodeURI("/videos/Astra/incidents page.mp4");

export function SaasIncidentsSection() {
  return (
    <section
      className="saas-page-section saas-incidents-section project-text-section"
      aria-labelledby="saas-incidents-title"
    >
      <div className="project-text-section-inner">
        <div className="saas-incidents-section__inner">
          <SaasStackedMediaBlock
            label="INCIDENTS"
            title="A Visual Record of Safety Events"
            titleId="saas-incidents-title"
            paragraphs={[
              "A structured, filterable gallery that centralizes all recorded incidents in one place.",
              "By combining visual evidence with clear categorization and search tools, users can quickly scan, review, and access relevant events without disrupting their workflow.",
            ]}
            media={
              <div className="saas-incidents-section__video-frame">
                <video
                  className="saas-incidents-section__video"
                  src={INCIDENTS_PAGE_VIDEO}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Astra incidents page"
                />
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
