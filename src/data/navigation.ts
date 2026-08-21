export type NavItem = {
  label: string;
  to: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Research", to: "/research" },
  { label: "Models", to: "/models" },
  { label: "Developers", to: "/developers" },
  { label: "Company", to: "/company" },
];

export type StatusItem = {
  label: string;
  value?: string;
  state?: "active" | "planned" | "dev";
};

export const STATUS_ITEMS: StatusItem[] = [
  { label: "HF SYSTEMS" },
  { label: "MODEL RESEARCH", value: "ACTIVE", state: "active" },
  { label: "OPEN WEIGHTS", value: "PLANNED", state: "planned" },
  { label: "DEVELOPER PLATFORM", value: "IN DEVELOPMENT", state: "dev" },
  { label: "2026" },
];

export type FooterColumn = {
  title: string;
  links: { label: string; to?: string; external?: true }[];
};

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Work",
    links: [
      { label: "Models", to: "/models" },
      { label: "Research", to: "/research" },
      { label: "Developers", to: "/developers" },
      { label: "Updates", to: "/updates" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/company" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/company" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", external: true },
      { label: "X", external: true },
      { label: "Discord", external: true },
    ],
  },
];
