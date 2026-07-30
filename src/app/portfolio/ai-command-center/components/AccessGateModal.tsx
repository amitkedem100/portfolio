"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { unlockAiCommandCenterAccess } from "../actions";
import "./AccessGateModal.css";

const DIGIT_COUNT = 4;
const INCORRECT_MESSAGE = "That code didn't work. Try again.";

type AccessGateModalProps = {
  open: boolean;
  developerHint?: string | null;
  nextProjectHref: string;
  nextProjectLabel: string;
  homeHref: string;
};

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function AccessGateModal({
  open,
  developerHint = null,
  nextProjectHref,
  nextProjectLabel,
  homeHref,
}: AccessGateModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const errorId = useId();
  const router = useRouter();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const submitLockRef = useRef(false);
  const [digits, setDigits] = useState<string[]>(() => Array(DIGIT_COUNT).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  /* idle → backdrop blur → dialog enter */
  const [revealPhase, setRevealPhase] = useState<"idle" | "backdrop" | "dialog">("idle");

  useEffect(() => {
    if (!open) {
      setRevealPhase("idle");
      document.querySelector(".ai-cc-page")?.removeAttribute("data-gate-phase");
      return;
    }

    const page = document.querySelector(".ai-cc-page");
    setRevealPhase("idle");
    page?.setAttribute("data-gate-phase", "idle");

    /* Longer staged reveal: blur settles, then the dialog eases in */
    const backdropTimer = window.setTimeout(() => {
      page?.setAttribute("data-gate-phase", "backdrop");
      setRevealPhase("backdrop");
    }, 60);

    const dialogTimer = window.setTimeout(() => {
      page?.setAttribute("data-gate-phase", "dialog");
      setRevealPhase("dialog");
    }, 920);

    return () => {
      window.clearTimeout(backdropTimer);
      window.clearTimeout(dialogTimer);
      page?.removeAttribute("data-gate-phase");
    };
  }, [open]);

  /* Soft focus on first digit after enter — code is the primary action */
  useEffect(() => {
    if (!open || revealPhase !== "dialog") return;

    const raf = window.requestAnimationFrame(() => {
      inputRefs.current[0]?.focus({ preventScroll: true });
    });

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [open, revealPhase]);

  const clearDigitsAndFocusFirst = useCallback(() => {
    setDigits(Array(DIGIT_COUNT).fill(""));
    submitLockRef.current = false;
    window.requestAnimationFrame(() => {
      inputRefs.current[0]?.focus();
    });
  }, []);

  const submitCode = useCallback(
    (nextCode: string) => {
      if (submitLockRef.current || isPending) return;
      if (!/^\d{4}$/.test(nextCode)) return;

      submitLockRef.current = true;
      setError(null);

      startTransition(async () => {
        const result = await unlockAiCommandCenterAccess(nextCode);
        if (!result.ok) {
          setError(result.error || INCORRECT_MESSAGE);
          clearDigitsAndFocusFirst();
          return;
        }
        setDigits(Array(DIGIT_COUNT).fill(""));
        submitLockRef.current = false;
        router.refresh();
      });
    },
    [clearDigitsAndFocusFirst, isPending, router],
  );

  const applyDigits = useCallback(
    (next: string[]) => {
      setDigits(next);
      setError(null);
      const joined = next.join("");
      if (joined.length === DIGIT_COUNT && next.every(Boolean)) {
        submitCode(joined);
      }
    },
    [submitCode],
  );

  const updateDigit = useCallback(
    (index: number, value: string) => {
      const digit = onlyDigits(value).slice(-1);
      setDigits((prev) => {
        const next = [...prev];
        next[index] = digit;
        const joined = next.join("");
        if (digit && joined.length === DIGIT_COUNT && next.every(Boolean)) {
          /* Defer so state commits before unlock */
          queueMicrotask(() => submitCode(joined));
        }
        return next;
      });
      setError(null);
      if (digit && index < DIGIT_COUNT - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [submitCode],
  );

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      if (digits[index]) {
        event.preventDefault();
        setDigits((prev) => {
          const next = [...prev];
          next[index] = "";
          return next;
        });
        setError(null);
        submitLockRef.current = false;
        return;
      }
      if (index > 0) {
        event.preventDefault();
        setDigits((prev) => {
          const next = [...prev];
          next[index - 1] = "";
          return next;
        });
        setError(null);
        submitLockRef.current = false;
        inputRefs.current[index - 1]?.focus();
      }
      return;
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      inputRefs.current[index - 1]?.focus();
      return;
    }

    if (event.key === "ArrowRight" && index < DIGIT_COUNT - 1) {
      event.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = onlyDigits(event.clipboardData.getData("text")).slice(0, DIGIT_COUNT);
    if (!pasted) return;

    const next = Array(DIGIT_COUNT).fill("");
    for (let i = 0; i < pasted.length; i += 1) {
      next[i] = pasted[i];
    }
    applyDigits(next);
    const focusIndex = Math.min(pasted.length, DIGIT_COUNT - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  if (!open) return null;

  const gateClass = [
    "ai-cc-access-gate",
    revealPhase !== "idle" ? "ai-cc-access-gate--backdrop-ready" : "",
    revealPhase === "dialog" ? "ai-cc-access-gate--dialog-ready" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={gateClass}>
      <div className="ai-cc-access-gate__backdrop" aria-hidden />
      <div
        className="ai-cc-access-gate__dialog"
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        aria-hidden={revealPhase !== "dialog" ? true : undefined}
      >
        <div className="ai-cc-access-gate__top">
          <div className="ai-cc-access-gate__intro">
            <h2 id={titleId} className="ai-cc-access-gate__title">
              Thanks for reading this far
            </h2>
            <p id={descriptionId} className="ai-cc-access-gate__description">
              The deeper walkthrough stays private for confidentiality. Enter a code to unlock it,
              or continue exploring.
            </p>
          </div>

          <div className="ai-cc-access-gate__code-block">
            <p className="ai-cc-access-gate__code-label">Access code</p>

            <div
              className={`ai-cc-access-form${isPending ? " ai-cc-access-form--pending" : ""}`}
              role="group"
              aria-label="Four-digit access code"
            >
              <div className="ai-cc-access-form__digits">
                {digits.map((digit, index) => (
                  <input
                    key={`digit-${index}`}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    className={`ai-cc-access-form__digit${digit ? " ai-cc-access-form__digit--filled" : ""}${
                      error ? " ai-cc-access-form__digit--error" : ""
                    }`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={digit}
                    disabled={isPending}
                    aria-label={`Digit ${index + 1} of ${DIGIT_COUNT}`}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? errorId : undefined}
                    onFocus={(event) => event.currentTarget.select()}
                    onChange={(event) => updateDigit(index, event.target.value)}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    onPaste={handlePaste}
                  />
                ))}
              </div>

              <p
                id={errorId}
                className={`ai-cc-access-form__error${error ? " ai-cc-access-form__error--visible" : ""}${
                  isPending ? " ai-cc-access-form__error--pending" : ""
                }`}
                role="alert"
                aria-live="assertive"
              >
                {isPending ? "Checking…" : (error ?? "")}
              </p>
            </div>
          </div>
        </div>

        <div className="ai-cc-access-gate__nav">
          <p className="ai-cc-access-gate__nav-prompt">Enter the digits, or</p>
          <Link href={nextProjectHref} className="ai-cc-access-gate__next">
            {nextProjectLabel}
          </Link>
          <Link href={homeHref} className="ai-cc-access-gate__home">
            Back to home
          </Link>
        </div>

        {developerHint ? (
          <p className="ai-cc-access-gate__dev-hint" role="status">
            {developerHint}
          </p>
        ) : null}
      </div>
    </div>
  );
}
