import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
};

export default function FormField({ id, label, optional, hint, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2 px-0.5">
        <label htmlFor={id} className="text-sm font-semibold text-slate-700">
          {label}
        </label>
        {optional && (
          <span className="text-[10px] font-bold tracking-wider text-slate-300 uppercase">
            Optioneel
          </span>
        )}
      </div>

      {children}

      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1 px-0.5 text-xs font-medium text-red-500"
        >
          <AlertCircle strokeWidth={2} className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="px-0.5 text-xs text-slate-400">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
