"use client";

import { useJourneyCvAssets } from "@/app/portfolio/journey/useJourneyCvAssets";

export function CvPageSection() {
  const assets = useJourneyCvAssets();

  return (
    <section className="cv-page-section" aria-labelledby="cv-title">
      <div className="cv-page-inner">
        <h1 id="cv-title" className="cv-page-title">
          {assets.label}
        </h1>

        {assets.hasPdf && assets.pdfPath && assets.downloadFilename ? (
          <a
            className="cv-page-download"
            href={assets.pdfPath}
            download={assets.downloadFilename}
          >
            Get Resume
          </a>
        ) : (
          <p className="cv-page-unavailable">
            Resume download will be available soon.
          </p>
        )}

        {assets.hasPreview && assets.previewPath ? (
          <div className="cv-page-preview-wrap" aria-hidden>
            <img className="cv-page-preview" src={assets.previewPath} alt="" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
