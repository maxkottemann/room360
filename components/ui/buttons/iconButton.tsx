export function IconButton({
  label,
  onClick,
  disabled = false,
  danger = false,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl text-slate-400 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-40 ${
        danger
          ? "hover:bg-red-50 hover:text-red-500 focus-visible:outline-red-500"
          : "hover:bg-primary/10 hover:text-primary focus-visible:outline-primary"
      }`}
    >
      {children}
    </button>
  );
}
