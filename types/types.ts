import { Constants, Database } from "./database.types";

export type ModuleKey = Database["public"]["Enums"]["module_key"];
export type ItemCategory = Database["public"]["Enums"]["item_category"];

/** the values as an array, for dropdowns and validation */
export const ITEM_CATEGORIES = Constants.public.Enums.item_category;

export const ITEM_STATE: Record<string, { label: string; pill: string; dot: string }> = {
  in_room: { label: "In ruimte", pill: "bg-success-soft text-success-ink", dot: "bg-success" },
  in_laundry: { label: "In de was", pill: "bg-info-soft text-info-ink", dot: "bg-info" },
  in_storage: { label: "Op voorraad", pill: "bg-surface text-muted", dot: "bg-muted" },
  in_repair: { label: "In reparatie", pill: "bg-warning-soft text-warning-ink", dot: "bg-warning" },
  retired: { label: "Afgevoerd", pill: "bg-danger-soft text-danger-ink", dot: "bg-danger" },
};

export const QUALITY: Record<string, { label: string; level: 1 | 2 | 3; color: string }> = {
  good: { label: "Goed", level: 3, color: "bg-success" },
  fair: { label: "Matig", level: 2, color: "bg-warning" },
  poor: { label: "Slecht", level: 1, color: "bg-danger" },
};
