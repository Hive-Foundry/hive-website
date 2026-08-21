import { cn } from "@/lib/cn";

type StatusDotProps = {
  state?: "active" | "planned" | "dev";
  className?: string;
  label?: string;
};

/**
 * Small pulsing status indicator. Ember = active, hollow = planned,
 * dim = in-development.
 */
export function StatusDot({ state = "dev", className, label }: StatusDotProps) {
  const visual = {
    active: "bg-ember",
    planned: "border border-fg-3 bg-transparent",
    dev: "bg-fg-3",
  }[state];

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full animate-pulse-dot",
          visual,
        )}
      />
      {label && (
        <span className="font-mono text-[10px] tracking-[0.16em] text-fg-2 uppercase">{label}</span>
      )}
    </span>
  );
}
