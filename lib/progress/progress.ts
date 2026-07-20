import { z } from "zod";
import type { CourseDefinition } from "@/lib/content/course-schema";

export const courseProgressSchema = z.object({
  schemaVersion: z.literal(1),
  courseId: z.string().min(1),
  courseVersion: z.string().min(1),
  status: z.enum(["not-started", "in-progress", "completed"]),
  currentSectionId: z.string().min(1),
  completedSectionIds: z.array(z.string().min(1)),
  drafts: z.record(z.string(), z.string()),
  updatedAt: z.string().datetime(),
  migratedFromVersion: z.string().min(1).optional(),
});

export type CourseProgress = z.infer<typeof courseProgressSchema>;
export type CourseStatus = CourseProgress["status"];

export function createInitialProgress(course: CourseDefinition): CourseProgress {
  return {
    schemaVersion: 1,
    courseId: course.id,
    courseVersion: course.version,
    status: "not-started",
    currentSectionId: course.sections[0].id,
    completedSectionIds: [],
    drafts: {},
    updatedAt: new Date().toISOString(),
  };
}

export function calculateStatus(
  completedSectionIds: string[],
  course: CourseDefinition,
): CourseStatus {
  if (completedSectionIds.length === 0) {
    return "not-started";
  }

  const complete = course.completion.requiredSectionIds.every((id) =>
    completedSectionIds.includes(id),
  );

  return complete ? "completed" : "in-progress";
}

export function normalizeProgress(value: unknown, course: CourseDefinition): CourseProgress {
  const result = courseProgressSchema.safeParse(value);

  if (!result.success || result.data.courseId !== course.id) {
    return createInitialProgress(course);
  }

  const validSectionIds = new Set(course.sections.map(({ id }) => id));
  const completedSectionIds = [...new Set(result.data.completedSectionIds)].filter((id) =>
    validSectionIds.has(id),
  );
  const drafts = Object.fromEntries(
    Object.entries(result.data.drafts).filter(([id]) => validSectionIds.has(id)),
  );
  const currentSectionId = validSectionIds.has(result.data.currentSectionId)
    ? result.data.currentSectionId
    : course.sections[0].id;
  const versionChanged = result.data.courseVersion !== course.version;

  return {
    ...result.data,
    courseVersion: course.version,
    currentSectionId,
    completedSectionIds,
    drafts,
    status: calculateStatus(completedSectionIds, course),
    updatedAt: new Date().toISOString(),
    migratedFromVersion: versionChanged
      ? result.data.courseVersion
      : result.data.migratedFromVersion,
  };
}
