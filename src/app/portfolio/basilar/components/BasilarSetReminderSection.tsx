import Image from "next/image";
import { BasilarUISegmentRevealBody } from "@/app/portfolio/basilar/components/BasilarUISegmentRevealBody";
import "@/app/portfolio/components/ProjectTextSection.css";
import "./BasilarSetReminderSection.css";

const REMINDER_VIDEO = "/videos/basilar/Set-a-reminder.mp4";
const REMINDER_BUTTON_PNG = "/images/basilar/Set-a-reminder.png";

/* No green label — title + description only; media = top-third video crop + PNG overlap */
export function BasilarSetReminderSection() {
  return (
    <section
      className="basilar-page-section basilar-page-ui-set-reminder project-text-section"
      aria-labelledby="basilar-ui-segment-title-set-reminder"
    >
      <div className="project-text-section-inner">
        <article
          className="basilar-ui-segment basilar-set-reminder-segment"
          aria-labelledby="basilar-ui-segment-title-set-reminder"
        >
          <BasilarUISegmentRevealBody className="basilar-set-reminder-segment__body">
            <h3 id="basilar-ui-segment-title-set-reminder" className="basilar-ui-segment__title">
              Set a Reminder
            </h3>
            <p className="basilar-ui-segment__description">
              Easily set reminders for when your favorite DJ or artist is on stage, ensuring you never miss
              a moment.
            </p>
          </BasilarUISegmentRevealBody>

          <div className="basilar-ui-segment__media">
            <div
              className="basilar-set-reminder-media"
              role="group"
              aria-label="Set a reminder — screen crop and remind me control"
            >
              <div className="basilar-set-reminder-crop">
                <video
                  className="basilar-set-reminder-video"
                  src={REMINDER_VIDEO}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden
                />
              </div>
              <Image
                className="basilar-set-reminder-overlay"
                src={REMINDER_BUTTON_PNG}
                alt=""
                width={360}
                height={96}
                sizes="(max-width: 768px) min(280px, 88vw) 280px"
              />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
