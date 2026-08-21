import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { NAV_ITEMS } from "@/data/navigation";
import { GithubIcon } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/Button";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";

export function NavBar() {
  const scrolled = useScrolled(16);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const reduced = useReducedMotion();

  // Close the menu on navigation.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b hairline bg-void/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="container-hf flex h-16 items-center justify-between" aria-label="Primary">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Hive Foundry home">
          <img
            src="/hive-foundry-emblem.png"
            alt=""
            width={1312}
            height={1199}
            className="h-7 w-auto"
          />
          <span className="font-display text-[15px] font-semibold tracking-tight text-fg">
            Hive Foundry
          </span>
        </Link>

        {/* Desktop center nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "group relative rounded-md px-3.5 py-2 text-sm text-fg-2 transition-colors hover:text-fg",
                  isActive && "text-fg",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3.5 -bottom-px h-px bg-ember transition-transform duration-200 origin-left",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="#github"
            aria-disabled="true"
            title="GitHub — coming soon"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-fg-2 transition-colors hover:bg-white/5"
          >
            <GithubIcon className="h-[18px] w-[18px]" />
          </a>
          <ButtonLink to="/company#waitlist" variant="secondary" size="sm">
            Join Waitlist
          </ButtonLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0.15 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b hairline bg-void/95 backdrop-blur-md md:hidden"
          >
            <div className="container-hf flex flex-col gap-1 py-4">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: reduced ? 0 : -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduced ? 0 : 0.05 + i * 0.05 }}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-md px-3 py-3 text-base text-fg-2 transition-colors hover:bg-white/5 hover:text-fg",
                        isActive && "text-fg",
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="mt-3 flex items-center gap-2 px-3">
                <ButtonLink to="/company#waitlist" size="md" className="flex-1">
                  Join Waitlist
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
