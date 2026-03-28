/* Icon assets and theme variants: CSS vars --ia-interaction-hint-icon-* in globals.css */

import { InformationArchitectureInteractionHintIcon } from "./InformationArchitectureInteractionHintIcon";

export function InformationArchitectureInteractionHint() {
  return (
    <p className="ia-interaction-hint" role="note">
      <span className="ia-interaction-hint__text ia-interaction-hint__text--desktop">
        Cycles through each area — hover to pause and explore
      </span>
      <span className="ia-interaction-hint__text ia-interaction-hint__text--mobile">
        Swipe to reveal each page structure
      </span>
      <InformationArchitectureInteractionHintIcon variant="desktop" />
      <InformationArchitectureInteractionHintIcon variant="mobile" />
    </p>
  );
}
