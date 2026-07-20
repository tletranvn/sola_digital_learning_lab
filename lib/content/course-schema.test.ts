import { describe, expect, it } from "vitest";
import { rawCourseDefinitions } from "@/content/course-definitions";
import { courseDefinitionSchema } from "./course-schema";
import { courseDefinitions } from "./courses";

describe("course definitions", () => {
  it("validates every canonical course at import time", () => {
    expect(courseDefinitions).toHaveLength(3);
    expect(new Set(courseDefinitions.map(({ id }) => id)).size).toBe(3);
  });

  it("returns an actionable error for duplicate section ids", () => {
    const invalidCourse = {
      ...rawCourseDefinitions[0],
      sections: [rawCourseDefinitions[0].sections[0], rawCourseDefinitions[0].sections[0]],
      completion: { mode: "all-required" as const, requiredSectionIds: ["introduction"] },
    };
    const result = courseDefinitionSchema.safeParse(invalidCourse);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("Duplicate section ids: introduction");
    }
  });
});
