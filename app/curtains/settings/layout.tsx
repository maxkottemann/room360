"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Box,
  ChevronDown,
  Settings,
  Sparkle,
  Truck,
  User,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useProfile } from "@/context/ProfileContext";

type MenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  isAdmin: boolean;
  isCompany: boolean;
};

const BASE = "/curtains/settings";

const menuItems: { label: string; items: MenuItem[] }[] = [
  {
    label: "Gebruikers",
    items: [
      {
        label: "Mijn account",
        href: `${BASE}/account`,
        icon: User,
        isAdmin: false,
        isCompany: false,
      },
      { label: "Team", href: `${BASE}/team`, icon: Users, isAdmin: false, isCompany: true },
    ],
  },
  {
    label: "Voertuigen & medewerkers",
    items: [
      {
        label: "Medewerkers",
        href: `${BASE}/staff`,
        icon: UserCheck,
        isAdmin: false,
        isCompany: true,
      },
      { label: "Vloot", href: `${BASE}/fleet`, icon: Truck, isAdmin: false, isCompany: true },
    ],
  },
  {
    label: "Types & methodes",
    items: [
      {
        label: "Methodes",
        href: `${BASE}/cleaning_methods`,
        icon: Sparkle,
        isAdmin: false,
        isCompany: true,
      },
      { label: "Types", href: `${BASE}/types`, icon: Box, isAdmin: false, isCompany: true },
    ],
  },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profile } = useProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isVisible = (item: MenuItem) =>
    (!item.isAdmin && !item.isCompany) || (item.isCompany && profile?.role === "company_admin");

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const activeItem = menuItems.flatMap((g) => g.items).find((item) => isActive(item.href));
  const ActiveIcon = activeItem?.icon ?? Settings;

  function renderMenu(onNavigate?: () => void) {
    return menuItems.map((group) => {
      const visible = group.items.filter(isVisible);
      if (visible.length === 0) return null;

      return (
        <div key={group.label} className="flex flex-col gap-0.5">
          <p className="mb-1 px-2 text-[10px] font-bold tracking-widest text-slate-300 uppercase">
            {group.label}
          </p>

          <ul className="flex flex-col gap-0.5">
            {visible.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-150 xl:py-2 ${
                      active
                        ? "bg-primary text-white"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    }`}
                  >
                    <Icon strokeWidth={1.75} className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  }

  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:gap-6">
      {/* Mobile: collapsible */}
      <div className="xl:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen((p) => !p)}
          aria-expanded={mobileMenuOpen}
          aria-controls="settings-menu-mobile"
          className="flex w-full cursor-pointer items-center justify-between gap-2.5 rounded-2xl border border-slate-100 bg-white px-4 py-3.5 shadow-sm"
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <ActiveIcon
              strokeWidth={1.75}
              className="h-4 w-4 shrink-0 text-primary"
              aria-hidden="true"
            />
            <span className="truncate text-sm font-bold text-slate-800">
              {activeItem?.label ?? "Instellingen"}
            </span>
          </span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
              mobileMenuOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        {mobileMenuOpen && (
          <nav
            id="settings-menu-mobile"
            aria-label="Instellingen"
            className="mt-2 flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
          >
            {renderMenu(() => setMobileMenuOpen(false))}
          </nav>
        )}
      </div>

      {/* Desktop: sidebar */}
      <aside className="hidden w-56 shrink-0 xl:sticky xl:top-6 xl:block">
        <nav
          aria-label="Instellingen"
          className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
        >
          <p className="px-2 pt-1 text-xs font-bold tracking-widest text-muted uppercase">
            Instellingen
          </p>
          {renderMenu()}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
