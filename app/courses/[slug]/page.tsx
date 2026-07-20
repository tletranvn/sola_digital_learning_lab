import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CoursePlayer } from "@/components/course/course-player";
import { courseDefinitions, getCourseDefinition } from "@/lib/content/courses";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return courseDefinitions.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const course = getCourseDefinition((await params).slug);
  return course
    ? { title: course.title, description: course.description }
    : { title: "Experience not found" };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = getCourseDefinition((await params).slug);

  if (!course) {
    notFound();
  }

  return <CoursePlayer course={course} />;
}
