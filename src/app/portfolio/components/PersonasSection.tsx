import "./PersonasSection.css";

export type PersonaContent = {
  id: string;
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  whoTheyAre: string;
  keyFrictions: string[];
  whatTheyNeed: string;
};

export type PersonasSectionProps = {
  title: string;
  intro: string;
  personas: PersonaContent[];
  /** Section sublabels (e.g. "Who she is" vs "Who they are") */
  labels: {
    who: string;
    keyFrictions: string;
    whatTheyNeed: string;
  };
  /** Optional extra class on the root section (e.g. page spacing) */
  className?: string;
};

/* Editorial two-column personas: alternating media, no cards — content-driven */
export function PersonasSection({
  title,
  intro,
  personas,
  labels,
  className = "",
}: PersonasSectionProps) {
  const titleId = "personas-section-title";

  return (
    <section
      className={`personas-section ${className}`.trim()}
      aria-labelledby={titleId}
    >
      <div className="personas-section-inner">
        <header className="personas-section-header">
          <h2 id={titleId} className="personas-section-title">
            {title}
          </h2>
          <p className="personas-section-intro">{intro}</p>
        </header>

        <div className="personas-section-list">
          {personas.map((persona, index) => {
            const reverse = index % 2 === 1;
            return (
              <article
                key={persona.id}
                className={
                  reverse
                    ? "personas-persona personas-persona--reverse"
                    : "personas-persona"
                }
                aria-labelledby={`persona-name-${persona.id}`}
              >
                <div className="personas-persona-media">
                  <img
                    className="personas-persona-image"
                    src={persona.imageSrc}
                    alt={persona.imageAlt}
                    width={480}
                    height={600}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="personas-persona-body">
                  <h3
                    id={`persona-name-${persona.id}`}
                    className="personas-persona-name"
                  >
                    <span className="personas-persona-name-text">{persona.name}</span>
                    <span className="personas-persona-role"> — {persona.role}</span>
                  </h3>

                  <p className="personas-persona-label">{labels.who}</p>
                  <p className="personas-persona-text">{persona.whoTheyAre}</p>

                  <p className="personas-persona-label">{labels.keyFrictions}</p>
                  <ul className="personas-persona-bullets">
                    {persona.keyFrictions.map((item, i) => (
                      <li key={`${persona.id}-friction-${i}`}>{item}</li>
                    ))}
                  </ul>

                  <p className="personas-persona-label">{labels.whatTheyNeed}</p>
                  <p className="personas-persona-text personas-persona-text--needs">
                    {persona.whatTheyNeed}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
