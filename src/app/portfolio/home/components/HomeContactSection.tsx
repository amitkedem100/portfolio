"use client";

import "./HomeContactSection.css";
import { CursorZone } from "@/app/portfolio/components/CursorZone";
import { PortfolioToast } from "@/app/portfolio/components/PortfolioToast";
import { useClipboardToast } from "@/app/portfolio/components/useClipboardToast";
import { HeroKeywordBadge } from "./HeroKeywordBadge";
import { HomeContactIconButton } from "./HomeContactIconButton";

const WHATSAPP_HREF =
  "https://wa.me/972546338868?text=Hi%20Amit%2C%20saw%20your%20portfolio%20%E2%80%94%20would%20love%20to%20connect.";
const LINKEDIN_HREF = "https://www.linkedin.com/in/amitkedemuiux/";
const EMAIL_HREF = "mailto:kedemami2@gmail.com";
const PHONE_HREF = "tel:+972546338868";
const EMAIL_VALUE = "kedemami2@gmail.com";
const PHONE_VALUE = "+972546338868";

export function HomeContactSection() {
  const { copyToClipboard, toastProps, closeToast } = useClipboardToast();

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
