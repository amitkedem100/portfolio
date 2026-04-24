"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./HomeContactSection.css";
import { CursorZone } from "@/app/portfolio/components/CursorZone";
import { PortfolioToast } from "@/app/portfolio/components/PortfolioToast";
import { HeroKeywordBadge } from "./HeroKeywordBadge";
import { HomeContactIconButton } from "./HomeContactIconButton";

const WHATSAPP_HREF =
  "https://wa.me/972546338868?text=Hi%20Amit%2C%20saw%20your%20portfolio%20%E2%80%94%20would%20love%20to%20connect.";
const LINKEDIN_HREF = "https://www.linkedin.com/in/amitkedemuiux/";
const EMAIL_HREF = "mailto:kedemami2@gmail.com";
const PHONE_HREF = "tel:+972546338868";
const EMAIL_VALUE = "kedemami2@gmail.com";
const PHONE_VALUE = "+972546338868";
const TOAST_DURATION_MS = 2400;
const TOAST_FADE_BUFFER_MS = 220;

export function HomeContactSection() {
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

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastCycleKey((prev) => prev + 1);
    setToastVisible(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(
      () => setToastVisible(false),
      TOAST_DURATION_MS + TOAST_FADE_BUFFER_MS
    );
  }, []);

  const copyToClipboard = useCallback(
    async (value: string, desktopMsg: string, mobileMsg: string) => {
      try {
        await navigator.clipboard.writeText(value);
        showToast(isMobileRef.current ? mobileMsg : desktopMsg);
      } catch {
        showToast(isMobileRef.current ? "Copy not available on mobile." : "Failed to copy.");
      }
    },
    [showToast]
  );

  return (
    <section className="home-contact home-page-section" aria-labelledby="home-contact-title">
      <div className="home-contact__inner">
        <div className="home-contact__layout">
          <div className="home-contact__content">
            <h2 id="home-contact-title" className="home-contact__title">
              Let&apos;s talk
            </h2>
            <p className="home-contact__subtitle">
              Open to opportunities within product teams. Happy to connect.
            </p>

            <div className="home-contact__actions" aria-label="Contact actions">
              <CursorZone variant="hidden">
                <HomeContactIconButton
                  href={WHATSAPP_HREF}
                  label="Message me on WhatsApp"
                  iconSrc="/icons/contact/whatsapp.svg"
                  openInNewTab
                />
              </CursorZone>

              <CursorZone variant="hidden">
                <HomeContactIconButton
                  href={LINKEDIN_HREF}
                  label="LinkedIn"
                  iconSrc="/icons/contact/linkedin.svg"
                  openInNewTab
                />
              </CursorZone>

              <CursorZone variant="hidden">
                <HomeContactIconButton
                  href={EMAIL_HREF}
                  label="Email"
                  iconSrc="/icons/contact/envelope.svg"
                  onClick={() =>
                    copyToClipboard(
                      EMAIL_VALUE,
                      "Email copied to clipboard.",
                      "Email copied. Tap and hold to paste."
                    )
                  }
                />
              </CursorZone>

              <CursorZone variant="hidden">
                <HomeContactIconButton
                  href={PHONE_HREF}
                  label="Call"
                  iconSrc="/icons/contact/telephone.svg"
                  onClick={() =>
                    copyToClipboard(
                      PHONE_VALUE,
                      "Phone copied to clipboard.",
                      "Phone copied. Tap and hold to paste."
                    )
                  }
                />
              </CursorZone>
            </div>
          </div>

          <aside className="home-contact__visual" aria-hidden>
            <div className="home-contact__visual-keywords">
              <span className="home-contact__visual-keyword home-contact__visual-keyword--lets">
                <HeroKeywordBadge tone="yellow">Let&apos;s</HeroKeywordBadge>
              </span>
              <span className="home-contact__visual-keyword home-contact__visual-keyword--connect">
                <HeroKeywordBadge tone="orange">Connect</HeroKeywordBadge>
              </span>
              <span className="home-contact__visual-keyword home-contact__visual-keyword--and">
                <HeroKeywordBadge tone="red">And</HeroKeywordBadge>
              </span>
              <span className="home-contact__visual-keyword home-contact__visual-keyword--build">
                <HeroKeywordBadge tone="orange">Build</HeroKeywordBadge>
              </span>
            </div>
          </aside>
        </div>

        <PortfolioToast
          message={toastMessage}
          visible={toastVisible}
          durationMs={TOAST_DURATION_MS}
          cycleKey={toastCycleKey}
          onClose={() => {
            setToastVisible(false);
            if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
          }}
        />
      </div>
    </section>
  );
}
