import type { Metadata } from "next";
import "@/app/portfolio/components/ProjectTextSection.css";
import "./page.css";

export const metadata: Metadata = {
  title: "Command Center | Portfolio",
  description: "Command Center product design case study — in progress.",
};

export default function CommandCenterProjectPage() {
  return (
    <div className="command-center-page portfolio-page-inner-grid">
      <section
        className="command-center-page-section command-center-page-hero project-text-section"
        aria-labelledby="command-center-page-title"
      >
        <div className="project-text-section-inner">
          <h1 id="command-center-page-title" className="command-center-page-title">
            Command Center
          </h1>
          <p className="command-center-page-lead">
            Case study scaffolding — flows, IA, and interface explorations will be added as the case study
            takes shape.
          </p>
        </div>
      </section>
    </div>
  );
}
