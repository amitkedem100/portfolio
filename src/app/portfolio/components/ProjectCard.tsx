import Link from "next/link";
import Image from "next/image";
import "./ProjectCard.css";

export type ProjectCardProps = {
  title: string;
  description: string;
  keywords: string;
  imageSrc?: string;
  imageAlt: string;
  href: string;
  /** "right" = text left, image right (default). "left" = image left, text right. Ignored on mobile (always image on top). */
  imagePosition?: "right" | "left";
};

export function ProjectCard({
  title,
  description,
  keywords,
  imageSrc,
  imageAlt,
  href,
  imagePosition = "right",
}: ProjectCardProps) {
  const modifierClass =
    imagePosition === "left" ? " project-card--image-left" : "";

  return (
    <article className={`project-card${modifierClass}`}>
      <Link href={href} className="project-card-link" aria-label={`View project: ${title}`}>
        <div className="project-card-inner">
          <div className="project-card-image-wrap">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="project-card-image"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            ) : (
              <div className="project-card-image-placeholder" aria-hidden />
            )}
          </div>
          <div className="project-card-text">
            <p className="project-card-keywords">{keywords}</p>
            <h2 className="project-card-title">{title}</h2>
            <p className="project-card-description">{description}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}
