"use client";

import { CursorZone } from "./CursorZone";
import { ProjectCard } from "./ProjectCard";
import type { ProjectCardProps } from "./ProjectCard";
import { useJourneyHref } from "@/app/portfolio/journey/useJourneyHref";
import "./ViewOtherProjectSection.css";

type FeaturedProjectId = "ai-command-center" | "saas" | "basilar";

type FeaturedProjectEntry = ProjectCardProps & {
  id: FeaturedProjectId;
};

/* Local registry for cross-project navigation only — not a global project data layer. */
const FEATURED_PROJECTS: FeaturedProjectEntry[] = [
  {
    id: "saas",
    title: "Astra",
    description:
      "A safety intelligence platform designed to monitor, analyze, and improve construction site safety through AI-driven insights and real-time reporting.",
    keywords: "SaaS Platform · Safety Analytics · AI Monitoring · 2026",
    imageSrc: "/images/SaaS/astra-card-cover-v4.png",
    imageAlt: "Astra project",
    href: "/portfolio/saas",
    imagePosition: "right",
  },
  {
    id: "ai-command-center",
    title: "AI Command Center",
    description:
      "Designing an AI-powered command center that helps distributed operations teams turn real-time detections into faster, more reliable decisions.",
    keywords: "AI Operations · Complex System · Operational UX · 2026",
    imageSrc: "/images/AI-Command-Center/ai-command-center-card-cover-v2.png",
    imageAlt: "AI-powered operational command center interface",
    href: "/portfolio/ai-command-center",
    imagePosition: "left",
  },
  {
    id: "basilar",
    title: "Basilar",
    description:
      "A mobile product for multi-day festival logistics. Entry, transport, food, navigation, and real-time updates.",
    keywords: "Mobile UX · Festival Experience · Product",
    imageSrc: "/images/basilar/basilar-card-cover-v3.png",
    imageAlt: "Basilar project",
    href: "/portfolio/basilar",
    imagePosition: "right",
  },
];

const NEXT_PROJECT_ID: Record<FeaturedProjectId, FeaturedProjectId> = {
  saas: "ai-command-center",
  "ai-command-center": "basilar",
  basilar: "saas",
};

type ViewOtherProjectSectionProps = {
  currentProject: FeaturedProjectId;
};

export function ViewOtherProjectSection({
  currentProject,
}: ViewOtherProjectSectionProps) {
  const handleSectionPointerEnter = () => {
    document.documentElement.setAttribute("data-cursor-global-accent", "");
  };

  const handleSectionPointerLeave = () => {
    document.documentElement.removeAttribute("data-cursor-global-accent");
  };

  const nextId = NEXT_PROJECT_ID[currentProject];
  const otherProject = FEATURED_PROJECTS.find((project) => project.id === nextId);
  const nextHref = useJourneyHref(otherProject?.href ?? "/portfolio/home");
  if (!otherProject) return null;

  return (
    <section
      className={`project-other-work ${currentProject}-page-section project-other-work--${currentProject}`}
      aria-labelledby="view-other-project-title"
      onPointerEnter={handleSectionPointerEnter}
      onPointerLeave={handleSectionPointerLeave}
    >
      <div className="project-other-work__topbar">
        <h2 id="view-other-project-title" className="project-other-work__title">
          View Other <span className="project-other-work__title-suffix">Project</span>
        </h2>
      </div>

      <CursorZone variant="viewProject">
        <ProjectCard
          title={otherProject.title}
          description={otherProject.description}
          keywords={otherProject.keywords}
          imageSrc={otherProject.imageSrc}
          imageAlt={otherProject.imageAlt}
          href={nextHref}
          imagePosition={otherProject.imagePosition}
        />
      </CursorZone>
    </section>
  );
}
