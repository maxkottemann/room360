import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";
type State = "idle" | "loading" | "disabled";

const base =
  "inline-flex h-fit shrink-0 items-center justify-center gap-2 rounded-xl text-sm whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

// Per variant: the normal look, plus how it looks while loading / disabled
const variants: Record<Variant, Record<State, string>> = {
  primary: {
    idle: "bg-primary font-semibold text-white hover:bg-primary/90 active:scale-[0.98] cursor-pointer",
    loading: "bg-primary/60 font-semibold text-white cursor-not-allowed",
    disabled: "bg-primary/30 font-semibold text-white cursor-not-allowed",
  },
  secondary: {
    idle: "border border-slate-200 bg-white font-medium text-slate-700 shadow-sm hover:border-primary/40 hover:bg-primary/5 hover:text-primary active:scale-[0.98] cursor-pointer",
    loading:
      "border border-slate-200 bg-white font-medium text-slate-500 shadow-sm cursor-not-allowed",
    disabled:
      "border border-slate-200 bg-white font-medium text-slate-400 shadow-sm cursor-not-allowed",
  },
  ghost: {
    idle: "font-medium text-slate-600 hover:bg-primary/5 hover:text-primary active:scale-[0.98] cursor-pointer",
    loading: "font-medium text-slate-400 cursor-not-allowed",
    disabled: "font-medium text-slate-300 cursor-not-allowed",
  },
  danger: {
    idle: "bg-red-600 font-semibold text-white hover:bg-red-600/90 active:scale-[0.98] cursor-pointer",
    loading: "bg-red-600/60 font-semibold text-white cursor-not-allowed",
    disabled: "bg-red-600/30 font-semibold text-white cursor-not-allowed",
  },
};

const spinners: Record<Variant, string> = {
  primary: "border-white/30 border-t-white",
  danger: "border-white/30 border-t-white",
  secondary: "border-slate-300 border-t-primary",
  ghost: "border-slate-300 border-t-primary",
};

// Icon buttons get a little less padding on the left, like MainButton (pl-3 pr-4)
const sizes: Record<Size, { plain: string; withIcon: string }> = {
  sm: { plain: "px-3 py-1.5", withIcon: "pl-2.5 pr-3 py-1.5" },
  md: { plain: "px-4 py-2.5", withIcon: "pl-3 pr-4 py-2.5" },
  lg: { plain: "px-5 py-4 xl:py-2.5", withIcon: "pl-4 pr-5 py-4 xl:py-2.5" }, // large touch target on mobile
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  icon?: LucideIcon;
  loading?: boolean;
  loadingText?: ReactNode;
  href?: string;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  loading = false,
  loadingText,
  href,
  children,
  className = "",
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const state: State = loading ? "loading" : disabled ? "disabled" : "idle";
  const hasIcon = Boolean(Icon) || loading;
  const classes = [
    base,
    variants[variant][state],
    hasIcon ? sizes[size].withIcon : sizes[size].plain,
    className,
  ].join(" ");

  const content = (
    <>
      {loading ? (
        <span
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 animate-spin rounded-full border-2 ${spinners[variant]}`}
        />
      ) : (
        Icon && <Icon strokeWidth={1.75} className="h-4 w-4 shrink-0" aria-hidden="true" />
      )}
      {loading && loadingText ? loadingText : children}
    </>
  );

  if (href && state === "idle") {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={state !== "idle"}
      aria-busy={loading || undefined}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
}
