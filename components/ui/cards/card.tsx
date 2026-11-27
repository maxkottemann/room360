import { Plus, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import Button from "@/components/ui/buttons/button";

interface CardProps {
  icon?: LucideIcon;
  label?: string;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  onButton?: () => void;
  buttonLabel?: string;
  buttonIcon?: LucideIcon;
  children?: ReactNode;
  footer?: ReactNode;
  /** Content runs edge to edge (tables, lists) instead of padded */
  flush?: boolean;
  className?: string;
}

export default function Card({
  icon: Icon,
  label,
  title,
  subtitle,
  actions,
  onButton,
  buttonLabel = "Toevoegen",
  buttonIcon = Plus,
  children,
  footer,
  flush = false,
  className = "",
}: CardProps) {
  const hasHeaderText = Boolean(label || title || subtitle);
  const hasHeader = Boolean(Icon || hasHeaderText || actions || onButton);

  return (
    <section
      className={`overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm ${className}`}
    >
      {hasHeader && (
        <header
          className={`flex items-start justify-between gap-4 px-5 pt-4 ${
            children && !flush ? "pb-0" : "pb-4"
          }`}
        >
          <div className="flex min-w-0 items-center gap-4">
            {Icon && (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Icon strokeWidth={1.75} className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
            )}

            {hasHeaderText && (
              <div className="flex min-w-0 flex-col">
                {label && (
                  <p className="mb-0.5 text-[10px] font-bold tracking-widest text-muted uppercase">
                    {label}
                  </p>
                )}
                {title && (
                  <h2 className="truncate text-base leading-tight font-bold text-slate-800">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="mt-0.5 truncate text-sm leading-tight text-muted">{subtitle}</p>
                )}
              </div>
            )}
          </div>

          {(actions || onButton) && (
            <div className="flex shrink-0 items-center gap-2">
              {actions}
              {onButton && (
                <Button variant="secondary" size="sm" icon={buttonIcon} onClick={onButton}>
                  {buttonLabel}
                </Button>
              )}
            </div>
          )}
        </header>
      )}

      {children && (
        <div
          className={
            flush
              ? hasHeader
                ? "border-t border-slate-100"
                : ""
              : "flex flex-col gap-5 px-5 pt-4 pb-4"
          }
        >
          {children}
        </div>
      )}

      {footer && (
        <footer className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3">
          {footer}
        </footer>
      )}
    </section>
  );
}
