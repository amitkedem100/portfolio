"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { SELECTED_WORK_ID, scrollToSelectedWorkWithAnimation } from "./scrollToSelectedWork.utils";

export const SELECTED_WORK_SCROLL_FLAG_KEY = "portfolio-scroll-to-selected-work-v1";
const HOME_PATH = "/portfolio/home";

/* Pause at top of home before scrolling so orientation is visible, then one smooth scroll. */
const SCROLL_TO_CARDS_AFTER_MS = 450;

function scrollSelectedWorkIntoViewSmooth() {
  const run = () => scrollToSelectedWorkWithAnimation(1050);
  requestAnimationFrame(() => requestAnimationFrame(run));
}

function readWorkNavScrollFlag(): boolean {
  try {
    return sessionStorage.getItem(SELECTED_WORK_SCROLL_FLAG_KEY) === "1";
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

/*
 * #selected-work — deep link / hashchange.
 */
export function ScrollToSelectedWork() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname !== HOME_PATH) return;
    if (readWorkNavScrollFlag()) return;
    if (window.location.hash.replace(/^#/, "") === SELECTED_WORK_ID) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  /* Drop stale flag when leaving home (user navigated away before delayed scroll). */
  useEffect(() => {
    if (pathname === HOME_PATH) return;
    clearWorkNavScrollFlag();
  }, [pathname]);

  useEffect(() => {
    if (pathname !== HOME_PATH) return;

    const tryScrollFromHash = () => {
      const raw = window.location.hash.replace(/^#/, "");
      if (raw !== SELECTED_WORK_ID) return;
      scrollSelectedWorkIntoViewSmooth();
    };

    tryScrollFromHash();
    window.addEventListener("hashchange", tryScrollFromHash);
    return () => window.removeEventListener("hashchange", tryScrollFromHash);
  }, [pathname]);

  /*
   * Work nav: snap to top before paint, then after delay smooth-scroll to cards.
   * Do NOT clear sessionStorage until the timeout runs — Strict Mode cancels the first timeout
   * on remount; the flag must stay "1" so the second mount schedules a new timeout.
   */
  useLayoutEffect(() => {
    if (pathname !== HOME_PATH) return;
    if (!readWorkNavScrollFlag()) return;

    const snapTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    snapTop();
    requestAnimationFrame(() => {
      snapTop();
    });

    const timeoutId = window.setTimeout(() => {
      if (!readWorkNavScrollFlag()) return;
      clearWorkNavScrollFlag();
      snapTop();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollSelectedWorkIntoViewSmooth());
      });
    }, SCROLL_TO_CARDS_AFTER_MS);

    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
