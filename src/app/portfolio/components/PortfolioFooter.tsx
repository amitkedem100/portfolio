"use client";

import { useCallback, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "./PortfolioFooter.css";
import { PortfolioToast } from "./PortfolioToast";
import { useClipboardToast } from "./useClipboardToast";
import { SELECTED_WORK_SCROLL_FLAG_KEY } from "@/app/portfolio/home/ScrollToSelectedWork";
import { scrollToSelectedWorkWithAnimation } from "@/app/portfolio/home/scrollToSelectedWork.utils";

const FOOTER_NAV_LINKS = [
  { label: "Home", href: "/portfolio/home" },
  { label: "Work", href: "/portfolio/home#selected-work" },
  { label: "About", href: "/portfolio/about" },
  { label: "Contact", href: "/portfolio/contact" },
  { label: "CV", href: "/portfolio/cv" },
] as const;

type FooterContactLink = {
  label: string;
  href: string;
  iconSrc: string;
  openInNewTab?: boolean;
  copyValue?: string;
  desktopCopyMessage?: string;
  mobileCopyMessage?: string;
};

const FOOTER_CONTACT_LINKS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/972546338868?text=Hi%20Amit%2C%20saw%20your%20portfolio%20%E2%80%94%20would%20love%20to%20connect.",
    iconSrc: "/icons/contact/whatsapp.svg",
    openInNewTab: true,
    copyValue: undefined,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/amitkedemuiux/",
    iconSrc: "/icons/contact/linkedin.svg",
    openInNewTab: true,
    copyValue: undefined,
  },
  {
    label: "Email",
    href: "mailto:kedemami2@gmail.com",
    iconSrc: "/icons/contact/envelope.svg",
    openInNewTab: false,
    copyValue: "kedemami2@gmail.com",
    desktopCopyMessage: "Email copied to clipboard.",
    mobileCopyMessage: "Email copied. Tap and hold to paste.",
  },
  {
    label: "Phone",
    href: "tel:+972546338868",
    iconSrc: "/icons/contact/telephone.svg",
    openInNewTab: false,
    copyValue: "+972546338868",
    desktopCopyMessage: "Phone copied to clipboard.",
    mobileCopyMessage: "Phone copied. Tap and hold to paste.",
  },
] as const satisfies readonly FooterContactLink[];

export function PortfolioFooter() {
  const pathname = usePathname();
  const router = useRouter();
  const { copyToClipboard, toastProps, closeToast } = useClipboardToast();

  const handleWorkNavClick = useCallback(() => {
    const homePath = "/portfolio/home";

    if (pathname === homePath) {
      scrollToSelectedWorkWithAnimation(1050);
      return;
    }

    try {
      sessionStorage.setItem(SELECTED_WORK_SCROLL_FLAG_KEY, "1");
    } catch {
      /* private / blocked storage */
    }

    router.push(homePath);
  }, [pathname, router]);

  return (
    <footer className="portfolio-footer">
      <div className="portfolio-footer-inner">
        <nav className="portfolio-footer-nav" aria-label="Footer navigation">
          {FOOTER_NAV_LINKS.map((link) =>
            link.label === "Work" ? (
              <button
                key={link.label}
                type="button"
                className="portfolio-footer-nav-link portfolio-footer-nav-link--button"
                onClick={handleWorkNavClick}
              >
                {link.label}
              </button>
            ) : (
              <Link key={link.label} href={link.href} className="portfolio-footer-nav-link">
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="portfolio-footer-contact" aria-label="Footer contact actions">
          {FOOTER_CONTACT_LINKS.map((link) => (
            link.copyValue ? (
              <button
                key={link.label}
                type="button"
                className="portfolio-footer-contact-link"
                aria-label={link.label}
                title={link.label}
                onClick={() =>
                  copyToClipboard({
                    value: link.copyValue!,
                    desktopMessage: link.desktopCopyMessage ?? "Copied to clipboard.",
                    mobileMessage: link.mobileCopyMessage ?? "Copied. Tap and hold to paste.",
                  })
                }
                style={{ "--footer-contact-icon": `url(${link.iconSrc})` } as CSSProperties}
              >
                <span className="portfolio-footer-contact-icon" aria-hidden />
              </button>
            ) : (
              <a
                key={link.label}
                className="portfolio-footer-contact-link"
                href={link.href}
                aria-label={link.label}
                title={link.label}
                target={link.openInNewTab ? "_blank" : undefined}
                rel={link.openInNewTab ? "noreferrer" : undefined}
                style={{ "--footer-contact-icon": `url(${link.iconSrc})` } as CSSProperties}
              >
                <span className="portfolio-footer-contact-icon" aria-hidden />
              </a>
            )
          ))}
        </div>

        <p className="portfolio-footer-text">
          © {new Date().getFullYear()} Designed & built by Amit Kedem
        </p>

        <PortfolioToast
          message={toastProps.message}
          visible={toastProps.visible}
          durationMs={toastProps.durationMs}
          cycleKey={toastProps.cycleKey}
          onClose={closeToast}
        />
      </div>
    </footer>
  );
}

