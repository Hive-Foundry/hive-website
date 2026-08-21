import { WaitlistCTA } from "@/components/home/WaitlistCTA";
import { PageShell } from "@/pages/PageShell";
import { Reveal } from "@/components/motion/Reveal";

export function CareersPage() {
  return (
    <PageShell
      label="CAREERS"
      metaTitle="Careers"
      title="Built by builders."
      description="Hive Foundry is early. We're not hiring to fill seats — we're looking for people who want to build the foundation itself."
    >
      <Reveal delay={0.1}>
        <div className="mt-12 max-w-xl rounded-lg border border-edge bg-surface p-6">
          <p className="font-mono text-[10px] tracking-[0.18em] text-fg-3 uppercase">
            Open roles
          </p>
          <p className="mt-3 text-base text-fg-2">
            No open roles yet. We&apos;re a small team building toward the first Hive models.
          </p>
          <p className="mt-3 text-sm text-fg-3">
            Research and engineering roles will be announced here and via the Hive Network.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <WaitlistCTA id="waitlist" />
      </Reveal>
    </PageShell>
  );
}
