import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <h1>Portfolio</h1>
        <p>
          View the portfolio at{" "}
          <Link href="/portfolio/home">/portfolio/home</Link>.
        </p>
      </main>
    </div>
  );
}
