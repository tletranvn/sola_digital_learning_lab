import Link from "next/link";

export default function NotFound() {
  return (
    <section className="prose-page">
      <p className="eyebrow">404</p>
      <h1>That experience could not be found.</h1>
      <p>The link may be outdated, or the experience may still be in preparation.</p>
      <Link className="button button-primary" href="/courses">
        View all experiences
      </Link>
    </section>
  );
}
