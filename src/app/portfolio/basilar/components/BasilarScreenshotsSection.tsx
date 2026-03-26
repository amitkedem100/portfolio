import Image from "next/image";
import "@/app/portfolio/components/ProjectTextSection.css";
import "./BasilarScreenshotsSection.css";

const SCREENSHOTS: readonly { src: string; alt: string }[] = [
  { src: "/images/basilar/screenshots/01-arrival.png", alt: "Basilar shuttle arrival screen" },
  { src: "/images/basilar/screenshots/02-lineup.png", alt: "Basilar lineup — day schedule" },
  { src: "/images/basilar/screenshots/03-checkout.png", alt: "Basilar checkout flow" },
  { src: "/images/basilar/screenshots/04-arrival-departure.png", alt: "Basilar arrival and departure" },
  { src: "/images/basilar/screenshots/05-lineup-2.png", alt: "Basilar lineup screen" },
  { src: "/images/basilar/screenshots/06-shuttles.png", alt: "Basilar shuttles selection" },
  { src: "/images/basilar/screenshots/07-food-area.png", alt: "Basilar food area menu" },
  { src: "/images/basilar/screenshots/08-map.png", alt: "Basilar festival map" },
  { src: "/images/basilar/screenshots/09-map-wave.png", alt: "Basilar map with wave a friend" },
  { src: "/images/basilar/screenshots/10-my-ticket.png", alt: "Basilar my ticket with QR code" },
  { src: "/images/basilar/screenshots/11-lineup-3.png", alt: "Basilar lineup" },
  { src: "/images/basilar/screenshots/12-my-ticket-2.png", alt: "Basilar my ticket" },
];

/* Product screens in a 3-column grid; large assets, page scrolls naturally */
export function BasilarScreenshotsSection() {
  return (
    <section
      className="basilar-page-section basilar-screenshots project-text-section"
      aria-labelledby="basilar-screenshots-title"
    >
      <div className="project-text-section-inner basilar-screenshots__inner">
        <h2 id="basilar-screenshots-title" className="basilar-screenshots__title">
          Screenshots
        </h2>
        <ul className="basilar-screenshots__grid">
          {SCREENSHOTS.map((item) => (
            <li key={item.src} className="basilar-screenshots__item">
              <Image
                className="basilar-screenshots__image"
                src={item.src}
                alt={item.alt}
                width={1170}
                height={2532}
                sizes="(max-width: 640px) 86vw, (max-width: 1024px) 42vw, 268px"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
