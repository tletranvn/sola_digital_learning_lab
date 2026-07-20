import type { Metadata } from "next";

export const metadata: Metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return (
    <section className="prose-page">
      <p className="eyebrow">Accessibility</p>
      <h1>One learning objective, more than one way to engage.</h1>
      <p>
        Sola targets WCAG 2.2 AA. Essential content will never exist only inside a 3D canvas or
        animation.
      </p>
      <h2>Foundation commitments</h2>
      <ul>
        <li>Complete keyboard navigation and visible focus.</li>
        <li>Semantic HTML alternatives for visual interactions.</li>
        <li>Reduced-motion support without loss of information.</li>
        <li>Responsive content from narrow mobile screens upward.</li>
        <li>No time limits for the learning activities.</li>
      </ul>
    </section>
  );
}
