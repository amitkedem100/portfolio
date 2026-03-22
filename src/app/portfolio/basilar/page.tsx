import type { Metadata } from "next";
import "./page.css";
import { BasilarPersonasSection } from "@/app/portfolio/basilar/BasilarPersonasSection";
import { BasilarProductShowcase } from "@/app/portfolio/components/BasilarProductShowcase";
import { ProjectVideoHero } from "@/app/portfolio/components/ProjectVideoHero";

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
    <div className="basilar-page basilar-project layout-grid">
      <section className="basilar-page-section basilar-page-hero" aria-label="Basilar project hero">
        <ProjectVideoHero
          title="Basilar"
          description="A mobile product designed to simplify the logistics of a multi-day music festival experience — from entry and transport to food, navigation, and real-time updates."
          meta="Festival Experience · Mobile UX · Personal Project · May 2023"
          backgroundVideoSrc={BASILAR_BG_VIDEO}
          deviceVideoSrc={BASILAR_DEVICE_VIDEO}
        />
      </section>

      <section
        className="basilar-page-section basilar-overview"
        aria-labelledby="basilar-overview-title"
      >
        <div className="basilar-overview-inner">
          <h2 id="basilar-overview-title" className="basilar-overview-heading">
            Overview
          </h2>
          <p className="basilar-overview-lead">
            Basilar is a concept for a companion app that keeps festival-goers oriented across days,
            venues, and services — reducing friction between what people need and what the event delivers.
          </p>

          <h3 className="basilar-overview-subheading">Problem</h3>
          <ul className="basilar-overview-list">
            <li>
              Multi-day festivals bundle entry, transport, food, and navigation into fragmented touchpoints
              that are hard to track on the ground.
            </li>
            <li>
              Schedules, stages, and facilities change; printed maps and one-off announcements do not scale
              when crowds move and lines form unpredictably.
            </li>
            <li>
              Attendees need a single place to understand where to go next, how long it takes, and what is
              available without losing the flow of the experience.
            </li>
          </ul>

          <h3 className="basilar-overview-subheading">Solution</h3>
          <ul className="basilar-overview-list">
            <li>
              A mobile-first flow that prioritizes the next relevant action — arrival, movement between
              areas, food, and showtime — in one calm, scannable structure.
            </li>
            <li>
              Lightweight real-time signals for queues, changes, and highlights so decisions stay
              grounded in the current day, not yesterday&apos;s PDF.
            </li>
            <li>
              Visual hierarchy and pacing tuned for outdoor context: high contrast, short labels, and
              predictable patterns that work in sunlight and at night.
            </li>
          </ul>
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

      <section className="basilar-page-section">
        <BasilarPersonasSection />
      </section>
    </div>
  );
}
