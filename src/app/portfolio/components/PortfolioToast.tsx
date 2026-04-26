"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./PortfolioToast.css";

type PortfolioToastProps = {
  message: string;
  visible: boolean;
  onClose: () => void;
  durationMs?: number;
  cycleKey?: number;
};

export function PortfolioToast({
  message,
  visible,
  onClose,
  durationMs = 2400,
  cycleKey = 0,
}: PortfolioToastProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <div
      className={`portfolio-toast${visible ? " portfolio-toast--visible" : ""}`}
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
    >
      <div className="portfolio-toast__row">
        <span className="portfolio-toast__check" aria-hidden />
        <span className="portfolio-toast__message">{message}</span>
        <button
          type="button"
          className="portfolio-toast__close"
          onClick={onClose}
          aria-label="Close toast"
        >
          ×
        </button>
        <div className="portfolio-toast__progress" aria-hidden>
          <span
            key={cycleKey}
            className="portfolio-toast__progress-fill"
            style={{ animationDuration: `${durationMs}ms` }}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
