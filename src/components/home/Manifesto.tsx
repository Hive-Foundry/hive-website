import { motion, useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/SectionHeading";

const LINE =
  "We believe the future of AI should be powerful enough to matter and open enough to build on.";

function WordReveal({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <>{text}</>;

  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0.15, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.4, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </>
  );
}

export function Manifesto() {
  return (
    <section className="border-t hairline py-28 md:py-40">
      <Container>
        <Reveal>
          <span className="eyebrow">THE CONVICTION</span>
          <h2 className="mt-8 max-w-5xl font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-fg">
            <WordReveal text={LINE} />
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 flex items-center gap-3 text-lg text-fg-2 sm:text-xl">
            <span className="text-fg">Hive Foundry exists to build that future.</span>
            <span aria-hidden="true" className="font-mono text-[10px] tracking-[0.16em] text-fg-3 uppercase">
              EST. 2026
            </span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
