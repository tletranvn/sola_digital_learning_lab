"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="prose-page" role="alert">
      <p className="eyebrow">Something went wrong</p>
      <h1>This page could not be displayed.</h1>
      <button className="button button-primary" onClick={reset} type="button">
        Try again
      </button>
    </section>
  );
}
