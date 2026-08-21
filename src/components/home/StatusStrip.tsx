import { STATUS_ITEMS } from "@/data/navigation";
import { StatusDot } from "@/components/ui/StatusDot";
import { ScrambleText } from "@/components/motion/ScrambleText";

/**
 * Thin technical status strip. Items separated by subtle dividers,
 * indicators pulse quietly.
 */
export function StatusStrip() {
  return (
    <section aria-label="System status" className="border-y hairline bg-surface/60">
      <div className="container-hf flex flex-wrap items-center gap-x-6 gap-y-2 py-3">
        {STATUS_ITEMS.map((item, i) => (
          <div key={i} className="flex items-center gap-6">
            {i > 0 && (
              <span aria-hidden="true" className="hidden h-3 w-px bg-edge-2 sm:block" />
            )}
            {item.value ? (
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-fg-3 uppercase">
                <ScrambleText text={item.label} />
                <span className="text-fg-2">{item.value}</span>
                <StatusDot state={item.state ?? "dev"} />
              </div>
            ) : (
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-fg-3 uppercase">
                <ScrambleText text={item.label} />
                <StatusDot state="dev" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
