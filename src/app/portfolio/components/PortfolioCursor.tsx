"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useCursorContext } from "../context/CursorContext";
import "./PortfolioCursor.css";

const DESKTOP_MEDIA = "(min-width: 769px)";
const MOBILE_MEDIA = "(max-width: 768px)";
const REDUCED_MOTION_MEDIA = "(prefers-reduced-motion: reduce)";
const LERP_FACTOR = 0.18;
const VIEW_PROJECT_CONTENT_DELAY = 180;
const HERO_GIANT_SCALE = 1.78;
const HERO_GIANT_RADIUS_DESKTOP = 120;
const HERO_GIANT_RADIUS_MOBILE = 72;
const HERO_GIANT_X_OFFSET = 0;
const MOBILE_HERO_LERP_FACTOR = 0.05;
const MOBILE_HERO_AUTOPLAY_START_DELAY_MS = 3000;
const MOBILE_HERO_AUTOPLAY_STEP_MS = 2300;
const MOBILE_HERO_AUTOPLAY_POINTS = [
  { x: 129, y: 224 }, // first
  { x: 290, y: 273 }, // second
  { x: 345, y: 100 }, // third (last)
] as const;
const HOME_PATH = "/portfolio/home";

export function PortfolioCursor() {
  const { variant } = useCursorContext();
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mobileHeroPosition, setMobileHeroPosition] = useState<{ x: number; y: number } | null>(null);
  const [mobileHeroTarget, setMobileHeroTarget] = useState<{ x: number; y: number } | null>(null);
  const [isViewProjectContentVisible, setIsViewProjectContentVisible] =
    useState(false);
  const [heroRect, setHeroRect] = useState<DOMRect | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const displayRef = useRef({ x: 0, y: 0 });
  const hasInitialPositionRef = useRef(false);
  const mobileDisplayRef = useRef<{ x: number; y: number } | null>(null);
  const mobileTargetRef = useRef<{ x: number; y: number } | null>(null);
  const mobileAutoPlayTimeoutsRef = useRef<number[]>([]);
  const heroSourceRef = useRef<HTMLElement | null>(null);
  const heroLensSceneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MEDIA);
    const handler = () => setIsDesktop(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MEDIA);
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_MEDIA);
    const handler = () => setPrefersReducedMotion(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const onMove = (e: PointerEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!hasInitialPositionRef.current) {
        hasInitialPositionRef.current = true;
        displayRef.current = { x: e.clientX, y: e.clientY };
        setPosition(displayRef.current);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    let rafId: number;

    const tick = () => {
      const target = targetRef.current;
      const display = displayRef.current;
      display.x += (target.x - display.x) * LERP_FACTOR;
      display.y += (target.y - display.y) * LERP_FACTOR;
      setPosition({ x: display.x, y: display.y });
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isDesktop]);

  const isViewProject = variant === "viewProject";
  const isHeroGiant = variant === "heroGiant";
  const isHomePath = pathname === HOME_PATH;
  const isMobileHeroLensActive = isMobile && isHomePath && mobileHeroPosition !== null;
  const isHeroLensActive = isHeroGiant || isMobileHeroLensActive;

  const updateHeroLensCssVars = (localPosition: { x: number; y: number } | null) => {
    const hero = document.querySelector(".home-hero") as HTMLElement | null;
    if (!hero) return;
    if (!localPosition) {
      hero.style.removeProperty("--hero-lens-x");
      hero.style.removeProperty("--hero-lens-y");
      return;
    }
    hero.style.setProperty("--hero-lens-x", `${localPosition.x}px`);
    hero.style.setProperty("--hero-lens-y", `${localPosition.y}px`);
  };

  useEffect(() => {
    let timeoutId: number | undefined;

    if (isViewProject) {
      setIsViewProjectContentVisible(false);
      timeoutId = window.setTimeout(() => {
        setIsViewProjectContentVisible(true);
      }, VIEW_PROJECT_CONTENT_DELAY);
    } else {
      setIsViewProjectContentVisible(false);
    }

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [isViewProject]);

  useEffect(() => {
    if ((!isDesktop && !isMobile) || !isHeroLensActive) return;

    const hero = document.querySelector(".home-hero-inner") as HTMLElement | null;
    heroSourceRef.current = hero;
    if (!hero) return;

    const updateRect = () => {
      setHeroRect(hero.getBoundingClientRect());
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, { passive: true });
    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
    };
  }, [isDesktop, isMobile, isHeroLensActive]);

  useEffect(() => {
    if (isHomePath) return;
    mobileAutoPlayTimeoutsRef.current.forEach((id) => window.clearTimeout(id));
    mobileAutoPlayTimeoutsRef.current = [];
    mobileDisplayRef.current = null;
    mobileTargetRef.current = null;
    setMobileHeroPosition(null);
    setMobileHeroTarget(null);
    updateHeroLensCssVars(null);
  }, [isHomePath]);

  useEffect(() => {
    if (!isMobile || !isHomePath) return;

    let rafId = 0;
    mobileAutoPlayTimeoutsRef.current.forEach((id) => window.clearTimeout(id));
    mobileAutoPlayTimeoutsRef.current = [];

    const clampToHero = (
      rect: DOMRect,
      point: { x: number; y: number },
    ) => ({
      x: Math.max(0, Math.min(rect.width, point.x)),
      y: Math.max(0, Math.min(rect.height, point.y)),
    });

    const setLensTarget = (point: { x: number; y: number }) => {
      mobileTargetRef.current = point;
      setMobileHeroTarget(point);
    };

    const setInitialLensPoint = () => {
      const mountedHero = document.querySelector(".home-hero-inner") as HTMLElement | null;
      if (!mountedHero) return false;
      if (!isHomePath) return false;
      const rect = mountedHero.getBoundingClientRect();
      const [firstRaw, secondRaw, thirdRaw] = MOBILE_HERO_AUTOPLAY_POINTS;
      const first = clampToHero(rect, firstRaw);
      const second = clampToHero(rect, secondRaw);
      const third = clampToHero(rect, thirdRaw);

      mobileDisplayRef.current = first;
      setMobileHeroPosition(first);
      updateHeroLensCssVars(first);
      setLensTarget(first);

      const t1 = window.setTimeout(
        () => setLensTarget(second),
        MOBILE_HERO_AUTOPLAY_START_DELAY_MS,
      );
      const t2 = window.setTimeout(
        () => setLensTarget(third),
        MOBILE_HERO_AUTOPLAY_START_DELAY_MS + MOBILE_HERO_AUTOPLAY_STEP_MS,
      );
      mobileAutoPlayTimeoutsRef.current = [t1, t2];
      return true;
    };

    const initWhenReady = () => {
      const done = setInitialLensPoint();
      if (!done) {
        rafId = requestAnimationFrame(initWhenReady);
      }
    };

    initWhenReady();
    window.addEventListener("resize", initWhenReady);
    return () => {
      cancelAnimationFrame(rafId);
      mobileAutoPlayTimeoutsRef.current.forEach((id) => window.clearTimeout(id));
      mobileAutoPlayTimeoutsRef.current = [];
      window.removeEventListener("resize", initWhenReady);
      updateHeroLensCssVars(null);
    };
  }, [isMobile, isHomePath]);

  useEffect(() => {
    if (!isMobile || !isHomePath) return;
    const hero = document.querySelector(".home-hero-inner") as HTMLElement | null;
    if (!hero) return;

    const onTap = (event: PointerEvent) => {
      mobileAutoPlayTimeoutsRef.current.forEach((id) => window.clearTimeout(id));
      mobileAutoPlayTimeoutsRef.current = [];
      const rect = hero.getBoundingClientRect();
      const next = {
        x: Math.max(0, Math.min(rect.width, event.clientX - rect.left)),
        y: Math.max(0, Math.min(rect.height, event.clientY - rect.top)),
      };
      mobileTargetRef.current = next;
      setMobileHeroTarget(next);
      if (!mobileDisplayRef.current) {
        mobileDisplayRef.current = next;
        setMobileHeroPosition(next);
        updateHeroLensCssVars(next);
      }
    };

    hero.addEventListener("pointerdown", onTap, { passive: true });
    return () => hero.removeEventListener("pointerdown", onTap);
  }, [isMobile, isHomePath]);

  useEffect(() => {
    if (!isMobile || !mobileHeroTarget) return;

    let rafId = 0;
    const tick = () => {
      const target = mobileTargetRef.current;
      const display = mobileDisplayRef.current;
      if (!target || !display) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      display.x += (target.x - display.x) * MOBILE_HERO_LERP_FACTOR;
      display.y += (target.y - display.y) * MOBILE_HERO_LERP_FACTOR;
      const next = { x: display.x, y: display.y };
      setMobileHeroPosition(next);
      updateHeroLensCssVars(next);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isMobile, mobileHeroTarget]);

  useEffect(() => {
    if (!isHeroLensActive) return;
    const source = heroSourceRef.current;
    const scene = heroLensSceneRef.current;
    if (!source || !scene) return;

    scene.innerHTML = "";
    const clone = source.cloneNode(true) as HTMLElement;
    clone.classList.add("portfolio-cursor-hero-clone");
    scene.appendChild(clone);
  }, [isHeroLensActive, heroRect]);

  if (prefersReducedMotion) return null;
  if (!isDesktop && !isMobileHeroLensActive) return null;

  const activeMobilePosition =
    heroRect && mobileHeroPosition
      ? {
          x: heroRect.left + mobileHeroPosition.x,
          y: heroRect.top + mobileHeroPosition.y,
        }
      : null;
  const activePosition = isDesktop ? position : activeMobilePosition;
  if (!activePosition) return null;
  if (!isDesktop && heroRect) {
    const isHeroVisible = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
    if (!isHeroVisible) return null;
  }

  const heroLocalX = heroRect ? activePosition.x - heroRect.left : 0;
  const heroLocalY = heroRect ? activePosition.y - heroRect.top : 0;
  const activeHeroGiantRadius = isDesktop ? HERO_GIANT_RADIUS_DESKTOP : HERO_GIANT_RADIUS_MOBILE;
  const heroSceneTranslateX =
    activeHeroGiantRadius - heroLocalX * HERO_GIANT_SCALE + HERO_GIANT_X_OFFSET;
  const heroSceneTranslateY = activeHeroGiantRadius - heroLocalY * HERO_GIANT_SCALE;
  const renderedVariant = isHeroLensActive ? "heroGiant" : variant;

  return (
    <div
      className="portfolio-cursor"
      data-variant={renderedVariant}
      style={{
        transform: `translate(${activePosition.x}px, ${activePosition.y}px)`,
      }}
      aria-hidden
    >
      {isHeroLensActive && heroRect && (
        <div className="portfolio-cursor-hero-lens" aria-hidden>
          <div
            ref={heroLensSceneRef}
            className="portfolio-cursor-hero-lens-scene"
            style={{
              width: `${heroRect.width}px`,
              height: `${heroRect.height}px`,
              transform: `translate(${heroSceneTranslateX}px, ${heroSceneTranslateY}px) scale(${HERO_GIANT_SCALE})`,
            }}
          />
        </div>
      )}
      {isDesktop && isViewProject && isViewProjectContentVisible && (
        <div className="portfolio-cursor-view-inner">
          <span className="portfolio-cursor-view-label">VIEW PROJECT</span>
          <svg
            className="portfolio-cursor-view-icon"
            width={20}
            height={20}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              fill="currentColor"
              d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}