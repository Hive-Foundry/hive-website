import { motion, useReducedMotion } from "framer-motion";

import { EmblemField } from "@/components/motion/EmblemField";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { Magnetic } from "@/components/motion/Magnetic";
import { ButtonLink } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();

  const item = (i: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: reduced ? 0 : 0.15 + i * 0.12, ease },
  });

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background computational field */}
      <div className="absolute inset-0 opacity-70">
        <EmblemField className="h-full w-full" />
      </div>
      {/* Vertical fade masks to keep text crisp over the field */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/60 via-transparent to-void" />

      <div className="container-hf relative z-10 pt-28 pb-20">
        <motion.div className="flex flex-col gap-8" {...item(0)}>
          <p className="eyebrow flex items-center gap-3">
            <ScrambleText text="HIVE FOUNDRY / ARTIFICIAL INTELLIGENCE" />
          </p>
        </motion.div>

        <motion.h1
          className="mt-8 font-display text-[clamp(2.9rem,9vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-fg"
          {...item(1)}
        >
          Intelligence,
          <br />
          <span className="text-ember">Forged Open.</span>
        </motion.h1>

        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-fg-2 sm:text-lg"
          {...item(2)}
        >
          <strong className="font-semibold text-fg">Hive Foundry</strong> is a research and technology
          company building advanced software, open-weight foundation models, intelligent systems, and
          developer infrastructure for the next generation of computing.
        </motion.p>

        <motion.div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" {...item(3)}>
          <Magnetic>
            <ButtonLink to="/models" size="lg" className="min-w-[200px]">
              Explore Our Work <span aria-hidden="true">→</span>
            </ButtonLink>
          </Magnetic>
          <ButtonLink to="/research" variant="secondary" size="lg" className="min-w-[200px]">
            Follow Development
          </ButtonLink>
        </motion.div>

        <motion.p
          className="mt-16 flex items-center gap-3 font-mono text-xs tracking-[0.16em] text-fg-3 uppercase"
          {...item(4)}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember animate-pulse-dot" aria-hidden="true" />
          Hive Models — In Development
        </motion.p>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent" />
    </section>
  );
}
