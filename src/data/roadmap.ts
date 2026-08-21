export type RoadmapPhase = {
  name: string;
  status: "ACTIVE" | "PLANNED" | "RESEARCH";
  description: string;
};

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    name: "Research",
    status: "ACTIVE",
    description: "Model architectures, evaluation, training systems, infrastructure.",
  },
  {
    name: "Hive",
    status: "PLANNED",
    description: "First model in the Hive family.",
  },
  {
    name: "Hive Pro",
    status: "PLANNED",
    description: "Advanced model tier.",
  },
  {
    name: "Hive Max",
    status: "RESEARCH",
    description: "Frontier-scale model research.",
  },
  {
    name: "Developer Ecosystem",
    status: "PLANNED",
    description: "Tools, libraries, deployment systems, and integrations surrounding Hive.",
  },
];
