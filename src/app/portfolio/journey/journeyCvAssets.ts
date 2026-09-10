import type { JourneyOrigin } from "./portfolioJourney";

export type JourneyCvAssets = {
  pdfPath: string | null;
  downloadFilename: string | null;
  previewPath: string | null;
  label: string;
  version?: string;
};

export type ResolvedJourneyCvAssets = {
  pdfPath: string | null;
  downloadFilename: string | null;
  previewPath: string | null;
  label: string;
  version?: string;
  hasPdf: boolean;
  hasPreview: boolean;
};

export const DEFAULT_JOURNEY_CV_ASSETS: JourneyCvAssets = {
  pdfPath: "/resume/amit-kedem-ux-product-designer-cv-v2.pdf",
  downloadFilename: "Amit-Kedem-UX-Product-Designer-CV.pdf",
  previewPath: "/images/cv/amit-kedem-cv-preview-v2.png",
  label: "Resume",
  version: "v2",
};

/*
 * Upload targets for the product-design (Berlin / EU) journey.
 */
export const PRODUCT_DESIGN_CV_UPLOAD_TARGETS = {
  pdfPublicPath: "/resume/amit-kedem-product-designer--cv.pdf",
  pdfDiskPath: "public/resume/amit-kedem-product-designer--cv.pdf",
  previewPublicPath: "/images/cv/amit-kedem-cv-preview-product-design.png",
  previewDiskPath: "public/images/cv/amit-kedem-cv-preview-product-design.png",
  downloadFilename: "Amit-Kedem-Product-Designer-CV.pdf",
} as const;

export const PRODUCT_DESIGN_JOURNEY_CV_ASSETS: JourneyCvAssets = {
  pdfPath: PRODUCT_DESIGN_CV_UPLOAD_TARGETS.pdfPublicPath,
  downloadFilename: PRODUCT_DESIGN_CV_UPLOAD_TARGETS.downloadFilename,
  previewPath: PRODUCT_DESIGN_CV_UPLOAD_TARGETS.previewPublicPath,
  label: "Resume",
  version: "product-design-v1",
};

const JOURNEY_CV_ASSETS: Partial<Record<JourneyOrigin, JourneyCvAssets>> = {
  "product-design": PRODUCT_DESIGN_JOURNEY_CV_ASSETS,
};

export function getJourneyCvAssets(
  origin: JourneyOrigin | null,
): JourneyCvAssets {
  if (origin && JOURNEY_CV_ASSETS[origin]) {
    return JOURNEY_CV_ASSETS[origin]!;
  }
  return DEFAULT_JOURNEY_CV_ASSETS;
}

export function resolveJourneyCvAssets(
  origin: JourneyOrigin | null,
): ResolvedJourneyCvAssets {
  const assets = getJourneyCvAssets(origin);
  const pdfPath = assets.pdfPath?.trim() || null;
  const previewPath = assets.previewPath?.trim() || null;
  const downloadFilename = assets.downloadFilename?.trim() || null;

  return {
    pdfPath,
    downloadFilename,
    previewPath,
    label: assets.label,
    version: assets.version,
    hasPdf: Boolean(pdfPath && downloadFilename),
    hasPreview: Boolean(previewPath),
  };
}
