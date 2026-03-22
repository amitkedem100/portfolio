"use client";

import { useCallback, useRef, useState } from "react";
import {
  IA_DIAGRAM_BRANCHES,
  isSubtreeSingleLeafOnly,
} from "@/data/informationArchitectureDiagram";
import { IATreeBlock } from "./InformationArchitectureDiagram";

const BRANCH_COUNT = IA_DIAGRAM_BRANCHES.length;
/* One slide per area — subtree only (no Home overview) */
const TOTAL_SLIDES = BRANCH_COUNT;

const SWIPE_MIN_PX = 48;

/* Mobile IA carousel: one subtree per area; loop nav + swipe */

export function InformationArchitectureMobileCarousel() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % TOTAL_SLIDES);
  }, []);

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
      if (dx > 0) goPrev();
      else goNext();
    },
    [goPrev, goNext],
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
