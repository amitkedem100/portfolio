import type { Ref } from "react";
import Image from "next/image";
import "@/app/portfolio/basilar/components/BasilarFestivalVibeSection.css";
import "./AiCommandCenterVibePhotoSection.css";

const VIBE_IMAGE_SRC = "/images/AI-Command-Center/cameras-atmosphere.jpg";

type AiCommandCenterVibePhotoSectionProps = {
  /** Sentinel near the strip bottom — used to open the access gate on scroll */
  accessSentinelRef?: Ref<HTMLDivElement>;
};

export function AiCommandCenterVibePhotoSection({
  accessSentinelRef,
}: AiCommandCenterVibePhotoSectionProps) {
  return (
    <section
      className="ai-cc-page-section basilar-page-section basilar-page-vibe-photo ai-cc-page-vibe-photo"
      aria-label="Operational surveillance atmosphere"
    >
      <div className="basilar-page-vibe-photo-inner ai-cc-page-vibe-photo-inner">
        <Image
          className="basilar-page-vibe-photo-img ai-cc-page-vibe-photo-img"
          src={VIBE_IMAGE_SRC}
          alt=""
          fill
          sizes="100vw"
          priority={false}
        />
        {accessSentinelRef ? (
          <div
            ref={accessSentinelRef}
            className="ai-cc-access-sentinel"
            aria-hidden
          />
        ) : null}
      </div>
    </section>
  );
}
