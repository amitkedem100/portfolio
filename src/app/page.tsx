import Link from "next/link";
import "./page.css";

export default function Home() {
  return (
    <div className="root-page layout-grid">
      <main className="root-page-main">
        <h1>Portfolio</h1>
        <p>
          View the portfolio at{" "}
          <Link href="/portfolio/home">/portfolio/home</Link>.
        </p>
      </main>
    </div>
  );
}
