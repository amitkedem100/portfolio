import Image from "next/image";
import "./BasilarFestivalVibeSection.css";

const DEFAULT_VIBE_IMAGE_SRC = "/images/basilar/basilar-vibe-photo.jpg";

type BasilarFestivalVibeSectionProps = {
  imageSrc?: string;
  ariaLabel?: string;
};

/* Full-bleed visual break — image only, no heading (same layout for multiple atmosphere strips) */
export function BasilarFestivalVibeSection({
  imageSrc = DEFAULT_VIBE_IMAGE_SRC,
  ariaLabel = "Festival atmosphere",
}: BasilarFestivalVibeSectionProps = {}) {
  return (
    <section className="basilar-page-section basilar-page-vibe-photo" aria-label={ariaLabel}>
      <div className="basilar-page-vibe-photo-inner">
        <Image
          className="basilar-page-vibe-photo-img"
          src={imageSrc}
          alt=""
          fill
          sizes="100vw"
          priority={false}
        />
      </div>
    </section>
  );
}
