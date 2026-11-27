import { Database, TablesUpdate } from "@/types/database.types";
import { ModuleKey } from "@/types/types";
import { LocationFormValues } from "@/zodSchemas/locationSchema";
import { SupabaseClient } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

type CreateLocationArgs = Database["public"]["Functions"]["create_location"]["Args"];

export async function getClientLocationsByModule(
  supabase: SupabaseClient<Database>,
  clientId: string,
  module: ModuleKey,
) {
  const { data, error } = await supabase
    .from("locations")
    .select(
      "id, name, checkin_procedure, city, postal_code, street, number,internal_id,company_locations!inner(module),external_id,clients(id, name, city, postal_code, street, number)",
    )
    .eq("client_id", clientId)
    .eq("company_locations.module", module);

  if (error) throw error;
  return data;
}

export async function getLocationOptionsForPlanning(
  supabase: SupabaseClient<Database>,
  module: ModuleKey,
) {
  const { data, error } = await supabase
    .from("locations")
    .select("id,name,city,postal_code,street,number,company_locations!inner(module)")
    .eq("company_locations.module", module);

  if (error) throw error;
  return data;
}

export async function getLocationsWithClient(
  supabase: SupabaseClient<Database>,
  module: ModuleKey,
) {
  const { data, error } = await supabase
    .from("locations")
    .select(
      "id, name, checkin_procedure, city, postal_code, street, number,internal_id,external_id,clients(id, name, city, postal_code, street, number),company_locations!inner(module)",
    )
    .eq("company_locations.module", module);

  if (error) throw error;
  return data;
}

export async function getLocationWithClient(supabase: SupabaseClient<Database>, id: string) {
  const { data, error } = await supabase
    .from("locations")
    .select(
      "id, name, checkin_procedure, city, postal_code, street, number,internal_id,external_id,clients(id, name, city, postal_code, street, number)",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getStoriesFromLocation(
  supabase: SupabaseClient<Database>,
  locationId: string,
) {
  const { data, error } = await supabase
    .from("stories")
    .select("id, location_id, name, rooms(count)")
    .eq("location_id", locationId)
    .order("name");

  if (error) throw error;

  return data.map(({ rooms, ...story }) => ({
    ...story,
    room_count: rooms[0]?.count ?? 0,
  }));
}

export async function getLocationStoryCount(
  supabase: SupabaseClient,
  locationId: string,
): Promise<number> {
  const { count, error } = await supabase
    .from("stories")
    .select("id", { count: "exact", head: true })
    .eq("location_id", locationId);
  if (error) throw error;
  return count ?? 0;
}

export async function getLocationLastMaintenance(
  supabase: SupabaseClient<Database>,
  locationId: string,
) {
  const { data, error } = await supabase.rpc("get_location_last_completed_project", {
    p_location_id: locationId,
  });
  if (error) throw error;
  return data;
}

export async function getLocationRoomCount(
  supabase: SupabaseClient,
  locationId: string,
): Promise<number> {
  const { count, error } = await supabase
    .from("rooms")
    .select("id", { count: "exact", head: true })
    .eq("location_id", locationId);
  if (error) throw error;
  return count ?? 0;
}

export async function updateLocation(
  supabase: SupabaseClient<Database>,
  id: string,
  values: TablesUpdate<"locations">,
) {
  const { data, error } = await supabase
    .from("locations")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export function toCreateLocationArgs(
  values: LocationFormValues,
  module: ModuleKey,
): CreateLocationArgs {
  return {
    p_module_key: module,
    p_client_id: values.client_id,
    p_name: values.name,
    p_street: values.street,
    p_number: values.number,
    p_postal_code: values.postal_code,
    p_city: values.city,
    p_checkin_procedure: values.checkin_procedure ?? false,
    p_external_id: values.external_id ?? undefined,
    p_internal_id: values.internal_id ?? undefined,
  };
}

export function toUpdateLocationArgs(values: LocationFormValues): TablesUpdate<"locations"> {
  return {
    client_id: values.client_id,
    name: values.name,
    street: values.street,
    number: values.number,
    postal_code: values.postal_code,
    city: values.city,
    checkin_procedure: values.checkin_procedure,
    internal_id: values.internal_id,
    external_id: values.external_id,
  };
}

export async function createLocation(supabase: SupabaseClient<Database>, args: CreateLocationArgs) {
  const { data, error } = await supabase.rpc("create_location", args);

  if (error) throw error;
  return data;
}

export type LocationsWithClient = Awaited<ReturnType<typeof getLocationsWithClient>>;
export type LocationWithClientListItem = Awaited<ReturnType<typeof getLocationsWithClient>>[number];
export type LocationDetail = Awaited<ReturnType<typeof getLocationWithClient>>;

export type LocationStories = Awaited<ReturnType<typeof getStoriesFromLocation>>;
export type LocationStory = LocationStories[number];
