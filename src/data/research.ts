export type ResearchArea = {
  index: string;
  title: string;
  summary: string;
  focus: string;
  tags: string[];
};

export const RESEARCH_AREAS: ResearchArea[] = [
  {
    index: "01",
    title: "Efficient Intelligence",
    summary: "Building capable models that use compute more effectively.",
    focus:
      "Exploring architectures and training approaches that deliver capability without wasteful scale — smaller, faster, and cheaper to run.",
    tags: ["EFFICIENCY", "ARCHITECTURE"],
  },
  {
    index: "02",
    title: "Reasoning",
    summary: "Improving how models solve multi-step and unfamiliar problems.",
    focus:
      "Investigating planning, search, and self-correction so models can hold longer chains of thought and verify their own work.",
    tags: ["REASONING", "PLANNING"],
  },
  {
    index: "03",
    title: "Agentic Systems",
    summary: "Models capable of operating tools and software environments.",
    focus:
      "Research into tool use, long-horizon tasks, and safe action in real software environments.",
    tags: ["AGENTS", "TOOL USE"],
  },
  {
    index: "04",
    title: "Code Intelligence",
    summary: "Models that understand, generate, modify, and reason across software systems.",
    focus:
      "Improving how models read, refactor, and repair codebases — treating software systems, not snippets, as the unit of work.",
    tags: ["CODE", "SYSTEMS"],
  },
  {
    index: "05",
    title: "Model Architecture",
    summary: "Exploring new approaches to model architecture and training.",
    focus:
      "Foundational work on the Hive architecture — attention, memory, and training dynamics at scale.",
    tags: ["FOUNDATION", "TRAINING"],
  },
  {
    index: "06",
    title: "Inference",
    summary: "Making advanced models practical to run and deploy.",
    focus:
      "Optimizing serving, quantization, and deployment so capable models can run where applications actually need them.",
    tags: ["DEPLOYMENT", "SERVING"],
  },
];
