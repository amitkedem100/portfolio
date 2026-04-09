import "@/app/portfolio/components/ProjectTextSection.css";
import "./SaasDashboardApproachSection.css";

const CORE_PRINCIPLES = [
  {
    title: "Dual-Level Experience",
    description:
      "Different roles require different perspectives. Executives receive a broad, comparative overview across sites, while site-level users focus on operational insights and immediate actions within a specific environment.",
  },
  {
    title: "Modular Widget System",
    description:
      "A flexible widget-based structure allows the dashboard to adapt to different roles, use cases, and future needs - enabling scalability without redesigning the system.",
  },
  {
    title: "Engagement Through Design",
    description:
      "Safety is often perceived as a secondary concern. The interface introduces clarity, visual feedback, and a sense of progress to encourage ongoing engagement and promote a culture of accountability.",
  },
];

export function SaasDashboardApproachSection() {
  return (
    <section
      className="saas-page-section saas-dashboard-approach project-text-section"
      aria-labelledby="saas-dashboard-approach-title"
    >
      <div className="project-text-section-inner">
        <div className="saas-dashboard-approach__inner">
          <header className="saas-dashboard-approach__header project-text-section-inner--prose">
            <p className="saas-dashboard-approach__label">Dashboard Approach</p>
            <h2 id="saas-dashboard-approach-title" className="saas-dashboard-approach__title">
              Designing for Clarity in a Complex System
            </h2>
          </header>

          <p className="saas-dashboard-approach__description project-text-section-inner--prose">
            A system designed to translate complex safety data into clear, actionable insights - tailored to
            different user levels while encouraging engagement, awareness, and accountability.
          </p>

          <div className="saas-dashboard-approach__cards" role="list" aria-label="Dashboard core principles">
            {CORE_PRINCIPLES.map((principle) => (
              <article key={principle.title} className="saas-dashboard-approach-card" role="listitem">
                <h3 className="saas-dashboard-approach-card__title">{principle.title}</h3>
                <p className="saas-dashboard-approach-card__description">{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
