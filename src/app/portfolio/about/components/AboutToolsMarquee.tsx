"use client";

import { useEffect, useRef } from "react";

type ToolCategory = "ux" | "systems" | "ai" | "code";

type ToolItem = {
  label: string;
};

type ToolGroup = {
  category: ToolCategory;
  items: ToolItem[];
};

type AboutToolsMarqueeProps = {
  groups: readonly ToolGroup[];
};

const MOBILE_BREAKPOINT = "(max-width: 768px)";
const DESKTOP_AUTO_SCROLL_SPEED = 48;
const MOBILE_AUTO_SCROLL_SPEED = 32;

export default function AboutToolsMarquee({ groups }: AboutToolsMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sequenceRef = useRef<HTMLSpanElement | null>(null);
  const isTouchingRef = useRef(false);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const marqueeEl = marqueeRef.current;
    const trackEl = trackRef.current;
    const sequenceEl = sequenceRef.current;

    if (!marqueeEl || !trackEl || !sequenceEl) {
      return;
    }

    const mobileQuery = window.matchMedia(MOBILE_BREAKPOINT);
    let animationFrameId = 0;
    let isDisposed = false;
    let lastTimestamp = 0;

    const getCycleDistance = () => {
      const trackStyles = window.getComputedStyle(trackEl);
      const trackGap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || "0") || 0;
      return sequenceEl.offsetWidth + trackGap;
    };

    const runAutoScroll = (timestamp: number) => {
      if (isDisposed) {
        return;
      }

      if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
      }

      const deltaMs = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      const shouldPause = isTouchingRef.current || (!mobileQuery.matches && isHoveringRef.current);

      if (!shouldPause) {
        const cycleDistance = getCycleDistance();
        const speedPxPerSecond = mobileQuery.matches
          ? MOBILE_AUTO_SCROLL_SPEED
          : DESKTOP_AUTO_SCROLL_SPEED;
        const deltaPx = (speedPxPerSecond * deltaMs) / 1000;

        marqueeEl.scrollLeft += deltaPx;

        if (cycleDistance > 0 && marqueeEl.scrollLeft >= cycleDistance) {
          marqueeEl.scrollLeft -= cycleDistance;
        }
      }

      animationFrameId = window.requestAnimationFrame(runAutoScroll);
    };

    animationFrameId = window.requestAnimationFrame(runAutoScroll);

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleTouchStart = () => {
    isTouchingRef.current = true;
  };

  const handleTouchEnd = () => {
    isTouchingRef.current = false;
  };

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
  };

  return (
    <div
      className="about-tools__marquee"
      aria-label="Tools marquee"
      ref={marqueeRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="about-tools__track" ref={trackRef}>
        <span className="about-tools__sequence" ref={sequenceRef}>
          {groups.map((group) => (
            <span className={`about-tools__group about-tools__group--${group.category}`} key={group.category}>
              {group.items.map((tool) => (
                <span className="about-tools__item" key={`${group.category}-${tool.label}`}>
                  {tool.label}
                </span>
              ))}
            </span>
          ))}
        </span>

        <span className="about-tools__sequence" aria-hidden>
          {groups.map((group) => (
            <span className={`about-tools__group about-tools__group--${group.category}`} key={`${group.category}-duplicate`}>
              {group.items.map((tool) => (
                <span className="about-tools__item" key={`${group.category}-${tool.label}-duplicate`}>
                  {tool.label}
                </span>
              ))}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
