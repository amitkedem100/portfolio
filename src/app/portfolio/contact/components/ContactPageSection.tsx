"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./ContactPageSection.css";
import { CursorZone } from "@/app/portfolio/components/CursorZone";
import { PortfolioToast } from "@/app/portfolio/components/PortfolioToast";
import { useClipboardToast } from "@/app/portfolio/components/useClipboardToast";
import { HeroKeywordBadge } from "@/app/portfolio/home/components/HeroKeywordBadge";
import { HomeContactIconButton } from "@/app/portfolio/home/components/HomeContactIconButton";

const WHATSAPP_HREF =
  "https://wa.me/972546338868?text=Hi%20Amit%2C%20saw%20your%20portfolio%20%E2%80%94%20would%20love%20to%20connect.";
const LINKEDIN_HREF = "https://www.linkedin.com/in/amitkedemuiux/";
const EMAIL_HREF = "mailto:kedemami2@gmail.com";
const PHONE_HREF = "tel:+972546338868";
const EMAIL_VALUE = "kedemami2@gmail.com";
const PHONE_VALUE = "+972546338868";
const WHATSAPP_VALUE = "+972546338868";
const LINKEDIN_VALUE = "amitkedemuiux";
const COPIED_STATE_MS = 1800;

type CopiedAction = "email" | "phone" | null;

