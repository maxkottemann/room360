"use client";

import { ChevronDown, LogOut, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useProfile } from "@/context/ProfileContext";
import { supabase } from "@/lib/browserClient";

type TopbarProps = {
  title: string;
  onMenuToggle?: () => void;
};

export default function TopbarCurtain({ title, onMenuToggle }: TopbarProps) {
  const { profile } = useProfile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  async function handleLogout() {
    setSigningOut(true);
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Signout failed:", error);
    window.location.href = "/login";
  }

  const initials =
    profile.name
      ?.trim()
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";

  return (
    <header className="z-40 flex h-16 w-full shrink-0 flex-row items-center justify-between bg-primary px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        {onMenuToggle && (
          <button
            type="button"
            onClick={onMenuToggle}
            aria-label="Menu openen"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white xl:hidden"
          >
            <Menu strokeWidth={1.75} className="h-5 w-5 text-white" />
          </button>
        )}
        <h1
          className={`truncate text-lg font-bold tracking-tight text-white ${onMenuToggle ? "hidden xl:block" : ""}`}
        >
          {title}
        </h1>
      </div>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((p) => !p)}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
            {initials}
          </span>
          <span className="hidden text-left sm:block">
            <span className="block max-w-48 truncate text-sm leading-tight font-semibold text-white">
              {profile.name}
            </span>
            {profile.email && (
              <span className="block max-w-[140px] truncate text-[10px] leading-tight text-white/60">
                {profile.email}
              </span>
            )}
          </span>
          <ChevronDown
            strokeWidth={2}
            aria-hidden="true"
            className={`h-4 w-4 text-white/60 transition-transform ${menuOpen ? "rotate-180" : ""}`}
          />
        </button>

        {menuOpen && (
          <div
            role="menu"
            className="absolute top-full right-0 z-[999] mt-2 w-52 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl"
          >
            <div className="border-b border-slate-50 px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-800">{profile.name}</p>
                  {profile.email && (
                    <p className="truncate text-xs text-slate-400">{profile.email}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-2">
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                disabled={signingOut}
                className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary disabled:opacity-60"
              >
                <LogOut strokeWidth={1.75} className="h-4 w-4 shrink-0" aria-hidden="true" />
                {signingOut ? "Uitloggen…" : "Uitloggen"}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
