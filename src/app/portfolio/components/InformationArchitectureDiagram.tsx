/* Inline IA diagram — SVG classes styled in InformationArchitectureSection.css (line opacity, node hierarchy) */

export function InformationArchitectureDiagram() {
  return (
    <svg
      className="ia-diagram"
      viewBox="0 0 960 300"
      role="img"
      aria-label="App information architecture: six primary areas with secondary items"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Information architecture overview</title>

      <g className="ia-diagram__connectors" fill="none">
        <path
          className="ia-diagram__line ia-diagram__line--main"
          d="M 480 52 L 480 88"
        />
        <path
          className="ia-diagram__line ia-diagram__line--main"
          d="M 80 88 L 880 88"
        />
        <path className="ia-diagram__line ia-diagram__line--branch" d="M 80 88 L 80 128" />
        <path className="ia-diagram__line ia-diagram__line--branch" d="M 248 88 L 248 128" />
        <path className="ia-diagram__line ia-diagram__line--branch" d="M 416 88 L 416 128" />
        <path className="ia-diagram__line ia-diagram__line--branch" d="M 584 88 L 584 128" />
        <path className="ia-diagram__line ia-diagram__line--branch" d="M 752 88 L 752 128" />
        <path className="ia-diagram__line ia-diagram__line--branch" d="M 920 88 L 920 128" />
        <path className="ia-diagram__line ia-diagram__line--sub" d="M 80 168 L 80 200" />
        <path className="ia-diagram__line ia-diagram__line--sub" d="M 248 168 L 248 200" />
        <path className="ia-diagram__line ia-diagram__line--sub" d="M 416 168 L 416 200" />
        <path className="ia-diagram__line ia-diagram__line--sub" d="M 584 168 L 584 200" />
        <path className="ia-diagram__line ia-diagram__line--sub" d="M 752 168 L 752 200" />
        <path className="ia-diagram__line ia-diagram__line--sub" d="M 920 168 L 920 200" />
      </g>

      <g className="ia-diagram__nodes-primary">
        <rect className="ia-diagram__node ia-diagram__node--hub" x="400" y="12" width="160" height="40" rx="8" />
        <text className="ia-diagram__label ia-diagram__label--hub" x="480" y="38" textAnchor="middle">
          Home
        </text>

        <rect className="ia-diagram__node ia-diagram__node--primary" x="8" y="128" width="144" height="40" rx="8" />
        <text className="ia-diagram__label ia-diagram__label--primary" x="80" y="154" textAnchor="middle">
          Ticket
        </text>

        <rect className="ia-diagram__node ia-diagram__node--primary" x="176" y="128" width="144" height="40" rx="8" />
        <text className="ia-diagram__label ia-diagram__label--primary" x="248" y="154" textAnchor="middle">
          Shuttle
        </text>

        <rect className="ia-diagram__node ia-diagram__node--primary" x="344" y="128" width="144" height="40" rx="8" />
        <text className="ia-diagram__label ia-diagram__label--primary" x="416" y="154" textAnchor="middle">
          Food Area
        </text>

        <rect className="ia-diagram__node ia-diagram__node--primary" x="512" y="128" width="144" height="40" rx="8" />
        <text className="ia-diagram__label ia-diagram__label--primary" x="584" y="154" textAnchor="middle">
          Line Up
        </text>

        <rect className="ia-diagram__node ia-diagram__node--primary" x="680" y="128" width="144" height="40" rx="8" />
        <text className="ia-diagram__label ia-diagram__label--primary" x="752" y="154" textAnchor="middle">
          Tokens
        </text>

        <rect className="ia-diagram__node ia-diagram__node--primary" x="848" y="128" width="104" height="40" rx="8" />
        <text className="ia-diagram__label ia-diagram__label--primary" x="900" y="154" textAnchor="middle">
          Map
        </text>
      </g>

      <g className="ia-diagram__nodes-secondary">
        <rect className="ia-diagram__node ia-diagram__node--secondary" x="20" y="200" width="120" height="32" rx="6" />
        <text className="ia-diagram__label ia-diagram__label--secondary" x="80" y="220" textAnchor="middle">
          Entry / QR
        </text>

        <rect className="ia-diagram__node ia-diagram__node--secondary" x="188" y="200" width="120" height="32" rx="6" />
        <text className="ia-diagram__label ia-diagram__label--secondary" x="248" y="220" textAnchor="middle">
          Schedules
        </text>

        <rect className="ia-diagram__node ia-diagram__node--secondary" x="356" y="200" width="120" height="32" rx="6" />
        <text className="ia-diagram__label ia-diagram__label--secondary" x="416" y="220" textAnchor="middle">
          Vendors
        </text>

        <rect className="ia-diagram__node ia-diagram__node--secondary" x="524" y="200" width="120" height="32" rx="6" />
        <text className="ia-diagram__label ia-diagram__label--secondary" x="584" y="220" textAnchor="middle">
          Stages
        </text>

        <rect className="ia-diagram__node ia-diagram__node--secondary" x="692" y="200" width="120" height="32" rx="6" />
        <text className="ia-diagram__label ia-diagram__label--secondary" x="752" y="220" textAnchor="middle">
          Wallet
        </text>

        <rect className="ia-diagram__node ia-diagram__node--secondary" x="860" y="200" width="88" height="32" rx="6" />
        <text className="ia-diagram__label ia-diagram__label--secondary" x="904" y="220" textAnchor="middle">
          Venues
        </text>
      </g>
    </svg>
  );
}
