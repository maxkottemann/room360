import { formatAddress, formatNumber2Decimals } from "@/lib/format";
import { calculateSavingsPCT } from "@/lib/sustainability/co2";
import { VehicleBasic, VehicleBasics } from "@/services/staff/vehicleService";
import { MapPin, Pencil, Trash2, Truck, Leaf } from "lucide-react";

interface VehicleListProps {
  vehicles: VehicleBasics;
  onEdit: (vehicle: VehicleBasic) => void;
  onDelete: (vehicle: VehicleBasic) => void;
}

export default function VehicleList({ vehicles, onEdit, onDelete }: VehicleListProps) {
  if (vehicles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <Truck strokeWidth={1.75} className="h-5 w-5 text-primary" aria-hidden="true" />
        </span>
        <p className="mt-3 text-sm font-semibold text-slate-800">Nog geen voertuigen</p>
        <p className="mt-0.5 text-xs text-muted">
          Voeg een voertuig toe om het te kunnen inplannen.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-1.5">
      {vehicles.map((vehicle) => {
        const address = formatAddress({
          city: vehicle.city,
          postal_code: vehicle.postal_code,
          street: vehicle.street,
          number: vehicle.number,
        });

        const hasCo2 = vehicle.co2 != null && vehicle.co2_old != null;
        const co2Saved = hasCo2
          ? calculateSavingsPCT(vehicle.co2 ?? 0, vehicle.co2_old ?? 0)
          : null;
        const co2SavedLabel = formatNumber2Decimals(co2Saved ?? 0);

        return (
          <li
            key={vehicle.id}
            className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-3 py-3 transition-all duration-150 hover:cursor-pointer hover:border-primary/20 hover:bg-primary/5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 transition-colors group-hover:bg-primary/10">
              <Truck
                strokeWidth={1.75}
                className="h-5 w-5 text-slate-400 transition-colors group-hover:text-primary"
                aria-hidden="true"
              />
            </span>

            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex min-w-0 items-center gap-2">
                <p className="truncate text-sm font-semibold text-slate-800">{vehicle.name}</p>
                {vehicle.license_plate && (
                  <span className="shrink-0 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-slate-500 uppercase tabular-nums">
                    {vehicle.license_plate}
                  </span>
                )}
              </div>

              {address && (
                <p className="flex min-w-0 items-center gap-1 text-xs text-muted">
                  <MapPin strokeWidth={1.75} className="h-3 w-3 shrink-0" aria-hidden="true" />
                  <span className="truncate">{address}</span>
                </p>
              )}
            </div>

            {co2Saved != null && co2Saved > 0 && (
              <span
                className="hidden shrink-0 items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600 sm:inline-flex"
                title="CO₂-besparing t.o.v. oude situatie"
              >
                <Leaf strokeWidth={1.75} className="h-3.5 w-3.5" aria-hidden="true" />
                {co2SavedLabel}% CO₂
              </span>
            )}

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => onEdit(vehicle)}
                aria-label={`${vehicle.name} bewerken`}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
              >
                <Pencil strokeWidth={1.75} className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(vehicle)}
                aria-label={`${vehicle.name} verwijderen`}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 focus-visible:outline-2 focus-visible:outline-red-500"
              >
                <Trash2 strokeWidth={1.75} className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
