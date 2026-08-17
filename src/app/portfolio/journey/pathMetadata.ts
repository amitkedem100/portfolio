import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://amitkedem.com";

export function siteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
  return new URL(raw.endsWith("/") ? raw : `${raw}/`);
}

export function pathMetadata(path: string, metadata: Metadata): Metadata {
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: path,
    },
  };
}
