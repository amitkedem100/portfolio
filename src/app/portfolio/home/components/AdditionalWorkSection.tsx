"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { BadgeList } from "@/app/portfolio/components/BadgeList";
import { CursorZone } from "@/app/portfolio/components/CursorZone";
import "./AdditionalWorkSection.css";

type AdditionalWorkItem = {
  id: string;
  title: string;
  description: string;
  mediaType: "image" | "video";
  mediaSrc: string;
  thumbnailAlt: string;
  slides: Array<{
    id: string;
    mediaType: "image" | "video";
    src: string;
    alt: string;
  }>;
  tags?: string[];
};

const ADDITIONAL_WORK_ITEMS: AdditionalWorkItem[] = [
  {
    id: "tech-tasks",
    title: "Tech Tasks",
    description:
      "A system designed for a security services company to manage technician tasks with clarity and control.\n\nThe goal was to reduce missed assignments and improve daily operations through a structured, real-time workflow. A bottom panel provides quick access to task details, while a map-based schedule view allows tracking routes, timing, and on-site activity, supporting efficient, day-to-day technician management.",
    mediaType: "image",
    mediaSrc: encodeURI("/images/Additional work/TechTasks Cover.png"),
    thumbnailAlt: "Tech Tasks dashboard preview",
    slides: [
      {
        id: "tech-tasks-video",
        mediaType: "video",
        src: encodeURI("/videos/Additional work/tech task video.mp4"),
        alt: "Tech Tasks walkthrough video",
      },
      {
        id: "tech-tasks-tab",
        mediaType: "image",
        src: encodeURI("/images/Additional work/Tech Tasks tab.png"),
        alt: "Tech Tasks table view in Tasks tab",
      },
      {
        id: "tech-schedule-tab",
        mediaType: "image",
        src: encodeURI("/images/Additional work/tech tasks schedule tab.png"),
        alt: "Tech Tasks schedule tab with map and route",
      },
    ],
    tags: ["Cursor", "Front-End", "CSS", "React", "TypeScript", "Figma"],
  },
  {
    id: "project-management-system",
    title: "Project Management System",
    description:
      "A custom internal system designed for a construction company to manage large-scale projects and complex workflows.\n\nThe platform addresses the challenge of fragmented information and poor coordination across teams. By centralizing data, improving visibility, and enabling structured collaboration, it transforms an otherwise chaotic process into a controlled and efficient operation.\n\nThe result is better tracking, clearer decision-making, and more effective teamwork across ongoing projects.",
    mediaType: "image",
    mediaSrc: encodeURI("/images/Additional work/Project Management cover.png"),
    thumbnailAlt: "Construction project planning cover image",
    slides: [
      {
        id: "project-management-system-main",
        mediaType: "image",
        src: encodeURI("/images/Additional work/Project Management system v3.png"),
        alt: "Project management system task table interface",
      },
    ],
    tags: ["UX", "SaaS", "Internal System", "B2B"],
  },
  {
    id: "elder-care",
    title: "Elder Care",
    description:
      "A mobile app designed to support daily coordination between families and caregivers.\n\nIn emotionally sensitive environments, where communication gaps and blurred responsibilities are common, the system creates clarity through structured task management, shared updates, and clear expectations. It helps reduce friction, ensure critical information is not missed, and maintain a balanced, respectful relationship between all sides involved in care.",
    mediaType: "image",
    mediaSrc: encodeURI("/images/Additional work/Elder Care Cover.png"),
    thumbnailAlt: "Elder Care project placeholder cover",
    slides: [
      {
        id: "elder-care-video",
        mediaType: "video",
        src: encodeURI("/videos/Additional work/Elder Care  video.mp4"),
        alt: "Elder Care mobile app walkthrough video",
      },
      {
        id: "elder-care-screens",
        mediaType: "image",
        src: encodeURI("/images/Additional work/Elder Care screens v2.png"),
        alt: "Elder Care mobile app screens overview",
      },
    ],
    tags: [
      "Mobile App",
      "Healthcare",
      "B2C",
      "Task Management",
      "Human-Centered Design",
    ],
  },
];

