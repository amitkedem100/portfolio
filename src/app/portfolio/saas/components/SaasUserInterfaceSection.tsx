import Image from "next/image";
import "@/app/portfolio/components/ProjectTextSection.css";
import "./SaasUserInterfaceSection.css";

const ONBOARDING_EXECUTIVE = "/images/saas/onboarding-executive.png";
const ONBOARDING_SITE_TEAM = "/images/saas/onboarding-site-team-member.png";

/* User Interface intro + Onboarding (stills) — structure aligned with Basilar UI segment */
export function SaasUserInterfaceSection() {
  return (
    <section
      className="saas-page-section saas-page-ui project-text-section"
      aria-labelledby="saas-ui-title"
    >
      <div className="project-text-section-inner">
        <header className="saas-ui-header">
          <h2 id="saas-ui-title" className="saas-ui-title">
            User Interface
          </h2>
          <p className="saas-ui-intro-text">
            A clear, structured interface designed to support safety monitoring, decision-making, and daily
            operations across different roles.
          </p>
        </header>

        <article
          className="saas-ui-segment"
          aria-labelledby="saas-ui-segment-title-onboarding"
        >
          <div className="saas-ui-segment__body">
            <p className="saas-ui-segment__label">Onboarding</p>
            <h3 id="saas-ui-segment-title-onboarding" className="saas-ui-segment__title">
              Initialize Access
            </h3>
            <div className="saas-ui-segment__description">
              <p>
                Sign-in supports email, phone verification, and SSO (e.g. Microsoft) so access stays secure and
                flexible for different users.
              </p>
              <p>
                Site-level users land in their assigned site context; executives enter a system-wide view without
                a fixed site. A short setup captures profile and role, then users can invite teammates, take a quick
                tour, or open account settings.
              </p>
            </div>
          </div>

          <div className="saas-ui-segment__media saas-ui-segment__media--onboarding-stills">
            <div className="saas-onboarding-stills">
              <Image
                className="saas-onboarding-still saas-onboarding-still--back"
                src={ONBOARDING_EXECUTIVE}
                alt="Astra onboarding — executive and organization-wide entry"
                width={1920}
                height={1080}
                sizes="(max-width: 768px) 92vw, min(880px, 82vw)"
              />
              <Image
                className="saas-onboarding-still saas-onboarding-still--front"
                src={ONBOARDING_SITE_TEAM}
                alt="Astra onboarding — site team member with site assignment and Microsoft sign-in"
                width={1920}
                height={1080}
                sizes="(max-width: 768px) 92vw, min(820px, 78vw)"
              />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
