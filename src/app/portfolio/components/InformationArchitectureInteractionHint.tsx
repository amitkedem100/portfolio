/* Icon assets and theme variants: CSS vars --ia-interaction-hint-icon-* in globals.css */

export function InformationArchitectureInteractionHint() {
  return (
    <p className="ia-interaction-hint" role="note">
      <span className="ia-interaction-hint__text ia-interaction-hint__text--desktop">
        Hover to reveal the structure
      </span>
      <span className="ia-interaction-hint__text ia-interaction-hint__text--mobile">
        Swipe to reveal each page structure
      </span>
      <span
        className="ia-interaction-hint__icon ia-interaction-hint__icon--desktop"
        aria-hidden
      />
      <span
        className="ia-interaction-hint__icon ia-interaction-hint__icon--mobile"
        aria-hidden
      />
    </p>
  );
}
