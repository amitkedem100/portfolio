import type { Metadata } from "next";
import "@/app/portfolio/components/ProjectTextSection.css";
import { ViewOtherProjectSection } from "@/app/portfolio/components/ViewOtherProjectSection";
import {
  getMissingCredentialsDevHint,
  getUnlockCredentials,
  hasValidAccessCookie,
} from "./access";
import { AiCommandCenterAccessGateFlow } from "./components/AiCommandCenterAccessGateFlow";
import { AiCommandCenterHero } from "./components/AiCommandCenterHero";
import { AiCommandCenterOverviewSection } from "./components/AiCommandCenterOverviewSection";
import { AiCommandCenterVibePhotoSection } from "./components/AiCommandCenterVibePhotoSection";
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

export default async function AiCommandCenterPage() {
  const unlockEnv = getUnlockCredentials();
  const hasAccess = unlockEnv.ok ? await hasValidAccessCookie() : false;
  const isLocked = !hasAccess;
  const developerHint = isLocked ? getMissingCredentialsDevHint() : null;

  return (
    <div
      className={`ai-cc-page portfolio-page-inner-grid${isLocked ? " ai-cc-page--locked" : " ai-cc-page--unlocked"}`}
    >
      {/* Public First value — readable without an access code */}
      <div className="ai-cc-page__public">
        <section className="ai-cc-page-section ai-cc-page-hero" aria-label="AI Command Center project hero">
          <AiCommandCenterHero
            title={PROJECT_TITLE}
            description={PROJECT_DESCRIPTION}
          />
        </section>

        <AiCommandCenterOverviewSection />
      </div>

      {isLocked ? (
        <AiCommandCenterAccessGateFlow developerHint={developerHint} />
      ) : (
        <>
          <AiCommandCenterVibePhotoSection />
          <div className="ai-cc-page__content">
            <ViewOtherProjectSection currentProject="ai-command-center" />
          </div>
        </>
      )}
    </div>
  );
}
