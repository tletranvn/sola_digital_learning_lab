import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section className="prose-page">
      <p className="eyebrow">Our approach</p>
      <h1>Technology follows the learning objective.</h1>
      <p>
        Sola creates focused digital learning experiences with custom web interactions.
        Three-dimensional scenes, diagrams, and branching narratives are used only when they help a
        learner perform meaningful intellectual work.
      </p>
      <h2>Portable by design</h2>
      <p>
        Content, interaction, and progress storage are separated so that each experience can run
        publicly on the web and later be packaged for an institutional learning platform.
      </p>
    </section>
  );
}
