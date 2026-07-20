import type { MDXComponents } from "mdx/types";
import { Callout, KeyIdea } from "@/components/course/mdx-components";

const allowedComponents = {
  Callout,
  KeyIdea,
} satisfies MDXComponents;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...allowedComponents,
    ...components,
  };
}
