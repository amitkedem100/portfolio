"use client";

export const SELECTED_WORK_ID = "selected-work";
export const MORE_PROJECTS_ID = "more-projects";

export function scrollToSelectedWorkWithAnimation(durationMs = 1050) {
  scrollToElementWithAnimation(SELECTED_WORK_ID, durationMs);
}

export function scrollToMoreProjectsWithAnimation(durationMs = 1050) {
  scrollToElementWithAnimation(MORE_PROJECTS_ID, durationMs);
}

function scrollToElementWithAnimation(targetId: string, durationMs: number) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const startY = window.scrollY;
  const targetY = window.scrollY + target.getBoundingClientRect().top;
  const distance = targetY - startY;
  const startTime = performance.now();

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / durationMs, 1);
    const easedProgress = easeInOutCubic(progress);
    window.scrollTo(0, startY + distance * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}

