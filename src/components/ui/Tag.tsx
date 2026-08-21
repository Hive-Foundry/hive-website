import { cn } from "@/lib/cn";

/** Small monospace tag / chip, used for technical metadata. */
export function Tag({ children, className, active }: { children: React.ReactNode; className?: string; active?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border border-edge px-2 py-0.5",
        "font-mono text-[10px] uppercase tracking-[0.14em]",
        active ? "border-ember/40 text-ember" : "text-fg-3",
        className,
      )}
    >
      {children}
    </span>
  );
}
