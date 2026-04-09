import type { PersonasSectionProps } from "@/app/portfolio/components/PersonasSection";

const PERSONA_IMG_PM = "/images/SaaS/Personas/project-manager.png";
const PERSONA_IMG_HEAD = "/images/SaaS/Personas/head-of-safety.png";

export const saasPersonasSectionProps: PersonasSectionProps = {
  title: "Personas",
  labels: {
    who: "Who he is",
    keyFrictions: "Key Frictions",
    whatTheyNeed: "What he needs",
    behaviorProfile: "Behavior Profile",
  },
  personas: [
    {
      id: "project-manager",
      name: "Project Manager",
      role: "Site Level",
      imageSrc: PERSONA_IMG_PM,
      imageAlt: "Project manager on a construction site",
      whoTheyAre: (
        <>
          A site-level project manager responsible for{" "}
          <strong>daily construction operations</strong>, coordinating teams, and ensuring work progresses
          safely and on schedule. He works under constant pressure, balancing execution with safety
          requirements in a fast-moving environment.
        </>
      ),
      keyFrictions: [
        "Limited visibility into real-time safety issues across the site",
        "Safety data is fragmented across reports, making it hard to act quickly",
        "High responsibility with little structured support for decision-making",
      ],
      whatTheyNeed: (
        <>
          Clear, actionable safety insights that help him understand what requires{" "}
          <strong>attention right now</strong>, so he can respond quickly without slowing down site
          operations.
        </>
      ),
      behaviorProfile: (
        <>
          Operational, reactive, and action-driven. relies on <strong>quick understanding</strong> rather
          than deep analysis.
        </>
      ),
    },
    {
      id: "head-of-safety",
      name: "Head of Safety",
      role: "Executive Level",
      imageSrc: PERSONA_IMG_HEAD,
      imageAlt: "Head of safety in an executive context",
      whoTheyAre: (
        <>
          An executive responsible for <strong>safety strategy</strong> across multiple sites, focused on
          reducing incidents, ensuring compliance, and improving long-term safety performance.
        </>
      ),
      keyFrictions: [
        "Lack of structured visibility across multiple sites and teams",
        "Difficulty identifying patterns and recurring safety risks",
        "Reliance on delayed or inconsistent reporting",
      ],
      whatTheyNeed: (
        <>
          A high-level, reliable view of safety performance across sites, with the ability to identify trends,
          monitor risks, and make <strong>informed strategic decisions</strong>.
        </>
      ),
      behaviorProfile: (
        <>
          Strategic and analytical. focused on <strong>patterns</strong>, long-term impact, and proactive
          risk reduction.
        </>
      ),
    },
  ],
};
