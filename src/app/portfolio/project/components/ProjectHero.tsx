import "./ProjectHero.css";

type ProjectHeroProps = {
  title: string;
  summary: string;
};

export function ProjectHero({ title, summary }: ProjectHeroProps) {
  return (
    <header className="project-hero">
      <div className="project-hero-inner">
        <h1 className="project-hero-title">{title}</h1>
        <p className="project-hero-summary">{summary}</p>
      </div>
    </header>
  );
}

