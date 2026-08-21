import { ROADMAP_PHASES } from "@/data/roadmap";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const STATUS_STYLE = {
  ACTIVE: "text-ember border-ember/40",
  PLANNED: "text-fg-2 border-edge-2",
  RESEARCH: "text-fg-3 border-dashed border-fg-3/40",
} as const;

export function RoadmapSection() {
  return (
    <section className="border-t hairline bg-surface py-24 md:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <span className="eyebrow">07 / ROADMAP</span>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-fg">
              A sequence, running forward.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-fg-2">
              From open research to running models. Each stage is released when it&apos;s ready — not
              before.
            </p>
          </Reveal>

          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <ol className="relative ml-3 border-l hairline pl-8">
                {ROADMAP_PHASES.map((phase, i) => (
                  <li key={phase.name} className="relative pb-8 last:pb-0">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -left-[35px] top-0 flex h-2.5 w-2.5 items-center justify-center rounded-full",
                        phase.status === "ACTIVE" ? "bg-ember" : "border border-fg-3 bg-void",
                      )}
                    />
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[10px] text-fg-3">PHASE 0{i + 1}</span>
                      <span
                        className={cn(
                          "rounded-sm border px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase",
                          STATUS_STYLE[phase.status],
                        )}
                      >
                        {phase.status}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold text-fg">{phase.name}</h3>
                    <p className="mt-1 text-sm text-fg-2">{phase.description}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
