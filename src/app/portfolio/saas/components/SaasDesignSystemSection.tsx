import { Archivo, Hind_Madurai, Montserrat } from "next/font/google";
import "@/app/portfolio/components/ProjectTextSection.css";
import "./SaasDesignSystemSection.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-saas-style-guide-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const hindMadurai = Hind_Madurai({
  subsets: ["latin"],
  variable: "--font-saas-style-guide-hind-madurai",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const archivoStyleGuide = Archivo({
  subsets: ["latin"],
  variable: "--font-saas-style-guide-archivo",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const CHARSET =
  "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0 1 2 3 4 5 6 7 8 9";

type SwatchToken = {
  name: string;
  hex: string;
};

const VIOLATION_COLORS: SwatchToken[] = [
  { name: "Violation Critical", hex: "#F51F24" },
  { name: "Violation Category 02", hex: "#FD00D5" },
  { name: "Violation Category 03", hex: "#5400FB" },
  { name: "Violation Category 04", hex: "#00F7FF" },
  { name: "Violation Category 05", hex: "#FBFB23" },
  { name: "Violation Category 06", hex: "#FBA823" },
];

const TEXT_ICON_COLORS: SwatchToken[] = [
  { name: "Primary", hex: "#FFFFFF" },
  { name: "Secondary", hex: "#DFDFDF" },
  { name: "Inverse", hex: "#000000" },
  { name: "Disabled", hex: "#A6A6A6" },
  { name: "Link", hex: "#4EA8DE" },
  { name: "Error", hex: "#E63C67" },
  { name: "Warning", hex: "#FF9500" },
  { name: "Success", hex: "#27AE60" },
  { name: "On-surface", hex: "#CCCCCC" },
  { name: "Interactive", hex: "#BEBEFF" },
];

const BACKGROUND_COLORS: SwatchToken[] = [
  { name: "Surface", hex: "#221F48" },
  { name: "Elevated", hex: "#23366A" },
  { name: "Subtle", hex: "#282550" },
];

type SwatchGroupProps = {
  title: string;
  colors: SwatchToken[];
};

function SwatchGroup({ title, colors }: SwatchGroupProps) {
  return (
    <section className="saas-design-system__block">
      <h3 className="saas-design-system__block-title">{title}</h3>
      <ul className="saas-design-system__swatches">
        {colors.map((token) => (
          <li key={`${token.name}-${token.hex}`} className="saas-design-system__swatch-item">
            <span className="saas-design-system__swatch" style={{ backgroundColor: token.hex }} aria-hidden />
            <span className="saas-design-system__token-name">{token.name}</span>
            <span className="saas-design-system__hex">{token.hex}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SaasDesignSystemSection() {
  return (
    <section
      className={`saas-page-section saas-design-system project-text-section ${montserrat.variable} ${hindMadurai.variable} ${archivoStyleGuide.variable}`}
      aria-labelledby="saas-design-system-title"
    >
      <div className="project-text-section-inner saas-design-system__inner">
        <header className="saas-design-system__header">
          <h2 id="saas-design-system-title" className="saas-design-system__title">
            Design System
          </h2>
        </header>

        <section className="saas-design-system__block">
          <h3 className="saas-design-system__block-title">Typography</h3>
          <div className="saas-design-system__type-grid">
            <article className="saas-design-system__type-card saas-design-system__type-card--montserrat">
              <p className="saas-design-system__type-aa" aria-hidden>
                Aa
              </p>
              <p className="saas-design-system__type-name">Montserrat</p>
              <p className="saas-design-system__charset">{CHARSET}</p>
              <ul className="saas-design-system__weights" aria-label="Montserrat weights">
                <li className="saas-design-system__weight saas-design-system__weight--400">Regular 400</li>
                <li className="saas-design-system__weight saas-design-system__weight--500">Medium 500</li>
                <li className="saas-design-system__weight saas-design-system__weight--600">Semi Bold 600</li>
                <li className="saas-design-system__weight saas-design-system__weight--700">Bold 700</li>
              </ul>
            </article>

            <article className="saas-design-system__type-card saas-design-system__type-card--hind">
              <p className="saas-design-system__type-aa" aria-hidden>
                Aa
              </p>
              <p className="saas-design-system__type-name">Hind Madurai</p>
              <p className="saas-design-system__charset">{CHARSET}</p>
              <ul className="saas-design-system__weights" aria-label="Hind Madurai weights">
                <li className="saas-design-system__weight saas-design-system__weight--400">Regular 400</li>
                <li className="saas-design-system__weight saas-design-system__weight--500">Medium 500</li>
                <li className="saas-design-system__weight saas-design-system__weight--600">Semi Bold 600</li>
                <li className="saas-design-system__weight saas-design-system__weight--700">Bold 700</li>
              </ul>
            </article>
          </div>
        </section>

        <SwatchGroup title="Violation Categories" colors={VIOLATION_COLORS} />
        <SwatchGroup title="Text & Icons" colors={TEXT_ICON_COLORS} />
        <SwatchGroup title="Background" colors={BACKGROUND_COLORS} />
      </div>
    </section>
  );
}
