import type { PersonasSectionProps } from "@/app/portfolio/components/PersonasSection";

const PERSONA_IMG_DANIELA = "/images/basilar/personas/daniela.png";
const PERSONA_IMG_SOFIA = "/images/basilar/personas/sofia.png";

export const basilarPersonasSectionProps: PersonasSectionProps = {
  title: "Personas",
  labels: {
    who: "Who she is",
    keyFrictions: "Key Frictions",
    whatTheyNeed: "What she needs",
  },
  personas: [
    {
      id: "daniela",
      name: "Daniela",
      role: "Local Attendee",
      imageSrc: PERSONA_IMG_DANIELA,
      imageAlt: "Daniela, local festival attendee",
      whoTheyAre: (
        <>
          Daniela is a graphic designer living in Porto. She enjoys festivals that combine{" "}
          <strong>music and community</strong>, and values a well-organized experience. As a tech-savvy user,
          she prefers using <strong>apps</strong> to enhance her time at events.
        </>
      ),
      keyFrictions: [
        "Long queues for food and drinks break the flow of the experience",
        "Difficulty navigating between stages in a large outdoor venue",
        "Lack of real-time updates creates uncertainty during schedule changes",
      ],
      whatTheyNeed: (
        <>
          A seamless festival experience with quick access to tickets, food, transport, and lineup
          information in <strong>one place</strong>.
        </>
      ),
    },
    {
      id: "sofia",
      name: "Sofia",
      role: "International Visitor",
      imageSrc: PERSONA_IMG_SOFIA,
      imageAlt: "Sofia, international festival visitor",
      whoTheyAre: (
        <>
          Sofia is a project manager from Berlin who <strong>frequently travels for festivals</strong>. She
          seeks high-quality, well-organized experiences and prefers minimizing{" "}
          <strong>logistical friction</strong> during short visits.
        </>
      ),
      keyFrictions: [
        "Language and unfamiliar environment increase cognitive load",
        "Difficulty understanding transportation and festival logistics",
        "Limited time makes inefficiencies more frustrating",
      ],
      whatTheyNeed: (
        <>
          An efficient, easy-to-navigate experience with <strong>real-time updates</strong> and clear access to
          key services.
        </>
      ),
    },
  ],
};
