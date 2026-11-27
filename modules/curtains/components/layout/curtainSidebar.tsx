"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  ClipboardListIcon,
  House,
  Settings,
  Users2,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useCompany } from "@/hooks/companyHooks";
import { useProfile } from "@/context/ProfileContext";
import { supabase } from "@/lib/browserClient";
import type { Enums } from "@/types/database.types";

type Role = Enums<"role_type">;

type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  roles?: Role[];
};

// All curtain routes live under /curtains
const BASE = "/curtains";

const NAV_LINKS: NavLink[] = [
  { href: `${BASE}/dashboard`, label: "Dashboard", icon: House },
  { href: `${BASE}/projects`, label: "Projecten", icon: ClipboardListIcon },
  { href: `${BASE}/locations`, label: "Locaties", icon: Building2 },
  { href: `${BASE}/clients`, label: "Klanten", icon: Users2 },
  { href: `${BASE}/settings`, label: "Instellingen", icon: Settings },
];

const FALLBACK_LOGO = "/fulllogo.png";
const COMPANY_ROLES: Role[] = ["company_admin", "company_employee", "super_admin"];

interface SidebarProps {
  className?: string;
  open: boolean;
  onClose: () => void;
  /** Optional badge counts per href, e.g. { "/curtains/projects": 3 } */
  counts?: Record<string, number>;
}

export default function SidebarCurtain({ className, open, onClose, counts = {} }: SidebarProps) {
  const pathname = usePathname();
  const { profile } = useProfile();
  const { company } = useCompany();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function resolveLogo(): Promise<string> {
      if (COMPANY_ROLES.includes(profile.role)) {
        return company?.logo_url ?? FALLBACK_LOGO;
      }

      if (!profile.client_id) return FALLBACK_LOGO;

      const { data } = await supabase
        .from("company_clients")
        .select("companies(logo_url)")
        .eq("client_id", profile.client_id);

      const urls = [
        ...new Set(
          (data ?? [])
            .map((row) => row.companies?.logo_url)
            .filter((url): url is string => Boolean(url)),
        ),
      ];

      return urls.length === 1 ? urls[0] : FALLBACK_LOGO;
    }

    if (COMPANY_ROLES.includes(profile.role) && !company) return;

    resolveLogo()
      .catch(() => FALLBACK_LOGO)
      .then((url) => {
        if (!cancelled) setLogoUrl(url);
      });

    return () => {
      cancelled = true;
    };
  }, [profile, company]);

  const visibleLinks = NAV_LINKS.filter((l) => !l.roles || l.roles.includes(profile.role));

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-200 bg-black/30 xl:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <nav
        aria-label="Hoofdmenu"
        className={`fixed top-0 left-0 z-200 flex h-dvh w-64 flex-col border-r border-gray-200 bg-[#f2f3f4] shadow-lg transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} xl:static xl:translate-x-0 xl:shadow-none ${className ?? ""}`}
      >
        <div className="px-4 pb-2">
          {logoUrl && (
            <div className="mt-3 flex h-12 items-center justify-center">
              <img src={logoUrl} alt="Logo" className="max-h-full max-w-full object-contain" />
            </div>
          )}
        </div>

        <div className="mx-4 mb-3 border-t border-gray-200" />

        <div className="flex-1 overflow-y-auto overscroll-contain pb-2">
          {visibleLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            const count = counts[href] ?? 0;

            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={`mb-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium transition-all duration-150 ${
                  active
                    ? "bg-gradient-to-r from-primary/80 to-primary text-white shadow-md"
                    : "text-gray-700 hover:bg-primary/20 hover:text-primary"
                }`}
              >
                <Icon strokeWidth={1.75} className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate">{label}</span>

                {count > 0 && (
                  <span
                    aria-label={`${count} ${count === 1 ? "melding" : "meldingen"}`}
                    className={`ml-auto flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-[11px] leading-none font-semibold tabular-nums ${
                      active ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {count > 99 ? "99+" : count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <footer
          className="mx-4 shrink-0 border-t border-gray-200 pt-3 text-center"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
          <p className="text-[10px] font-medium tracking-[0.08em] text-gray-400 uppercase">
            Powered by
          </p>
          <p className="mt-0.5 text-xs text-gray-500">
            <span className="font-semibold text-gray-600">Room360</span>
            <span aria-hidden="true" className="mx-1.5 text-gray-300">
              ·
            </span>
            CM Software
          </p>
        </footer>
      </nav>
    </>
  );
}
