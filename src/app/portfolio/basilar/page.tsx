import type { Metadata } from "next";
import "@/app/portfolio/components/ProjectTextSection.css";
import "./page.css";
import { BasilarInformationArchitectureSection } from "@/app/portfolio/basilar/components/BasilarInformationArchitectureSection";
import { BasilarLiveFeedSection } from "@/app/portfolio/basilar/components/BasilarLiveFeedSection";
import { BasilarPainPointsSection } from "@/app/portfolio/basilar/components/BasilarPainPointsSection";
import { BasilarPersonasSection } from "@/app/portfolio/basilar/components/BasilarPersonasSection";
import { BasilarHomePageSection } from "@/app/portfolio/basilar/components/BasilarHomePageSection";
import { BasilarDroppedPinSection } from "@/app/portfolio/basilar/components/BasilarDroppedPinSection";
import { BasilarFoodSection } from "@/app/portfolio/basilar/components/BasilarFoodSection";
import { BasilarLineupSection } from "@/app/portfolio/basilar/components/BasilarLineupSection";
import { BasilarMapSection } from "@/app/portfolio/basilar/components/BasilarMapSection";
import { BasilarScreenshotsSection } from "@/app/portfolio/basilar/components/BasilarScreenshotsSection";
import { BasilarSetReminderSection } from "@/app/portfolio/basilar/components/BasilarSetReminderSection";
import { BasilarFestivalVibeSection } from "@/app/portfolio/basilar/components/BasilarFestivalVibeSection";
import { BasilarShuttlesSection } from "@/app/portfolio/basilar/components/BasilarShuttlesSection";
import { BasilarSosSection } from "@/app/portfolio/basilar/components/BasilarSosSection";
import { BasilarStyleGuideSection } from "@/app/portfolio/basilar/components/BasilarStyleGuideSection";
import { BasilarThanksSection } from "@/app/portfolio/basilar/components/BasilarThanksSection";
import { BasilarTicketsSection } from "@/app/portfolio/basilar/components/BasilarTicketsSection";
import { BasilarTokensSection } from "@/app/portfolio/basilar/components/BasilarTokensSection";
import { BasilarUITeaserSection } from "@/app/portfolio/basilar/components/BasilarUITeaserSection";
import { BasilarUserInterfaceSection } from "@/app/portfolio/basilar/components/BasilarUserInterfaceSection";
import { BasilarWaveAFriendSection } from "@/app/portfolio/basilar/components/BasilarWaveAFriendSection";
import { BasilarProductShowcase } from "@/app/portfolio/components/BasilarProductShowcase";
import { ProjectVideoHero } from "@/app/portfolio/components/ProjectVideoHero";
import { ViewOtherProjectSection } from "@/app/portfolio/components/ViewOtherProjectSection";

export const metadata: Metadata = {
  title: "Basilar | Portfolio",
  description:
    "Basilar — mobile UX for multi-day music festival logistics and real-time updates.",
};

const BASILAR_BG_VIDEO = "/videos/basilar/background.mp4";
const BASILAR_DEVICE_VIDEO = "/videos/basilar/device.mp4";
const BASILAR_SHOWCASE_BG_IMAGE = "/images/basilar/showcase-environment.png";
const BASILAR_SHOWCASE_WALKTHROUGH = "/videos/basilar/walkthrough.mp4";

export default function BasilarProjectPage() {
  return (
    <div className="basilar-page basilar-project portfolio-page-inner-grid">
      <section className="basilar-page-section basilar-page-hero" aria-label="Basilar project hero">
        <ProjectVideoHero
          title="Basilar"
          description="A mobile product designed to simplify the logistics of a multi-day music festival experience—from entry and transport to food, navigation, and real-time updates."
          meta="Festival Experience · Mobile UX · Personal Project · May 2023"
          backgroundVideoSrc={BASILAR_BG_VIDEO}
          deviceVideoSrc={BASILAR_DEVICE_VIDEO}
        />
      </section>

      <section
        className="basilar-page-section basilar-page-overview project-text-section"
        aria-labelledby="basilar-overview-title"
      >
        <div className="project-text-section-inner">
          <div className="basilar-overview-prose project-text-section-inner--prose">
            <header className="basilar-overview-header">
              <h2 id="basilar-overview-title" className="basilar-overview-heading">
                Overview
              </h2>
            </header>

            <p className="basilar-overview-lead">
            <strong> Basilar </strong> is a concept for a companion app that keeps festival-goers oriented across days, venues,
              and services. Reducing friction between <strong>what people need</strong> and what the event delivers.
            </p>

            <h3 className="basilar-overview-subheading">Problem</h3>
            <ol className="basilar-overview-problem-list">
              <li>
                <span className="basilar-overview-problem-list__text">
                  As a <strong>niche festival</strong> within a competitive European scene, Basilar needed to
                  offer more than just a lineup. To stand out and build lasting connections with its audience,
                  the experience had to deliver a clear, memorable value beyond the event itself.
                </span>
              </li>
              <li>
                <span className="basilar-overview-problem-list__text">
                  Previous events revealed challenges in managing tickets, food services, and on-site
                  logistics. Without a <strong>unified system</strong>, coordination across different
                  touchpoints became inefficient, impacting both the attendee experience and the operational
                  flow.
                </span>
              </li>
              <li>
                <span className="basilar-overview-problem-list__text">
                  Unexpected logistical issues in past events led to financial losses the production could
                  not afford. Without <strong>real-time visibility</strong> into activity and usage during the
                  event, the team struggled to respond quickly and maintain control over operations.
                </span>
              </li>
            </ol>

            <h3 className="basilar-overview-subheading">Solution</h3>
            <p className="basilar-overview-solution">
              A <strong>mobile-first</strong> structure that supports fluid, on-demand access to key moments,
              from arrival and movement between areas to food and showtime, creating a clear, cohesive
              experience that supports both users and operations. Lightweight real-time signals keep
              attendees and organizers aligned with what&apos;s happening in the moment, while a visual system
              designed for outdoor conditions ensures clarity through high contrast, short labels, and
              predictable patterns in any environment.
            </p>
          </div>
        </div>
      </section>

      <section
        className="basilar-page-section basilar-page-showcase"
        aria-label="Product walkthrough"
      >
        <BasilarProductShowcase
          backgroundImageSrc={BASILAR_SHOWCASE_BG_IMAGE}
          deviceVideoSrc={BASILAR_SHOWCASE_WALKTHROUGH}
        />
      </section>

      <BasilarPersonasSection />

      <BasilarPainPointsSection />

      <BasilarInformationArchitectureSection />

      <BasilarUserInterfaceSection />

      <BasilarUITeaserSection />

      <BasilarHomePageSection />

      <BasilarLiveFeedSection />

      <BasilarTicketsSection />

      <BasilarShuttlesSection />

      <BasilarFestivalVibeSection />

      <BasilarLineupSection />

      <BasilarFoodSection />

      <BasilarSetReminderSection />

      <BasilarTokensSection />

      <BasilarFestivalVibeSection
        imageSrc="/images/basilar/basilar-vibe-before-map.png"
        ariaLabel="Night festival stage"
        unoptimized
        sectionClassName="basilar-page-vibe-photo--before-map"
      />

      <BasilarMapSection />

      <BasilarDroppedPinSection />

      <BasilarWaveAFriendSection />

      <BasilarSosSection />

      <BasilarScreenshotsSection />

      <BasilarStyleGuideSection />

      <BasilarThanksSection />

      <ViewOtherProjectSection currentProject="basilar" />
    </div>
  );
}
