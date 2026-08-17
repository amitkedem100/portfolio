import assert from "node:assert/strict";
import {
  GENERIC_HOME_PATH,
  resolveOrigin,
  withJourneyFrom,
  journeyHomeHref,
  journeyWorkHref,
} from "./portfolioJourney";

function check(name: string, actual: unknown, expected: unknown) {
  assert.deepEqual(actual, expected, name);
}

check(
  "niche path writes origin",
  resolveOrigin({
    pathname: "/product-operations",
    fromPresent: false,
    fromValue: "",
    sessionOrigin: "ai-workflows",
  }),
  { origin: "product-operations", sessionAction: "write" }
);

check(
  "generic home clears even with session",
  resolveOrigin({
    pathname: GENERIC_HOME_PATH,
    fromPresent: false,
    fromValue: "",
    sessionOrigin: "product-operations",
  }),
  { origin: null, sessionAction: "clear" }
);

check(
  "root path clears",
  resolveOrigin({
    pathname: "/",
    fromPresent: true,
    fromValue: "product-operations",
    sessionOrigin: "product-operations",
  }),
  { origin: null, sessionAction: "clear" }
);

check(
  "valid from writes origin",
  resolveOrigin({
    pathname: "/portfolio/saas",
    fromPresent: true,
    fromValue: "customer-operations",
    sessionOrigin: "product-operations",
  }),
  { origin: "customer-operations", sessionAction: "write" }
);

check(
  "invalid from clears and ignores session",
  resolveOrigin({
    pathname: "/portfolio/about",
    fromPresent: true,
    fromValue: "not-a-niche",
    sessionOrigin: "product-operations",
  }),
  { origin: null, sessionAction: "clear" }
);

check(
  "empty from is present and invalid",
  resolveOrigin({
    pathname: "/portfolio/cv",
    fromPresent: true,
    fromValue: "",
    sessionOrigin: "ai-workflows",
  }),
  { origin: null, sessionAction: "clear" }
);

check(
  "absent from uses session",
  resolveOrigin({
    pathname: "/portfolio/contact",
    fromPresent: false,
    fromValue: "",
    sessionOrigin: "ai-workflows",
  }),
  { origin: "ai-workflows", sessionAction: "keep" }
);

check(
  "absent from without session is generic",
  resolveOrigin({
    pathname: "/portfolio/saas",
    fromPresent: false,
    fromValue: "",
    sessionOrigin: null,
  }),
  { origin: null, sessionAction: "keep" }
);

check(
  "stale session value is ignored when from is absent",
  resolveOrigin({
    pathname: "/portfolio/saas",
    fromPresent: false,
    fromValue: "",
    sessionOrigin: "old-campaign",
  }),
  { origin: null, sessionAction: "keep" }
);

check("home href with origin", journeyHomeHref("product-operations"), "/product-operations");
check("home href generic", journeyHomeHref(null), GENERIC_HOME_PATH);
check("work href niche", journeyWorkHref("ai-workflows"), "/ai-workflows#work");
check("work href generic", journeyWorkHref(null), `${GENERIC_HOME_PATH}#work`);

check(
  "appends from to eligible path",
  withJourneyFrom("/portfolio/about", "product-operations"),
  "/portfolio/about?from=product-operations"
);
check(
  "does not append from to generic home",
  withJourneyFrom(GENERIC_HOME_PATH, "product-operations"),
  GENERIC_HOME_PATH
);
check(
  "does not append from without origin",
  withJourneyFrom("/portfolio/saas", null),
  "/portfolio/saas"
);

console.log("portfolioJourney tests passed");
