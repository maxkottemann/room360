import { Database } from "@/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getLocationCurtainCount(
  supabase: SupabaseClient<Database>,
  locationId: string,
) {
  const { count, error } = await supabase
    .from("items")
    .select("id", { count: "exact" })
    .eq("category", "curtain")
    .eq("location_id", locationId);

  if (error) throw error;
  return count;
}

export async function getLocationCurtainM2(supabase: SupabaseClient<Database>, locationId: string) {
  const { data, error } = await supabase.rpc("get_location_curtain_m2", {
    p_location_id: locationId,
  });
  if (error) throw error;
  return data;
}
export async function getCurtainCountByLocationId(
  supabase: SupabaseClient<Database>,
  locationId: string,
) {
  const { count, error } = await supabase
    .from("items")
    .select("*", { count: "exact", head: true })
    .eq("location_id", locationId)
    .eq("category", "curtain");

  if (error) throw error;

  return count ?? 0;
}

export async function getLocationSelectableCurtains(
  supabase: SupabaseClient<Database>,
  locationId: string,
) {
  const { data, error } = await supabase
    .from("items")
    .select("id,quantity,room_id,rooms!inner(story_id)")
    .eq("location_id", locationId)
    .eq("category", "curtain");

  if (error) throw error;
  return data.map((d) => ({
    item_id: d.id,
    quantity: d.quantity,
    room_id: d.room_id,
    story_id: d.rooms.story_id,
  }));
}

export async function getCurtainCountByStory(supabase: SupabaseClient<Database>, storyId: string) {
  const { data, error } = await supabase.rpc("get_curtain_count_by_story", {
    p_story_id: storyId,
  });

  if (error) throw error;
  return data;
}

export async function getStorySelectableCurtains(
  supabase: SupabaseClient<Database>,
  storyId: string,
) {
  const { data, error } = await supabase
    .from("items")
    .select("id,quantity,room_id,rooms!inner(story_id)")
    .eq("rooms.story_id", storyId)
    .eq("category", "curtain");

  if (error) throw error;
  return data.map((d) => ({
    item_id: d.id,
    quantity: d.quantity,
    room_id: d.room_id,
    story_id: d.rooms.story_id,
  }));
}

export async function getRoomSelectableItems(supabase: SupabaseClient<Database>, roomId: string) {
  const { data, error } = await supabase
    .from("items")
    .select("id,quantity,room_id,rooms!inner(story_id)")
    .eq("room_id", roomId)
    .eq("category", "curtain");

  if (error) throw error;

  return data.map((d) => ({
    item_id: d.id,
    quantity: d.quantity,
    room_id: d.room_id,
    story_id: d.rooms.story_id,
  }));
}
