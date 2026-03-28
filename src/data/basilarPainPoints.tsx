import type { PainPointsSectionProps } from "@/app/portfolio/components/PainPointsSection";

export const basilarPainPointsSectionProps: PainPointsSectionProps = {
  title: "Pain Points",
  groups: [
    {
      id: "daniela",
      personaName: "Daniela",
      personaRole: "Local Attendee",
      points: [
        {
          id: "daniela-entry",
          content: (
            <>
              <strong>Entry bottleneck breaks the experience flow:</strong> Daniela waited over an hour at the
              entrance due to slow ticket scanning and poor organization. This delay caused frustration before
              the event even started and negatively impacted her overall perception of the festival.
            </>
          ),
        },
        {
          id: "daniela-transport",
          content: (
            <>
              <strong>Poor transport communication leads to missed moments:</strong> She couldn&apos;t find
              clear shuttle schedules or pickup points, causing her to miss a live performance. Lack of
              visibility and real-time updates created uncertainty and reduced her ability to plan her
              experience.
            </>
          ),
        },
      ],
    },
    {
      id: "sofia",
      personaName: "Sofia",
      personaRole: "International Visitor",
      points: [
        {
          id: "sofia-navigation",
          content: (
            <>
              <strong>Lack of navigation increases cognitive load:</strong> Without a clear map or navigation
              system, Sofia struggled to locate key areas such as stages, food, and facilities. This created
              constant friction and made the experience feel overwhelming in an unfamiliar environment.
            </>
          ),
        },
        {
          id: "sofia-food",
          content: (
            <>
              <strong>Unpredictable food availability reduces trust:</strong> Sofia had difficulty finding
              vegan options, and vendors ran out of food without any real-time updates. This led to frustration
              and reduced trust in the festival&apos;s organization and service quality.
            </>
          ),
        },
      ],
    },
  ],
};
