import { Database } from "@/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function deleteItem(supabase: SupabaseClient<Database>, itemId: string) {
  const { error } = await supabase.rpc("soft_delete_item", {
    p_item_id: itemId,
  });

  if (error) throw error;
}
