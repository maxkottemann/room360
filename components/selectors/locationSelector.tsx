"use client";

import { useState } from "react";
import { Building2, Check, ChevronRight, MapPin, Search, UsersRound } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import type { LocationsWithClient, LocationWithClientListItem } from "@/services/locationService";

interface LocationSelectorProps {
  locations: LocationsWithClient;
  selectedLocation?: LocationWithClientListItem | null;
  selectedLocationIds?: string[];
  onSelect: (location: LocationWithClientListItem) => void;
  /** e.g. "max-h-100" to cap the list; the search field stays visible */
  maxHeight?: string;
}

export default function LocationSelector({
  locations,
  selectedLocation,
  selectedLocationIds,
  onSelect,
  maxHeight,
}: LocationSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { profile } = useProfile();

  const isCompanyUser = profile.role === "company_admin" || profile.role === "company_employee";
  const term = searchTerm.trim().toLowerCase();

  const filtered = term
    ? locations.filter((l) =>
        [l.name, l.city, l.street, l.postal_code, l.clients?.name].some((value) =>
          value?.toLowerCase().includes(term),
        ),
      )
    : locations;

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
          placeholder={`Zoek op ${isCompanyUser ? "locatie, klant of plaats" : "locatie of plaats"}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape" && searchTerm) {
              e.preventDefault();
              setSearchTerm("");
            }
          }}
          aria-label="Zoek locatie"
          autoComplete="off"
          className="min-h-12 w-full rounded-xl border border-slate-200 bg-white pr-4 pl-9 text-sm text-slate-800 shadow-sm transition-all outline-none placeholder:text-slate-400 hover:border-primary focus:border-primary focus:shadow-[0_0_0_3px_rgba(15,23,42,0.08)] [&::-webkit-search-cancel-button]:appearance-none"
        />
      </div>

      <div className={`flex flex-col gap-1.5 overflow-y-auto ${maxHeight ?? ""}`}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white px-6 py-8 text-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
              <Search strokeWidth={1.75} className="h-4 w-4 text-slate-400" aria-hidden="true" />
            </span>
            <p className="mt-3 text-sm font-semibold text-slate-800">Geen locaties gevonden</p>
            <p className="mt-0.5 text-xs text-muted">Probeer een andere zoekterm.</p>
          </div>
        ) : (
          filtered.map((l) => {
            const isSelected =
              l.id === selectedLocation?.id || (selectedLocationIds?.includes(l.id) ?? false);

            return (
              <button
                key={l.id}
                type="button"
                onClick={() => onSelect(l)}
                aria-pressed={isSelected}
                className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  isSelected
                    ? "border-primary/20 bg-primary/10"
                    : "border-slate-100 bg-white hover:border-primary/20 hover:bg-primary/5"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isSelected ? "bg-primary/20" : "bg-slate-100"
                  }`}
                >
                  <Building2
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className={`h-5 w-5 ${isSelected ? "text-primary" : "text-slate-400"}`}
                  />
                </span>

                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p
                    className={`truncate text-sm font-semibold ${
                      isSelected ? "text-primary" : "text-slate-800"
                    }`}
                  >
                    {l.name}
                  </p>

                  {(l.city || (isCompanyUser && l.clients?.name)) && (
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                      {l.city && (
                        <span className="flex items-center gap-1">
                          <MapPin strokeWidth={1.75} className="h-3 w-3" aria-hidden="true" />
                          {l.city}
                        </span>
                      )}

                      {isCompanyUser && l.clients?.name && (
                        <>
                          {l.city && (
                            <span aria-hidden="true" className="text-slate-200">
                              ·
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <UsersRound strokeWidth={1.75} className="h-3 w-3" aria-hidden="true" />
                            {l.clients.name}
                          </span>
                        </>
                      )}
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
                    className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-primary"
                  />
                )}
              </button>
            );
          })
        )}
      </div>

      {filtered.length > 0 && (
        <p className="px-1 text-right text-xs text-muted tabular-nums">
          {filtered.length} {filtered.length === 1 ? "locatie" : "locaties"}
        </p>
      )}
    </div>
  );
}
