import type { Metadata } from "next";
import "./page.css";
import { pathMetadata } from "@/app/portfolio/journey/pathMetadata";
import { CvPageSection } from "./components/CvPageSection";

export const metadata: Metadata = pathMetadata("/portfolio/cv", {
  title: "Amit Kedem | CV",
  description: "Download Amit Kedem's resume.",
});

export default function PortfolioCvPage() {
  return (
    <div className="cv-page portfolio-page-inner-grid">
      <CvPageSection />
    </div>
  );
}
