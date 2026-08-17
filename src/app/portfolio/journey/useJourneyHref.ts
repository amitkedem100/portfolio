"use client";

import { journeyHomeHref, journeyWorkHref, withJourneyFrom } from "./portfolioJourney";
import { usePortfolioJourney } from "./PortfolioJourneyProvider";

export function useJourneyHomeHref(): string {
  const { origin } = usePortfolioJourney();
  return journeyHomeHref(origin);
}

export function useJourneyWorkHref(): string {
  const { origin } = usePortfolioJourney();
  return journeyWorkHref(origin);
}

export function useJourneyHref(path: string): string {
  const { origin } = usePortfolioJourney();
  return withJourneyFrom(path, origin);
}
