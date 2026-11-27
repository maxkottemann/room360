export default function InfoBlock({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value?: string;
  icon?: React.ElementType;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[10px] font-medium tracking-widest text-gray-400 uppercase">{label}</p>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 shrink-0 text-[#154273]" />}
        <p className="text-sm font-semibold text-gray-800">{value || "—"}</p>
      </div>
    </div>
  );
}
