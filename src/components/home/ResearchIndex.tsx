import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";

import { RESEARCH_AREAS } from "@/data/research";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

function ResearchRow({ index, title, summary, focus, tags }: (typeof RESEARCH_AREAS)[number]) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const id = `research-${index}`;

  return (
    <div className="border-b hairline">
      <button
        type="button"
        className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-5 text-left sm:gap-8 sm:py-6"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-mono text-sm text-fg-3">{index}</span>
        <span className="flex flex-col gap-1">
          <span className="font-display text-lg font-semibold text-fg transition-colors group-hover:text-ember sm:text-xl">
            {title}
          </span>
          <span className="text-sm text-fg-2">{summary}</span>
        </span>
        <Plus
          aria-hidden="true"
          className={cn(
            "h-4 w-4 text-fg-3 transition-transform duration-300",
            open ? "rotate-45 text-ember" : "group-hover:text-fg",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0.15 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-[calc(2ch+1rem)] pr-2 sm:pl-[calc(2ch+2rem)]">
              <p className="max-w-xl text-sm leading-relaxed text-fg-2">{focus}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm border border-edge px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] text-fg-3 uppercase"
                  >
                    {t}
                  </span>
                ))}
                <span className="rounded-sm px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] text-ember/70 uppercase">
                  Research in progress
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ResearchIndex() {
  return (
    <section className="border-t hairline py-24 md:py-32">
      <Container>
        <Reveal>
          <span className="eyebrow">04 / RESEARCH</span>
          <h2 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-fg">
            Questions worth computing.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 border-t hairline">
            {RESEARCH_AREAS.map((r) => (
              <ResearchRow key={r.index} {...r} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
