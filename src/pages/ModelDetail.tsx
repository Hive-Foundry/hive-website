import { useParams, useNavigate } from "react-router-dom";

import { MODELS, SPEC_FIELDS } from "@/data/models";
import { Emblem } from "@/components/ui/Emblem";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/SectionHeading";
import { PageFooterCta } from "@/pages/PageShell";
import { StatusDot } from "@/components/ui/StatusDot";
import { ButtonLink } from "@/components/ui/Button";
import { usePageMeta } from "@/lib/usePageMeta";

export function ModelDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const model = MODELS.find((m) => m.slug === slug);

  usePageMeta(model?.name, model?.description);

  if (!model) {
    return (
      <div className="pt-16">
        <Container className="py-20">
          <p className="font-mono text-sm text-fg-3">HF://404 — model not found</p>
          <div className="mt-6">
            <ButtonLink to="/models" variant="secondary">
              ← Back to models
            </ButtonLink>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <Container className="py-20 md:py-28">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-10">
            <button onClick={() => navigate("/models")} className="text-sm text-fg-3 transition-colors hover:text-fg">
              Models
            </button>
            <span className="mx-2 text-fg-3">/</span>
            <span className="text-sm text-fg-2">{model.name}</span>
          </nav>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="flex items-center gap-4">
              <Emblem size={56} complexity={model.tier as 1 | 2 | 3} accent={model.tier === 3} />
              <div>
                <span className="font-mono text-[10px] tracking-[0.16em] text-fg-3 uppercase">
                  {model.label}
                </span>
                <h1 className="font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
                  {model.name}
                </h1>
              </div>
            </div>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-2 sm:text-lg">
              {model.description}
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {model.characteristics.map((c) => (
                <li
                  key={c}
                  className="rounded-sm border border-edge px-3 py-1 text-sm text-fg-2"
                >
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5">
            <div className="rounded-lg border border-edge bg-surface p-6">
              <div className="flex items-center justify-between border-b hairline pb-4">
                <span className="font-mono text-[10px] tracking-[0.18em] text-fg-3 uppercase">
                  Technical specification
                </span>
                <StatusDot state={model.status === "RESEARCH" ? "planned" : "dev"} label={model.status} />
              </div>
              <dl className="mt-1">
                {SPEC_FIELDS.map((field) => (
                  <div
                    key={field.label}
                    className="flex items-center justify-between border-b hairline py-3 last:border-b-0"
                  >
                    <dt className="text-sm text-fg-2">{field.label}</dt>
                    <dd className="font-mono text-[11px] tracking-[0.1em] text-fg-3 uppercase">
                      {field.label === "Benchmarks"
                        ? "Research in progress"
                        : "To be announced"}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <PageFooterCta text="Get early access →" />
        </Reveal>
      </Container>
    </div>
  );
}
