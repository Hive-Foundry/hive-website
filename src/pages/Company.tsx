import { Manifesto } from "@/components/home/Manifesto";

export function CompanyPage() {
  return (
    <>
      <CompaniesAbout />
      <Manifesto />
    </>
  );
}

function CompaniesAbout() {
  return (
    <div className="pt-16">
      <div className="container-hf py-20 md:py-28">
        <span className="eyebrow">09 / COMPANY</span>
        <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-fg">
          About Hive Foundry
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-2 sm:text-lg">
          Hive Foundry is a research and technology company building advanced software, open-weight
          foundation models, intelligent systems, and developer infrastructure for the next generation of
          computing. We are building from the foundation up — not wrapping third-party APIs.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "AI research",
            "Open-weight AI",
            "Model engineering",
            "Developer infrastructure",
            "Efficient inference",
            "AI agents",
          ].map((item) => (
            <div key={item} className="rounded-md border border-edge bg-surface px-5 py-4 text-sm text-fg-2">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
