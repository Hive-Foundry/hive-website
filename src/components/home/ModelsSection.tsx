import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

import { MODELS } from "@/data/models";
import { Emblem } from "@/components/ui/Emblem";
import { Reveal } from "@/components/motion/Reveal";
import { Container, SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

/** Block "meter" — visual tier emphasis only, explicitly not a benchmark. */
function TierMeter({ tier, label }: { tier: number; label: string }) {
  const filled = [3, 5, 6][tier - 1];
  return (
    <div className="flex flex-col gap-1.5" aria-hidden="true">
      <div className="flex gap-1">
        {Array.from({ length: 6 }, (_, i) => (
          <span
            key={i}
            className={cn(
              "h-3 flex-1 rounded-[1px]",
              i < filled ? "bg-fg-2" : "bg-white/8",
            )}
          />
        ))}
      </div>
      <span className="font-mono text-[10px] tracking-[0.18em] text-fg-3 uppercase">
        {label}
      </span>
    </div>
  );
}

function ModelCard({ slug, tier }: { slug: string; tier: number }) {
  const model = MODELS.find((m) => m.slug === slug)!;
  const reduced = useReducedMotion();

  const cardStyle = {
    1: "border-edge bg-surface",
    2: "border-edge bg-surface",
    3: "border-edge-2 bg-raised",
  }[tier];

  return (
    <motion.div
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex flex-col rounded-lg border p-6 transition-colors duration-300 sm:p-7",
        cardStyle,
        "hover:border-edge-2",
      )}
    >
      {tier === 3 && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/40 to-transparent" />
      )}

      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.16em] text-fg-3 uppercase">
          {model.label}
        </span>
        <span
          className={cn(
            "font-mono text-[10px] tracking-[0.16em] uppercase",
            model.status === "RESEARCH" ? "text-ember" : "text-fg-2",
          )}
        >
          {model.status}
        </span>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Emblem size={tier === 3 ? 44 : tier === 2 ? 38 : 32} complexity={tier as 1 | 2 | 3} accent={tier === 3} />
        <h3 className="font-display text-3xl font-semibold tracking-tight text-fg">
          {model.name}
        </h3>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-fg-2">{model.description}</p>

      <ul className="mt-6 flex flex-col gap-2.5 border-t hairline pt-5">
        {model.characteristics.map((c) => (
          <li key={c} className="flex items-center gap-2.5 text-sm text-fg-2">
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-fg-3 group-hover:bg-ember transition-colors duration-300" />
            {c}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-5 pt-7">
        <TierMeter tier={tier} label={`Program depth / tier ${tier}`} />
        <Link
          to={`/models/${model.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-ember"
        >
          Model Details <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </motion.div>
  );
}

export function ModelsSection() {
  return (
    <section className="border-t hairline py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            label="02 / MODELS"
            title="Meet the Hive family."
            description="A family of open-weight models being designed for different levels of intelligence, efficiency, and computational scale."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {MODELS.map((m, i) => (
            <Reveal key={m.slug} delay={i * 0.08}>
              <ModelCard slug={m.slug} tier={m.tier} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 flex items-start gap-3 text-sm text-fg-3">
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-fg-3 mt-0.5">
              Note
            </span>
            <span>
              The tier meters above are a visual guide to each program&apos;s ambition — they are not
              benchmarks, and no performance claims are implied. Models are in development.
            </span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
