import { LOG_ENTRIES } from "@/data/updates";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/SectionHeading";

const CATEGORY_COLOR = {
  RESEARCH: "text-ember",
  ENGINEERING: "text-sky-300",
  COMPANY: "text-fg-2",
} as const;

export function UpdatesSection() {
  return (
    <section className="border-t hairline bg-surface py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-2">
          <Reveal>
            <span className="eyebrow">08 / LOG</span>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-fg">
              From the Foundry
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-12 border-t hairline">
            {LOG_ENTRIES.map((entry) => (
              <div
                key={entry.id}
                className="group grid grid-cols-[auto_1fr] items-center gap-6 border-b hairline py-5 transition-colors sm:grid-cols-[auto_auto_1fr_auto] sm:gap-8"
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

        <Reveal delay={0.12}>
          <div className="mt-8">
            <ArrowLink to="/updates">View all updates →</ArrowLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
