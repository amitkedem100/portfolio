"use client";

import { Fragment, useRef } from "react";
import "./HomeHero.css";
import { useCursorContext } from "@/app/portfolio/context/CursorContext";
import { HeroRulers } from "./HeroRulers";
import { scrollToSelectedWorkWithAnimation } from "../scrollToSelectedWork.utils";
import { HeroKeywordBadge } from "./HeroKeywordBadge";
import { ENABLE_HERO_MAGNIFIER } from "./heroMagnifier.flag";
import {
  DEFAULT_HOME_HERO_CONTENT,
  type HomeHeroContent,
} from "./homeHeroContent";

type HomeHeroProps = {
  content?: HomeHeroContent;
};

export function HomeHero({ content = DEFAULT_HOME_HERO_CONTENT }: HomeHeroProps) {
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
            {content.headlineLead}
            {content.headlineTail ? (
              <>
                {" "}
                <br className="home-hero-title__break" aria-hidden />
                <span className="home-hero-title__tail">
                  {content.headlineTail}
                </span>
              </>
            ) : null}
          </h1>

          <p className="home-hero-supporting">
            {content.supporting.map((part, index) =>
              part.type === "keyword" ? (
                <HeroKeywordBadge
                  key={`${part.value}-${index}`}
                  tone={part.tone}
                  variant="inline"
                >
                  {part.value}
                </HeroKeywordBadge>
              ) : (
                <Fragment key={`text-${index}`}>{part.value}</Fragment>
              ),
            )}
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
