import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.STATIC_EXPORT === "1" ? "export" : undefined,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  typedRoutes: true,
};

const withMDX = createMDX();

export default withMDX(nextConfig);
