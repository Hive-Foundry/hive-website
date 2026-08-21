import { Link } from "react-router-dom";

import { TAGLINE } from "@/lib/meta";
import { Container } from "@/components/ui/SectionHeading";

const FOOTER_COLS: { title: string; links: { label: string; to?: string; external?: boolean }[] }[] = [
  {
    title: "Work",
    links: [
      { label: "Models", to: "/models" },
      { label: "Research", to: "/research" },
      { label: "Developers", to: "/developers" },
      { label: "Updates", to: "/updates" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/company" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/company" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", external: true },
      { label: "X", external: true },
      { label: "Discord", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t hairline bg-surface">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              to="/"
              className="relative block h-[60px] w-[180px] overflow-hidden"
              aria-label="Hive Foundry home"
            >
              <img
                src="/hive-foundry-horizontal.png"
                alt="Hive Foundry"
                width={1774}
                height={887}
                className="absolute left-1/2 top-1/2 w-[280px] max-w-none -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
              />
            </Link>
            <p className="mt-4 font-mono text-sm text-fg-3">{TAGLINE}</p>
            <p className="mt-8 font-mono text-[10px] tracking-[0.2em] text-fg-3/60 uppercase">
              HIVE://FOUNDRY
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[10px] tracking-[0.18em] text-fg-3 uppercase">
                  {col.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) =>
                    link.external ? (
                      <li key={link.label}>
                        <span
                          className="inline-flex items-center gap-1.5 text-sm text-fg-2/60"
                          aria-disabled="true"
                          title="Coming soon"
                        >
                          {link.label}
                          <span className="font-mono text-[9px] uppercase text-fg-3">soon</span>
                        </span>
                      </li>
                    ) : (
                      <li key={link.label}>
                        <Link
                          to={link.to!}
                          className="text-sm text-fg-2 transition-colors hover:text-fg"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-fg-3">© 2026 Hive Foundry</p>
          <p className="text-sm text-fg-3">Building open intelligence.</p>
        </div>
      </Container>
    </footer>
  );
}
