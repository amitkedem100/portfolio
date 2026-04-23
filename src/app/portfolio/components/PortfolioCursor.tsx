"use client";

import { useEffect, useRef, useState } from "react";
import { useCursorContext } from "../context/CursorContext";
import "./PortfolioCursor.css";

const DESKTOP_MEDIA = "(min-width: 769px)";
const REDUCED_MOTION_MEDIA = "(prefers-reduced-motion: reduce)";
const LERP_FACTOR = 0.18;
const VIEW_PROJECT_CONTENT_DELAY = 180;
const HERO_GIANT_SCALE = 1.78;
const HERO_GIANT_RADIUS = 120;
const HERO_GIANT_X_OFFSET = 0;

export function PortfolioCursor() {
  const { variant } = useCursorContext();
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isViewProjectContentVisible, setIsViewProjectContentVisible] =
    useState(false);
  const [heroRect, setHeroRect] = useState<DOMRect | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const displayRef = useRef({ x: 0, y: 0 });
  const hasInitialPositionRef = useRef(false);
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
    if (!isDesktop || !isHeroGiant) return;

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
  }, [isDesktop, isHeroGiant]);

  useEffect(() => {
    if (!isHeroGiant) return;
    const source = heroSourceRef.current;
    const scene = heroLensSceneRef.current;
    if (!source || !scene) return;

    scene.innerHTML = "";
    const clone = source.cloneNode(true) as HTMLElement;
    clone.classList.add("portfolio-cursor-hero-clone");
    scene.appendChild(clone);
  }, [isHeroGiant, heroRect]);

  if (!isDesktop || prefersReducedMotion) return null;

  const heroLocalX = heroRect ? position.x - heroRect.left : 0;
  const heroLocalY = heroRect ? position.y - heroRect.top : 0;
  const heroSceneTranslateX =
    HERO_GIANT_RADIUS - heroLocalX * HERO_GIANT_SCALE + HERO_GIANT_X_OFFSET;
  const heroSceneTranslateY = HERO_GIANT_RADIUS - heroLocalY * HERO_GIANT_SCALE;

  return (
    <div
      className="portfolio-cursor"
      data-variant={variant}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      aria-hidden
    >
      {isHeroGiant && heroRect && (
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
      {isViewProject && isViewProjectContentVisible && (
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