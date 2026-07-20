import type { ComponentType } from "react";
import ControlIntroduction from "@/content/control/introduction.mdx";

export const sectionContentRegistry = {
  "control-introduction": ControlIntroduction,
} satisfies Record<string, ComponentType>;

export type SectionContentKey = keyof typeof sectionContentRegistry;

export function getSectionContent(key: string) {
  return sectionContentRegistry[key as SectionContentKey];
}
