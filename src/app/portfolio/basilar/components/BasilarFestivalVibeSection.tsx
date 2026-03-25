import Image from "next/image";
import "./BasilarFestivalVibeSection.css";

const VIBE_IMAGE_SRC = "/images/basilar/basilar-vibe-photo.jpg";

/* Full-bleed visual break — image only, no heading */
export function BasilarFestivalVibeSection() {
  return (
    <section className="basilar-page-section basilar-page-vibe-photo" aria-label="Festival atmosphere">
      <div className="basilar-page-vibe-photo-inner">
        <Image
          className="basilar-page-vibe-photo-img"
          src={VIBE_IMAGE_SRC}
          alt=""
          fill
          sizes="100vw"
          priority={false}
        />
      </div>
    </section>
  );
}
