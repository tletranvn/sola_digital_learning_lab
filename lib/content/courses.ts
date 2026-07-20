import { rawCourseDefinitions } from "@/content/course-definitions";
import { courseDefinitionSchema, type CourseDefinition } from "./course-schema";

function formatValidationError(index: number, error: unknown) {
  if (error && typeof error === "object" && "issues" in error) {
    const issues = (error as { issues: Array<{ path: PropertyKey[]; message: string }> }).issues;
    return issues
      .map(({ path, message }) => `course[${index}].${path.join(".") || "root"}: ${message}`)
      .join("\n");
  }

  return `course[${index}]: ${String(error)}`;
}

function validateCourses(): CourseDefinition[] {
  const parsed = rawCourseDefinitions.map((course, index) => {
    const result = courseDefinitionSchema.safeParse(course);

    if (!result.success) {
      throw new Error(`Invalid course definition:\n${formatValidationError(index, result.error)}`);
    }

    return result.data;
  });

  const ids = parsed.map(({ id }) => id);
  const slugs = parsed.map(({ slug }) => slug);

  for (const [label, values] of [
    ["course ids", ids],
    ["course slugs", slugs],
  ] as const) {
    const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
    if (duplicates.length > 0) {
      throw new Error(`Duplicate ${label}: ${[...new Set(duplicates)].join(", ")}`);
    }
  }

  return parsed;
}

export const courseDefinitions = validateCourses();

export function getCourseDefinition(slug: string) {
  return courseDefinitions.find((course) => course.slug === slug);
}
