"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CursorZone } from "./CursorZone";
import { ProjectCard } from "./ProjectCard";
import {
  MORE_PROJECTS_SCROLL_FLAG_KEY,
} from "@/app/portfolio/home/ScrollToSelectedWork";
import "./ViewOtherProjectSection.css";

type ViewOtherProjectSectionProps = {
  currentProject: "saas" | "basilar";
};

export function ViewOtherProjectSection({
  currentProject,
}: ViewOtherProjectSectionProps) {
  const router = useRouter();
  const isCurrentSaas = currentProject === "saas";

  const handleSectionPointerEnter = () => {
    document.documentElement.setAttribute("data-cursor-global-accent", "");
  };

  const handleSectionPointerLeave = () => {
    document.documentElement.removeAttribute("data-cursor-global-accent");
  };

  const otherProject = isCurrentSaas
    ? {
        title: "Basilar",
        description:
          "A mobile product for multi-day festival logistics. Entry, transport, food, navigation, and real-time updates.",
        keywords: "Mobile UX · Festival Experience · Product",
        imageSrc: "/images/basilar/basilar-card-cover-v3.png",
        imageAlt: "Basilar project",
        href: "/portfolio/basilar",
        imagePosition: "left" as const,
      }
    : {
        title: "Astra",
        description:
          "A safety intelligence platform designed to monitor, analyze, and improve construction site safety through AI-driven insights and real-time reporting.",
        keywords: "SaaS Platform · Safety Analytics · AI Monitoring · 2026",
        imageSrc: "/images/SaaS/astra-card-cover-v4.png",
        imageAlt: "Astra project",
        href: "/portfolio/saas",
        imagePosition: "right" as const,
      };

  const handleMoreProjectsClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    try {
      sessionStorage.setItem(MORE_PROJECTS_SCROLL_FLAG_KEY, "1");
    } catch {
      /* private / blocked storage */
    }
    router.push("/portfolio/home");
  };

  return (
    <section
      className="project-other-work home-page-section"
      aria-labelledby="view-other-project-title"
      onPointerEnter={handleSectionPointerEnter}
      onPointerLeave={handleSectionPointerLeave}
    >
      <div className="project-other-work__topbar">
        <h2 id="view-other-project-title" className="project-other-work__title">
          View Other <span className="project-other-work__title-suffix">Project</span>
        </h2>

        <CursorZone variant="large">
          <p className="project-other-work__more-link-wrap">
            <Link
              href="/portfolio/home#more-projects"
              className="project-other-work__more-link"
              onClick={handleMoreProjectsClick}
            >
              More Projects
            </Link>
          </p>
        </CursorZone>
      </div>

      <CursorZone variant="viewProject">
        <ProjectCard {...otherProject} />
      </CursorZone>
    </section>
  );
}

