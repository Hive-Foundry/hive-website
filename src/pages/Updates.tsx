import { LOG_ENTRIES } from "@/data/updates";
import { PageShell } from "@/pages/PageShell";
import { Reveal } from "@/components/motion/Reveal";

const CATEGORY_COLOR = {
  RESEARCH: "text-ember",
  ENGINEERING: "text-sky-300",
  COMPANY: "text-fg-2",
} as const;

export function UpdatesPage() {
  return (
    <PageShell
      label="08 / UPDATES"
      metaTitle="Updates"
      title="Research log."
      description="Notes from the Foundry — architecture, infrastructure, and company milestones as they land."
    >
      <Reveal delay={0.1}>
        <div className="mt-12 border-t hairline">
          {LOG_ENTRIES.map((entry) => (
            <div
              key={entry.id}
              className="grid grid-cols-[auto_1fr] items-center gap-4 border-b hairline py-5 sm:grid-cols-[auto_auto_1fr_auto] sm:gap-8"
            >
              <span className="font-mono text-xs text-fg-3">{entry.id}</span>
              <span
                className={`font-mono text-[10px] tracking-[0.16em] uppercase ${CATEGORY_COLOR[entry.category]}`}
              >
                {entry.category}
              </span>
              <span className="font-display text-lg font-semibold text-fg">{entry.title}</span>
              <span className="hidden text-right font-mono text-[10px] tracking-[0.16em] text-fg-3 uppercase sm:block">
                {entry.status}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-8 max-w-xl text-sm text-fg-3">
          Entries publish as milestones land. No speculative findings are posted — only real progress.
        </p>
      </Reveal>
    </PageShell>
  );
}
