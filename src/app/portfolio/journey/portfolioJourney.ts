export const GENERIC_HOME_PATH = "/portfolio/home";
export const WORK_HASH = "work";
export const SELECTED_WORK_HASH_ALIAS = "selected-work";
export const JOURNEY_SESSION_KEY = "portfolio-journey-origin-v1";
export const JOURNEY_FROM_PARAM = "from";

export const JOURNEY_ORIGINS = [
  "product-operations",
  "customer-operations",
  "ai-workflows",
  /* Berlin / EU job-search journey — public path stays /product-design */
  "product-design",
] as const;

export type JourneyOrigin = (typeof JOURNEY_ORIGINS)[number];

export const JOURNEY_HOME_PATH: Record<JourneyOrigin, string> = {
  "product-operations": "/product-operations",
  "customer-operations": "/customer-operations",
  "ai-workflows": "/ai-workflows",
  "product-design": "/product-design",
};

const NICHE_PATH_TO_ORIGIN: Record<string, JourneyOrigin> = {
  "/product-operations": "product-operations",
  "/customer-operations": "customer-operations",
  "/ai-workflows": "ai-workflows",
  "/product-design": "product-design",
};

const ELIGIBLE_FROM_PATHS = new Set([
  "/portfolio/saas",
  "/portfolio/ai-command-center",
  "/portfolio/basilar",
  "/portfolio/about",
  "/portfolio/contact",
  "/portfolio/cv",
]);

export type SessionAction = "write" | "clear" | "keep";

export type ResolveOriginInput = {
  pathname: string;
  fromPresent: boolean;
  fromValue: string;
  sessionOrigin: string | null;
};

export type ResolveOriginResult = {
  origin: JourneyOrigin | null;
  sessionAction: SessionAction;
};

export function isJourneyOrigin(value: string | null | undefined): value is JourneyOrigin {
  return (
    value === "product-operations" ||
    value === "customer-operations" ||
    value === "ai-workflows" ||
    value === "product-design"
  );
}

export function originFromPathname(pathname: string): JourneyOrigin | null {
  return NICHE_PATH_TO_ORIGIN[normalizePathname(pathname)] ?? null;
}

export function isGenericHomePath(pathname: string): boolean {
  const path = normalizePathname(pathname);
  return path === "/" || path === GENERIC_HOME_PATH;
}

export function isJourneyHomePath(pathname: string): boolean {
  const path = normalizePathname(pathname);
  return path === GENERIC_HOME_PATH || Boolean(NICHE_PATH_TO_ORIGIN[path]);
}

export function isEligibleJourneyPath(pathname: string): boolean {
  return ELIGIBLE_FROM_PATHS.has(normalizePathname(pathname));
}

export function journeyHomeHref(origin: JourneyOrigin | null): string {
  if (!origin) return GENERIC_HOME_PATH;
  return JOURNEY_HOME_PATH[origin];
}

export function journeyWorkHref(origin: JourneyOrigin | null): string {
  return `${journeyHomeHref(origin)}#${WORK_HASH}`;
}

export function withJourneyFrom(path: string, origin: JourneyOrigin | null): string {
  const { pathname, search, hash } = splitPath(path);
  if (!origin || !isEligibleJourneyPath(pathname)) {
    return path;
  }

  const params = new URLSearchParams(search);
  params.set(JOURNEY_FROM_PARAM, origin);
  const query = params.toString();
  return `${pathname}?${query}${hash}`;
}

/**
 * Absent `from` may fall back to session.
 * Present-but-invalid `from` clears session and uses the generic homepage.
 */
export function resolveOrigin({
  pathname,
  fromPresent,
  fromValue,
  sessionOrigin,
}: ResolveOriginInput): ResolveOriginResult {
  const pathOrigin = originFromPathname(pathname);
  if (pathOrigin) {
    return { origin: pathOrigin, sessionAction: "write" };
  }

  if (isGenericHomePath(pathname)) {
    return { origin: null, sessionAction: "clear" };
  }

  if (fromPresent) {
    if (isJourneyOrigin(fromValue)) {
      return { origin: fromValue, sessionAction: "write" };
    }
    return { origin: null, sessionAction: "clear" };
  }

  if (isJourneyOrigin(sessionOrigin)) {
    return { origin: sessionOrigin, sessionAction: "keep" };
  }

  return { origin: null, sessionAction: "keep" };
}

export function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function splitPath(path: string): { pathname: string; search: string; hash: string } {
  const hashIndex = path.indexOf("#");
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const queryIndex = withoutHash.indexOf("?");
  const pathname = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
  const search = queryIndex >= 0 ? withoutHash.slice(queryIndex + 1) : "";
  return { pathname, search, hash };
}
