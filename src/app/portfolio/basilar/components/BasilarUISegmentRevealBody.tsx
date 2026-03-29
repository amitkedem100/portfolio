"use client";

import { useLayoutEffect, useRef, useState } from "react";
import "./BasilarUISegmentBlock.css";

const DESKTOP_REVEAL_MQ = "(min-width: 769px)";

type BasilarUISegmentRevealBodyProps = {
  className?: string;
  children: React.ReactNode;
};

/* Desktop: slide-in + delay (styles in BasilarUISegmentBlock.css); no-op on mobile / reduced motion */
export function BasilarUISegmentRevealBody({
  className = "",
  children,
}: BasilarUISegmentRevealBodyProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [bodyEntered, setBodyEntered] = useState(false);
  const [revealEnhance, setRevealEnhance] = useState(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia(DESKTOP_REVEAL_MQ).matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const body = bodyRef.current;
    if (!body) return;

    const vh = window.innerHeight;
    const rect = body.getBoundingClientRect();
    const alreadyInView = rect.top < vh * 0.88 && rect.bottom > vh * 0.12;

    if (alreadyInView) {
      setRevealEnhance(true);
      setBodyEntered(true);
      return;
    }

    setRevealEnhance(true);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBodyEntered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(body);
    return () => obs.disconnect();
  }, []);

  const bodyClassName = [
    "basilar-ui-segment__body",
    className,
    revealEnhance && (bodyEntered ? "basilar-ui-segment__body--entered" : "basilar-ui-segment__body--reveal-pending"),
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={bodyRef} className={bodyClassName}>
      {children}
    </div>
  );
}
