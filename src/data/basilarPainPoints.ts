import type { PainPointsSectionProps } from "@/app/portfolio/components/PainPointsSection";

export const basilarPainPointsSectionProps: PainPointsSectionProps = {
  title: "Pain Points",
  intro:
    "Real attendee experiences revealed critical friction points that disrupted the festival flow and reduced overall satisfaction.",
  groups: [
    {
      id: "daniela",
      personaTitle: "Daniela — Local Attendee",
      points: [
        {
          id: "daniela-entry",
          title: "Entry bottleneck breaks the experience flow",
          description:
            "Daniela waited over an hour at the entrance due to slow ticket scanning and poor organization. This delay caused frustration before the event even started and negatively impacted her overall perception of the festival.",
        },
        {
          id: "daniela-transport",
          title: "Poor transport communication leads to missed moments",
          description:
            "She couldn’t find clear shuttle schedules or pickup points, causing her to miss a live performance. Lack of visibility and real-time updates created uncertainty and reduced her ability to plan her experience.",
        },
      ],
    },
    {
      id: "sofia",
      personaTitle: "Sofia — International Visitor",
      points: [
        {
          id: "sofia-navigation",
          title: "Lack of navigation increases cognitive load",
          description:
            "Without a clear map or navigation system, Sofia struggled to locate key areas such as stages, food, and facilities. This created constant friction and made the experience feel overwhelming in an unfamiliar environment.",
        },
        {
          id: "sofia-food",
          title: "Unpredictable food availability reduces trust",
          description:
            "Sofia had difficulty finding vegan options, and vendors ran out of food without any real-time updates. This led to frustration and reduced trust in the festival’s organization and service quality.",
        },
      ],
    },
  ],
};
