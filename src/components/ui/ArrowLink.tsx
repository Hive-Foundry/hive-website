import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/cn";

type ArrowLinkProps = {
  to?: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "inline" | "blocked";
  arrow?: "right" | "up";
};

/**
 * Link with an animated arrow on hover. Routes internally via `to`,
 * or externally via `href`.
 */
export function ArrowLink({ to, href, children, className, variant = "inline", arrow = "right" }: ArrowLinkProps) {
  const Arrow = arrow === "right" ? ArrowRight : ArrowUpRight;

  const content = (
    <>
      <span>{children}</span>
      <Arrow
        aria-hidden="true"
        className={cn(
          "h-4 w-4 transition-transform duration-200",
          arrow === "right" ? "group-hover:translate-x-1" : "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
        )}
        strokeWidth={1.75}
      />
    </>
  );

  const baseClass = cn(
    "group inline-flex items-center gap-2 font-medium transition-colors duration-200",
    variant === "inline" && "text-fg hover:text-ember",
    variant === "blocked" &&
      "border border-edge-2 rounded-md px-4 py-2 text-sm hover:border-fg-3 hover:bg-white/5",
    className,
  );

  if (href) {
    return (
      <a href={href} className={baseClass} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }
  if (to) {
    return (
      <Link to={to} className={baseClass}>
        {content}
      </Link>
    );
  }
  return <span className={cn(baseClass, "cursor-not-allowed opacity-50")}>{content}</span>;
}