export function ContactPageSection() {
  const { copyToClipboard, toastProps, closeToast } = useClipboardToast();
  const [copiedAction, setCopiedAction] = useState<CopiedAction>(null);
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current);
      }
    },
    []
  );

  const activateCopiedState = (action: Exclude<CopiedAction, null>) => {
    setCopiedAction(action);
    if (copiedTimeoutRef.current) {
      clearTimeout(copiedTimeoutRef.current);
    }
    copiedTimeoutRef.current = setTimeout(() => {
      setCopiedAction(null);
      copiedTimeoutRef.current = null;
    }, COPIED_STATE_MS);
  };

  const handleEmailCopy = () => {
    copyToClipboard({
      value: EMAIL_VALUE,
      desktopMessage: "Email copied to clipboard.",
      mobileMessage: "Email copied. Tap and hold to paste.",
    });
    activateCopiedState("email");
  };

  const handlePhoneCopy = () => {
    copyToClipboard({
      value: PHONE_VALUE,
      desktopMessage: "Phone copied to clipboard.",
      mobileMessage: "Phone copied. Tap and hold to paste.",
    });
    activateCopiedState("phone");
  };

  const isEmailCopied = copiedAction === "email";
  const isPhoneCopied = copiedAction === "phone";
  const visualKeywords = (
    <>
      <span className="contact-page-contact__visual-keyword contact-page-contact__visual-keyword--lets">
        <HeroKeywordBadge tone="yellow">Let&apos;s</HeroKeywordBadge>
      </span>
      <span className="contact-page-contact__visual-keyword contact-page-contact__visual-keyword--connect">
        <HeroKeywordBadge tone="orange">Connect</HeroKeywordBadge>
      </span>
      <span className="contact-page-contact__visual-keyword contact-page-contact__visual-keyword--and">
        <HeroKeywordBadge tone="red">And</HeroKeywordBadge>
      </span>
      <span className="contact-page-contact__visual-keyword contact-page-contact__visual-keyword--build">
        <HeroKeywordBadge tone="orange">Build</HeroKeywordBadge>
      </span>
    </>
  );

  return (
    <section
      className="contact-page-contact"
      aria-labelledby="contact-page-contact-title"
    >
      <div className="contact-page-contact__inner">
        <div className="contact-page-contact__layout">
          <div className="contact-page-contact__content">
            <h1 id="contact-page-contact-title" className="contact-page-contact__title">
              Let&apos;s talk
            </h1>
            <p className="contact-page-contact__subtitle">
              Open to opportunities within product teams. Happy to connect.
            </p>

            <div
              className="contact-page-contact__actions contact-page-contact__actions--desktop"
              aria-label="Contact actions"
            >
              <a
                className="contact-page-contact__action-card"
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noreferrer"
                aria-label="Message me on WhatsApp"
              >
                <span
                  className="contact-page-contact__action-icon"
                  aria-hidden
                  style={{ "--contact-icon": "url(/icons/contact/whatsapp.svg)" } as CSSProperties}
                />
                <span className="contact-page-contact__action-label">WhatsApp</span>
                <span className="contact-page-contact__action-detail">{WHATSAPP_VALUE}</span>
              </a>

              <a
                className="contact-page-contact__action-card"
                href={LINKEDIN_HREF}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <span
                  className="contact-page-contact__action-icon"
                  aria-hidden
                  style={{ "--contact-icon": "url(/icons/contact/linkedin.svg)" } as CSSProperties}
                />
                <span className="contact-page-contact__action-label">LinkedIn</span>
                <span className="contact-page-contact__action-detail">{LINKEDIN_VALUE}</span>
              </a>

              <button
                type="button"
                className={`contact-page-contact__action-card${isEmailCopied ? " contact-page-contact__action-card--copied" : ""}`}
                aria-label="Email"
                onClick={handleEmailCopy}
              >
                <span
                  className="contact-page-contact__action-icon"
                  aria-hidden
                  style={
                    {
                      "--contact-icon": isEmailCopied
                        ? "url(/icons/contact/check-circle-fill.svg)"
                        : "url(/icons/contact/envelope.svg)",
                    } as CSSProperties
                  }
                />
                <span className="contact-page-contact__action-label">
                  {isEmailCopied ? "Copied" : "Email"}
                </span>
                <span className="contact-page-contact__action-detail">
                  {isEmailCopied ? "Email copied." : EMAIL_VALUE}
                </span>
              </button>

              <button
                type="button"
                className={`contact-page-contact__action-card${isPhoneCopied ? " contact-page-contact__action-card--copied" : ""}`}
                aria-label="Call"
                onClick={handlePhoneCopy}
              >
                <span
                  className="contact-page-contact__action-icon"
                  aria-hidden
                  style={
                    {
                      "--contact-icon": isPhoneCopied
                        ? "url(/icons/contact/check-circle-fill.svg)"
                        : "url(/icons/contact/telephone.svg)",
                    } as CSSProperties
                  }
                />
                <span className="contact-page-contact__action-label">
                  {isPhoneCopied ? "Copied" : "Phone"}
                </span>
                <span className="contact-page-contact__action-detail">
                  {isPhoneCopied ? "Phone copied." : PHONE_VALUE}
                </span>
              </button>
            </div>

            <div
              className="contact-page-contact__actions contact-page-contact__actions--mobile"
              aria-label="Contact actions"
            >
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
                    copyToClipboard({
                      value: EMAIL_VALUE,
                      desktopMessage: "Email copied to clipboard.",
                      mobileMessage: "Email copied. Tap and hold to paste.",
                    })
                  }
                />
              </CursorZone>

              <CursorZone variant="hidden">
                <HomeContactIconButton
                  href={PHONE_HREF}
                  label="Call"
                  iconSrc="/icons/contact/telephone.svg"
                  onClick={() =>
                    copyToClipboard({
                      value: PHONE_VALUE,
                      desktopMessage: "Phone copied to clipboard.",
                      mobileMessage: "Phone copied. Tap and hold to paste.",
                    })
                  }
                />
              </CursorZone>
            </div>
          </div>

          <aside className="contact-page-contact__visual" aria-hidden>
            <div className="contact-page-contact__visual-keywords contact-page-contact__visual-keywords--desktop">
              {visualKeywords}
            </div>
            <div className="contact-page-contact__visual-keywords contact-page-contact__visual-keywords--mobile">
              {visualKeywords}
            </div>
          </aside>
        </div>

        <PortfolioToast
          message={toastProps.message}
          visible={toastProps.visible}
          durationMs={toastProps.durationMs}
          cycleKey={toastProps.cycleKey}
          onClose={closeToast}
        />
      </div>
    </section>
  );
}
