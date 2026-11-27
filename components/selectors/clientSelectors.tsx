"use client";

import { useState } from "react";
import { Check, ChevronRight, MapPin, Search, SquareUser } from "lucide-react";
import type { ClientListItem, Clients } from "@/services/clientService";

interface ClientSelectorProps {
  clients: Clients;
  selectedClient?: ClientListItem | null;
  selectedClientIds?: string[];
  onSelect: (client: ClientListItem) => void;
  /** e.g. "max-h-64" when used inside a modal/form; omit on a full page */
  maxHeight?: string;
}

export default function ClientSelector({
  clients,
  selectedClient,
  selectedClientIds,
  onSelect,
  maxHeight,
}: ClientSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const term = searchTerm.trim().toLowerCase();

  const filtered = term
    ? clients.filter((c) =>
        [c.name, c.city, c.street, c.postal_code].some((value) =>
          value?.toLowerCase().includes(term),
        ),
      )
    : clients;

  return (
    <div className="flex flex-col gap-2">
      <div className="group/search relative">
        <Search
          strokeWidth={1.75}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within/search:text-primary"
        />
        <input
          type="search"
          placeholder="Zoek op naam of plaats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape" && searchTerm) {
              e.preventDefault();
              setSearchTerm("");
            }
          }}
          aria-label="Zoek klant"
          autoComplete="off"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-9 text-sm text-slate-800 shadow-sm transition-all outline-none placeholder:text-slate-400 hover:border-primary focus:border-primary focus:shadow-[0_0_0_3px_rgba(15,23,42,0.08)] [&::-webkit-search-cancel-button]:appearance-none"
        />
      </div>

      <div className={`flex flex-col gap-1 overflow-y-auto ${maxHeight ?? ""}`}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white px-6 py-8 text-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
              <Search strokeWidth={1.75} className="h-4 w-4 text-slate-400" aria-hidden="true" />
            </span>
            <p className="mt-3 text-sm font-semibold text-slate-800">
              Geen klanten gevonden voor deze module
            </p>
            <p className="mt-0.5 text-xs text-muted">Probeer een andere zoekterm.</p>
          </div>
        ) : (
          filtered.map((c) => {
            const isSelected =
              c.id === selectedClient?.id || (selectedClientIds?.includes(c.id) ?? false);
            const address = [c.street, c.number].filter(Boolean).join(" ");

            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelect(c)}
                aria-pressed={isSelected}
                className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  isSelected
                    ? "border-primary/20 bg-primary/10"
                    : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    isSelected ? "bg-primary/20" : "bg-slate-100"
                  }`}
                >
                  <SquareUser
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className={`h-4 w-4 ${isSelected ? "text-primary" : "text-slate-400"}`}
                  />
                </span>

                <div className="flex min-w-0 flex-1 flex-col">
                  <p
                    className={`truncate text-sm font-semibold ${
                      isSelected ? "text-primary" : "text-slate-800"
                    }`}
                  >
                    {c.name}
                  </p>

                  {(c.city || address) && (
                    <div className="flex min-w-0 items-center gap-x-1.5 text-xs text-muted">
                      {c.city && (
                        <span className="flex shrink-0 items-center gap-1">
                          <MapPin strokeWidth={1.75} className="h-3 w-3" aria-hidden="true" />
                          {c.city}
                        </span>
                      )}
                      {c.city && address && (
                        <span aria-hidden="true" className="text-slate-300">
                          ·
                        </span>
                      )}
                      {address && <span className="truncate">{address}</span>}
                    </div>
                  )}
                </div>

                {isSelected ? (
                  <Check
                    strokeWidth={2}
                    className="h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronRight
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-slate-400"
                  />
                )}
              </button>
            );
          })
        )}
      </div>

      {filtered.length > 0 && (
        <p className="px-1 text-right text-xs text-muted tabular-nums">
          {filtered.length} {filtered.length === 1 ? "klant" : "klanten"}
        </p>
      )}
    </div>
  );
}
