import type { ReactNode } from "react";
import "./SaasStackedMediaBlock.css";

type SaasStackedMediaBlockProps = {
  label: string;
  title: string;
  titleId: string;
  paragraphs: string[];
  media: ReactNode;
};

/* Shared Astra block: label + title + description above media */
export function SaasStackedMediaBlock({
  label,
  title,
  titleId,
  paragraphs,
  media,
}: SaasStackedMediaBlockProps) {
  return (
    <article className="saas-stacked-media-block" aria-labelledby={titleId}>
      <header className="saas-stacked-media-block__header project-text-section-inner--prose">
        <p className="saas-stacked-media-block__label">{label}</p>
        <h2 id={titleId} className="saas-stacked-media-block__title">
          {title}
        </h2>
      </header>

      <div className="saas-stacked-media-block__description project-text-section-inner--prose">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="saas-stacked-media-block__media-wrap">{media}</div>
    </article>
  );
}
