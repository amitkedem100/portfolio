import Image from "next/image";
import "@/app/portfolio/components/ProjectTextSection.css";
import "./BasilarUITeaserSection.css";

const TEASER_IMAGES = [
  {
    id: "welcome",
    src: "/images/basilar/Log-in1.png",
    alt: "Basilar welcome screen",
  },
  {
    id: "login",
    src: "/images/basilar/Log-in2.png",
    alt: "Basilar log in screen",
  },
  {
    id: "onboarding",
    src: "/images/basilar/Log-in3.jpg",
    alt: "Basilar onboarding screen",
  },
] as const;

export function BasilarUITeaserSection() {
  return (
    <section
      className="basilar-page-section basilar-ui-teaser project-text-section"
      aria-label="Basilar app screens"
    >
      <div className="project-text-section-inner">
        <div className="basilar-ui-teaser-devices" role="list">
          {TEASER_IMAGES.map((item, index) => {
            const position = index === 0 ? "left" : index === 1 ? "center" : "right";
            return (
              <div
                key={item.id}
                className={`basilar-ui-teaser-device basilar-ui-teaser-device--${position}`}
                role="listitem"
              >
                <div className="basilar-ui-teaser-frame">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 72vw, (max-width: 1024px) 28vw, 24vw"
                    className="basilar-ui-teaser-img"
                    priority={index === 1}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
