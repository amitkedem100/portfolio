import assert from "node:assert/strict";
import {
  getJourneyContact,
  hasJourneyPhone,
  hasJourneyWhatsApp,
  journeyPhoneTelHref,
  journeyWhatsAppHref,
  PRODUCT_DESIGN_JOURNEY_CONTACT,
  DEFAULT_JOURNEY_CONTACT,
} from "./journeyContact";
import {
  journeyHomeHref,
  resolveOrigin,
  withJourneyFrom,
} from "./portfolioJourney";

function check(name: string, actual: unknown, expected: unknown) {
  assert.deepEqual(actual, expected, name);
}

const GERMAN_E164 = "+491776845728";
const GERMAN_DISPLAY = "+49 177 6845728";
const GERMAN_TEL = "tel:+491776845728";
const GERMAN_WA_PREFIX = "https://wa.me/491776845728";

const productDesignContact = getJourneyContact("product-design");
const defaultContact = getJourneyContact(null);
const nicheContact = getJourneyContact("product-operations");

check(
  "product-design contact uses German display",
  productDesignContact.phoneDisplay,
  GERMAN_DISPLAY,
);
check(
  "product-design contact uses German E.164",
  productDesignContact.phoneE164,
  GERMAN_E164,
);
check(
  "product-design contact uses German WhatsApp E.164",
  productDesignContact.whatsappE164,
  GERMAN_E164,
);
check(
  "product-design exposes Phone",
  hasJourneyPhone(productDesignContact),
  true,
);
check(
  "product-design exposes WhatsApp",
  hasJourneyWhatsApp(productDesignContact),
  true,
);
check(
  "product-design Phone tel href",
  journeyPhoneTelHref(productDesignContact),
  GERMAN_TEL,
);

const productDesignWhatsApp = journeyWhatsAppHref(productDesignContact);
assert.ok(productDesignWhatsApp, "product-design WhatsApp href exists");
assert.ok(
  productDesignWhatsApp.startsWith(GERMAN_WA_PREFIX),
  `product-design WhatsApp href starts with ${GERMAN_WA_PREFIX}, got ${productDesignWhatsApp}`,
);
assert.equal(
  productDesignWhatsApp,
  `${GERMAN_WA_PREFIX}?text=Hi%20Amit%2C%20saw%20your%20portfolio%20%E2%80%94%20would%20love%20to%20connect.`,
  "product-design WhatsApp href matches expected URI with message",
);

check(
  "base origin keeps default Israeli phone",
  defaultContact.phoneE164,
  DEFAULT_JOURNEY_CONTACT.phoneE164,
);
check(
  "base origin is not German phone",
  defaultContact.phoneE164 === GERMAN_E164,
  false,
);
check(
  "niche journey keeps default Israeli phone",
  nicheContact.phoneE164,
  DEFAULT_JOURNEY_CONTACT.phoneE164,
);
check(
  "niche journey is not German phone",
  nicheContact.phoneE164 === GERMAN_E164,
  false,
);
check(
  "product-design config object matches resolver",
  productDesignContact,
  PRODUCT_DESIGN_JOURNEY_CONTACT,
);

/* Origin remains product-design across internal navigation helpers. */
check(
  "home stays on /product-design",
  journeyHomeHref("product-design"),
  "/product-design",
);
check(
  "about keeps from=product-design",
  withJourneyFrom("/portfolio/about", "product-design"),
  "/portfolio/about?from=product-design",
);
check(
  "contact keeps from=product-design",
  withJourneyFrom("/portfolio/contact", "product-design"),
  "/portfolio/contact?from=product-design",
);
check(
  "resolving contact with from=product-design keeps origin",
  resolveOrigin({
    pathname: "/portfolio/contact",
    fromPresent: true,
    fromValue: "product-design",
    sessionOrigin: null,
  }),
  { origin: "product-design", sessionAction: "write" },
);
check(
  "session keeps product-design when from absent on eligible path",
  resolveOrigin({
    pathname: "/portfolio/about",
    fromPresent: false,
    fromValue: "",
    sessionOrigin: "product-design",
  }),
  { origin: "product-design", sessionAction: "keep" },
);

console.log("journeyContact tests passed");
