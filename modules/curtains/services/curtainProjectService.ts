import { Database } from "@/types/database.types";
import { ProjectFormValues } from "@/zodSchemas/projectSchema";
import { SupabaseClient } from "@supabase/supabase-js";

type CreateProjectArgs = Database["public"]["Functions"]["create_curtain_project"]["Args"];

export async function createCurtainProject(
  supabase: SupabaseClient<Database>,
  values: ProjectFormValues,
) {
  const { data, error } = await supabase.rpc("create_curtain_project", toCreateProjectArgs(values));

  if (error) throw error;
  return data;
}

function toCreateProjectArgs(values: ProjectFormValues): CreateProjectArgs {
  return {
    p_name: values.name,
    p_location_id: values.location_id,
    p_start_date: values.start_date,
    p_end_date: values.end_date,
    p_description: values.description ?? undefined,
    p_project_code: values.projectCode ?? undefined,
    p_items: values.items.map(({ item_id, planned_quantity, cleaning_method_id }) => ({
      item_id,
      planned_quantity,
      cleaning_method_id,
    })),
    p_vehicles: values.vehicles.map(({ vehicle_id, date, employee_ids }) => ({
      vehicle_id,
      date,
      employee_ids,
    })),
  };
}
