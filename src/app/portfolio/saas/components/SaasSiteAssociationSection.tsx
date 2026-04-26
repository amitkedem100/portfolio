import Image from "next/image";
import "@/app/portfolio/components/ProjectTextSection.css";
import { SaasSegmentRevealBody } from "@/app/portfolio/saas/components/SaasSegmentRevealBody";
import "./SaasSiteAssociationSection.css";

const SITE_ASSOCIATION_IMG = "/images/SaaS/site-association-card.png";

/* Same rhythm as Basilar Live Feed: section padding + text column + media column */
export function SaasSiteAssociationSection() {
  return (
    <section
      className="saas-page-section saas-site-association project-text-section"
      aria-labelledby="saas-site-association-title"
    >
      <div className="project-text-section-inner">
        <article className="saas-site-association-segment">
          <SaasSegmentRevealBody className="saas-site-association__body">
            <p className="saas-site-association__label">Site Association</p>
            <h2 id="saas-site-association-title" className="saas-site-association__title">
              Role-Based Invitation
            </h2>
            <div className="saas-site-association__description">
              <p>
                Users are assigned to specific sites based on their role, ensuring access to the right data and
                operational context.
              </p>
              <p>
                Site-level users are connected to a defined environment, while higher-level roles maintain a
                broader view across multiple sites without a fixed association.
              </p>
            </div>
          </SaasSegmentRevealBody>

          <div className="saas-site-association__media">
            <Image
              className="saas-site-association__img"
              src={SITE_ASSOCIATION_IMG}
              alt="Site invitation card: assigned site F-Center in Astra"
              width={640}
              height={280}
              sizes="(max-width: 768px) min(360px, 92vw) min(320px, 36vw)"
            />
          </div>
        </article>
      </div>
    </section>
  );
}
