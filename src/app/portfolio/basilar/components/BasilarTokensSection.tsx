import "@/app/portfolio/components/ProjectTextSection.css";
import {
  BasilarUISegmentBlock,
  type BasilarUISegmentContent,
} from "@/app/portfolio/basilar/components/BasilarUISegmentBlock";
import "./BasilarTokensSection.css";

const TOKENS_SEGMENT: BasilarUISegmentContent = {
  id: "tokens",
  label: "Tokens",
  title: "Stay Cash-Free & Stick to Your Budget",
  description:
    "Easily manage your spending with a current balance display and three token packages: 100, 200, or 300 tokens, each offering different deals to suit your needs. Enjoy seamless transactions without the hassle of cash.",
  deviceVideoSrc: "/videos/basilar/Tokens.mp4",
  deviceVideoAriaLabel: "Basilar token packages and balance",
};

const COINS_SVG = "/images/basilar/coins%201.svg";

export function BasilarTokensSection() {
  return (
    <section
      className="basilar-page-section basilar-page-ui-tokens project-text-section"
      aria-labelledby="basilar-ui-segment-title-tokens"
    >
      <div className="basilar-page-ui-tokens__bg" aria-hidden="true">
        {/* Decorative watermark — low opacity behind copy + device */}
        <img className="basilar-page-ui-tokens__bg-img" src={COINS_SVG} alt="" width={480} height={480} />
      </div>
      <div className="project-text-section-inner basilar-page-ui-tokens__inner">
        <BasilarUISegmentBlock segment={TOKENS_SEGMENT} reverse />
      </div>
    </section>
  );
}
