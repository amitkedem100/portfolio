"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import "./ProjectPageLoader.css";

type ProjectPageLoaderProps = {
  children: ReactNode;
};

function isProjectRoute(pathname: string): boolean {
  return (
    pathname.startsWith("/portfolio/basilar") ||
    pathname.startsWith("/portfolio/saas") ||
    pathname.startsWith("/portfolio/command-center") ||
    pathname.startsWith("/portfolio/project/")
  );
}

export function ProjectPageLoader({ children }: ProjectPageLoaderProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const showLoader = useMemo(() => isProjectRoute(pathname), [pathname]);

  useEffect(() => {
    if (!showLoader) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    let cancelled = false;
    let remaining = 0;
    const cleanups: Array<() => void> = [];

    const doneOne = () => {
      remaining -= 1;
      if (!cancelled && remaining <= 0) {
        setIsLoading(false);
      }
    };

    const watchImage = (img: HTMLImageElement) => {
      if (img.complete && img.naturalWidth > 0) {
        return;
      }
      remaining += 1;
      const onReady = () => doneOne();
      img.addEventListener("load", onReady, { once: true });
      img.addEventListener("error", onReady, { once: true });
      cleanups.push(() => {
        img.removeEventListener("load", onReady);
        img.removeEventListener("error", onReady);
      });
    };

    const watchVideo = (video: HTMLVideoElement) => {
      if (video.readyState >= 2) {
        return;
      }
      remaining += 1;
      const onReady = () => doneOne();
      video.addEventListener("loadeddata", onReady, { once: true });
      video.addEventListener("error", onReady, { once: true });
      cleanups.push(() => {
        video.removeEventListener("loadeddata", onReady);
        video.removeEventListener("error", onReady);
      });
    };

    const startWatching = () => {
      const root = containerRef.current;
      if (!root) {
        setIsLoading(false);
        return;
      }

      const images = Array.from(root.querySelectorAll("img"));
      const videos = Array.from(root.querySelectorAll("video"));

      images.forEach((img) => watchImage(img));
      videos.forEach((video) => watchVideo(video));

      if (remaining === 0) {
        setIsLoading(false);
      }
    };

    const rafA = window.requestAnimationFrame(() => {
      const rafB = window.requestAnimationFrame(startWatching);
      cleanups.push(() => window.cancelAnimationFrame(rafB));
    });
    cleanups.push(() => window.cancelAnimationFrame(rafA));

    const failSafe = window.setTimeout(() => {
      if (!cancelled) {
        setIsLoading(false);
      }
    }, 5000);

    cleanups.push(() => window.clearTimeout(failSafe));

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
    };
  }, [pathname, showLoader]);

  useEffect(() => {
    if (!(showLoader && isLoading)) {
      document.body.style.removeProperty("overflow");
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showLoader, isLoading]);

  return (
    <div ref={containerRef} className={`project-page-loader${isLoading ? " project-page-loader--loading" : ""}`}>
      <div className="project-page-loader__content-layer">{children}</div>
      {showLoader && isLoading ? (
        <div className="project-page-loader__overlay" role="status" aria-live="polite" aria-busy="true">
          <div className="project-page-loader__panel">
            <div className="project-page-loader__spinner" aria-hidden="true" />
            <p className="project-page-loader__title">Getting things ready</p>
            <p className="project-page-loader__text">Almost there...</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
