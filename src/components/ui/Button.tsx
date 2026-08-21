import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-200 " +
  "select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-ember " +
  "active:translate-y-px";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-void hover:bg-ember hover:text-void",
  secondary:
    "border border-edge-2 text-fg hover:border-fg-3 hover:bg-white/5",
  ghost: "text-fg-2 hover:text-fg hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

type ButtonLinkProps = {
  to: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export const ButtonLink = ({ to, variant = "primary", size = "md", className, children }: ButtonLinkProps) => (
  <Link to={to} className={cn(base, variants[variant], sizes[size], className)}>
    {children}
  </Link>
);
