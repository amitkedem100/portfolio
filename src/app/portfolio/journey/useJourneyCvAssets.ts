"use client";

import { resolveJourneyCvAssets } from "./journeyCvAssets";
import { usePortfolioJourney } from "./PortfolioJourneyProvider";

export function useJourneyCvAssets() {
  const { origin } = usePortfolioJourney();
  return resolveJourneyCvAssets(origin);
}
