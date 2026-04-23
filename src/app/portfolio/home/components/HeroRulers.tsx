"use client";

import { useEffect, useRef, useState } from "react";

type HeroRulersProps = {
  hostRef: React.RefObject<HTMLElement | null>;
};

const RULER_SIZE = 25;
const STEP = 10;

function setupHiDpiCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(width * ratio));
  canvas.height = Math.max(1, Math.floor(height * ratio));
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return ctx;
}

export function HeroRulers({ hostRef }: HeroRulersProps) {
  const topCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const leftCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    const root = document.documentElement;
    const topCanvas = topCanvasRef.current;
    const leftCanvas = leftCanvasRef.current;
    if (!host || !topCanvas || !leftCanvas) return;

    const drawRulers = () => {
      const rect = host.getBoundingClientRect();
      const topWidth = Math.max(0, rect.width - RULER_SIZE);
      const leftHeight = Math.max(0, rect.height - RULER_SIZE);
      const styles = getComputedStyle(root);
      const rulerBg = styles.getPropertyValue("--hero-ruler-bg").trim() || "#1e1e1e";
      const rulerBorder = styles.getPropertyValue("--hero-ruler-border").trim() || "#333333";
      const rulerTick = styles.getPropertyValue("--hero-ruler-tick").trim() || "#666666";
      const rulerLabel = styles.getPropertyValue("--hero-ruler-label").trim() || "#888888";

      const topCtx = setupHiDpiCanvas(topCanvas, topWidth, RULER_SIZE);
      const leftCtx = setupHiDpiCanvas(leftCanvas, RULER_SIZE, leftHeight);
      if (!topCtx || !leftCtx) return;

      topCtx.clearRect(0, 0, topWidth, RULER_SIZE);
      topCtx.fillStyle = rulerBg;
      topCtx.fillRect(0, 0, topWidth, RULER_SIZE);
      topCtx.strokeStyle = rulerBorder;
      topCtx.beginPath();
      topCtx.moveTo(0, RULER_SIZE - 0.5);
      topCtx.lineTo(topWidth, RULER_SIZE - 0.5);
      topCtx.stroke();

      topCtx.strokeStyle = rulerTick;
      topCtx.fillStyle = rulerLabel;
      topCtx.font = "9px monospace";
      topCtx.textBaseline = "top";
      for (let x = 0; x <= topWidth; x += STEP) {
        const is100 = x % 100 === 0;
        const is50 = x % 50 === 0;
        const tickHeight = is100 ? 12 : is50 ? 9 : 6;
        topCtx.beginPath();
        topCtx.moveTo(x + 0.5, RULER_SIZE);
        topCtx.lineTo(x + 0.5, RULER_SIZE - tickHeight);
        topCtx.stroke();
        if (is100) {
          topCtx.fillText(String(x), x + 3, 4);
        }
      }

      leftCtx.clearRect(0, 0, RULER_SIZE, leftHeight);
      leftCtx.fillStyle = rulerBg;
      leftCtx.fillRect(0, 0, RULER_SIZE, leftHeight);
      leftCtx.strokeStyle = rulerBorder;
      leftCtx.beginPath();
      leftCtx.moveTo(RULER_SIZE - 0.5, 0);
      leftCtx.lineTo(RULER_SIZE - 0.5, leftHeight);
      leftCtx.stroke();

      leftCtx.strokeStyle = rulerTick;
      leftCtx.fillStyle = rulerLabel;
      leftCtx.font = "9px monospace";
      for (let y = 0; y <= leftHeight; y += STEP) {
        const is100 = y % 100 === 0;
        const is50 = y % 50 === 0;
        const tickWidth = is100 ? 12 : is50 ? 9 : 6;
        leftCtx.beginPath();
        leftCtx.moveTo(RULER_SIZE, y + 0.5);
        leftCtx.lineTo(RULER_SIZE - tickWidth, y + 0.5);
        leftCtx.stroke();
        if (is100) {
          leftCtx.save();
          leftCtx.translate(4, y + 3);
          leftCtx.rotate(-Math.PI / 2);
          leftCtx.fillText(String(y), 0, 0);
          leftCtx.restore();
        }
      }
    };

    drawRulers();
    const resizeObserver = new ResizeObserver(drawRulers);
    resizeObserver.observe(host);
    window.addEventListener("resize", drawRulers);
    const themeObserver = new MutationObserver(drawRulers);
    themeObserver.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const onPointerMove = (event: PointerEvent) => {
      if (isMobile) return;
      const rect = host.getBoundingClientRect();
      const x = event.clientX - rect.left - RULER_SIZE;
      const y = event.clientY - rect.top - RULER_SIZE;
      setCursorPosition({
        x: Math.max(0, Math.min(rect.width - RULER_SIZE, x)),
        y: Math.max(0, Math.min(rect.height - RULER_SIZE, y)),
      });
    };

    const onPointerLeave = () => setCursorPosition(null);

    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave);

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", drawRulers);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [hostRef, isMobile]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !isMobile) return;

    let rafId = 0;
    const syncFromHeroLens = () => {
      const styles = getComputedStyle(host);
      const lensX = parseFloat(styles.getPropertyValue("--hero-lens-x"));
      const lensY = parseFloat(styles.getPropertyValue("--hero-lens-y"));
      if (Number.isFinite(lensX) && Number.isFinite(lensY)) {
        const rect = host.getBoundingClientRect();
        setCursorPosition({
          x: Math.max(0, Math.min(rect.width - RULER_SIZE, lensX - RULER_SIZE)),
          y: Math.max(0, Math.min(rect.height - RULER_SIZE, lensY - RULER_SIZE)),
        });
      } else {
        setCursorPosition(null);
      }
      rafId = requestAnimationFrame(syncFromHeroLens);
    };

    rafId = requestAnimationFrame(syncFromHeroLens);
    return () => cancelAnimationFrame(rafId);
  }, [hostRef, isMobile]);

  return (
    <div className="hero-rulers" aria-hidden>
      <div className="hero-rulers__corner" />
      <div className="hero-rulers__top">
        <canvas ref={topCanvasRef} />
        {cursorPosition && (
          <span
            className="hero-rulers__indicator hero-rulers__indicator--x"
            style={{ left: `${cursorPosition.x}px` }}
          />
        )}
      </div>
      <div className="hero-rulers__left">
        <canvas ref={leftCanvasRef} />
        {cursorPosition && (
          <span
            className="hero-rulers__indicator hero-rulers__indicator--y"
            style={{ top: `${cursorPosition.y}px` }}
          />
        )}
      </div>
    </div>
  );
}

