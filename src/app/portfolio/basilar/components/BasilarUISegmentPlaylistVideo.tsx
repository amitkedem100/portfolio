"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type BasilarUISegmentPlaylistVideoProps = {
  firstSrc: string;
  secondSrc: string;
  ariaLabel: string;
};

function encodePublicVideoSrc(src: string) {
  return src.includes(" ") ? src.replace(/ /g, "%20") : src;
}

/* Sequential loop: clip A → clip B → clip A → … (single element; `loop` off so `ended` fires) */
export function BasilarUISegmentPlaylistVideo({
  firstSrc,
  secondSrc,
  ariaLabel,
}: BasilarUISegmentPlaylistVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [clipIndex, setClipIndex] = useState(0);

  const srcA = encodePublicVideoSrc(firstSrc);
  const srcB = encodePublicVideoSrc(secondSrc);
  const currentSrc = clipIndex === 0 ? srcA : srcB;

  const onEnded = useCallback(() => {
    setClipIndex((i) => (i + 1) % 2);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    void v.play().catch(() => {});
  }, [currentSrc]);

  return (
    <div className="project-video-hero-device-wrap basilar-ui-segment__device-wrap">
      <div className="project-video-hero-device basilar-ui-segment__device basilar-ui-segment__device--shuttle-loop">
        <div className="basilar-ui-segment__shuttle-loop-videos">
          <video
            ref={videoRef}
            className="project-video-hero-device-video"
            src={currentSrc}
            muted
            playsInline
            preload="auto"
            loop={false}
            onEnded={onEnded}
            aria-label={ariaLabel}
          />
        </div>
      </div>
    </div>
  );
}
