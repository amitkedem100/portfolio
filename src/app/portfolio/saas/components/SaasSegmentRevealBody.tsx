"use client";

import type { ElementType, ReactNode } from "react";
import { useLayoutEffect, useRef, useState } from "react";

const DESKTOP_REVEAL_MQ = "(min-width: 769px)";

type SaasSegmentRevealBodyProps = {
  as?: ElementType;
  className: string;
  children: ReactNode;
};

/* Local SaaS reveal wrapper: desktop-only, reduced-motion aware, one-time enter */
export function SaasSegmentRevealBody({
  as: Tag = "div",
  className,
  children,
}: SaasSegmentRevealBodyProps) {
  const bodyRef = useRef<HTMLElement | null>(null);
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
    className,
    revealEnhance && (bodyEntered ? "saas-reveal-body--entered" : "saas-reveal-body--pending"),
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={bodyRef} className={bodyClassName}>
      {children}
    </Tag>
  );
}
