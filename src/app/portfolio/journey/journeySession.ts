import {
  JOURNEY_SESSION_KEY,
  isJourneyOrigin,
  type JourneyOrigin,
} from "./portfolioJourney";

export function readJourneySession(): JourneyOrigin | null {
  try {
    const value = sessionStorage.getItem(JOURNEY_SESSION_KEY);
    return isJourneyOrigin(value) ? value : null;
  } catch {
    return null;
  }
}

export function writeJourneySession(origin: JourneyOrigin): void {
  try {
    sessionStorage.setItem(JOURNEY_SESSION_KEY, origin);
  } catch {
    /* private / blocked storage */
  }
}

export function clearJourneySession(): void {
  try {
    sessionStorage.removeItem(JOURNEY_SESSION_KEY);
  } catch {
    /* private / blocked storage */
  }
}
