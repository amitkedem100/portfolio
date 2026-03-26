import { Archivo } from "next/font/google";
import "@/app/portfolio/components/ProjectTextSection.css";
import "./BasilarStyleGuideSection.css";

const CHARSET =
  "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 1 2 3 4 5 6 7 8 9";

/* Basilar product typeface for this showcase only (not portfolio Gabarito/Figtree) */
const archivoBasilar = Archivo({
  subsets: ["latin"],
  variable: "--font-basilar-style-guide-archivo",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
});

/* Case-study style guide: theme-aware band + Archivo typography + brand palette */
export function BasilarStyleGuideSection() {
  return (
    <section
      className={`basilar-page-section basilar-style-guide project-text-section ${archivoBasilar.variable}`}
      aria-labelledby="basilar-style-guide-title"
    >
      <div className="project-text-section-inner basilar-style-guide__inner">
        <h2 id="basilar-style-guide-title" className="basilar-style-guide__page-title">
          Style Guide
        </h2>

        <div className="basilar-style-guide__block">
          <h3 className="basilar-style-guide__block-title">Typography</h3>

          <div className="basilar-style-guide__typo-grid">
            <div className="basilar-style-guide__typo-stack">
              <p className="basilar-style-guide__typo-aa" aria-hidden>
                Aa
              </p>
              <p className="basilar-style-guide__typo-name">Archivo</p>
            </div>

            <p className="basilar-style-guide__charset">{CHARSET}</p>

            <ul className="basilar-style-guide__weights" aria-label="Archivo font weights">
              <li className="basilar-style-guide__weight basilar-style-guide__weight--200">Extra Light</li>
              <li className="basilar-style-guide__weight basilar-style-guide__weight--300">Light</li>
              <li className="basilar-style-guide__weight basilar-style-guide__weight--500">
                <strong>Medium</strong>
              </li>
              <li className="basilar-style-guide__weight basilar-style-guide__weight--400">Regular</li>
              <li className="basilar-style-guide__weight basilar-style-guide__weight--600">Semi Bold</li>
              <li className="basilar-style-guide__weight basilar-style-guide__weight--700">
                <strong>Bold</strong>
              </li>
            </ul>
          </div>
        </div>

        <div className="basilar-style-guide__block">
          <h3 className="basilar-style-guide__block-title">Color palette</h3>
          <ul className="basilar-style-guide__swatches">
            <li className="basilar-style-guide__swatch-item">
              <span className="basilar-style-guide__swatch basilar-style-guide__swatch--white" />
              <span className="basilar-style-guide__hex">#FFFFFF</span>
            </li>
            <li className="basilar-style-guide__swatch-item">
              <span className="basilar-style-guide__swatch basilar-style-guide__swatch--neon" />
              <span className="basilar-style-guide__hex">#00FF0A</span>
            </li>
            <li className="basilar-style-guide__swatch-item">
              <span className="basilar-style-guide__swatch basilar-style-guide__swatch--ink" />
              <span className="basilar-style-guide__hex">#03000A</span>
            </li>
            <li className="basilar-style-guide__swatch-item">
              <span className="basilar-style-guide__swatch basilar-style-guide__swatch--signal" />
              <span className="basilar-style-guide__hex">#FF0000</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
