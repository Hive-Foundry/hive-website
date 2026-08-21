import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Consistent section header: eyebrow stacked vertically above the heading.
 * (Hallmark: never the hanging left-margin label pattern.)
 */
export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
}: {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <span className="eyebrow flex items-center gap-2">
        <span aria-hidden="true" className="h-px w-6 bg-fg-3/60" />
        {label}
      </span>
      <h2 className="font-display text-[clamp(1.85rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-fg">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-fg-2 sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container-hf", className)}>{children}</div>;
}
