import { Link } from "react-router-dom";

import { MODELS } from "@/data/models";
import { Emblem } from "@/components/ui/Emblem";
import { Reveal } from "@/components/motion/Reveal";
import { PageShell } from "@/pages/PageShell";
import { StatusDot } from "@/components/ui/StatusDot";

export function ModelsPage() {
  return (
    <PageShell
      label="02 / MODELS"
      metaTitle="Models"
      title="The Hive model family."
      description="A family of open-weight models being designed for different levels of intelligence, efficiency, and computational scale. All models are in development."
    >
      <Reveal delay={0.1}>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {MODELS.map((m) => (
            <Link
              key={m.slug}
              to={`/models/${m.slug}`}
              className="group rounded-lg border border-edge bg-surface p-6 transition-colors hover:border-edge-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.16em] text-fg-3 uppercase">
                  {m.label}
                </span>
                <StatusDot state={m.status === "RESEARCH" ? "planned" : "dev"} label={m.status} />
              </div>
              <div className="mt-5 flex items-center gap-3">
                <Emblem size={34} complexity={m.tier as 1 | 2 | 3} accent={m.tier === 3} />
                <span className="font-display text-2xl font-semibold text-fg">{m.name}</span>
              </div>
              <p className="mt-4 text-sm text-fg-2">{m.description}</p>
            </Link>
          ))}
        </div>
      </Reveal>
    </PageShell>
  );
}
