import type { Metadata } from "next";
import Image from "next/image";
import "./page.css";

const TOOLS = [
  "Figma",
  "Cursor",
  "Claude",
  "React",
  "TypeScript",
  "CSS",
  "Git",
  "Next.js",
] as const;

export const metadata: Metadata = {
  title: "About | Portfolio",
  description:
    "About Amit — product designer working across UX, systems, AI, and code.",
};

export default function PortfolioAboutPage() {
  const marqueeItems = [...TOOLS, ...TOOLS];

  return (
    <div className="about-page portfolio-page-inner-grid">
      <div className="about-left-column">
        <section className="about-section about-hero" aria-labelledby="about-hero-title">
          <div className="about-hero__content">
            <h1 id="about-hero-title" className="about-hero__title">
              About
            </h1>
            <p className="about-hero__intro">
            Product Designer working across UX, systems, AI, and code focused on
            building structured, scalable digital products.
            </p>
          </div>
        </section>

        <section className="about-section about-duo" aria-label="Who I Am and How I Work">
          <article className="about-duo__panel about-who" aria-labelledby="about-who-title">
            <p className="about-section__label">Who I Am</p>
            <h2 id="about-who-title" className="about-section__title sr-only">
              Who I Am
            </h2>
            <p className="about-section__body">
              I&apos;m a social and curious product designer who enjoys building things that
              hold up in real world use. I&apos;ve been around technology from an early age. I
              built my first website at 10 while spending time at my parents&apos; tech business.
            </p>
            <p className="about-section__body">
              I focus on balancing visual clarity with practical thinking and business logic,
              while staying curious and continuously learning, especially around AI.
            </p>
          </article>

          <div className="about-mobile-image-slot" aria-hidden>
            <div className="about-hero__media about-hero__media--mobile">
              <Image
                src="/images/about/amit-portrait.png"
                alt=""
                className="about-hero__portrait-image"
                width={840}
                height={1120}
              />
            </div>
          </div>

          <article className="about-duo__panel about-work" aria-labelledby="about-work-title">
            <p className="about-section__label">How I Work</p>
            <h2 id="about-work-title" className="about-section__title sr-only">
              How I Work
            </h2>
            <p className="about-section__body">
              I approach design through structure, clarity, and execution. I look at the
              bigger picture, simplify complexity, and turn ideas into systems that support
              real use.
            </p>
            <p className="about-section__body">
              I adapt quickly, refine workflows, and work closely with teams to build
              products that are clear, scalable, and grounded in real world needs.
            </p>
          </article>
        </section>

        <section className="about-section about-tools" aria-labelledby="about-tools-title">
          <p className="about-section__label">Tools &amp; Workflow</p>
        <h2 id="about-tools-title" className="about-section__title sr-only">
            Tools &amp; Workflow
          </h2>
          <div className="about-tools__marquee" aria-label="Tools marquee">
            <div className="about-tools__track">
              {marqueeItems.map((tool, index) => (
                <span className="about-tools__item" key={`${tool}-${index}`}>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <aside className="about-right-column" aria-label="About portrait">
        <div className="about-hero__media">
          <Image
            src="/images/about/amit-portrait.png"
            alt="Portrait of Amit"
            className="about-hero__portrait-image"
            width={840}
            height={1120}
            priority
          />
        </div>
      </aside>
    </div>
  );
}
