import type { Metadata } from "next";
import "@/app/portfolio/components/ProjectTextSection.css";
import "./page.css";

export const metadata: Metadata = {
  title: "SaaS | Portfolio",
  description: "SaaS product design case study — in progress.",
};

export default function SaasProjectPage() {
  return (
    <div className="saas-page portfolio-page-inner-grid">
      <section
        className="saas-page-section saas-page-hero project-text-section"
        aria-labelledby="saas-page-title"
      >
        <div className="project-text-section-inner">
          <h1 id="saas-page-title" className="saas-page-title">
            SaaS
          </h1>
          <p className="saas-page-lead">
            Case study scaffolding — narrative, visuals, and metrics will land here as the project is
            documented.
          </p>
        </div>
      </section>
    </div>
  );
}
