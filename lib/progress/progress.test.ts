import { describe, expect, it } from "vitest";
import { courseDefinitions } from "@/lib/content/courses";
import { calculateStatus, createInitialProgress, normalizeProgress } from "./progress";

const course = courseDefinitions[0];

describe("course progress", () => {
  it("starts at the first section without completion", () => {
    const progress = createInitialProgress(course);

    expect(progress.status).toBe("not-started");
    expect(progress.currentSectionId).toBe(course.sections[0].id);
  });

  it("marks a course complete only when every required section is complete", () => {
    expect(calculateStatus([course.sections[0].id], course)).toBe("in-progress");
    expect(calculateStatus(course.completion.requiredSectionIds, course)).toBe("completed");
  });

  it("migrates valid progress when the content version changes", () => {
    const stored = {
      ...createInitialProgress(course),
      courseVersion: "0.0.1",
      currentSectionId: "removed-section",
      completedSectionIds: ["introduction", "removed-section"],
      drafts: { reflection: "A local draft", "removed-section": "Remove me" },
    };
    const migrated = normalizeProgress(stored, course);

    expect(migrated.courseVersion).toBe(course.version);
    expect(migrated.migratedFromVersion).toBe("0.0.1");
    expect(migrated.currentSectionId).toBe(course.sections[0].id);
    expect(migrated.completedSectionIds).toEqual(["introduction"]);
    expect(migrated.drafts).toEqual({ reflection: "A local draft" });
  });

  it("recovers from invalid stored data", () => {
    expect(normalizeProgress({ invalid: true }, course)).toEqual(
      expect.objectContaining({ status: "not-started", courseId: course.id }),
    );
  });
});
