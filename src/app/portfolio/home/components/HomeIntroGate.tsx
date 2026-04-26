"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import "./HomeIntroGate.css";
import "./HomeHero.css";
import { HeroRulers } from "./HeroRulers";

type HomeIntroGateProps = {
  children: ReactNode;
};

const INTRO_SESSION_KEY = "portfolio-home-intro-v1-seen";
const INTRO_MS = 680;
const REVEAL_MS = 420;
const SUBTITLE_DELAY_MS = 320;

type Phase = "idle" | "intro" | "reveal" | "done";

export function HomeIntroGate({ children }: HomeIntroGateProps) {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [heroStage, setHeroStage] = useState<"none" | "title" | "subtitle">("none");
  const introHeroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setPhase("done");
      setHeroStage("subtitle");
      return;
    }

    let shouldRunIntro = true;
    try {
      shouldRunIntro = sessionStorage.getItem(INTRO_SESSION_KEY) !== "1";
      sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    } catch {
      shouldRunIntro = true;
    }

    if (!shouldRunIntro) {
      setPhase("done");
      setHeroStage("subtitle");
      return;
    }

    setPhase("intro");
    const introTimer = window.setTimeout(() => {
      setPhase("reveal");
      setHeroStage("title");
      const subtitleTimer = window.setTimeout(() => setHeroStage("subtitle"), SUBTITLE_DELAY_MS);
      const doneTimer = window.setTimeout(() => setPhase("done"), REVEAL_MS);
      return () => {
        window.clearTimeout(subtitleTimer);
        window.clearTimeout(doneTimer);
      };
    }, INTRO_MS);

    return () => {
      window.clearTimeout(introTimer);
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;

    if (phase !== "done") {
      root.setAttribute("data-home-intro-active", "");
    } else {
      root.removeAttribute("data-home-intro-active");
    }

    if (heroStage === "none") {
      root.removeAttribute("data-home-hero-reveal");
    } else {
      root.setAttribute("data-home-hero-reveal", heroStage);
    }

    return () => {
      root.removeAttribute("data-home-intro-active");
      root.removeAttribute("data-home-hero-reveal");
    };
  }, [mounted, phase, heroStage]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <div className={`home-intro-gate home-intro-gate--${phase}`}>
      {(phase === "intro" || phase === "reveal") && (
        <div className="home-intro" aria-hidden>
          <header ref={introHeroRef} className="home-hero home-intro__hero">
            <HeroRulers hostRef={introHeroRef} />
          </header>
        </div>
      )}

      <div className="home-intro-gate__content">{children}</div>
    </div>
  );
}
