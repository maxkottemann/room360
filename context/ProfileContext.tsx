// context/ProfileContext.tsx
"use client";

import type { Tables } from "@/types/database.types";
import { createContext, useContext } from "react";

type Profile = Tables<"profiles">;
type ProfileContextType = { profile: Profile };

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({
  profile,
  children,
}: {
  profile: Profile;
  children: React.ReactNode;
}) {
  return <ProfileContext.Provider value={{ profile }}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within ProfileProvider");
  return context;
}
