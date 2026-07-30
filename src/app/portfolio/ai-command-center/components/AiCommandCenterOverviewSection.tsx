import "./AiCommandCenterOverviewSection.css";

/* Public-safe Overview — First value before private case-study depth */

export function AiCommandCenterOverviewSection() {
  return (
    <section
      className="ai-cc-page-section ai-cc-page-overview project-text-section"
      aria-labelledby="ai-cc-overview-title"
    >
      <div className="project-text-section-inner">
        <div className="ai-cc-overview-prose project-text-section-inner--prose">
          <header className="ai-cc-overview-header">
            <h2 id="ai-cc-overview-title" className="ai-cc-overview-heading">
              Overview
            </h2>
          </header>

          <p className="ai-cc-overview-lead">
            An AI-powered operational command center designed to help distributed teams turn real-time
            detections into clearer, faster decisions by shaping the{" "}
            <strong>human workflow around the model</strong>, not only the screens.
          </p>

          <h3 className="ai-cc-overview-subheading">Problem</h3>
          <ol className="ai-cc-overview-problem-list">
            <li>
              <span className="ai-cc-overview-problem-list__title">
                Attention does not scale with signal volume
              </span>
              <span className="ai-cc-overview-problem-list__text">
                As sites and cameras multiply, the number of people who can watch feeds in real time stays
                limited. Manual monitoring stretches the gap between something appearing on screen and a
                decision being made.
              </span>
            </li>
            <li>
              <span className="ai-cc-overview-problem-list__title">
                Detection is not a decision
              </span>
              <span className="ai-cc-overview-problem-list__text">
                AI can surface a possible person in frame, but that is still not an event. Someone must verify
                what was detected, and separately decide whether it warrants operational action.
              </span>
            </li>
            <li>
              <span className="ai-cc-overview-problem-list__title">
                Responsibility across the chain was unclear
              </span>
              <span className="ai-cc-overview-problem-list__text">
                Without a defined handoff between validation and authority, repetitive screening work stayed
                mixed with high-stakes judgment, slowing response and blurring accountability.
              </span>
            </li>
          </ol>

          <h3 className="ai-cc-overview-subheading">Solution</h3>
          <p className="ai-cc-overview-solution">
            A structured workflow around AI detections: <strong>focused human validation</strong>, clearer{" "}
            <strong>operational authority</strong>, and <strong>event context that builds over time</strong>.
            So teams can prioritize under load while protecting attention across the full chain. Successful AI
            here meant designing the organization and process around the model, not the model alone.
          </p>
        </div>
      </div>
    </section>
  );
}