export function AdditionalWorkSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const mediaFrameRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setActiveSlideIndex(0);
  }, [activeId]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateMobileState = () => {
      setIsMobileViewport(mediaQuery.matches);
    };

    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);
    return () => {
      mediaQuery.removeEventListener("change", updateMobileState);
    };
  }, []);

  const activeSlides = activeItem?.slides ?? [];
  const safeSlideIndex =
    activeSlides.length === 0 ? 0 : Math.min(activeSlideIndex, activeSlides.length - 1);
  const activeSlide = activeSlides[safeSlideIndex] ?? null;
  const showFullscreenButton =
    activeSlide?.mediaType === "image" || (isMobileViewport && activeSlide?.mediaType === "video");

  const goToPrevSlide = () => {
    if (activeSlides.length <= 1) return;
    setActiveSlideIndex((current) =>
      current === 0 ? activeSlides.length - 1 : current - 1
    );
  };

  const goToNextSlide = () => {
    if (activeSlides.length <= 1) return;
    setActiveSlideIndex((current) =>
      current === activeSlides.length - 1 ? 0 : current + 1
    );
  };

  const onMediaTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.changedTouches[0]?.clientX ?? null);
  };

  const onMediaTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null || activeSlides.length <= 1) return;
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const deltaX = touchEndX - touchStartX;
    const SWIPE_THRESHOLD = 44;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
      setTouchStartX(null);
      return;
    }

    if (deltaX < 0) {
      goToNextSlide();
    } else {
      goToPrevSlide();
    }

    setTouchStartX(null);
  };

  const toggleFullscreen = async () => {
    const target = mediaFrameRef.current;
    if (!target) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await target.requestFullscreen();
  };

  return (
    <section className="home-page-section additional-work" aria-labelledby="additional-work-title">
      <header className="additional-work__header">
        <h2 id="additional-work-title" className="additional-work__title">
          More Projects
        </h2>
      </header>

      <div className="additional-work__rail-wrap">
        <div className="additional-work__rail">
          {ADDITIONAL_WORK_ITEMS.map((item) => (
            <CursorZone key={item.id} variant="viewProject">
              <button
                type="button"
                className="additional-work__card"
                onClick={() => {
                  setActiveId(item.id);
                  setActiveSlideIndex(0);
                }}
                aria-label={`Open additional work item: ${item.title}`}
              >
                <div className="additional-work__thumb">
                  {item.mediaType === "image" ? (
                    <Image
                      src={item.mediaSrc}
                      alt={item.thumbnailAlt}
                      fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={100}
                    unoptimized
                      className="additional-work__thumb-media"
                    />
                  ) : (
                    <video
                      className="additional-work__thumb-media"
                      src={item.mediaSrc}
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
                  {item.tags && item.tags.length > 0 ? (
                    <BadgeList
                      items={item.tags.slice(0, 3)}
                      className="additional-work__card-tags"
                    />
                  ) : null}
                  <h3 className="additional-work__card-title">{item.title}</h3>
                </div>
              </button>
            </CursorZone>
          ))}
        </div>
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
            <div className="additional-work-modal__topbar">
              <button
                type="button"
                className="additional-work-modal__close"
                aria-label="Close additional work modal"
                onClick={() => setActiveId(null)}
              >
                ×
              </button>
            </div>

            <div className="additional-work-modal__body">
              <div className="additional-work-modal__content">
                <h3 className="additional-work-modal__title">{activeItem.title}</h3>
                {activeItem.description.trim() ? (
                  <p className="additional-work-modal__description">{activeItem.description}</p>
                ) : null}
                {activeItem.tags && activeItem.tags.length > 0 ? (
                  <BadgeList items={activeItem.tags} className="additional-work-modal__tags" />
                ) : null}
              </div>

              <div className="additional-work-modal__media-area">
                <div
                  className="additional-work-modal__media-carousel"
                  onTouchStart={onMediaTouchStart}
                  onTouchEnd={onMediaTouchEnd}
                >
                  <div className="additional-work-modal__media" ref={mediaFrameRef}>
                    {activeSlide?.mediaType === "image" ? (
                      <Image
                        src={activeSlide.src}
                        alt={activeSlide.alt}
                        fill
                        sizes="(max-width: 1200px) 90vw, 72vw"
                        quality={100}
                        unoptimized
                        className="additional-work-modal__media-item"
                      />
                    ) : activeSlide ? (
                      <video
                        className="additional-work-modal__media-item"
                        src={activeSlide.src}
                        controls
                        muted
                        playsInline
                        preload="metadata"
                        autoPlay
                      />
                    ) : null}
                  </div>

                  {showFullscreenButton ? (
                    <button
                      type="button"
                      className="additional-work-modal__fullscreen"
                      onClick={toggleFullscreen}
                      aria-label={isFullscreen ? "Exit fullscreen" : "Open fullscreen"}
                    >
                      <span className="additional-work-modal__fullscreen-label">
                        {isFullscreen ? "Exit Full Screen" : "Full Screen"}
                      </span>
                      <img
                        className="additional-work-modal__fullscreen-icon"
                        src="/arrows-angle-expand.svg"
                        alt=""
                        aria-hidden
                      />
                    </button>
                  ) : null}

                  {activeSlides.length > 1 ? (
                    <>
                      <button
                        type="button"
                        className="additional-work-modal__media-nav additional-work-modal__media-nav--prev"
                        aria-label="Previous media"
                        onClick={goToPrevSlide}
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        className="additional-work-modal__media-nav additional-work-modal__media-nav--next"
                        aria-label="Next media"
                        onClick={goToNextSlide}
                      >
                        ›
                      </button>
                    </>
                  ) : null}
                </div>

                {activeSlides.length > 1 ? (
                  <div className="additional-work-modal__dots" role="tablist" aria-label="Media slides">
                    {activeSlides.map((slide, index) => (
                      <button
                        key={slide.id}
                        type="button"
                        role="tab"
                        aria-label={`Go to media ${index + 1}`}
                        aria-selected={index === safeSlideIndex}
                        className={`additional-work-modal__dot${
                          index === safeSlideIndex ? " additional-work-modal__dot--active" : ""
                        }`}
                        onClick={() => setActiveSlideIndex(index)}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
