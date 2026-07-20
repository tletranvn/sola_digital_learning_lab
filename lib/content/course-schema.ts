import { z } from "zod";

const sectionBaseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  required: z.boolean().default(true),
});

const readingSectionSchema = sectionBaseSchema.extend({
  type: z.literal("reading"),
  contentKey: z.string().min(1),
});

const timelineSectionSchema = sectionBaseSchema.extend({
  type: z.literal("timeline"),
  items: z
    .array(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        body: z.string().min(1),
      }),
    )
    .min(1),
});

const threeSceneSectionSchema = sectionBaseSchema.extend({
  type: z.literal("three-scene"),
  sceneId: z.string().min(1),
  fallbackItems: z.array(z.string().min(1)).min(1),
});

const diagramSectionSchema = sectionBaseSchema.extend({
  type: z.literal("diagram"),
  nodes: z.array(z.string().min(1)).min(2),
});

const branchingSectionSchema = sectionBaseSchema.extend({
  type: z.literal("branching"),
  scenarioId: z.string().min(1),
  startNodeId: z.string().min(1),
});

const reflectionSectionSchema = sectionBaseSchema.extend({
  type: z.literal("reflection"),
  prompt: z.string().min(1),
  allowSkip: z.boolean().default(true),
});

const knowledgeCheckSectionSchema = sectionBaseSchema.extend({
  type: z.literal("knowledge-check"),
  prompt: z.string().min(1),
});

const synthesisSectionSchema = sectionBaseSchema.extend({
  type: z.literal("synthesis"),
  takeaways: z.array(z.string().min(1)).min(1),
});

export const courseSectionSchema = z.discriminatedUnion("type", [
  readingSectionSchema,
  timelineSectionSchema,
  threeSceneSectionSchema,
  diagramSectionSchema,
  branchingSectionSchema,
  reflectionSectionSchema,
  knowledgeCheckSectionSchema,
  synthesisSectionSchema,
]);

export const completionRuleSchema = z.object({
  mode: z.literal("all-required"),
  requiredSectionIds: z.array(z.string().min(1)).min(1),
});

export const referenceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  author: z.string().min(1).optional(),
  url: z.url().optional(),
});

export const courseDefinitionSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/, "Use a stable lowercase course id"),
    version: z.string().regex(/^\d+\.\d+\.\d+$/, "Use a semantic content version"),
    slug: z.string().regex(/^[a-z0-9-]+$/, "Use a URL-safe slug"),
    number: z.string().regex(/^\d{2}$/),
    title: z.string().min(1),
    description: z.string().min(1),
    estimatedMinutes: z.number().int().positive(),
    format: z.string().min(1),
    status: z.enum(["In design", "Planned", "Published"]),
    objectives: z.array(z.string().min(1)).min(1),
    sections: z.array(courseSectionSchema).min(1),
    references: z.array(referenceSchema),
    completion: completionRuleSchema,
  })
  .superRefine((course, context) => {
    const sectionIds = course.sections.map(({ id }) => id);
    const duplicateIds = sectionIds.filter((id, index) => sectionIds.indexOf(id) !== index);

    if (duplicateIds.length > 0) {
      context.addIssue({
        code: "custom",
        path: ["sections"],
        message: `Duplicate section ids: ${[...new Set(duplicateIds)].join(", ")}`,
      });
    }

    const missingRequiredIds = course.completion.requiredSectionIds.filter(
      (id) => !sectionIds.includes(id),
    );

    if (missingRequiredIds.length > 0) {
      context.addIssue({
        code: "custom",
        path: ["completion", "requiredSectionIds"],
        message: `Unknown required section ids: ${missingRequiredIds.join(", ")}`,
      });
    }
  });

export type CourseDefinition = z.infer<typeof courseDefinitionSchema>;
export type CourseSection = z.infer<typeof courseSectionSchema>;
export type CompletionRule = z.infer<typeof completionRuleSchema>;
export type Reference = z.infer<typeof referenceSchema>;
