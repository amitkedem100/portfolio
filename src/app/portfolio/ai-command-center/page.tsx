import type { Metadata } from "next";
import "@/app/portfolio/components/ProjectTextSection.css";
import { CursorZone } from "@/app/portfolio/components/CursorZone";
import { ViewOtherProjectSection } from "@/app/portfolio/components/ViewOtherProjectSection";
import {
  getMissingCredentialsDevHint,
  getMissingPresentationMessage,
  getPresentationUrl,
  getUnlockCredentials,
  hasValidAccessCookie,
} from "./access";
import { AccessGateModal } from "./components/AccessGateModal";
import { AiCommandCenterHero } from "./components/AiCommandCenterHero";
import "./page.css";

/* Cookie-gated preview must evaluate access on every request */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Command Center — Amit Kedem",
  description:
    "A private product design case study about an AI-powered operational command center.",
  robots: {
    index: false,
    follow: false,
  },
};

const PROJECT_TITLE = "AI Command Center";
const PROJECT_DESCRIPTION =
  "Designing an AI-powered command center that helps distributed operations teams turn real-time detections into faster, more reliable decisions.";
const PROJECT_ROLE = "Product Designer";

export default async function AiCommandCenterPage() {
  const unlockEnv = getUnlockCredentials();
  const hasAccess = unlockEnv.ok ? await hasValidAccessCookie() : false;
  const presentationUrl = hasAccess ? getPresentationUrl() : null;
  const isLocked = !hasAccess;
  const developerHint = isLocked ? getMissingCredentialsDevHint() : null;

  return (
    <div
      className={`ai-cc-page portfolio-page-inner-grid${isLocked ? " ai-cc-page--locked" : " ai-cc-page--unlocked"}`}
    >
      <div
        className="ai-cc-page__content"
        {...(isLocked ? { inert: true, "aria-hidden": true as const } : {})}
      >
        <section className="ai-cc-page-section ai-cc-page-hero" aria-label="AI Command Center project hero">
          <AiCommandCenterHero
            title={PROJECT_TITLE}
            description={PROJECT_DESCRIPTION}
            role={PROJECT_ROLE}
          />
        </section>

        {hasAccess ? (
          <section
            className="ai-cc-page-section ai-cc-page-access project-text-section"
            aria-labelledby="ai-cc-access-title"
          >
            <div className="ai-cc-access-panel project-text-section-inner project-text-section-inner--prose">
              <h2 id="ai-cc-access-title" className="ai-cc-access-panel__title">
                Access granted
              </h2>
              {presentationUrl ? (
                <>
                  <p className="ai-cc-access-panel__message">
                    You can open the private presentation for this case study.
                  </p>
                  <CursorZone variant="large">
                    <a
                      className="ai-cc-access-panel__open-link"
                      href={presentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open private presentation
                    </a>
                  </CursorZone>
                </>
              ) : (
                <p className="ai-cc-access-panel__message" role="status">
                  {getMissingPresentationMessage()}
                </p>
              )}
            </div>
          </section>
        ) : null}

        {/* Public-safe structural placeholders only — no protected case-study content */}
        {isLocked ? (
          <>
            <section
              className="ai-cc-page-section ai-cc-page-overview project-text-section"
              aria-hidden
            >
              <div className="project-text-section-inner">
                <div className="ai-cc-placeholder-prose project-text-section-inner--prose">
                  <div className="ai-cc-placeholder-heading" />
                  <div className="ai-cc-placeholder-line ai-cc-placeholder-line--lead" />
                  <div className="ai-cc-placeholder-line" />
                  <div className="ai-cc-placeholder-line" />
                  <div className="ai-cc-placeholder-line ai-cc-placeholder-line--short" />
                  <div className="ai-cc-placeholder-subheading" />
                  <div className="ai-cc-placeholder-block" />
                  <div className="ai-cc-placeholder-block" />
                </div>
              </div>
            </section>

            <section className="ai-cc-page-section ai-cc-page-band" aria-hidden>
              <div className="ai-cc-placeholder-band">
                <div className="ai-cc-placeholder-band__frame" />
              </div>
            </section>

            <section
              className="ai-cc-page-section ai-cc-page-overview project-text-section"
              aria-hidden
            >
              <div className="project-text-section-inner">
                <div className="ai-cc-placeholder-prose project-text-section-inner--prose">
                  <div className="ai-cc-placeholder-heading" />
                  <div className="ai-cc-placeholder-line" />
                  <div className="ai-cc-placeholder-line ai-cc-placeholder-line--short" />
                  <div className="ai-cc-placeholder-grid">
                    <div className="ai-cc-placeholder-card" />
                    <div className="ai-cc-placeholder-card" />
                    <div className="ai-cc-placeholder-card" />
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : null}

        <ViewOtherProjectSection currentProject="ai-command-center" />
      </div>

      {isLocked ? <AccessGateModal developerHint={developerHint} /> : null}
    </div>
  );
}
