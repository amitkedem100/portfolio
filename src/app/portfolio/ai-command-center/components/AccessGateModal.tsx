"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import { unlockAiCommandCenterAccess } from "../actions";
import "./AccessGateModal.css";

const DIGIT_COUNT = 4;
const INCORRECT_MESSAGE = "The access code is incorrect. Please try again.";

type AccessGateModalProps = {
  /* Compact developer-only hint rendered below the form in development */
  developerHint?: string | null;
};

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function AccessGateModal({ developerHint = null }: AccessGateModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const errorId = useId();
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [digits, setDigits] = useState<string[]>(() => Array(DIGIT_COUNT).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const code = digits.join("");
  const canSubmit = code.length === DIGIT_COUNT && !isPending;

  /* Scroll lock while the access gate is open — header stays interactive above the overlay */
  useEffect(() => {
    const scrollY = window.scrollY;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyPosition = document.body.style.position;
    const prevBodyTop = document.body.style.top;
    const prevBodyWidth = document.body.style.width;
    const prevBodyPaddingRight = document.body.style.paddingRight;
    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    if (scrollbarGap > 0) {
      document.body.style.paddingRight = `${scrollbarGap}px`;
    }

    const blockScrollKeys = (event: globalThis.KeyboardEvent) => {
      const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (keys.includes(event.key) && !isTyping) {
        event.preventDefault();
      }
      if (event.key === "Escape") {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", blockScrollKeys, true);

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.position = prevBodyPosition;
      document.body.style.top = prevBodyTop;
      document.body.style.width = prevBodyWidth;
      document.body.style.paddingRight = prevBodyPaddingRight;
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
      document.removeEventListener("keydown", blockScrollKeys, true);
    };
  }, []);

  /* Focus trap inside the dialog; header remains mouse-reachable above the overlay */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));

    const raf = window.requestAnimationFrame(() => {
      inputRefs.current[0]?.focus();
    });

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!panel.contains(active)) {
        event.preventDefault();
        first.focus();
        return;
      }

      if (event.shiftKey) {
        if (active === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isPending]);

  const clearDigitsAndFocusFirst = useCallback(() => {
    setDigits(Array(DIGIT_COUNT).fill(""));
    window.requestAnimationFrame(() => {
      inputRefs.current[0]?.focus();
    });
  }, []);

  const updateDigit = useCallback((index: number, value: string) => {
    const digit = onlyDigits(value).slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    setError(null);
    if (digit && index < DIGIT_COUNT - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }, []);

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (code.length === DIGIT_COUNT && !isPending) {
        event.currentTarget.form?.requestSubmit();
      }
      return;
    }

    if (event.key === "Backspace") {
      if (digits[index]) {
        event.preventDefault();
        setDigits((prev) => {
          const next = [...prev];
          next[index] = "";
          return next;
        });
        setError(null);
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
    setDigits(next);
    setError(null);
    const focusIndex = Math.min(pasted.length, DIGIT_COUNT - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) return;

    if (!/^\d{4}$/.test(code)) {
      setError(INCORRECT_MESSAGE);
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await unlockAiCommandCenterAccess(code);
      if (!result.ok) {
        setError(result.error);
        clearDigitsAndFocusFirst();
        return;
      }
      setDigits(Array(DIGIT_COUNT).fill(""));
      router.refresh();
    });
  };

  return (
    <div className="ai-cc-access-gate">
      <div className="ai-cc-access-gate__backdrop" aria-hidden />
      <div
        ref={panelRef}
        className="ai-cc-access-gate__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <h2 id={titleId} className="ai-cc-access-gate__title">
          Private case study
        </h2>
        <p id={descriptionId} className="ai-cc-access-gate__description">
          This project contains sensitive operational material. Enter the four-digit access code to
          continue.
        </p>

        <form className="ai-cc-access-form" onSubmit={handleSubmit} noValidate>
          <fieldset className="ai-cc-access-form__fieldset" disabled={isPending}>
            <legend className="ai-cc-access-form__legend">Access code</legend>
            <div className="ai-cc-access-form__digits" role="group" aria-label="Four-digit access code">
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
          </fieldset>

          <p
            id={errorId}
            className={`ai-cc-access-form__error${error ? " ai-cc-access-form__error--visible" : ""}`}
            role="alert"
            aria-live="assertive"
          >
            {error ?? ""}
          </p>

          <button type="submit" className="ai-cc-access-form__submit" disabled={!canSubmit}>
            {isPending ? "Checking…" : "View case study"}
          </button>
        </form>

        <p className="ai-cc-access-gate__helper">
          Access is shared directly with reviewers and hiring teams.
        </p>

        {developerHint ? (
          <p className="ai-cc-access-gate__dev-hint" role="status">
            {developerHint}
          </p>
        ) : null}
      </div>
    </div>
  );
}
