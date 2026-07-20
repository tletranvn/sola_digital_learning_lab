import { describe, expect, it } from "vitest";
import { courseDefinitions } from "@/lib/content/courses";
import { clearAllLocalProgress, LocalProgressAdapter } from "./local-progress-adapter";
import { createInitialProgress } from "./progress";

function createStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
    key: (index: number) => [...values.keys()][index] ?? null,
    get length() {
      return values.size;
    },
    values,
  };
}

const course = courseDefinitions[0];

describe("LocalProgressAdapter", () => {
  it("persists, reloads, and resets course progress", async () => {
    const storage = createStorage();
    const adapter = new LocalProgressAdapter(course, storage);
    const progress = {
      ...createInitialProgress(course),
      status: "in-progress" as const,
      completedSectionIds: ["introduction"],
    };

    await adapter.save(progress);
    expect((await adapter.load()).completedSectionIds).toEqual(["introduction"]);

    const reset = await adapter.reset();
    expect(reset.status).toBe("not-started");
    expect(storage.values.size).toBe(0);
  });

  it("falls back safely when browser storage throws", async () => {
    const brokenStorage = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
      removeItem: () => {
        throw new Error("blocked");
      },
    };
    const adapter = new LocalProgressAdapter(course, brokenStorage);

    await expect(adapter.initialize()).resolves.toEqual(
      expect.objectContaining({ courseId: course.id, status: "not-started" }),
    );
  });

  it("clears every Sola progress record without deleting unrelated storage", () => {
    const storage = createStorage();
    storage.setItem("sola:progress:course-one", "{}");
    storage.setItem("sola:progress:course-two", "{}");
    storage.setItem("unrelated", "keep");

    clearAllLocalProgress(storage);

    expect([...storage.values.keys()]).toEqual(["unrelated"]);
  });
});
