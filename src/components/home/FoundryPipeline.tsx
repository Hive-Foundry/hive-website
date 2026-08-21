import { motion, useReducedMotion } from "framer-motion";

import { FOUNDRY_COPY, FOUNDRY_STEPS } from "@/data/foundry";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

/**
 * The Foundry pipeline — a pulse travels through the steps when the section
 * enters the viewport. Vertical on mobile, horizontal on desktop.
 */
export function FoundryPipeline() {
  const reduced = useReducedMotion();

  return (
    <section className="border-t hairline bg-surface py-24 md:py-32">
      <Container>
        <Reveal>
          <span className="eyebrow">05 / THE FOUNDRY</span>
          <h2 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-fg">
            Where models become systems.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          {/* Vertical mobile */}
          <ol className="mt-12 flex flex-col gap-0 md:hidden" aria-label="Model pipeline">
            {FOUNDRY_STEPS.map((step, i) => (
              <li key={step} className="flex flex-col">
                <div className="relative flex items-center gap-4 py-2">
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full border",
                        i === 0 ? "bg-ember border-ember" : "border-fg-3",
                      )}
                    />
                    {!reduced && (
                      <motion.span
                        className="absolute h-2 w-2 rounded-full bg-ember"
                        animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4] }}
                        transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
                      />
                    )}
                  </span>
                  <span className="font-mono text-sm tracking-[0.14em] text-fg">{step}</span>
                </div>
                {i < FOUNDRY_STEPS.length - 1 && (
                  <span aria-hidden="true" className="ml-[5px] h-8 w-px bg-edge-2" />
                )}
              </li>
            ))}
          </ol>

          {/* Horizontal desktop */}
          <ol className="mt-16 hidden items-center md:flex" aria-label="Model pipeline">
            {FOUNDRY_STEPS.map((step, i) => (
              <li key={step} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-3">
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full border",
                        i === 0 ? "bg-ember border-ember" : "border-fg-3",
                      )}
                    />
                    {!reduced && (
                      <motion.span
                        className="absolute h-2 w-2 rounded-full bg-ember"
                        animate={{ opacity: [0, 1, 0], scale: [0.3, 1, 0.3] }}
                        transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
                      />
                    )}
                  </span>
                  <span className="font-mono text-xs tracking-[0.16em] text-fg">{step}</span>
                </div>
                {i < FOUNDRY_STEPS.length - 1 && (
                  <span aria-hidden="true" className="relative mx-3 h-px flex-1 overflow-hidden bg-edge-2">
                    {!reduced && (
                      <motion.span
                        className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-ember/70 to-transparent"
                        animate={{ x: ["-100%", "300%"] }}
                        transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.35, ease: "linear" }}
                      />
                    )}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-12 max-w-2xl text-base leading-relaxed text-fg-2 sm:text-lg">
            {FOUNDRY_COPY}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
