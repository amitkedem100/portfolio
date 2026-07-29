"use server";

import { revalidatePath } from "next/cache";
import {
  getGenericUnavailableMessage,
  getUnlockCredentials,
  secureStringEqual,
  setAccessCookie,
} from "./access";

export type UnlockAccessResult =
  | { ok: true }
  | { ok: false; error: string };

export async function unlockAiCommandCenterAccess(
  password: string
): Promise<UnlockAccessResult> {
  const env = getUnlockCredentials();
  if (!env.ok) {
    return { ok: false, error: getGenericUnavailableMessage() };
  }

  const submitted = typeof password === "string" ? password : "";
  const incorrectMessage = "The access code is incorrect. Please try again.";

  if (!/^\d{4}$/.test(submitted) || !secureStringEqual(submitted, env.config.password)) {
    return { ok: false, error: incorrectMessage };
  }

  await setAccessCookie(env.config.accessToken);
  revalidatePath("/portfolio/ai-command-center");
  return { ok: true };
}
