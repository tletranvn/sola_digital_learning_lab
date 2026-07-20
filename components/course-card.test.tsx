import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CourseCard } from "./course-card";
import { courses } from "@/lib/courses";

describe("CourseCard", () => {
  it("links to the course and exposes its learning format", () => {
    render(<CourseCard course={courses[0]} />);

    expect(screen.getByRole("link", { name: courses[0].title })).toHaveAttribute(
      "href",
      "/courses/control",
    );
    expect(screen.getByText("3D classification")).toBeInTheDocument();
  });
});
