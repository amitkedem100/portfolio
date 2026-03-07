import "./HomeHero.css";

/* Subtitle: replace with intro from content/CMS when available */
const HERO_SUBTITLE = "Creative Product Designer blending UX, UI and system thinking. I turn complex ideas into clear, functional digital products.";
export function HomeHero() {
  return (
    <header className="home-hero">
      <div className="home-hero-inner">
        <h1 className="home-hero-title">Hi! I&apos;m Amit</h1>
        <p className="home-hero-subtitle">{HERO_SUBTITLE}</p>
      </div>
      <div className="home-hero-arrow" aria-hidden>
        <svg
          className="home-hero-arrow-icon"
          width={24}
          height={24}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            fill="currentColor"
            d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
          />
        </svg>
      </div>
    </header>
  );
}
