"use client";

import Image from "next/image";
import type { TouchEvent } from "react";
import { useRef, useState } from "react";
import "./ImageCarousel.css";

type ImageCarouselSlide = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type ImageCarouselProps = {
  slides: ImageCarouselSlide[];
  className?: string;
  sizes?: string;
  /** PNG / UI captures: skip optimizer for sharper text (same tradeoff as dashboard widgets) */
  unoptimized?: boolean;
  /** Used when optimized; ignored if unoptimized */
  quality?: number;
};

export function ImageCarousel({
  slides,
  className = "",
  sizes = "100vw",
  unoptimized = false,
  quality = 92,
}: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);
  const total = slides.length;

  const safeIndex = total === 0 ? 0 : Math.min(activeIndex, total - 1);

  if (total === 0) {
    return null;
  }

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % total);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    touchCurrentX.current = touchStartX.current;
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    touchCurrentX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current == null || touchCurrentX.current == null) {
      touchStartX.current = null;
      touchCurrentX.current = null;
      return;
    }

    const deltaX = touchCurrentX.current - touchStartX.current;
    const SWIPE_THRESHOLD_PX = 40;

    if (Math.abs(deltaX) >= SWIPE_THRESHOLD_PX) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    touchStartX.current = null;
    touchCurrentX.current = null;
  };

  return (
    <div className={`image-carousel ${className}`.trim()} aria-label="Image carousel">
      <div
        className="image-carousel__viewport"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="image-carousel__track"
          style={{ transform: `translate3d(-${safeIndex * 100}%, 0, 0)` }}
        >
          {slides.map((slide) => (
            <div key={slide.src} className="image-carousel__slide">
              <Image
                className="image-carousel__image"
                src={slide.src}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                sizes={sizes}
                loading="eager"
                unoptimized={unoptimized}
                quality={unoptimized ? undefined : quality}
              />
            </div>
          ))}
        </div>
      </div>

      <button type="button" className="image-carousel__nav image-carousel__nav--prev" onClick={handlePrev} aria-label="Previous image">
        <span aria-hidden="true">‹</span>
      </button>
      <button type="button" className="image-carousel__nav image-carousel__nav--next" onClick={handleNext} aria-label="Next image">
        <span aria-hidden="true">›</span>
      </button>

      <div className="image-carousel__dots" role="tablist" aria-label="Carousel pagination">
        {slides.map((slide, index) => {
          const isActive = index === safeIndex;
          return (
            <button
              key={slide.src}
              type="button"
              className={`image-carousel__dot${isActive ? " image-carousel__dot--active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to image ${index + 1}`}
              aria-selected={isActive}
              role="tab"
            />
          );
        })}
      </div>
    </div>
  );
}
