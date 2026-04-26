import type { CSSProperties } from "react";
import Link from "next/link";
import "./PortfolioFooter.css";

const FOOTER_NAV_LINKS = [
  { label: "Home", href: "/portfolio/home" },
  { label: "Work", href: "/portfolio/home#selected-work" },
  { label: "About", href: "/portfolio/about" },
  { label: "Contact", href: "/portfolio/contact" },
  { label: "CV", href: "/portfolio/home#cv" },
] as const;

const FOOTER_CONTACT_LINKS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/972546338868?text=Hi%20Amit%2C%20saw%20your%20portfolio%20%E2%80%94%20would%20love%20to%20connect.",
    iconSrc: "/icons/contact/whatsapp.svg",
    openInNewTab: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/amitkedemuiux/",
    iconSrc: "/icons/contact/linkedin.svg",
    openInNewTab: true,
  },
  {
    label: "Email",
    href: "mailto:kedemami2@gmail.com",
    iconSrc: "/icons/contact/envelope.svg",
  },
  {
    label: "Phone",
    href: "tel:+972546338868",
    iconSrc: "/icons/contact/telephone.svg",
  },
] as const;

export function PortfolioFooter() {
  return (
    <footer className="portfolio-footer">
      <div className="portfolio-footer-inner">
        <nav className="portfolio-footer-nav" aria-label="Footer navigation">
          {FOOTER_NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="portfolio-footer-nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="portfolio-footer-contact" aria-label="Footer contact actions">
          {FOOTER_CONTACT_LINKS.map((link) => (
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
          ))}
        </div>

        <p className="portfolio-footer-text">
          © {new Date().getFullYear()} Designed & built by Amit Kedem
        </p>
      </div>
    </footer>
  );
}

