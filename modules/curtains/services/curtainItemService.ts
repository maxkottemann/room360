import { supabase } from "@/lib/browserClient";
import { Database } from "@/types/database.types";
import { CurtainFormValues } from "@/zodSchemas/itemSchema";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getCurtainItemsFromRoomId(
  supabase: SupabaseClient<Database>,
  roomId: string,
) {
  const { data, error } = await supabase
    .from("items")
    .select("*,curtain_details(*,curtain_types(id,name)),rooms(id,name,stories(id,name))")
    .eq("room_id", roomId);

  if (error) throw error;
  return data;
}

export async function getCurtainTypesOptions(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("curtain_types").select("id,name");

  if (error) throw error;
  return data;
}

export async function getCurtainMaterialsOptions(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("curtain_materials").select("id,name");

  if (error) throw error;
  return data;
}

export async function createCurtainItem(
  supabase: SupabaseClient<Database>,
  roomId: string,
  values: CurtainFormValues,
) {
  const { data, error } = await supabase.rpc(
    "create_curtain_item",
    toCreateCurtainArgs(roomId, values),
  );
  if (error) throw error;

  return data;
}

export function toCreateCurtainArgs(roomId: string, values: CurtainFormValues) {
  return {
    p_room_id: roomId,
    p_name: values.item.name,
    p_height: values.details.height,
    p_lower_width: values.details.lower_width,
    p_quantity: values.item.quantity,
    p_manufacturer_id: values.item.manufacturer_id ?? undefined,
    p_qr_code_id: values.item.qr_code_id ?? undefined,
    p_rfid_code: values.item.rfid_code ?? undefined,
    p_color: values.details.color ?? undefined,
    p_purchase_date: values.details.purchase_date ?? undefined,
    p_upper_width: values.details.upper_width ?? undefined,
    p_curtain_type_id: values.details.curtain_type_id,
    p_material_id: values.details.material_id ?? undefined,
  };
}

export type Curtains = Awaited<ReturnType<typeof getCurtainItemsFromRoomId>>;
export type Curtain = Curtains[number];

export type CurtainTypes = Awaited<ReturnType<typeof getCurtainTypesOptions>>;
export type CurtainType = CurtainTypes[number];
export type CurtainMaterials = Awaited<ReturnType<typeof getCurtainTypesOptions>>;
export type CurtainMaterial = CurtainTypes[number];
