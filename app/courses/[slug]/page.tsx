import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourse } from "@/lib/courses";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return courses.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const course = getCourse((await params).slug);
  return course
    ? { title: course.title, description: course.description }
    : { title: "Experience not found" };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = getCourse((await params).slug);

  if (!course) {
    notFound();
  }

  return (
    <article className="course-intro">
      <Link className="back-link" href="/courses">
        Back to all experiences
      </Link>
      <p className="eyebrow">Experience {course.number}</p>
      <h1>{course.title}</h1>
      <p className="hero-copy">{course.description}</p>
      <dl className="course-meta course-meta-large">
        <div>
          <dt>Format</dt>
          <dd>{course.format}</dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{course.duration}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{course.status}</dd>
        </div>
      </dl>
      <div className="notice">
        <h2>Prototype in preparation</h2>
        <p>
          The course shell is ready. Its content and interaction will be added in the next
          implementation phases.
        </p>
      </div>
    </article>
  );
}
