import type { Metadata } from "next";
import { CourseCard } from "@/components/course-card";
import { courses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Learning experiences",
  description: "Explore the first three interactive learning prototypes from Sola.",
};

export default function CoursesPage() {
  return (
    <section className="section page-intro">
      <div className="section-heading">
        <p className="eyebrow">The collection</p>
        <h1>Learning experiences</h1>
        <p>
          Short, focused prototypes that demonstrate how complex ideas can be explored through
          interaction rather than passive presentation.
        </p>
      </div>
      <div className="course-grid">
        {courses.map((course) => (
          <CourseCard course={course} key={course.slug} />
        ))}
      </div>
    </section>
  );
}
