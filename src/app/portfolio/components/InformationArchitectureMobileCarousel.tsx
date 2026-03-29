"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  IA_DIAGRAM_BRANCHES,
  isSubtreeSingleLeafOnly,
} from "@/data/informationArchitectureDiagram";
import { IA_AUTO_ADVANCE_MS, IATreeBlock } from "./InformationArchitectureDiagram";

const BRANCH_COUNT = IA_DIAGRAM_BRANCHES.length;
/* One slide per area — subtree only (no Home overview) */
const TOTAL_SLIDES = BRANCH_COUNT;

const SWIPE_MIN_PX = 48;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

/* Mobile IA carousel: auto-advance like desktop; stops permanently after user swipe or arrow nav */

export function InformationArchitectureMobileCarousel() {
  const [index, setIndex] = useState(0);
  /* User-driven nav disables auto until full page reload */
  const [autoAdvanceStopped, setAutoAdvanceStopped] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const goPrev = useCallback(() => {
    setAutoAdvanceStopped(true);
    setIndex((i) => (i - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
  }, []);

  const goNext = useCallback(() => {
    setAutoAdvanceStopped(true);
    setIndex((i) => (i + 1) % TOTAL_SLIDES);
  }, []);

  useEffect(() => {
    if (autoAdvanceStopped || prefersReducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % TOTAL_SLIDES);
    }, IA_AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [autoAdvanceStopped, prefersReducedMotion]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current == null) return;
      const endX = e.changedTouches[0].clientX;
      const dx = endX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(dx) < SWIPE_MIN_PX) return;
      setAutoAdvanceStopped(true);
      if (dx > 0) {
        setIndex((i) => (i - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
      } else {
        setIndex((i) => (i + 1) % TOTAL_SLIDES);
      }
    },
    [],
  );

  const branch = IA_DIAGRAM_BRANCHES[index];
  const singleLeaf = isSubtreeSingleLeafOnly(branch);

  return (
    <div
      className="ia-mobile-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Information architecture by area"
    >
      <div
        className="ia-mobile-carousel__viewport"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="ia-mobile-carousel__slide-slot">
          <div className="ia-mobile-carousel__branch-slide">
            <div className="ia-mobile-carousel__page-title-wrap">
              <div className="ia-diagram__node ia-diagram__node--html ia-diagram__node--primary">
                {branch.label}
              </div>
            </div>
            <div
              className="ia-diagram__foreign-root ia-mobile-carousel__panel"
              data-ia-branch={branch.id}
            >
              {singleLeaf ? (
                <div className="ia-mobile-carousel__single-leaf">
                  <div className="ia-diagram__node ia-diagram__node--html ia-diagram__node--leaf">
                    {branch.tree.label}
                  </div>
                </div>
              ) : (
                <IATreeBlock
                  node={branch.tree}
                  branchId={branch.id}
                  shuttleRootRowStyle={undefined}
                  preferMobileLabelShort={branch.id === "map"}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="ia-mobile-carousel__footer">
        <span className="ia-mobile-carousel__page">
          Page {index + 1} / {TOTAL_SLIDES}
        </span>
        <div className="ia-mobile-carousel__nav">
          <button
            type="button"
            className="ia-mobile-carousel__btn"
            onClick={goPrev}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            className="ia-mobile-carousel__btn"
            onClick={goNext}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
