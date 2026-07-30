"use client";

import { useRef } from "react";
import "./HomeHero.css";
import { useCursorContext } from "@/app/portfolio/context/CursorContext";
import { HeroRulers } from "./HeroRulers";
import { scrollToSelectedWorkWithAnimation } from "../scrollToSelectedWork.utils";
import { HeroKeywordBadge } from "./HeroKeywordBadge";
import { ENABLE_HERO_MAGNIFIER } from "./heroMagnifier.flag";

export function HomeHero() {
  const { setVariant } = useCursorContext();
  const heroRef = useRef<HTMLElement | null>(null);
  const handleArrowClick = () => {
    scrollToSelectedWorkWithAnimation(1050);
  };

  return (
    <header ref={heroRef} className="home-hero">
      <HeroRulers hostRef={heroRef} />
      <div
        className="home-hero-inner"
        onMouseEnter={
          ENABLE_HERO_MAGNIFIER ? () => setVariant("heroGiant") : undefined
        }
        onMouseLeave={
          ENABLE_HERO_MAGNIFIER ? () => setVariant("default") : undefined
        }
      >
        <div className="home-hero-spacer" aria-hidden />
        <div className="home-hero-content">
          <h1 className="home-hero-title">
            I’m Amit, a Product Designer crafting clear{" "}
            <br className="home-hero-title__break" aria-hidden />
            <span className="home-hero-title__tail">digital experiences.</span>
          </h1>
     
          <p className="home-hero-supporting">
            My work spans discovery through delivery, combining{" "}
            <HeroKeywordBadge tone="ui" variant="inline">
              UX UI
            </HeroKeywordBadge>
            ,{" "}
            <HeroKeywordBadge tone="systems" variant="inline">
              Systems
            </HeroKeywordBadge>{" "}
            thinking, and{" "}
            <HeroKeywordBadge tone="ai" variant="inline">
              AI
            </HeroKeywordBadge>{" "}
            to create useful, scalable products that work for both businesses and the people who use them.
          </p>
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
