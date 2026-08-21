import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy code"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded px-2 py-1 text-[11px] text-fg-3 transition-colors hover:text-fg",
        className,
      )}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-ember" /> : <Copy className="h-3.5 w-3.5" />}
      <span className="font-mono uppercase tracking-[0.14em]">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

function TerminalBlock() {
  return (
    <div className="overflow-hidden rounded-lg border border-edge bg-void">
      <div className="flex items-center justify-between border-b hairline px-4 py-2">
        <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-fg-3 uppercase">
          <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
          hive / dev / terminal
        </span>
        <CopyButton text={`$ hive models\n\nMODEL        STATUS\nhive         development\nhive-pro     development\nhive-max     research`} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
        <code>
          <span className="text-fg-3"># Hive Developer Platform</span>
          {"\n"}
          <span className="text-fg-3"># Early development preview</span>
          {"\n\n"}
          <span className="text-ember">$ hive models</span>
          {"\n\n"}
          <span className="text-fg-2">MODEL        STATUS</span>
          {"\n"}
          <span className="text-fg">hive         </span>
          <span className="text-fg-3">development</span>
          {"\n"}
          <span className="text-fg">hive-pro     </span>
          <span className="text-fg-3">development</span>
          {"\n"}
          <span className="text-fg">hive-max     </span>
          <span className="text-ember">research</span>
        </code>
      </pre>
    </div>
  );
}

function ApiBlock() {
  return (
    <div className="overflow-hidden rounded-lg border border-edge bg-void">
      <div className="flex items-center justify-between border-b hairline px-4 py-2">
        <span className="font-mono text-[11px] tracking-[0.16em] text-fg-3 uppercase">
          hive / api / concept
        </span>
        <CopyButton
          text={`// Future Hive API concept\n\nconst hive = new Hive({\n  model: "hive"\n});\n\nconst response = await hive.generate({\n  prompt: "Build something that didn't exist yesterday."\n});`}
        />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
        <code>
          <span className="text-fg-3">{"// Future Hive API concept\n\n"}</span>
          <span className="text-sky-300">const</span>
          <span className="text-fg"> hive = </span>
          <span className="text-sky-300">new</span>
          <span className="text-fg"> </span>
          <span className="text-emerald-300">Hive</span>
          <span className="text-fg">{"({\n  model: "}</span>
          <span className="text-amber-200">{'"hive"'}</span>
          <span className="text-fg">{"\n});\n\n"}</span>
          <span className="text-sky-300">const</span>
          <span className="text-fg"> response = </span>
          <span className="text-sky-300">await</span>
          <span className="text-fg"> hive</span>
          <span className="text-fg-3">{'.generate({\n  prompt: '}</span>
          <span className="text-amber-200">{'"Build something that didn\'t exist yesterday."'}</span>
          <span className="text-fg-3">{"\n});"}</span>
        </code>
      </pre>
    </div>
  );
}

export function DevelopersSection() {
  return (
    <section className="border-t hairline py-24 md:py-32">
      <Container>
        <Reveal>
          <span className="eyebrow">06 / DEVELOPERS</span>
          <h2 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-fg">
            Built for builders.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <TerminalBlock />
          </Reveal>
          <Reveal delay={0.12}>
            <ApiBlock />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-fg-3 uppercase">
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ember" />
            Conceptual API — subject to change
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/company#waitlist" size="lg">
              Join Developer Waitlist →
            </ButtonLink>
            <ButtonLink to="/developers" variant="secondary" size="lg">
              Developer Docs <span className="text-fg-3">(soon)</span>
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
