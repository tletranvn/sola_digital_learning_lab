import type { CourseDefinition } from "@/lib/content/course-schema";
import type { ProgressAdapter } from "./progress-adapter";
import { createInitialProgress, normalizeProgress, type CourseProgress } from "./progress";

const STORAGE_PREFIX = "sola:progress:";

type StorageSubset = Pick<Storage, "getItem" | "setItem" | "removeItem">;
type EnumerableStorageSubset = Pick<Storage, "key" | "length" | "removeItem">;

export class LocalProgressAdapter implements ProgressAdapter {
  private memoryValue: CourseProgress;
  private readonly storageKey: string;

  constructor(
    private readonly course: CourseDefinition,
    private readonly storage?: StorageSubset,
  ) {
    this.storageKey = `${STORAGE_PREFIX}${course.id}`;
    this.memoryValue = createInitialProgress(course);
  }

  private getStorage() {
    if (this.storage) {
      return this.storage;
    }

    if (typeof window === "undefined") {
      return undefined;
    }

    try {
      return window.localStorage;
    } catch {
      return undefined;
    }
  }

  async initialize() {
    return this.load();
  }

  async load() {
    const storage = this.getStorage();

    if (!storage) {
      return this.memoryValue;
    }

    try {
      const rawValue = storage.getItem(this.storageKey);
      if (!rawValue) {
        return this.memoryValue;
      }

      this.memoryValue = normalizeProgress(JSON.parse(rawValue), this.course);
      return this.memoryValue;
    } catch {
      this.memoryValue = createInitialProgress(this.course);
      return this.memoryValue;
    }
  }

  async save(progress: CourseProgress) {
    this.memoryValue = normalizeProgress(progress, this.course);

    try {
      this.getStorage()?.setItem(this.storageKey, JSON.stringify(this.memoryValue));
    } catch {
      // Memory remains the fallback when browser storage is unavailable.
    }
  }

  async setScore(score: number) {
    void score;
    // Local MVP progress does not persist a grade.
  }

  async complete() {
    await this.save({
      ...this.memoryValue,
      completedSectionIds: [...this.course.completion.requiredSectionIds],
      status: "completed",
      updatedAt: new Date().toISOString(),
    });
  }

  async reset() {
    this.memoryValue = createInitialProgress(this.course);

    try {
      this.getStorage()?.removeItem(this.storageKey);
    } catch {
      // The in-memory reset is still valid.
    }

    return this.memoryValue;
  }

  async terminate() {
    await this.save(this.memoryValue);
  }
}

export function clearAllLocalProgress(storage: EnumerableStorageSubset = window.localStorage) {
  const courseKeys = Array.from({ length: storage.length }, (_, index) =>
    storage.key(index),
  ).filter((key): key is string => Boolean(key?.startsWith(STORAGE_PREFIX)));

  courseKeys.forEach((key) => storage.removeItem(key));
}
