import type { MetadataRoute } from "next";
import { courses } from "@/lib/courses";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/courses", "/about", "/accessibility"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...courses.map((course) => ({
      url: `${baseUrl}/courses/${course.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
