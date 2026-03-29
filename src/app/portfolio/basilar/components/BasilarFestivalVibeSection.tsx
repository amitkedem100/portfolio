import Image from "next/image";
import "./BasilarFestivalVibeSection.css";

const DEFAULT_VIBE_IMAGE_SRC = "/images/basilar/basilar-vibe-photo.jpg";

type BasilarFestivalVibeSectionProps = {
  imageSrc?: string;
  ariaLabel?: string;
  /** Serve image without Next re-encode (best fidelity for key strips) */
  unoptimized?: boolean;
  /** Extra section classes (e.g. crop variant for a specific photo) */
  sectionClassName?: string;
};

/* Full-bleed visual break — image only, no heading (same layout for multiple atmosphere strips) */
export function BasilarFestivalVibeSection({
  imageSrc = DEFAULT_VIBE_IMAGE_SRC,
  ariaLabel = "Festival atmosphere",
  unoptimized = false,
  sectionClassName = "",
}: BasilarFestivalVibeSectionProps = {}) {
  const sectionClass = [
    "basilar-page-section",
    "basilar-page-vibe-photo",
    sectionClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sectionClass} aria-label={ariaLabel}>
      <div className="basilar-page-vibe-photo-inner">
        <Image
          className="basilar-page-vibe-photo-img"
          src={imageSrc}
          alt=""
          fill
          sizes="100vw"
          unoptimized={unoptimized}
          priority={false}
        />
      </div>
    </section>
  );
}
