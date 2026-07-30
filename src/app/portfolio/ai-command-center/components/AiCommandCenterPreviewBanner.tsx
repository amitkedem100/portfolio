"use client";

import { useEffect, useState } from "react";
import "./AiCommandCenterPreviewBanner.css";

const DISMISS_SESSION_KEY = "ai-cc-preview-banner-dismissed";
const EXIT_MS = 420;

export function AiCommandCenterPreviewBanner() {
  /* hidden | visible | exiting — keep mounted while sliding out */
  const [phase, setPhase] = useState<"hidden" | "visible" | "exiting">("hidden");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_SESSION_KEY) === "1") {
        setPhase("hidden");
        return;
      }
    } catch {
      /* show when storage unavailable */
    }
    setPhase("visible");
  }, []);

  const isMounted = phase === "visible" || phase === "exiting";
  const pageHasBanner = isMounted;

  useEffect(() => {
    const page = document.querySelector(".ai-cc-page");
    if (!page) return;

    if (pageHasBanner) {
      page.classList.add("ai-cc-page--has-preview-banner");
    } else {
      page.classList.remove("ai-cc-page--has-preview-banner");
    }

    return () => {
      page.classList.remove("ai-cc-page--has-preview-banner");
    };
  }, [pageHasBanner]);

  useEffect(() => {
    if (phase !== "exiting") return;

    const timer = window.setTimeout(() => {
      setPhase("hidden");
    }, EXIT_MS);

    return () => window.clearTimeout(timer);
  }, [phase]);

  const handleDismiss = () => {
    if (phase !== "visible") return;
    setPhase("exiting");
    try {
      sessionStorage.setItem(DISMISS_SESSION_KEY, "1");
    } catch {
      /* ignore quota / private mode */
    }
  };

  if (!isMounted) return null;

  return (
    <div
      className={`ai-cc-preview-banner${phase === "exiting" ? " ai-cc-preview-banner--exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-hidden={phase === "exiting" ? true : undefined}
    >
      <div className="ai-cc-preview-banner__inner">
        <p className="ai-cc-preview-banner__text">
          <span className="ai-cc-preview-banner__label">Limited preview</span>
          <span className="ai-cc-preview-banner__sep" aria-hidden>
            ·
          </span>
          <span className="ai-cc-preview-banner__body">
            You&apos;re viewing the public overview. The full walkthrough unlocks with an access
            code.
          </span>
        </p>
        <button
          type="button"
          className="ai-cc-preview-banner__close"
          onClick={handleDismiss}
          aria-label="Dismiss limited preview notice"
          disabled={phase === "exiting"}
        >
          ×
        </button>
      </div>
    </div>
  );
}
