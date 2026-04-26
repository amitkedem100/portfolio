import type { Metadata } from "next";
import "./page.css";
import { ContactPageSection } from "./components/ContactPageSection";

export const metadata: Metadata = {
  title: "Contact | Portfolio",
  description: "Contact Amit for collaborations, product opportunities, and consulting.",
};

export default function PortfolioContactPage() {
  return (
    <div className="contact-page portfolio-page-inner-grid">
      <ContactPageSection />
    </div>
  );
}
