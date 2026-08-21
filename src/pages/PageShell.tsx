import { Link } from "react-router-dom";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { usePageMeta } from "@/lib/usePageMeta";

type PageShellProps = {
  label: string;
  title: string;
  description?: string;
  metaTitle: string;
  children: React.ReactNode;
};

/**
 * Consistent header + spacing for secondary pages, with a "home" crumb.
 */
export function PageShell({ label, title, description, metaTitle, children }: PageShellProps) {
  usePageMeta(metaTitle, description);

  return (
    <div className="pt-16">
      <Container className="py-20 md:py-28">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-10">
            <Link to="/" className="text-sm text-fg-3 transition-colors hover:text-fg">
              Home
            </Link>
            <span className="mx-2 text-fg-3">/</span>
            <span className="text-sm text-fg-2">{label}</span>
          </nav>
        </Reveal>
        <Reveal>
          <span className="eyebrow">{label}</span>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-fg">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-2 sm:text-lg">
              {description}
            </p>
          )}
        </Reveal>
        {children}
      </Container>
    </div>
  );
}

export function PageFooterCta({ text = "Join the Network →" }: { text?: string }) {
  return (
    <div className="mt-16">
      <ArrowLink to="/company#waitlist">{text}</ArrowLink>
    </div>
  );
}
