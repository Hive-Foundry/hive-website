export type ModelSpec = {
  slug: string;
  name: string;
  label: string;
  status: string;
  tier: number; // 1..3 visual emphasis only — not a benchmark
  headline: string;
  description: string;
  characteristics: string[];
};

export const MODELS: ModelSpec[] = [
  {
    slug: "hive",
    name: "Hive",
    label: "FOUNDATION",
    status: "IN DEVELOPMENT",
    tier: 1,
    headline: "Hive",
    description:
      "The foundation of the Hive model family. Designed around accessible, capable open-weight intelligence for developers, researchers, and builders.",
    characteristics: [
      "Open weights",
      "Developer focused",
      "Efficient deployment",
      "Research friendly",
    ],
  },
  {
    slug: "hive-pro",
    name: "Hive Pro",
    label: "ADVANCED",
    status: "IN DEVELOPMENT",
    tier: 2,
    headline: "Hive Pro",
    description:
      "A higher-capability member of the Hive family designed for demanding reasoning, coding, agentic workflows, and professional applications.",
    characteristics: [
      "Advanced reasoning",
      "Coding",
      "Tool use",
      "Agent workflows",
    ],
  },
  {
    slug: "hive-max",
    name: "Hive Max",
    label: "FRONTIER",
    status: "RESEARCH",
    tier: 3,
    headline: "Hive Max",
    description:
      "Our most ambitious model program, exploring the upper end of the Hive architecture and the capabilities of large-scale open intelligence.",
    characteristics: [
      "Frontier research",
      "Maximum capability",
      "Complex reasoning",
      "Large-scale intelligence",
    ],
  },
];

export const MODEL_FAMILY = {
  id: "MODEL FAMILY 01",
  caption: "A family of open-weight models being designed for different levels of intelligence, efficiency, and computational scale.",
};

/** Spec fields that are not yet public — rendered as placeholders, never fabricated values. */
export const SPEC_FIELDS: { label: string }[] = [
  { label: "Architecture" },
  { label: "Parameters" },
  { label: "Context window" },
  { label: "Modalities" },
  { label: "Max tokens" },
  { label: "Training data" },
  { label: "Benchmarks" },
  { label: "Availability" },
];
