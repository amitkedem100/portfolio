import "./HomeContactSection.css";
import { CursorZone } from "@/app/portfolio/components/CursorZone";

const WHATSAPP_HREF =
  "https://wa.me/972546338868?text=Hi%20Amit%2C%20saw%20your%20portfolio%20%E2%80%94%20would%20love%20to%20connect.";
const LINKEDIN_HREF = "https://www.linkedin.com/in/amitkedemuiux/";
const EMAIL_HREF = "mailto:kedemami2@gmail.com";

export function HomeContactSection() {
  return (
    <section className="home-contact home-page-section" aria-labelledby="home-contact-title">
      <div className="home-contact__inner">
        <h2 id="home-contact-title" className="home-contact__title">
          Let&apos;s talk
        </h2>
        <p className="home-contact__subtitle">
        Open to opportunities within product teams. Happy to connect.
        </p>

        <div className="home-contact__actions" aria-label="Contact actions">
          <CursorZone variant="large">
            <a
              className="home-contact__primary"
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noreferrer"
            >
              <span className="home-contact__icon-slot" aria-hidden />
              <span>Message me on WhatsApp</span>
            </a>
          </CursorZone>

          <div className="home-contact__secondary-list">
            <CursorZone variant="large">
              <a
                className="home-contact__secondary"
                href={LINKEDIN_HREF}
                target="_blank"
                rel="noreferrer"
              >
                <span className="home-contact__icon-slot" aria-hidden />
                <span>LinkedIn</span>
              </a>
            </CursorZone>

            <CursorZone variant="large">
              <a className="home-contact__secondary" href={EMAIL_HREF}>
                <span className="home-contact__icon-slot" aria-hidden />
                <span>Email</span>
              </a>
            </CursorZone>
          </div>
        </div>

        <p className="home-contact__phone">Phone: +972 54-633-8868</p>
      </div>
    </section>
  );
}
