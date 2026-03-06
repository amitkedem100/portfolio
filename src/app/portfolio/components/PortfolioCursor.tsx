"use client";

import { useState, useEffect, useRef } from "react";
import { useCursorContext } from "../context/CursorContext";
import "./PortfolioCursor.css";

const DESKTOP_MEDIA = "(min-width: 769px)";
const REDUCED_MOTION_MEDIA = "(prefers-reduced-motion: reduce)";

export function PortfolioCursor() {
  const { variant } = useCursorContext();
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);

  /* Desktop only: match portfolio breakpoint */
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MEDIA);
    const handler = () => setIsDesktop(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* Disable custom cursor when user prefers reduced motion */
  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_MEDIA);
    const handler = () => setPrefersReducedMotion(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* Pointer position: update via requestAnimationFrame to limit re-renders */
  useEffect(() => {
    if (!isDesktop) return;

    const onMove = (e: PointerEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          setPosition({ ...positionRef.current });
          rafIdRef.current = null;
        });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isDesktop]);

  if (!isDesktop || prefersReducedMotion) return null;

  return (
    <div
      className="portfolio-cursor"
      data-variant={variant}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      aria-hidden
    />
  );
}
