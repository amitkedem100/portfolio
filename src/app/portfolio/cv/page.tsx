import type { Metadata } from "next";
import "./page.css";

const CV_PDF_PATH = "/resume/amit-kedem-product-designer-cv.pdf";
const CV_PREVIEW_PATH = "/images/cv/amit-kedem-cv-preview.png";

export const metadata: Metadata = {
  title: "Amit Kedem | CV",
  description: "Download Amit Kedem's resume.",
};

export default function PortfolioCvPage() {
  return (
    <div className="cv-page portfolio-page-inner-grid">
      <section className="cv-page-section" aria-labelledby="cv-title">
        <div className="cv-page-inner">
          <h1 id="cv-title" className="cv-page-title">
            Resume
          </h1>

          <a className="cv-page-download" href={CV_PDF_PATH} download>
            Get Resume
          </a>

          <div className="cv-page-preview-wrap" aria-hidden>
            <img className="cv-page-preview" src={CV_PREVIEW_PATH} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}
