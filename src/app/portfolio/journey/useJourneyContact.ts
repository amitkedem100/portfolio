"use client";

import { getJourneyContact } from "./journeyContact";
import { usePortfolioJourney } from "./PortfolioJourneyProvider";

export function useJourneyContact() {
  const { origin } = usePortfolioJourney();
  return getJourneyContact(origin);
}
