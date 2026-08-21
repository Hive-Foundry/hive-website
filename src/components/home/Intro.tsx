import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/SectionHeading";

export function Intro() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <span className="eyebrow">01 / HIVE FOUNDRY</span>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(1.85rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-fg">
                We&apos;re building deeper than the interface.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-2 sm:text-lg">
                The next generation of AI will require more than better applications. It will require
                better models, better infrastructure, and better ways for humans and machines to work
                together.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
