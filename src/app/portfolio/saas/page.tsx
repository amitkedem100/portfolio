import type { Metadata } from "next";
import "@/app/portfolio/components/ProjectTextSection.css";
import { SaasHeroSection } from "@/app/portfolio/saas/components/SaasHeroSection";
import { SaasPersonasSection } from "@/app/portfolio/saas/components/SaasPersonasSection";
import { SaasProductShowcase } from "@/app/portfolio/saas/components/SaasProductShowcase";
import { SaasUserInterfaceSection } from "@/app/portfolio/saas/components/SaasUserInterfaceSection";
import { SaasSiteAssociationSection } from "@/app/portfolio/saas/components/SaasSiteAssociationSection";
import { SaasUserProfileSection } from "@/app/portfolio/saas/components/SaasUserProfileSection";
import { SaasAccessSettingsSection } from "@/app/portfolio/saas/components/SaasAccessSettingsSection";
import "./page.css";

export const metadata: Metadata = {
  title: "Astra | Portfolio",
  description:
    "A safety intelligence platform for construction site safety — AI-driven insights and real-time reporting.",
};

export default function SaasProjectPage() {
  return (
    <div className="saas-page portfolio-page-inner-grid">
      <section className="saas-page-section saas-page-hero" aria-label="Astra project hero">
        <SaasHeroSection />
      </section>

      <section
        className="saas-page-section saas-page-overview project-text-section"
        aria-labelledby="saas-overview-title"
      >
        <div className="project-text-section-inner">
          <div className="saas-overview-prose project-text-section-inner--prose">
            <header className="saas-overview-header">
              <h2 id="saas-overview-title" className="saas-overview-heading">
                Overview
              </h2>
            </header>

            <p className="saas-overview-lead">
              A safety intelligence platform built for construction companies to monitor site activity, analyze
              safety incidents, and make informed decisions through{" "}
              <strong>structured reporting</strong> and <strong>AI-driven insights</strong>.
            </p>

            <h3 className="saas-overview-subheading">Problem</h3>
            <ol className="saas-overview-problem-list">
              <li>
                <span className="saas-overview-problem-list__title">Limited visibility across sites</span>
                <span className="saas-overview-problem-list__text">
                  Safety data is scattered across reports, messages, and manual processes, making it difficult
                  for decision-makers to maintain a clear, real-time understanding of what&apos;s happening on
                  site.
                </span>
              </li>
              <li>
                <span className="saas-overview-problem-list__title">
                  Reactive instead of proactive safety management
                </span>
                <span className="saas-overview-problem-list__text">
                  Incidents are often handled after they occur, without a structured system to identify
                  patterns, track severity, or prevent recurrence.
                </span>
              </li>
              <li>
                <span className="saas-overview-problem-list__title">
                  Complex roles with inconsistent access to information
                </span>
                <span className="saas-overview-problem-list__text">
                  Different stakeholders - from site managers to executives - require different levels of
                  insight, yet existing tools fail to provide clear, role-based visibility and control.
                </span>
              </li>
            </ol>

            <h3 className="saas-overview-subheading">Solution</h3>
            <p className="saas-overview-solution">
              A centralized platform that aggregates <strong>incident data</strong>,{" "}
              <strong>AI detections</strong>, and <strong>site activity</strong> into{" "}
              <strong>structured, role-based reports</strong> — enabling stakeholders to monitor safety
              performance, identify patterns, and make faster, more informed decisions across all sites.
            </p>
          </div>
        </div>
      </section>

      <section className="saas-page-section saas-page-showcase" aria-label="Product walkthrough">
        <SaasProductShowcase />
      </section>

      <SaasPersonasSection />

      <section
        className="saas-page-section saas-page-system-thinking project-text-section"
        aria-labelledby="saas-system-thinking-title"
      >
        <div className="project-text-section-inner">
          <div className="saas-system-thinking-prose project-text-section-inner--prose">
            <header className="saas-system-thinking-header">
              <h2 id="saas-system-thinking-title" className="saas-system-thinking-heading">
                System Thinking
              </h2>
            </header>

            <p className="saas-system-thinking-lead">
              A system designed to translate on-site safety activity into{" "}
              <strong>structured, actionable insights</strong> across different organizational levels. From
              real-time detection on site to aggregated reporting at the management level, the platform connects
              data, roles, and decision-making into <strong>one continuous flow</strong>.
            </p>

            <h3 className="saas-system-thinking-subheading">Core Structure</h3>
            <ul className="saas-system-thinking-list">
              <li>
                <strong>Multi-level access</strong> - Site-level users focus on immediate issues, while
                executives monitor trends and performance across sites
              </li>
              <li>
                <strong>Data-driven flow</strong> - AI detections, incidents, and reports are structured into
                clear, trackable safety insights
              </li>
              <li>
                <strong>Centralized visibility</strong> - All safety activity is aggregated into a unified
                system, reducing fragmentation and improving response time
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        className="saas-page-section saas-page-positioning project-text-section"
        aria-labelledby="saas-positioning-title"
      >
        <div className="project-text-section-inner">
          <div className="saas-positioning-prose project-text-section-inner--prose">
            <header className="saas-positioning-header">
              <h2 id="saas-positioning-title" className="saas-positioning-heading">
                Product Positioning
              </h2>
            </header>

            <p className="saas-positioning-body">
              While existing safety management systems focus on <strong>real-time alerts</strong> and{" "}
              <strong>manual event tracking</strong>, they often lack <strong>advanced analytics</strong>,{" "}
              <strong>integration capabilities</strong>, and <strong>meaningful data visualization</strong>.
            </p>
            <p className="saas-positioning-body">
              This project explores a more <strong>proactive approach</strong> — combining{" "}
              <strong>AI-based detection</strong>, <strong>structured reporting</strong>, and{" "}
              <strong>clear visual insights</strong> to support both operational and strategic decision-making.
            </p>
            <p className="saas-positioning-closing">
              From <strong>reactive</strong> safety management to <strong>proactive</strong>,{" "}
              <strong>insight-driven</strong> decision making.
            </p>
          </div>
        </div>
      </section>

      <SaasUserInterfaceSection />

      <SaasSiteAssociationSection />

      <SaasUserProfileSection />

      <SaasAccessSettingsSection />
    </div>
  );
}
