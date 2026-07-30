"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type AiCommandCenterHeroPlaylistVideoProps = {
  firstSrc: string;
  secondSrc: string;
  className?: string;
  ariaLabel: string;
};

const PRELOAD_AHEAD_S = 0.18;

/* Dual-layer A/B swap: next clip is primed before the active one ends — no src reload gap. */
export function AiCommandCenterHeroPlaylistVideo({
  firstSrc,
  secondSrc,
  className,
  ariaLabel,
}: AiCommandCenterHeroPlaylistVideoProps) {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState(0); /* 0 = A (firstSrc), 1 = B (secondSrc) */
  const swapArmedRef = useRef(false);

  const getPair = useCallback(() => {
    const active = activeIndex === 0 ? videoARef.current : videoBRef.current;
    const next = activeIndex === 0 ? videoBRef.current : videoARef.current;
    return { active, next };
  }, [activeIndex]);

  /* Start first clip once both are ready enough */
  useEffect(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;

    a.load();
    b.load();

    const start = () => {
      a.currentTime = 0;
      void a.play().catch(() => {});
    };

    if (a.readyState >= 2) {
      start();
    } else {
      a.addEventListener("loadeddata", start, { once: true });
    }

    return () => {
      a.removeEventListener("loadeddata", start);
    };
  }, []);

  const armNextClip = useCallback(() => {
    if (swapArmedRef.current) return;
    const { next } = getPair();
    if (!next) return;

    swapArmedRef.current = true;
    next.currentTime = 0;
    void next.play().catch(() => {});
  }, [getPair]);

  const finalizeSwap = useCallback(() => {
    const { active, next } = getPair();
    if (!next) return;

    /* Ensure next is playing before we hide the old layer */
    if (next.paused) {
      void next.play().catch(() => {});
    }

    setActiveIndex((i) => (i + 1) % 2);
    swapArmedRef.current = false;

    if (active) {
      active.pause();
      try {
        active.currentTime = 0;
      } catch {
        /* ignore seek race while decoding */
      }
    }
  }, [getPair]);

  const onTimeUpdate = useCallback(
    (layer: 0 | 1) => {
      if (layer !== activeIndex) return;
      const { active } = getPair();
      if (!active || !Number.isFinite(active.duration) || active.duration <= 0) return;

      if (active.duration - active.currentTime <= PRELOAD_AHEAD_S) {
        armNextClip();
      }
    },
    [activeIndex, armNextClip, getPair],
  );

  const onEnded = useCallback(
    (layer: 0 | 1) => {
      if (layer !== activeIndex) return;
      if (!swapArmedRef.current) {
        armNextClip();
      }
      finalizeSwap();
    },
    [activeIndex, armNextClip, finalizeSwap],
  );

  const videoClass = className ?? "ai-cc-hero__media-video";

  return (
    <div className="ai-cc-hero__media-playlist" aria-label={ariaLabel}>
      <video
        ref={videoARef}
        className={`${videoClass}${activeIndex === 0 ? " ai-cc-hero__media-video--active" : ""}`}
        src={firstSrc}
        muted
        playsInline
        preload="auto"
        loop={false}
        onTimeUpdate={() => onTimeUpdate(0)}
        onEnded={() => onEnded(0)}
        aria-hidden={activeIndex !== 0}
      />
      <video
        ref={videoBRef}
        className={`${videoClass}${activeIndex === 1 ? " ai-cc-hero__media-video--active" : ""}`}
        src={secondSrc}
        muted
        playsInline
        preload="auto"
        loop={false}
        onTimeUpdate={() => onTimeUpdate(1)}
        onEnded={() => onEnded(1)}
        aria-hidden={activeIndex !== 1}
      />
    </div>
  );
}
