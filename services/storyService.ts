import { Database } from "@/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

type CreateStoryArgs = Database["public"]["Tables"]["stories"]["Insert"];

export async function createStory(supabase: SupabaseClient<Database>, args: CreateStoryArgs) {
  const { error } = await supabase.from("stories").insert(args);

  if (error) throw error;
}
