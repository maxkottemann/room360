"use client";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

export type SelectOption = {
  value: string;
  label: string;
  description?: string;
};

type SelectProps = {
  id?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
  emptyText?: string;
  clearable?: boolean;
  "aria-describedby"?: string;
};

export default function Select({
  id,
  options,
  value,
  onChange,
  onBlur,
  clearable,
  placeholder = "Maak een keuze",
  invalid = false,
  disabled = false,
  emptyText = "Geen opties beschikbaar",
  "aria-describedby": describedBy,
}: SelectProps) {
  const selected = options.find((o) => o.value === value);

  function handleChange(next: string) {
    onChange(clearable && next === value ? "" : next);
  }

  return (
    <Listbox value={value} onChange={handleChange} disabled={disabled}>
      <ListboxButton
        id={id}
        onBlur={onBlur}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={`relative flex h-10 w-full cursor-pointer items-center rounded-xl border bg-white pr-10 pl-4 text-left text-sm shadow-sm transition-all duration-200 outline-none data-disabled:cursor-not-allowed data-disabled:opacity-50 ${
          invalid
            ? "border-danger bg-danger/5 focus-visible:shadow-[0_0_0_3px_rgba(220,38,38,0.10)] data-open:shadow-[0_0_0_3px_rgba(220,38,38,0.10)]"
            : "border-slate-200 hover:border-primary focus-visible:border-primary focus-visible:shadow-[0_0_0_3px_rgba(15,23,42,0.08)] data-open:border-primary data-open:shadow-[0_0_0_3px_rgba(15,23,42,0.08)]"
        }`}
      >
        <span className={`truncate ${selected ? "text-slate-800" : "text-slate-400"}`}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          strokeWidth={1.75}
          aria-hidden="true"
          className={`pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 transition-transform duration-200 in-data-open:rotate-180 ${
            invalid ? "text-danger" : "text-slate-400 in-data-open:text-primary"
          }`}
        />
      </ListboxButton>

      <ListboxOptions
        anchor="bottom start"
        transition
        className="z-999 max-h-64 w-(--button-width) overflow-y-auto rounded-xl border border-slate-100 bg-white p-1.5 shadow-lg transition duration-150 ease-out outline-none [--anchor-gap:6px] data-closed:-translate-y-1 data-closed:opacity-0"
      >
        {options.length === 0 ? (
          <p className="px-3 py-3 text-xs text-slate-400">{emptyText}</p>
        ) : (
          options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option.value}
              className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-800 select-none data-focus:bg-slate-50 data-selected:bg-primary/10"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate group-data-selected:font-semibold group-data-selected:text-primary">
                  {option.label}
                </p>
                {option.description && (
                  <p className="truncate text-xs text-slate-400">{option.description}</p>
                )}
              </div>
              <Check
                strokeWidth={2}
                aria-hidden="true"
                className="invisible h-4 w-4 shrink-0 text-primary group-data-selected:visible"
              />
            </ListboxOption>
          ))
        )}
      </ListboxOptions>
    </Listbox>
  );
}
