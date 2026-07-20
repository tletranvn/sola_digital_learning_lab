import type { CourseProgress } from "./progress";

export interface ProgressAdapter {
  initialize(): Promise<CourseProgress>;
  load(): Promise<CourseProgress>;
  save(progress: CourseProgress): Promise<void>;
  setScore(score: number): Promise<void>;
  complete(): Promise<void>;
  reset(): Promise<CourseProgress>;
  terminate(): Promise<void>;
}
