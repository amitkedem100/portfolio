import type { JourneyOrigin } from "./portfolioJourney";

export type JourneyContactConfig = {
  location: string | null;
  phoneDisplay: string | null;
  /* E.164, e.g. +491701234567. Empty → hide Phone; never fall back across journeys. */
  phoneE164: string | null;
  /* Separate WhatsApp-capable number. Empty → hide WhatsApp. */
  whatsappE164: string | null;
  email: string;
  linkedInUrl: string;
  linkedInHandle: string;
  availabilityCopy: string;
  workAuthorizationCopy: string | null;
};

const DEFAULT_WHATSAPP_MESSAGE =
  "Hi%20Amit%2C%20saw%20your%20portfolio%20%E2%80%94%20would%20love%20to%20connect.";

export const DEFAULT_JOURNEY_CONTACT: JourneyContactConfig = {
  location: null,
  phoneDisplay: "+972546338868",
  phoneE164: "+972546338868",
  whatsappE164: "+972546338868",
  email: "kedemami2@gmail.com",
  linkedInUrl: "https://www.linkedin.com/in/amitkedemuiux/",
  linkedInHandle: "amitkedemuiux",
  availabilityCopy: "Open to opportunities within product teams. Happy to connect.",
  workAuthorizationCopy: null,
};

/*
 * Berlin / EU job-search contact overrides (journey id: product-design).
 * Add the final German number to phoneE164 / phoneDisplay below.
 * Optionally set whatsappE164 only if that number is WhatsApp-compatible.
 */
export const PRODUCT_DESIGN_JOURNEY_CONTACT: JourneyContactConfig = {
  location: "Berlin, Germany",
  phoneDisplay: null,
  phoneE164: null,
  whatsappE164: null,
  email: "kedemami2@gmail.com",
  linkedInUrl: "https://www.linkedin.com/in/amitkedemuiux/",
  linkedInHandle: "amitkedemuiux",
  availabilityCopy:
    "Open to Product Designer opportunities in Berlin and across Europe.",
  workAuthorizationCopy: "EU Citizen · No visa sponsorship required",
};

const JOURNEY_CONTACT: Partial<Record<JourneyOrigin, JourneyContactConfig>> = {
  "product-design": PRODUCT_DESIGN_JOURNEY_CONTACT,
};

export function getJourneyContact(
  origin: JourneyOrigin | null,
): JourneyContactConfig {
  if (origin && JOURNEY_CONTACT[origin]) {
    return JOURNEY_CONTACT[origin]!;
  }
  return DEFAULT_JOURNEY_CONTACT;
}

export function hasJourneyPhone(contact: JourneyContactConfig): boolean {
  return Boolean(contact.phoneE164?.trim());
}

export function hasJourneyWhatsApp(contact: JourneyContactConfig): boolean {
  return Boolean(contact.whatsappE164?.trim());
}

export function journeyPhoneTelHref(
  contact: JourneyContactConfig,
): string | null {
  const e164 = contact.phoneE164?.trim();
  if (!e164) return null;
  return `tel:${e164}`;
}

export function journeyPhoneCopyValue(
  contact: JourneyContactConfig,
): string | null {
  const display = contact.phoneDisplay?.trim();
  const e164 = contact.phoneE164?.trim();
  return display || e164 || null;
}

export function journeyWhatsAppHref(
  contact: JourneyContactConfig,
): string | null {
  const e164 = contact.whatsappE164?.trim();
  if (!e164) return null;
  const digits = e164.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${DEFAULT_WHATSAPP_MESSAGE}`;
}

export function journeyEmailHref(contact: JourneyContactConfig): string {
  return `mailto:${contact.email}`;
}

export function journeyContactMetaLine(
  contact: JourneyContactConfig,
): string | null {
  const parts = [contact.location, contact.workAuthorizationCopy].filter(
    (part): part is string => Boolean(part?.trim()),
  );
  return parts.length > 0 ? parts.join(" · ") : null;
}
