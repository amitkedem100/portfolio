"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CopyToClipboardArgs = {
  value: string;
  desktopMessage: string;
  mobileMessage: string;
};

type UseClipboardToastOptions = {
  durationMs?: number;
  fadeBufferMs?: number;
};

const DEFAULT_TOAST_DURATION_MS = 2400;
const DEFAULT_TOAST_FADE_BUFFER_MS = 220;

export function useClipboardToast(options: UseClipboardToastOptions = {}) {
  const durationMs = options.durationMs ?? DEFAULT_TOAST_DURATION_MS;
  const fadeBufferMs = options.fadeBufferMs ?? DEFAULT_TOAST_FADE_BUFFER_MS;

  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastCycleKey, setToastCycleKey] = useState(0);
  const isMobileRef = useRef(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => {
      isMobileRef.current = media.matches;
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(
    () => () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    },
    []
  );

  const closeToast = useCallback(() => {
    setToastVisible(false);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
  }, []);

  const showToast = useCallback(
    (message: string) => {
      setToastMessage(message);
      setToastCycleKey((prev) => prev + 1);
      setToastVisible(true);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => setToastVisible(false), durationMs + fadeBufferMs);
    },
    [durationMs, fadeBufferMs]
  );

  const copyToClipboard = useCallback(
    async ({ value, desktopMessage, mobileMessage }: CopyToClipboardArgs) => {
      try {
        await navigator.clipboard.writeText(value);
        showToast(isMobileRef.current ? mobileMessage : desktopMessage);
      } catch {
        showToast(isMobileRef.current ? "Copy not available on mobile." : "Failed to copy.");
      }
    },
    [showToast]
  );

  return {
    copyToClipboard,
    closeToast,
    toastProps: {
      message: toastMessage,
      visible: toastVisible,
      durationMs,
      cycleKey: toastCycleKey,
    },
  };
}
