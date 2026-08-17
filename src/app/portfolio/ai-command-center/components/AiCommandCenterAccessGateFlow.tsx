"use client";

import { useEffect, useRef, useState } from "react";
import { useJourneyHomeHref, useJourneyHref } from "@/app/portfolio/journey/useJourneyHref";
import { AccessGateModal } from "./AccessGateModal";
import { AiCommandCenterPreviewBanner } from "./AiCommandCenterPreviewBanner";
import { AiCommandCenterVibePhotoSection } from "./AiCommandCenterVibePhotoSection";

type AiCommandCenterAccessGateFlowProps = {
  developerHint?: string | null;
};

/* Locked path: readable public preview, then gate near vibe bottom */
export function AiCommandCenterAccessGateFlow({
  developerHint = null,
}: AiCommandCenterAccessGateFlowProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [gateOpen, setGateOpen] = useState(false);
  const homeHref = useJourneyHomeHref();
  const nextProjectHref = useJourneyHref("/portfolio/basilar");

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        /* Avoid opening on first paint if the strip fits in a tall viewport */
        if (entry?.isIntersecting && window.scrollY > 100) {
          setGateOpen(true);
        }
      },
      {
        /* Trigger a little before the vibe strip’s bottom edge */
        root: null,
        rootMargin: "0px 0px -12% 0px",
        threshold: 0,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <AiCommandCenterVibePhotoSection accessSentinelRef={sentinelRef} />
      <AiCommandCenterPreviewBanner />
      <AccessGateModal
        open={gateOpen}
        developerHint={developerHint}
        nextProjectHref={nextProjectHref}
        nextProjectLabel="Continue to next project 🚀"
        homeHref={homeHref}
      />
    </>
  );
}
