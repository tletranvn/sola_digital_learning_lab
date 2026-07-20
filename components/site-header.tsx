import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Sola home">
        <span className="brand-mark" aria-hidden="true">
          S
        </span>
        <span>
          <strong>Sola</strong>
          <small>Digital Learning Lab</small>
        </span>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/courses">Experiences</Link>
        <Link href="/about">About</Link>
        <Link href="/accessibility">Accessibility</Link>
      </nav>
    </header>
  );
}
