import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/SectionHeading";

const PRINCIPLES = [
  { name: "Inspect", desc: "Understand the systems you're building on." },
  { name: "Adapt", desc: "Shape models around specialized problems." },
  { name: "Deploy", desc: "Run intelligence where your applications require it." },
  { name: "Build", desc: "Create technology that isn't permanently dependent on a closed endpoint." },
];

export function OpenWeights() {
  return (
    <section className="border-t hairline bg-surface py-24 md:py-32">
      <Container>
        <Reveal>
          <span className="eyebrow">03 / OPEN</span>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(1.9rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-fg">
            Intelligence shouldn&apos;t live behind a black box.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-2 sm:text-lg">
            We believe powerful models become more useful when developers and researchers can understand
            them, experiment with them, deploy them, adapt them, and build on top of them.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.07}>
              <div className="flex h-full flex-col gap-3 bg-void p-6 transition-colors duration-300 hover:bg-surface sm:p-7">
                <span className="font-mono text-[10px] tracking-[0.2em] text-fg-3 uppercase">
                  0{i + 1}
                </span>
                <h3 className="font-display text-xl font-semibold text-fg">{p.name}</h3>
                <p className="text-sm leading-relaxed text-fg-2">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-10 max-w-2xl text-base text-fg sm:text-lg">
            <span className="text-ember">Open weights are part of the direction</span> we&apos;re building
            toward with the Hive model family.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
