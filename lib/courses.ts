export const courses = [
  {
    slug: "control",
    number: "01",
    title: "What Is Within My Control?",
    description:
      "Explore control, influence, and uncertainty through an interactive philosophical portico.",
    format: "3D classification",
    duration: "20–25 min",
    status: "In design",
  },
  {
    slug: "freedom-providence",
    number: "02",
    title: "Freedom and Providence",
    description:
      "Map the relationships between freedom, responsibility, grace, trust, and passivity.",
    format: "Interactive diagram",
    duration: "15–20 min",
    status: "Planned",
  },
  {
    slug: "meaning-adversity",
    number: "03",
    title: "Meaning in Adversity",
    description: "Compare three interpretive frameworks through an animated, branching situation.",
    format: "Branching narrative",
    duration: "20–25 min",
    status: "Planned",
  },
] as const;

export type Course = (typeof courses)[number];

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}
