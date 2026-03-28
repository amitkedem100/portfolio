"use client";

import { useEffect, useRef, useState } from "react";

type HintIconVariant = "desktop" | "mobile";

/* Subtle motion twice after first scroll-into-view; shared by desktop + mobile (see CSS) */
export function InformationArchitectureInteractionHintIcon({
  variant,
}: {
  variant: HintIconVariant;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPlay(true);
        obs.disconnect();
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.15 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const base =
    variant === "desktop"
      ? "ia-interaction-hint__icon ia-interaction-hint__icon--desktop"
      : "ia-interaction-hint__icon ia-interaction-hint__icon--mobile";
  const playClass =
    variant === "desktop"
      ? "ia-interaction-hint__icon--desktop--play"
      : "ia-interaction-hint__icon--mobile--play";

  return (
    <span
      ref={ref}
      className={play ? `${base} ${playClass}` : base}
      aria-hidden
    />
  );
}
