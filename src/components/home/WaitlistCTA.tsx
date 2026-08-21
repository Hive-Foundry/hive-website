import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type FormState = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistCTA({ id }: { id?: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setState("error");
      return;
    }
    setState("loading");
    // Simulated submission — no backend is wired yet.
    await new Promise((r) => setTimeout(r, 900));
    setState("success");
  };

  return (
    <section id={id} className="border-t hairline py-24 md:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-xl border border-edge bg-raised px-6 py-14 sm:px-10 md:px-16 md:py-20">
          {/* subtle background emblem */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 opacity-[0.06]"
          >
            <svg width="320" height="320" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="11" stroke="white" strokeDasharray="1.5 2.5" />
              <polygon
                points="12,2 20.7,7 20.7,17 12,22 3.3,17 3.3,7"
                transform="translate(-0.7,0)"
                stroke="white"
              />
            </svg>
          </div>

          <Reveal className="relative">
            <span className="eyebrow">HIVE NETWORK</span>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-fg">
              The Foundry is warming up.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-2">
              Follow the development of Hive Foundry and get early access announcements for Hive models,
              developer tools, research releases, and future experiments.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="relative">
            <AnimatePresence mode="wait">
              {state === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 flex items-center gap-3 rounded-lg border border-ember/30 bg-ember-soft px-4 py-4"
                  role="status"
                >
                  <Check className="h-5 w-5 shrink-0 text-ember" aria-hidden="true" />
                  <p className="text-sm text-fg">
                    Subscription logged. We&apos;ll be in touch when Hive models enter preview.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={submit}
                  noValidate
                  className="mt-8"
                >
                  <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
                    <label htmlFor="waitlist-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="waitlist-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (state === "error") setState("idle");
                      }}
                      aria-invalid={state === "error"}
                      aria-describedby={state === "error" ? "waitlist-error" : undefined}
                      className={cn(
                        "h-12 flex-1 rounded-md border bg-void px-4 text-sm text-fg placeholder:text-fg-3",
                        "transition-colors focus:border-ember",
                        state === "error" ? "border-red-500/50" : "border-edge-2",
                      )}
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="min-w-[180px]"
                      disabled={state === "loading"}
                    >
                      {state === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          Joining…
                        </>
                      ) : (
                        "Join the Network →"
                      )}
                    </Button>
                  </div>
                  {state === "error" && (
                    <p
                      id="waitlist-error"
                      role="alert"
                      className="mt-2 font-mono text-[11px] tracking-[0.12em] text-red-400"
                    >
                      / invalid email — please check the address
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          <Reveal delay={0.12} className="relative">
            <p className="mt-6 font-mono text-[10px] tracking-[0.18em] text-fg-3 uppercase">
              HF://NETWORK · NO SPAM · EARLY ACCESS LIST
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
