"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { isJourneyHomePath } from "@/app/portfolio/journey/portfolioJourney";
import {
  MORE_PROJECTS_ID,
  SELECTED_WORK_ID,
  WORK_SECTION_ID,
  scrollToMoreProjectsWithAnimation,
  scrollToSelectedWorkWithAnimation,
} from "./scrollToSelectedWork.utils";

export const SELECTED_WORK_SCROLL_FLAG_KEY = "portfolio-scroll-to-selected-work-v1";
export const MORE_PROJECTS_SCROLL_FLAG_KEY = "portfolio-scroll-to-more-projects-v1";

/* Pause at top of home before scrolling so orientation is visible, then one smooth scroll. */
const SCROLL_TO_CARDS_AFTER_MS = 450;

function scrollSelectedWorkIntoViewSmooth() {
  const run = () => scrollToSelectedWorkWithAnimation(1050);
  requestAnimationFrame(() => requestAnimationFrame(run));
}

function scrollMoreProjectsIntoViewSmooth() {
  const run = () => scrollToMoreProjectsWithAnimation(1050);
  requestAnimationFrame(() => requestAnimationFrame(run));
}

function readWorkNavScrollFlag(): boolean {
  try {
    return sessionStorage.getItem(SELECTED_WORK_SCROLL_FLAG_KEY) === "1";
  } catch {
    return false;
  }
}

function readMoreProjectsScrollFlag(): boolean {
  try {
    return sessionStorage.getItem(MORE_PROJECTS_SCROLL_FLAG_KEY) === "1";
  } catch {
    return false;
  }
}

function clearWorkNavScrollFlag() {
  try {
    sessionStorage.removeItem(SELECTED_WORK_SCROLL_FLAG_KEY);
  } catch {
    /* ignore */
  }
}

function clearMoreProjectsScrollFlag() {
  try {
    sessionStorage.removeItem(MORE_PROJECTS_SCROLL_FLAG_KEY);
  } catch {
    /* ignore */
  }
}

function isWorkHash(raw: string) {
  return raw === WORK_SECTION_ID || raw === SELECTED_WORK_ID;
}

/*
 * #work and legacy #selected-work — deep link / hashchange on generic home and niche landings.
 */
export function ScrollToSelectedWork() {
  const pathname = usePathname() ?? "";

  useLayoutEffect(() => {
    if (!isJourneyHomePath(pathname)) return;
    if (readWorkNavScrollFlag() || readMoreProjectsScrollFlag()) return;
    if (
      [WORK_SECTION_ID, SELECTED_WORK_ID, MORE_PROJECTS_ID].includes(
        window.location.hash.replace(/^#/, "")
      )
    )
      return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  /* Drop stale flag when leaving a home-style page. */
  useEffect(() => {
    if (isJourneyHomePath(pathname)) return;
    clearWorkNavScrollFlag();
    clearMoreProjectsScrollFlag();
  }, [pathname]);

  useEffect(() => {
    if (!isJourneyHomePath(pathname)) return;

    const tryScrollFromHash = () => {
      const raw = window.location.hash.replace(/^#/, "");
      if (isWorkHash(raw)) {
        scrollSelectedWorkIntoViewSmooth();
        return;
      }
      if (raw === MORE_PROJECTS_ID) {
        scrollMoreProjectsIntoViewSmooth();
      }
    };

    tryScrollFromHash();
    window.addEventListener("hashchange", tryScrollFromHash);
    return () => window.removeEventListener("hashchange", tryScrollFromHash);
  }, [pathname]);

  /*
   * Legacy Work-nav scroll flag (sessionStorage) — still honored on home routes.
   * Primary Work navigation now uses #{work} hashes.
   */
  useLayoutEffect(() => {
    if (!isJourneyHomePath(pathname)) return;
    const shouldScrollSelectedWork = readWorkNavScrollFlag();
    const shouldScrollMoreProjects = readMoreProjectsScrollFlag();
    if (!shouldScrollSelectedWork && !shouldScrollMoreProjects) return;

    const snapTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    snapTop();
    requestAnimationFrame(() => {
      snapTop();
    });

    const timeoutId = window.setTimeout(() => {
      if (!readWorkNavScrollFlag() && !readMoreProjectsScrollFlag()) return;
      clearWorkNavScrollFlag();
      clearMoreProjectsScrollFlag();
      snapTop();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (shouldScrollSelectedWork) {
            scrollSelectedWorkIntoViewSmooth();
            return;
          }
          if (shouldScrollMoreProjects) {
            scrollMoreProjectsIntoViewSmooth();
          }
        });
      });
    }, SCROLL_TO_CARDS_AFTER_MS);

    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
