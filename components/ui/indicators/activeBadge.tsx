interface ActiveBadgeProps {
  active: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
  className?: string;
}

export default function ActiveBadge({
  active,
  activeLabel = "Actief",
  inactiveLabel = "Inactief",
  className = "",
}: ActiveBadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold ${
        active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${active ? "bg-emerald-500" : "bg-slate-300"}`}
      />
      {active ? activeLabel : inactiveLabel}
    </span>
  );
}
