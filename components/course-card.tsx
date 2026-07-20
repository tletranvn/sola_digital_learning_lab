import Link from "next/link";
import type { Course } from "@/lib/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="course-card">
      <div className="course-card-topline">
        <span aria-hidden="true">{course.number}</span>
        <span className="status">{course.status}</span>
      </div>
      <h3>
        <Link href={`/courses/${course.slug}`}>{course.title}</Link>
      </h3>
      <p>{course.description}</p>
      <dl className="course-meta">
        <div>
          <dt>Format</dt>
          <dd>{course.format}</dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{course.duration}</dd>
        </div>
      </dl>
    </article>
  );
}
