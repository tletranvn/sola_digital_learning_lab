import type { CourseDefinition } from "@/lib/content/course-schema";

export const rawCourseDefinitions = [
  {
    id: "control",
    version: "0.1.0",
    slug: "control",
    number: "01",
    title: "What Is Within My Control?",
    description:
      "Explore control, influence, and uncertainty through an interactive philosophical portico.",
    estimatedMinutes: 25,
    format: "3D classification",
    status: "In design",
    objectives: [
      "Explain the distinction between control, influence, and non-control.",
      "Classify the dimensions of a contemporary situation.",
      "Identify one realistic next action within personal agency.",
    ],
    sections: [
      {
        id: "introduction",
        type: "reading",
        title: "A practical distinction",
        required: true,
        contentKey: "control-introduction",
      },
      {
        id: "timeline",
        type: "timeline",
        title: "From the Stoa to Epictetus",
        required: true,
        items: [
          {
            id: "zeno",
            title: "Zeno of Citium",
            body: "The school takes its name from the painted porch—the stoa—where Zeno taught.",
          },
          {
            id: "epictetus",
            title: "Epictetus",
            body: "Freedom becomes a practice of distinguishing our response from an uncertain result.",
          },
        ],
      },
      {
        id: "portico",
        type: "three-scene",
        title: "The Portico of Control",
        required: true,
        sceneId: "control-portico",
        fallbackItems: ["Attention", "Preparation", "Reputation", "Judgment", "Decision", "Health"],
      },
      {
        id: "reflection",
        type: "reflection",
        title: "Apply the distinction",
        required: true,
        prompt:
          "Choose one situation. What can you control, what can you influence, and what remains outside your control?",
        allowSkip: true,
      },
      {
        id: "check",
        type: "knowledge-check",
        title: "Check the distinction",
        required: true,
        prompt: "Can influence guarantee an outcome?",
      },
      {
        id: "synthesis",
        type: "synthesis",
        title: "What to carry forward",
        required: true,
        takeaways: [
          "Action and guaranteed outcomes are not the same thing.",
          "Influence is real even when control is incomplete.",
        ],
      },
    ],
    references: [
      {
        id: "epictetus-enchiridion",
        title: "Enchiridion",
        author: "Epictetus",
      },
    ],
    completion: {
      mode: "all-required",
      requiredSectionIds: [
        "introduction",
        "timeline",
        "portico",
        "reflection",
        "check",
        "synthesis",
      ],
    },
  },
  {
    id: "freedom-providence",
    version: "0.1.0",
    slug: "freedom-providence",
    number: "02",
    title: "Freedom and Providence",
    description:
      "Map the relationships between freedom, responsibility, grace, trust, and passivity.",
    estimatedMinutes: 20,
    format: "Interactive diagram",
    status: "Planned",
    objectives: [
      "Identify tensions between providence and freedom.",
      "Construct a provisional position.",
    ],
    sections: [
      {
        id: "concept-map",
        type: "diagram",
        title: "A field of relationships",
        required: true,
        nodes: ["Providence", "Freedom", "Grace", "Responsibility", "Trust", "Passivity"],
      },
      {
        id: "synthesis",
        type: "synthesis",
        title: "A provisional position",
        required: true,
        takeaways: ["A tension can be articulated without being prematurely resolved."],
      },
    ],
    references: [],
    completion: {
      mode: "all-required",
      requiredSectionIds: ["concept-map", "synthesis"],
    },
  },
  {
    id: "meaning-adversity",
    version: "0.1.0",
    slug: "meaning-adversity",
    number: "03",
    title: "Meaning in Adversity",
    description: "Compare three interpretive frameworks through an animated, branching situation.",
    estimatedMinutes: 25,
    format: "Branching narrative",
    status: "Planned",
    objectives: [
      "Compare discipline, trust, and meaning-making.",
      "Recognize one contribution and one limitation of each framework.",
    ],
    sections: [
      {
        id: "scenario",
        type: "branching",
        title: "A project interrupted",
        required: true,
        scenarioId: "project-cancelled",
        startNodeId: "start",
      },
      {
        id: "synthesis",
        type: "synthesis",
        title: "Compare the frameworks",
        required: true,
        takeaways: ["No framework should turn suffering into an individual failure."],
      },
    ],
    references: [],
    completion: {
      mode: "all-required",
      requiredSectionIds: ["scenario", "synthesis"],
    },
  },
] satisfies CourseDefinition[];
