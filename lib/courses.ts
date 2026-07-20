import { courseDefinitions } from "@/lib/content/courses";

export const courses = courseDefinitions.map((course) => ({
  slug: course.slug,
  number: course.number,
  title: course.title,
  description: course.description,
  format: course.format,
  duration: `${course.estimatedMinutes} min`,
  status: course.status,
}));

export type Course = (typeof courses)[number];

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}
