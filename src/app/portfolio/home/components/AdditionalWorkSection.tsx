"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { BadgeList } from "@/app/portfolio/components/BadgeList";
import "./AdditionalWorkSection.css";

type AdditionalWorkItem = {
  id: string;
  title: string;
  description: string;
  mediaType: "image" | "video";
  mediaSrc: string;
  thumbnailSrc?: string;
  thumbnailAlt: string;
  tags?: string[];
};

const ADDITIONAL_WORK_ITEMS: AdditionalWorkItem[] = [
  {
    id: "astra-live-incident",
    title: "Astra - Live Incident Signal",
    description:
      "A focused exploration of incident prioritization states and urgency communication in the dashboard context.",
    mediaType: "video",
    mediaSrc: encodeURI("/videos/Astra/Live Incident example.mp4"),
    thumbnailAlt: "Astra live incident dashboard preview",
    tags: ["Dashboard", "Safety Ops", "Signal Design"],
  },
  {
    id: "astra-key-findings",
    title: "Astra - Key Findings Snapshot",
    description:
      "Compact insight card layout iteration balancing readability, severity ranking, and scan speed for executives.",
    mediaType: "image",
    mediaSrc: encodeURI("/images/SaaS/key findings1.png"),
    thumbnailAlt: "Astra key findings card preview",
    tags: ["Data UI", "Executive View"],
  },
  {
    id: "basilar-map",
    title: "Basilar - Festival Map Motion",
    description:
      "Navigation behavior exploration for map-centric flows, emphasizing quick orientation in high-noise festival environments.",
    mediaType: "video",
    mediaSrc: "/videos/basilar/map.mp4",
    thumbnailAlt: "Basilar map feature preview",
    tags: ["Mobile UX", "Navigation"],
  },
  {
    id: "basilar-screens",
    title: "Basilar - Screen Set",
    description:
      "A compact collection of product surfaces demonstrating visual consistency across lineup, food, and movement-related tasks.",
    mediaType: "image",
    mediaSrc: "/images/basilar/screenshots/02-lineup.png",
    thumbnailAlt: "Basilar lineup screen",
    tags: ["Design System", "Mobile UI"],
  },
];

export function AdditionalWorkSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const activeItem = useMemo(
    () => ADDITIONAL_WORK_ITEMS.find((item) => item.id === activeId) ?? null,
    [activeId]
  );

  useEffect(() => {
    if (!activeItem) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveId(null);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onEscape);
    };
  }, [activeItem]);

  const scrollRailBy = (direction: "prev" | "next") => {
    const rail = railRef.current;
    if (!rail) return;
    const delta = Math.max(260, rail.clientWidth * 0.8);
    rail.scrollBy({ left: direction === "next" ? delta : -delta, behavior: "smooth" });
  };

  return (
    <section className="home-page-section additional-work" aria-labelledby="additional-work-title">
      <header className="additional-work__header">
        <h2 id="additional-work-title" className="additional-work__title">
          Additional Work
        </h2>
        <p className="additional-work__subtitle">
          A curated selection of additional interfaces, flows, and product explorations.
        </p>
      </header>

      <div className="additional-work__rail-wrap">
        <button
          type="button"
          className="additional-work__nav additional-work__nav--prev"
          aria-label="Previous additional work items"
          onClick={() => scrollRailBy("prev")}
        >
          ‹
        </button>
        <div className="additional-work__rail" ref={railRef}>
          {ADDITIONAL_WORK_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="additional-work__card"
              onClick={() => setActiveId(item.id)}
              aria-label={`Open additional work item: ${item.title}`}
            >
              <div className="additional-work__thumb">
                {item.mediaType === "image" ? (
                  <Image
                    src={item.thumbnailSrc ?? item.mediaSrc}
                    alt={item.thumbnailAlt}
                    fill
                    sizes="(max-width: 768px) 78vw, (max-width: 1200px) 38vw, 29vw"
                    className="additional-work__thumb-media"
                  />
                ) : (
                  <video
                    className="additional-work__thumb-media"
                    src={item.thumbnailSrc ?? item.mediaSrc}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    autoPlay
                    aria-hidden
                  />
                )}
              </div>
              <div className="additional-work__card-body">
                <h3 className="additional-work__card-title">{item.title}</h3>
              </div>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="additional-work__nav additional-work__nav--next"
          aria-label="Next additional work items"
          onClick={() => scrollRailBy("next")}
        >
          ›
        </button>
      </div>

      {activeItem ? (
        <div
          className="additional-work-modal"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={() => setActiveId(null)}
        >
          <div className="additional-work-modal__panel" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="additional-work-modal__close"
              aria-label="Close additional work modal"
              onClick={() => setActiveId(null)}
            >
              ×
            </button>

            <div className="additional-work-modal__media">
              {activeItem.mediaType === "image" ? (
                <Image
                  src={activeItem.mediaSrc}
                  alt={activeItem.thumbnailAlt}
                  fill
                  sizes="(max-width: 1200px) 90vw, 72vw"
                  className="additional-work-modal__media-item"
                />
              ) : (
                <video
                  className="additional-work-modal__media-item"
                  src={activeItem.mediaSrc}
                  controls
                  playsInline
                  preload="metadata"
                  autoPlay
                />
              )}
            </div>

            <div className="additional-work-modal__content">
              <h3 className="additional-work-modal__title">{activeItem.title}</h3>
              <p className="additional-work-modal__description">{activeItem.description}</p>
              {activeItem.tags && activeItem.tags.length > 0 ? (
                <BadgeList items={activeItem.tags} className="additional-work-modal__tags" />
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
