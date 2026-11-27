// app/curtains/layout.tsx
import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { getProfile } from "@/services/profileService";
import LoadingState from "@/components/states/loadingState";
import { createClient } from "@/lib/serverClient";
import AppClientShell from "./layoutComponents/curtainAppShell";

export default function CurtainsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingState fullScreen />}>
      <ProfileLoader>{children}</ProfileLoader>
    </Suspense>
  );
}

async function ProfileLoader({ children }: { children: React.ReactNode }) {
  await connection(); // this part is per user/request, don't prerender it

  const supabase = await createClient();
  const profile = await getProfile(supabase);
  if (!profile) redirect("/login");

  return <AppClientShell profile={profile}>{children}</AppClientShell>;
}
