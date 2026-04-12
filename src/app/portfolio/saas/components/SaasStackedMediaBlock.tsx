import type { ReactNode } from "react";
import "./SaasStackedMediaBlock.css";

type SaasStackedMediaBlockProps = {
  label: string;
  title: string;
  titleId: string;
  paragraphs: string[];
  media: ReactNode;
  align?: "start" | "center";
  titleHeadingLevel?: 2 | 3;
  /** Narrow readable measure + horizontal centering (uses project-text-section-inner--prose) */
  contentProse?: boolean;
};

/* Shared Astra block: label + title + description above media */
export function SaasStackedMediaBlock({
  label,
  title,
  titleId,
  paragraphs,
  media,
  align = "start",
  titleHeadingLevel = 2,
  contentProse = true,
}: SaasStackedMediaBlockProps) {
  const proseClass = contentProse ? " project-text-section-inner--prose" : "";
  const rootClass =
    align === "center"
      ? "saas-stacked-media-block saas-stacked-media-block--align-center"
      : "saas-stacked-media-block";

  const titleEl =
    titleHeadingLevel === 3 ? (
      <h3 id={titleId} className="saas-stacked-media-block__title">
        {title}
      </h3>
    ) : (
      <h2 id={titleId} className="saas-stacked-media-block__title">
        {title}
      </h2>
    );

  return (
    <article className={rootClass} aria-labelledby={titleId}>
      <header className={`saas-stacked-media-block__header${proseClass}`}>
        <p className="saas-stacked-media-block__label">{label}</p>
        {titleEl}
      </header>

      <div className={`saas-stacked-media-block__description${proseClass}`}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="saas-stacked-media-block__media-wrap">{media}</div>
    </article>
  );
}
