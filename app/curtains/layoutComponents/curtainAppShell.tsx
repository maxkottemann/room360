"use client";

import Toast from "@/components/toast/toast";
import { ProfileProvider } from "@/context/ProfileContext";
import { QueryProvider } from "@/context/QueryProvider";
import { ThemeProvider } from "@/context/ThemeProviderContext";
import { ToastProvider, useToast } from "@/context/ToastContext";
import SidebarCurtain from "@/modules/curtains/components/layout/curtainSidebar";
import TopbarCurtain from "@/modules/curtains/components/layout/curtainTopbar";
import { Tables } from "@/types/database.types";
import { usePathname } from "next/navigation";
import { useState } from "react";

function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast, hideToast } = useToast();
  const pathname = usePathname();

  const titles: Record<string, string> = {
    "/curtains/dashboard": "Dashboard",
    "/curtains/client": "Klanten",
    "/curtains/projects": "Projecten",
    "/curtains/locations": "Locaties",
    "/curtains/settings": "Instellingen",
    "/curtains/qualitychecks": "Steekproeven",
    "/curtains/questioncenter": "Vragencentrum",
    "/curtains/status": "Livestatus",
  };

  const title = Object.entries(titles).find(([route]) => pathname.startsWith(route))?.[1] ?? "";

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <SidebarCurtain open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <TopbarCurtain title={title} onMenuToggle={() => setSidebarOpen((p) => !p)} />
        <main className="flex-1 overflow-auto bg-surface p-3 xl:px-6 xl:py-6">{children}</main>
      </div>
    </div>
  );
}

export default function AppClientShell({
  profile,
  children,
}: {
  profile: Tables<"profiles">;
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <ToastProvider>
        <ProfileProvider profile={profile}>
          <ThemeProvider>
            <AppShell>{children}</AppShell>
          </ThemeProvider>
        </ProfileProvider>
      </ToastProvider>
    </QueryProvider>
  );
}
