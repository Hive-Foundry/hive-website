import { Container } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { usePageMeta } from "@/lib/usePageMeta";

export function NotFoundPage() {
  usePageMeta("404");
  return (
    <div className="flex min-h-screen items-center pt-16">
      <Container className="py-20">
        <p className="font-mono text-sm text-ember">HF://404</p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-fg sm:text-6xl">
          Nothing computes here.
        </h1>
        <p className="mt-4 text-fg-2">The page you&apos;re looking for doesn&apos;t exist.</p>
        <div className="mt-8">
          <ButtonLink to="/" variant="secondary">
            ← Back home
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
