import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Page-load boot sequence. Runs on every full load or refresh, is skipped
 * entirely under reduced motion, and clears quickly.
 */
export function BootSequence({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"boot" | "online" | "exit">("boot");

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }

    let interval = 0;
    let timeout = 0;

    interval = window.setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.ceil(Math.random() * 10) + 3);
        if (next >= 100) {
          window.clearInterval(interval);
          setPhase("online");
          timeout = window.setTimeout(() => {
            setPhase("exit");
            timeout = window.setTimeout(onDone, 350);
          }, 500);
        }
        return next;
      });
    }, 70);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
    // onDone is stable (from parent useCallback)
  }, [reduced, onDone]);

  const bars = Math.round((progress / 100) * 16);
  const line = "█".repeat(bars) + "░".repeat(16 - bars);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <div className="flex w-full max-w-xs flex-col gap-4 font-mono text-sm text-fg">
        <img
          src="/hive-foundry-emblem.png"
          alt=""
          width={1312}
          height={1199}
          className="mb-2 h-16 w-auto self-start"
        />
        <p className="tracking-[0.25em] uppercase text-fg">HIVE FOUNDRY</p>
        <p className="text-[11px] uppercase tracking-[0.2em] text-fg-3">Initializing Systems</p>
        <p className="text-fg-2" aria-hidden="true">
          {line}
        </p>
        <p className="text-[11px] text-fg-3">
          {phase === "online" ? (
            <span className="text-ember">HF://ONLINE</span>
          ) : (
            <span>{progress}%</span>
          )}
        </p>
      </div>
    </motion.div>
  );
}
