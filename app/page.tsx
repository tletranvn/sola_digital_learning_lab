import Link from "next/link";
import { CourseCard } from "@/components/course-card";
import { courses } from "@/lib/courses";

export default function Home() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">Sola / Digital Learning Lab</p>
        <h1>Where difficult ideas become experiences.</h1>
        <p className="hero-copy">
          Explore philosophy, freedom, and meaning through custom interactive learning—designed for
          the web and portable to institutional platforms.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/courses">
            Explore the experiences
          </Link>
          <Link className="button button-secondary" href="/about">
            Read our approach
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="featured-title">
        <div className="section-heading">
          <p className="eyebrow">First collection</p>
          <h2 id="featured-title">Three perspectives on human agency</h2>
          <p>
            Each prototype uses a different interaction because each learning objective asks for a
            different kind of thinking.
          </p>
        </div>
        <div className="course-grid">
          {courses.map((course) => (
            <CourseCard course={course} key={course.slug} />
          ))}
        </div>
      </section>
    </>
  );
}
