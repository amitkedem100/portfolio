"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./ContactPageSection.css";
import { CursorZone } from "@/app/portfolio/components/CursorZone";
import { PortfolioToast } from "@/app/portfolio/components/PortfolioToast";
import { useClipboardToast } from "@/app/portfolio/components/useClipboardToast";
import {
  journeyContactMetaLine,
  journeyEmailHref,
  journeyPhoneCopyValue,
  journeyPhoneTelHref,
  journeyWhatsAppHref,
  hasJourneyPhone,
  hasJourneyWhatsApp,
} from "@/app/portfolio/journey/journeyContact";
import { useJourneyContact } from "@/app/portfolio/journey/useJourneyContact";
import { HeroKeywordBadge } from "@/app/portfolio/home/components/HeroKeywordBadge";
import { HomeContactIconButton } from "@/app/portfolio/home/components/HomeContactIconButton";

const COPIED_STATE_MS = 1800;

type CopiedAction = "email" | "phone" | null;

export function ContactPageSection() {
  const contact = useJourneyContact();
  const { copyToClipboard, toastProps, closeToast } = useClipboardToast();
  const [copiedAction, setCopiedAction] = useState<CopiedAction>(null);
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const whatsappHref = journeyWhatsAppHref(contact);
  const phoneHref = journeyPhoneTelHref(contact);
  const phoneCopyValue = journeyPhoneCopyValue(contact);
  const showWhatsApp = hasJourneyWhatsApp(contact) && Boolean(whatsappHref);
  const showPhone =
    hasJourneyPhone(contact) && Boolean(phoneHref) && Boolean(phoneCopyValue);
  const metaLine = journeyContactMetaLine(contact);
  const whatsappDetail = contact.whatsappE164?.trim() ?? "";

  useEffect(
    () => () => {
      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current);
      }
    },
    [],
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
      value: contact.email,
      desktopMessage: "Email copied to clipboard.",
      mobileMessage: "Email copied. Tap and hold to paste.",
    });
    activateCopiedState("email");
  };

  const handlePhoneCopy = () => {
    if (!phoneCopyValue) return;
    copyToClipboard({
      value: phoneCopyValue,
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
              {contact.availabilityCopy}
            </p>
            {metaLine ? (
              <p className="contact-page-contact__meta">{metaLine}</p>
            ) : null}

            <div
              className="contact-page-contact__actions contact-page-contact__actions--desktop"
              aria-label="Contact actions"
            >
              {showWhatsApp && whatsappHref ? (
                <a
                  className="contact-page-contact__action-card"
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Message me on WhatsApp"
                >
                  <span
                    className="contact-page-contact__action-icon"
                    aria-hidden
                    style={
                      {
                        "--contact-icon": "url(/icons/contact/whatsapp.svg)",
                      } as CSSProperties
                    }
                  />
                  <span className="contact-page-contact__action-label">
                    WhatsApp
                  </span>
                  <span className="contact-page-contact__action-detail">
                    {whatsappDetail}
                  </span>
                </a>
              ) : null}

              <a
                className="contact-page-contact__action-card"
                href={contact.linkedInUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <span
                  className="contact-page-contact__action-icon"
                  aria-hidden
                  style={
                    {
                      "--contact-icon": "url(/icons/contact/linkedin.svg)",
                    } as CSSProperties
                  }
                />
                <span className="contact-page-contact__action-label">
                  LinkedIn
                </span>
                <span className="contact-page-contact__action-detail">
                  {contact.linkedInHandle}
                </span>
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
                  {isEmailCopied ? "Email copied." : contact.email}
                </span>
              </button>

              {showPhone ? (
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
                    {isPhoneCopied ? "Phone copied." : phoneCopyValue}
                  </span>
                </button>
              ) : null}
            </div>

            <div
              className="contact-page-contact__actions contact-page-contact__actions--mobile"
              aria-label="Contact actions"
            >
              {showWhatsApp && whatsappHref ? (
                <CursorZone variant="hidden">
                  <HomeContactIconButton
                    href={whatsappHref}
                    label="Message me on WhatsApp"
                    iconSrc="/icons/contact/whatsapp.svg"
                    openInNewTab
                  />
                </CursorZone>
              ) : null}

              <CursorZone variant="hidden">
                <HomeContactIconButton
                  href={contact.linkedInUrl}
                  label="LinkedIn"
                  iconSrc="/icons/contact/linkedin.svg"
                  openInNewTab
                />
              </CursorZone>

              <CursorZone variant="hidden">
                <HomeContactIconButton
                  href={journeyEmailHref(contact)}
                  label="Email"
                  iconSrc="/icons/contact/envelope.svg"
                  onClick={() =>
                    copyToClipboard({
                      value: contact.email,
                      desktopMessage: "Email copied to clipboard.",
                      mobileMessage: "Email copied. Tap and hold to paste.",
                    })
                  }
                />
              </CursorZone>

              {showPhone && phoneHref && phoneCopyValue ? (
                <CursorZone variant="hidden">
                  <HomeContactIconButton
                    href={phoneHref}
                    label="Call"
                    iconSrc="/icons/contact/telephone.svg"
                    onClick={() =>
                      copyToClipboard({
                        value: phoneCopyValue,
                        desktopMessage: "Phone copied to clipboard.",
                        mobileMessage: "Phone copied. Tap and hold to paste.",
                      })
                    }
                  />
                </CursorZone>
              ) : null}
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
