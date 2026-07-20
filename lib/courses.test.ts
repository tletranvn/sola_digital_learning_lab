import { describe, expect, it } from "vitest";
import { courses, getCourse } from "./courses";

describe("course catalogue", () => {
  it("resolves a known course by its stable slug", () => {
    expect(getCourse("control")).toEqual(courses[0]);
  });

  it("returns undefined for an unknown course", () => {
    expect(getCourse("unknown")).toBeUndefined();
  });
});
