import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type FormSectionProps = {
  title: string;
  description?: string;
  icon: LucideIcon;
  children: ReactNode;
};

export default function FormSection({
  title,
  description,
  icon: Icon,
  children,
}: FormSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white shadow-sm">
      <header className="flex items-center gap-4 px-5 pt-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Icon strokeWidth={1.75} className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-base leading-tight font-bold text-slate-800">{title}</h2>
          {description && (
            <p className="mt-0.5 truncate text-sm leading-tight text-muted">{description}</p>
          )}
        </div>
      </header>
      <div className="flex flex-col gap-5 px-5 pt-5 pb-5">{children}</div>
    </section>
  );
}
