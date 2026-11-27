import type { ModuleKey } from "@/types/types";
import { Blinds, Layers, type LucideIcon } from "lucide-react";

type ModuleConfig = {
  appName: string;
  basePath: string;
  icon: LucideIcon;
};

export const MODULES = {
  curtains: {
    appName: "CurtainControl",
    basePath: "/curtains",
    icon: Blinds,
  },
  floors: {
    appName: "FloorControl",
    basePath: "/floors",
    icon: Layers,
  },
} satisfies Partial<Record<ModuleKey, ModuleConfig>>;

export function getModule(key: ModuleKey): ModuleConfig | null {
  return (MODULES as Partial<Record<ModuleKey, ModuleConfig>>)[key] ?? null;
}
