"use client";

import "./HomeHero.css";
import { useCursorContext } from "@/app/portfolio/context/CursorContext";

/* Subtitle: replace with intro from content/CMS when available */
const HERO_SUBTITLE = "Creative Product Designer blending UX, UI and system thinking. I turn complex ideas into clear, functional digital products.";
export function HomeHero() {
  const { setVariant } = useCursorContext();
  const handleArrowClick = () => {
    const target = document.getElementById("selected-work");
    if (!target) return;

    const startY = window.scrollY;
    const targetY = window.scrollY + target.getBoundingClientRect().top;
    const distance = targetY - startY;
    const durationMs = 1050;
    const startTime = performance.now();

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeInOutCubic(progress);
      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <header className="home-hero">
      <div
        className="home-hero-inner"
        onMouseEnter={() => setVariant("heroGiant")}
        onMouseLeave={() => setVariant("default")}
      >
        <div className="home-hero-spacer" aria-hidden />
        <div className="home-hero-content">
          <h1 className="home-hero-title">Hi! I&apos;m Amit</h1>
          <p className="home-hero-subtitle">{HERO_SUBTITLE}</p>
        </div>
        <div className="home-hero-spacer" aria-hidden />
        <button
          type="button"
          className="home-hero-arrow"
          aria-label="Scroll to selected work"
          onClick={handleArrowClick}
        >
          <svg
            className="home-hero-arrow-icon"
            width={24}
            height={24}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              fill="currentColor"
              d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
