"use client";

import "./HomeContactSection.css";
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
import { HeroKeywordBadge } from "./HeroKeywordBadge";
import { HomeContactIconButton } from "./HomeContactIconButton";

export function HomeContactSection() {
  const contact = useJourneyContact();
  const { copyToClipboard, toastProps, closeToast } = useClipboardToast();
  const whatsappHref = journeyWhatsAppHref(contact);
  const phoneHref = journeyPhoneTelHref(contact);
  const phoneCopyValue = journeyPhoneCopyValue(contact);
  const metaLine = journeyContactMetaLine(contact);

  return (
    <section className="home-contact home-page-section" aria-labelledby="home-contact-title">
      <div className="home-contact__inner">
        <div className="home-contact__layout">
          <div className="home-contact__content">
            <h2 id="home-contact-title" className="home-contact__title">
              Let&apos;s talk
            </h2>
            <p className="home-contact__subtitle">{contact.availabilityCopy}</p>
            {metaLine ? (
              <p className="home-contact__meta">{metaLine}</p>
            ) : null}

            <div className="home-contact__actions" aria-label="Contact actions">
              {hasJourneyWhatsApp(contact) && whatsappHref ? (
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

              {hasJourneyPhone(contact) && phoneHref && phoneCopyValue ? (
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
