import type { Metadata } from "next";
import "./page.css";
import { ContactPageSection } from "./components/ContactPageSection";

import { pathMetadata } from "@/app/portfolio/journey/pathMetadata";

export const metadata: Metadata = pathMetadata("/portfolio/contact", {
  title: "Amit Kedem | Contact",
  description: "Contact Amit for collaborations, product opportunities, and consulting.",
});

export default function PortfolioContactPage() {
  return (
    <div className="contact-page portfolio-page-inner-grid">
      <ContactPageSection />
    </div>
  );
}
