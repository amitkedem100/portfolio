import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const AI_COMMAND_CENTER_ACCESS_COOKIE = "ai_command_center_access";
const ACCESS_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24;

function hashValue(value: string): Buffer {
  return createHash("sha256").update(value, "utf8").digest();
}

/* Timing-safe string compare via fixed-length digests */
export function secureStringEqual(left: string, right: string): boolean {
  const leftDigest = hashValue(left);
  const rightDigest = hashValue(right);
  return timingSafeEqual(leftDigest, rightDigest);
}

export type UnlockCredentials = {
  password: string;
  accessToken: string;
};

/* Password + access token are enough to unlock; presentation URL is separate. */
export function getUnlockCredentials():
  | { ok: true; config: UnlockCredentials }
  | { ok: false } {
  const password = process.env.AI_COMMAND_CENTER_PASSWORD;
  const accessToken = process.env.AI_COMMAND_CENTER_ACCESS_TOKEN;

  if (!password || !accessToken) {
    return { ok: false };
  }

  return {
    ok: true,
    config: { password, accessToken },
  };
}

export function getPresentationUrl(): string | null {
  const presentationUrl = process.env.AI_COMMAND_CENTER_PRESENTATION_URL;
  return presentationUrl ? presentationUrl : null;
}

export async function hasValidAccessCookie(): Promise<boolean> {
  const env = getUnlockCredentials();
  if (!env.ok) return false;

  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(AI_COMMAND_CENTER_ACCESS_COOKIE)?.value;
  if (!cookieValue) return false;

  return secureStringEqual(cookieValue, env.config.accessToken);
}

export async function setAccessCookie(accessToken: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(AI_COMMAND_CENTER_ACCESS_COOKIE, accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ACCESS_COOKIE_MAX_AGE_SECONDS,
  });
}

export function getGenericUnavailableMessage(): string {
  return "Private access is temporarily unavailable.";
}

export function getMissingPresentationMessage(): string {
  if (process.env.NODE_ENV === "development") {
    return "Developer note: presentation URL is not configured yet.";
  }
  return getGenericUnavailableMessage();
}

export function getMissingCredentialsDevHint(): string | null {
  if (process.env.NODE_ENV !== "development") return null;
  if (getUnlockCredentials().ok) return null;
  return "Developer note: local unlock credentials are not fully configured.";
}
