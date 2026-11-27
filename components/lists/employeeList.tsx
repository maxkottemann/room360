import ActiveBadge from "@/components/ui/indicators/activeBadge";
import { formatDate } from "@/lib/format";
import type { Employee, Employees } from "@/services/staff/employeeService";
import { CalendarDays, KeyRound, Pencil, Trash2, Users } from "lucide-react";

interface EmployeeListProps {
  employees: Employees;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function EmployeeList({ employees, onEdit, onDelete }: EmployeeListProps) {
  if (employees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <Users strokeWidth={1.75} className="h-5 w-5 text-primary" aria-hidden="true" />
        </span>
        <p className="mt-3 text-sm font-semibold text-slate-800">Nog geen medewerkers</p>
        <p className="mt-0.5 text-xs text-muted">
          Voeg een medewerker toe om deze aan voertuigen en projecten te koppelen.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-1.5">
      {employees.map((employee) => (
        <li
          key={employee.id}
          className={`group flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-3 py-3 transition-all duration-150 hover:cursor-pointer hover:border-primary/20 hover:bg-primary/5 ${
            employee.is_active ? "" : "opacity-70"
          }`}
        >
          <span
            aria-hidden="true"
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
              employee.is_active ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"
            }`}
          >
            {initials(employee.name)}
          </span>

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex min-w-0 items-center gap-2">
              <p className="truncate text-sm font-semibold text-slate-800">{employee.name}</p>
              {employee.profile_id && (
                <span
                  title="Heeft een account"
                  className="inline-flex shrink-0 items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-primary uppercase"
                >
                  <KeyRound strokeWidth={2} className="h-3 w-3" aria-hidden="true" />
                  Account
                </span>
              )}
            </div>

            <p className="flex items-center gap-1 text-xs text-muted">
              <CalendarDays strokeWidth={1.75} className="h-3 w-3 shrink-0" aria-hidden="true" />
              Toegevoegd op {formatDate(employee.created_at ?? "")}
            </p>
          </div>

          <ActiveBadge active={employee.is_active} className="hidden sm:inline-flex" />

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => onEdit(employee)}
              aria-label={`${employee.name} bewerken`}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
            >
              <Pencil strokeWidth={1.75} className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(employee)}
              aria-label={`${employee.name} verwijderen`}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 focus-visible:outline-2 focus-visible:outline-red-500"
            >
              <Trash2 strokeWidth={1.75} className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
