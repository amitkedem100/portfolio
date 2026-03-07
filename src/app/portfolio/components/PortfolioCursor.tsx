"use client";

import { useState, useEffect, useRef } from "react";
import { useCursorContext } from "../context/CursorContext";
import "./PortfolioCursor.css";

const DESKTOP_MEDIA = "(min-width: 769px)";
const REDUCED_MOTION_MEDIA = "(prefers-reduced-motion: reduce)";
/* Lerp factor: lower = more lag, higher = snappier. ~0.15–0.2 gives a mild trailing feel */
const LERP_FACTOR = 0.18;

export function PortfolioCursor() {
  const { variant } = useCursorContext();
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const displayRef = useRef({ x: 0, y: 0 });
  const hasInitialPositionRef = useRef(false);

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

  /* Target position from pointer */
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

  /* Animation loop: lerp display position toward target for a slight trailing effect */
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
