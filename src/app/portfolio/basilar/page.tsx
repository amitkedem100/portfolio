import type { Metadata } from "next";
import "./page.css";
import { ProjectVideoHero } from "@/app/portfolio/components/ProjectVideoHero";

export const metadata: Metadata = {
  title: "Basilar | Portfolio",
  description:
    "Basilar — mobile UX for multi-day music festival logistics and real-time updates.",
};

const BASILAR_BG_VIDEO = "/videos/basilar/background.mp4";
const BASILAR_DEVICE_VIDEO = "/videos/basilar/device.mp4";

export default function BasilarProjectPage() {
  return (
    <div className="basilar-page basilar-project layout-grid">
      <section className="basilar-page-section basilar-page-hero" aria-label="Basilar project hero">
        <ProjectVideoHero
          title="Basilar"
          description="A mobile product designed to simplify the logistics of a multi-day music festival experience — from entry and transport to food, navigation, and real-time updates."
          meta="Personal Project · Mobile UX · Festival Experience · May 2023"
          backgroundVideoSrc={BASILAR_BG_VIDEO}
          deviceVideoSrc={BASILAR_DEVICE_VIDEO}
        />
      </section>
    </div>
  );
}
