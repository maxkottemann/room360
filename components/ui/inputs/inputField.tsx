import type { LucideIcon } from "lucide-react";
import { useId, type ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  invalid?: boolean;
  icon?: LucideIcon;
  /** Floating label (Inputfield style). Without it you get a plain input. */
  label?: string;
};

export default function Input({
  invalid = false,
  icon: Icon,
  label,
  id,
  placeholder,
  className = "",
  ...props
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  // With a floating label, the placeholder only shows while focused.
  // A " " placeholder is needed so :placeholder-shown can tell if the field is empty.
  const effectivePlaceholder = label ? (placeholder ?? " ") : placeholder;

  const padding = label
    ? `h-12 pt-5 pb-1.5 ${Icon ? "pr-4 pl-10" : "px-4"}`
    : `h-10 ${Icon ? "pr-4 pl-10" : "px-4"}`;

  const state = invalid
    ? "border-danger bg-danger/5 focus:border-danger focus:shadow-[0_0_0_3px_rgba(220,38,38,0.10)]"
    : "border-slate-200 hover:border-primary focus:border-primary focus:shadow-[0_0_0_3px_rgba(15,23,42,0.08)]";

  return (
    <div className="group relative w-full">
      <input
        id={inputId}
        aria-invalid={invalid || undefined}
        placeholder={effectivePlaceholder}
        className={`peer w-full rounded-xl border bg-white text-sm text-slate-900 shadow-sm transition-all duration-200 outline-none ${
          label
            ? "placeholder:text-transparent focus:placeholder:text-slate-300"
            : "placeholder:text-slate-400"
        } ${padding} ${state} ${className}`}
        {...props}
      />

      {Icon && (
        <Icon
          strokeWidth={1.75}
          aria-hidden="true"
          className={`pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transition-colors ${
            invalid ? "text-danger" : "text-slate-400 group-focus-within:text-primary"
          }`}
        />
      )}

      {label && (
        <label
          htmlFor={inputId}
          className={`pointer-events-none absolute font-medium transition-all duration-200 ${Icon ? "left-10" : "left-4"} ${
            invalid ? "text-danger" : "text-slate-400"
          } top-1/2 -translate-y-1/2 text-sm tracking-normal peer-focus:top-1.5 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:tracking-[0.08em] peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:tracking-[0.08em] peer-[:not(:placeholder-shown)]:uppercase`}
        >
          {label}
        </label>
      )}

      {/* animated focus line, like Inputfield */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute right-4 bottom-0 left-4 h-[1.5px] origin-left scale-x-0 rounded-full opacity-0 transition-all duration-300 group-focus-within:scale-x-100 group-focus-within:opacity-100 ${
          invalid ? "bg-danger" : "bg-primary"
        }`}
      />
    </div>
  );
}
