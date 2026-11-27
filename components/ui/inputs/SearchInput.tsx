"use client";

import { Search, X } from "lucide-react";
import type { InputHTMLAttributes, Ref } from "react";

interface SearchInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "type" | "size"
> {
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md" | "lg";
  ref?: Ref<HTMLInputElement>;
}

const SIZES = {
  sm: { input: "h-9 pl-9", icon: "left-3 h-4 w-4" },
  md: { input: "h-10 pl-9", icon: "left-3 h-4 w-4" },
  lg: { input: "h-12 pl-10", icon: "left-3.5 h-4 w-4" }, // same height as the selectors' search
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "Zoeken…",
  size = "md",
  className = "",
  ref,
  onKeyDown,
  "aria-label": ariaLabel,
  ...props
}: SearchInputProps) {
  const s = SIZES[size];

  return (
    <div className={`group/search relative ${className}`}>
      <Search
        strokeWidth={1.75}
        aria-hidden="true"
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within/search:text-primary ${s.icon}`}
      />

      <input
        ref={ref}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && value) {
            e.preventDefault();
            onChange("");
          }
          onKeyDown?.(e);
        }}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        autoComplete="off"
        spellCheck={false}
        className={`w-full rounded-xl border border-slate-200 bg-white pr-10 text-sm text-slate-800 shadow-sm transition-all duration-200 outline-none placeholder:text-slate-400 hover:border-primary focus:border-primary focus:shadow-[0_0_0_3px_rgba(15,23,42,0.08)] [&::-webkit-search-cancel-button]:appearance-none ${s.input}`}
        {...props}
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Zoekopdracht wissen"
          className="absolute top-1/2 right-2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-primary/10 hover:text-primary"
        >
          <X strokeWidth={2} className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
