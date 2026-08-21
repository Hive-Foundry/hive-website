export type LogEntry = {
  id: string;
  category: "RESEARCH" | "ENGINEERING" | "COMPANY";
  title: string;
  status: "UPCOMING";
};

/**
 * Research log entries. No dates or findings are invented — these are
 * content slots ready to be published.
 */
export const LOG_ENTRIES: LogEntry[] = [
  { id: "HF-LOG / 001", category: "RESEARCH", title: "Hive architecture research", status: "UPCOMING" },
  { id: "HF-LOG / 002", category: "ENGINEERING", title: "Building the model infrastructure", status: "UPCOMING" },
  { id: "HF-LOG / 003", category: "COMPANY", title: "Introducing Hive Foundry", status: "UPCOMING" },
];
